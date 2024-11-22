import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import https from 'https';


const resultadosFile = './resultados.json'; // Archivo donde guardaremos los resultados
const uploadFolder = './uploads/sc'; // Carpeta para guardar las imágenes
const maxPages = 3; // Número máximo de páginas a procesar

// Asegurarnos de que la carpeta de imágenes exista
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder, { recursive: true });
}

// Función para cargar los resultados desde el archivo JSON
const cargarResultados = () => {
  if (fs.existsSync(resultadosFile)) {
    const data = fs.readFileSync(resultadosFile, 'utf-8');
    return JSON.parse(data);
  }
  return {}; // Retorna un objeto vacío si no existe el archivo
};

// Función para guardar los resultados en el archivo JSON
const guardarResultados = (resultados) => {
  fs.writeFileSync(resultadosFile, JSON.stringify(resultados, null, 2), 'utf-8');
};

// Función para descargar una imagen y guardarla localmente
const descargarImagen = (url, rutaDestino) => {
  return new Promise((resolve, reject) => {
    const archivo = fs.createWriteStream(rutaDestino);
    https.get(url, (respuesta) => {
      if (respuesta.statusCode === 200) {
        respuesta.pipe(archivo);
        archivo.on('finish', () => {
          archivo.close(() => resolve(rutaDestino));
        });
      } else {
        reject(new Error(`Error al descargar la imagen: ${respuesta.statusCode}`));
      }
    }).on('error', (err) => {
      reject(err);
    });
  });
};

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Cargar los resultados previos desde el archivo
  let resultados = cargarResultados();

  let pageNumber = 1; // Página inicial
  let hasNextPage = true; // Control para iterar mientras haya páginas

  while (hasNextPage && pageNumber <= maxPages) {
    const url = `https://chilecultura.gob.cl/?permanents-page=${pageNumber}`;
    console.log(`Procesando página: ${url}`);
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Extraer los href de las tablas con la clase indicada
    const links = await page.$$eval('#permanentes .card-detail-link.text-light', elements =>
      elements.map(el => el.href)
    );

    console.log(`Links encontrados en página ${pageNumber}:`, links);

    if (links.length === 0) {
      console.log(`No se encontraron más enlaces en la página ${pageNumber}. Finalizando...`);
      hasNextPage = false;
      break;
    }

    // Iterar sobre cada enlace y extraer la información deseada
    for (const link of links) {
      // Si el enlace ya está en el diccionario, omitirlo
      if (resultados[link]) {
        console.log(`Enlace ya procesado: ${link}, omitiendo...`);
        continue; // Omite el enlace y pasa al siguiente
      }

      try {
        await page.goto(link, { waitUntil: 'networkidle2' });

        // Esperar a que el contenido necesario esté disponible
        await page.waitForSelector('div.mb-6.d-lg-none', { timeout: 5000 });

        // Extraer datos
        const data = await page.evaluate(() => {
          const getText = (selector) => {
            const element = document.querySelector(selector);
            return element ? element.innerText.trim() : null;
          };

          const getLinkText = (selector) => {
            const element = document.querySelector(selector);
            return element ? element.textContent.trim() : null;
          };

          const cleanText = (text) => {
            if (!text) return null;
            return text.replace(/[,\.]+/g, '').trim(); // Remover comas, puntos y espacios extra
          };

          const direccion_panorama = (() => {
            const locationLi = document.querySelector('ul[aria-label="Información acerca del lugar del evento"] li');
            if (locationLi) {
              const clonedLi = locationLi.cloneNode(true);
              clonedLi.querySelectorAll('a, span').forEach(child => clonedLi.removeChild(child));
              return cleanText(clonedLi.textContent); // Limpiar texto extraído
            }
            return null;
          })();

          // Obtener el título
          const titulo_panorama = getText('.h2.mb-3.mb-lg-6');

          // Obtener la descripción combinando todos los <p> dentro de .mb-7.mb-lg-6
          const descripcion_panorama = (() => {
            const descriptionElements = document.querySelectorAll('.mb-7.mb-lg-6 p');
            return Array.from(descriptionElements).map(el => el.innerText.trim()).join(' ');
          })();

          // Obtener el enlace "Ver sitio web" (solo href)
          const web_panorama = (() => {
            const webLink = Array.from(document.querySelectorAll('a')).find(a => a.innerText.includes("Ver sitio web"));
            return webLink ? webLink.href : null;
          })();

          const categoriaElement = document.querySelector('.btn.btn-mobile-fluid.btn-outline-custom.mr-lg-5.mb-5');
          const imagenElement = document.querySelector('.event-img-container.outside-container-until-lg.rounded-sm-from-lg.mb-6.mb-lg-7 img');

          return {
            titulo_panorama,
            precio_panorama: getText('span[data-original-title="Precio"] + p'),
            horario_panorama: getText('span[data-original-title="Horario"] + p'),
            lugar_panorama: getLinkText('span[data-original-title="Ubicación"] + a'),
            direccion_panorama,
            ubicacion_ciudad_panorama: getLinkText('a[href*="commune="]'),
            ubicacion_region_panorama: getLinkText('a[href*="region="]'),
            descripcion_panorama,
            web_panorama,
            categoria_panorama: categoriaElement ? categoriaElement.innerText.trim() : null,
            imagen_panorama: imagenElement ? imagenElement.src : null,
          };
        });

        console.log('Datos extraídos:', data);

        // Descargar la imagen si existe
        if (data.imagen_panorama) {
          const nombreArchivo = path.basename(data.imagen_panorama); // Obtener el nombre del archivo
          const rutaImagen = path.join(uploadFolder, nombreArchivo);

          try {
            await descargarImagen(data.imagen_panorama, rutaImagen);
            data.imagen_ruta_panorama = rutaImagen; // Agregar la ruta al diccionario
            console.log(`Imagen descargada: ${rutaImagen}`);
          } catch (err) {
            console.error(`Error al descargar la imagen: ${err.message}`);
          }
        }

        resultados[link] = data; // Guardar los datos en el diccionario
      } catch (err) {
        console.error(`Error al procesar ${link}:`, err.message);
      }
    }

    // Incrementar el número de página para la siguiente iteración
    pageNumber++;
  }

  // Guardar los resultados en el archivo
  guardarResultados(resultados);

  console.log('Resultados guardados:', JSON.stringify(resultados, null, 2));

  await browser.close();
})();
