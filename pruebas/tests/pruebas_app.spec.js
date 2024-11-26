// tests.spec.js
const { test, expect } = require('@playwright/test');

test.describe('Pruebas de Eventos', () => {
  
    test('Buscar evento y panorama', async ({ page }) => {
        // Ir a la página principal
        await page.goto('http://localhost:3000'); 
    
        // Buscar un evento
        await page.fill('input[placeholder="Buscar eventos, panoramas..."]', 'Concierto de Verano'); // Cambia el nombre del evento según sea necesario
        await page.press('input[placeholder="Buscar eventos, panoramas..."]', 'Enter');
    
        // Verificar que se redirige a la descripción del evento
        await page.click('text=Concierto en la playa'); // Asegúrate de que el texto coincide con el evento
        await expect(page).toHaveURL('http://localhost:3000/description/6706c50f7cbaa730035e5c7e'); 
    
        // Volver a la página principal
        await page.click('text=ChilExplora!'); // Cambia el selector si es necesario
        await expect(page).toHaveURL('http://localhost:3000/'); // Verificar que estás de vuelta en la página principal
    
        // Buscar un panorama
        await page.fill('input[placeholder="Buscar eventos, panoramas..."]', 'Fiesta del Sol'); // Cambia el nombre del panorama según sea necesario
        await page.press('input[placeholder="Buscar eventos, panoramas..."]', 'Enter');
    
        // Verificar que se redirige a la descripción del panorama
        await page.click('text=Evento de música local'); // Asegúrate de que el texto coincide con el panorama
        await expect(page).toHaveURL('http://localhost:3000/description/670001f124d4a65ac785283d');  
        // Volver a la página principal
        await page.click('text=ChilExplora!'); // Cambia el selector si es necesario
        await expect(page).toHaveURL('http://localhost:3000/'); // Verificar que estás de vuelta en la página principal
    });

    test('Buscar eventos o panoramas que no existen', async ({ page }) => {
        // Ir a la página principal
        await page.goto('http://localhost:3000'); 
        // Buscar un evento que no existe
        await page.fill('input[placeholder="Buscar eventos, panoramas..."]', 'Fiesta del Chancho Muerto'); // Evento que no existe
        await page.press('input[placeholder="Buscar eventos, panoramas..."]', 'Enter');
    
        // Verificar que no se encuentra ningún evento o panorama
        const content = await page.locator('body').innerText();
        expect(content).toContain('ChilExplora!');
        expect(content).not.toContain('Fiesta del Chancho Muerto'); 
        // Buscar otro panorama que no existe
        await page.fill('input[placeholder="Buscar eventos, panoramas..."]', 'Laguna del Maulé'); // Panorama que no existe
        await page.press('input[placeholder="Buscar eventos, panoramas..."]', 'Enter');
    
        // Verificar que no se encuentra ningún evento o panorama
        const contentAfterSecondSearch = await page.locator('body').innerText();
        expect(contentAfterSecondSearch).toContain('ChilExplora!'); // Asegúrate de que el navbar esté visible
        expect(contentAfterSecondSearch).not.toContain('Laguna del Maulé'); // Verifica que el panorama no aparezca
    });
    


//inicio sesion
test('Iniciar sesión exitosamente', async ({ page }) => {
    // Ir a la página principal
    await page.goto('http://localhost:3000');

    // Busca y hace clic en el botón de iniciar sesión
    await page.click('text=Iniciar sesión');

    // Completar el formulario de inicio de sesión
    await page.fill('input[placeholder="correo@ejemplo.com"]', 'test5@gmail.com');
    await page.fill('input[placeholder="*"]', '12345');

    // Hacer clic en el botón de enviar y esperar a que la navegación se complete
    await Promise.all([
        page.click('button[type="submit"]'),
        page.waitForNavigation({ timeout: 20000 }) 
    ]);

    // Esperar un momento para que la página se actualice
    await page.waitForTimeout(1000);

    // Imprimir el contenido del body para ver qué hay en la página
    const bodyContent = await page.locator('body').innerText();
    console.log(bodyContent); 

    // Esperar a que el mensaje aparezca en el DOM
    await page.waitForSelector('text=Inicio de sesión exitoso', { state: 'visible', timeout: 60000 });

    // Verificar que aparece el mensaje de inicio de sesión exitoso
    const mensajeExitosoLocator = page.locator('text=Inicio de sesión exitoso');
    await expect(mensajeExitosoLocator).toBeVisible();

    // Hacer clic en el botón "Aceptar"
    await page.click('button:has-text("Aceptar")');

    // Verifica que estás en la página principal
    await expect(page).toHaveURL('http://localhost:3000');

    // Buscar y hacer clic en el botón de cerrar sesión
    await page.click('text=Cerrar sesión');

    // Verifica que estás de vuelta en la página principal sin sesión iniciada
    await expect(page).toHaveURL('http://localhost:3000/');
});

    //incio sesion erronea
    test('No permitir inicio de sesión con cuenta no creada', async ({ page }) => {
      // Ir a la página principal
      await page.goto('http://localhost:3000'); 
      // Buscar y hacer clic en el botón de iniciar sesión
      await page.click('text=Iniciar sesión'); // Cambia el selector si es necesario

      // Completar el formulario de inicio de sesión con credenciales inválidas
      await page.fill('input[placeholder="correo@ejemplo.com"]', 'inexistente@gmail.com'); // Email que no existe
      await page.fill('input[placeholder="*"]', 'wrongpassword'); // Contraseña incorrecta
      await page.click('button[type="submit"]'); // Presionar el botón de Iniciar Sesión

      // Verificar que aparece el mensaje de contraseña incorrecta
      const contraseñaIncorrecta = page.locator('text=Contraseña incorrecta');
      await expect(contraseñaIncorrecta.locator).toBeVisible({ timeout: 10000 });
    });





//registro

test('Registro de usuario - Opción desde Login y desde la página principal', async ({ page }) => {
    // Ir a la página principal
    await page.goto('http://localhost:3000');

    await page.click('text=Iniciar sesión'); 

    // Opción 1: Ir a la vista de registro desde el login
    await page.goto('http://localhost:3000/login'); 

    // Hacer clic en el botón de "Regístrate"
    await page.click('text=Regístrate'); 

    // Verificar que estás en la vista de registro
    await expect(page).toHaveURL('http://localhost:3000/register'); 

    // Hacer clic en el botón "ChilExplora!" para volver a la página principal
    await page.click('text=ChilExplora!'); // Cambia el selector si es necesario

    // Verificar que estás de vuelta en la página principal
    await expect(page).toHaveURL('http://localhost:3000/'); 

    // Opción 2: Ir a la vista de registro desde la página principal
    await page.click('text=Registrarse'); 

    // Verificar que estás en la vista de registro
    await expect(page).toHaveURL('http://localhost:3000/register'); 
    // Intentar registrarse sin llenar campos
    await page.click('button[type="submit"]'); 

    // Verificar que aparece el mensaje de error
    const textoBuscado = 'rellene los datos'; 
    const locator = page.locator(`text=${textoBuscado}`);

    // Completar los campos requeridos
    await page.fill('input[name="nombre_usuario"]', 'Jerman Espindola'); // Nombre de usuario
    await page.fill('input[name="contrasena_usuario"]', 'Jerman12'); // Contraseña
    await page.fill('input[name="telefono_usuario"]', '973535353'); // Teléfono
    await page.fill('input[name="email_usuario"]', 'testjerman@gmail.com'); // Email
    await page.fill('input[name="fecha_nacimiento_usuario"]', '1990-12-12'); // Fecha de nacimiento 

    // Hacer clic en el botón de "Registrarse"
    await page.click('button[type="submit"]'); 

    // Verificar que aparece el mensaje de registro exitoso
    const textoBuscado1 = 'Registro exitoso. Revisa tu correo.'; 
    const locator1 = page.locator(`text=${textoBuscado}`);

    // Hacer clic en el botón "Aceptar"
    const botonBuscado = 'Aceptar'; 
    const locator3 = page.locator(`text=${botonBuscado}`);
    
    // Verificar que el botón está visible en la pantalla
    await expect(locator3).toBeVisible();

    // Hacer clic en el botón
    await locator.click();

    // Verificar que estás de vuelta en la vista de inicio de sesión
    await expect(page).toHaveURL('http://localhost:3000/login'); 
});





//publicar evento
test('Crear un evento', async ({ page }) => {
    // Ir a la página principal (Home)
    await page.goto('http://localhost:3000/'); 
    // Hacer clic en el botón "Publica con nosotros"
    await page.click('text=Publica con nosotros'); 

    // Verificar que aparece el mensaje de inicio de sesión
    const textoBuscado = 'Debes iniciar sesión para publicar un evento.'; 
    const locator = page.locator(`text=${textoBuscado}`);

    // Hacer clic en el botón "Aceptar"
    await page.click('button:has-text("Aceptar")'); 

    // Verificar que estás en la vista de inicio de sesión
    await expect(page).toHaveURL('http://localhost:3000/login'); 

    // Completar los campos de inicio de sesión
    await page.fill('input[placeholder="correo@ejemplo.com"]', 'test5@gmail.com'); // Correo Electrónico
    await page.fill('input[placeholder="*"]', '12345'); // Contraseña

    // Hacer clic en el botón de "Iniciar sesión"
    await page.click('button[type="submit"]'); 

    // Verificar que estás de vuelta en la página principal
    await expect(page).toHaveURL('http://localhost:3000/'); 

    // Hacer clic en el botón "Publicar"
    await page.click('text=Publicar'); 

    // Verificar que estás en la vista de publicar evento
    await expect(page).toHaveURL('http://localhost:3000/publicar'); 

    // Completar el formulario para crear el evento
    await page.fill('input[name="titulo_evento"]', 'Fiesta del chancho muerto'); // Título del evento
    await page.fill('input[name="fecha_inicio_evento"]', '2024-12-12'); // Fecha de inicio
    await page.fill('input[name="fecha_termino_evento"]', '2024-12-16'); // Fecha de término
    await page.fill('input[name="hora_inicio_evento"]', '11:11'); // Hora de inicio
    await page.fill('input[name="hora_termino_evento"]', '23:59'); // Hora de término
    await page.fill('textarea[name="descripcion_evento"]', 'La fiesta del chancho conmemora la celebración llevada a cabo en los campos de la Región del Maule en torno a los productos obtenidos tras la matanza del chancho'); // Descripción del evento
    await page.fill('input[name="descripcion_breve_evento"]', 'Es una fiesta gastronómica'); // Descripción breve
    await page.fill('input[name="ubicacion_comuna_evento"]', 'Talca'); // Comuna
    await page.fill('input[name="ubicacion_ciudad_evento"]', 'Talca'); // Ciudad
    await page.fill('input[name="ubicacion_region_evento"]', 'Maule'); // Región
    await page.fill('input[name="direccion_evento"]', '2 norte, 2 oriente 1620'); // Dirección
    await page.selectOption('select[name="categoria_evento"]', 'fiesta'); // Categoría
    await page.fill('input[name="precio_evento"]', '1000'); // Precio
    await page.fill('input[name="edad_requerida_evento"]', '2'); // Edad mínima requerida

    // Subir un archivo
    const filePath = 'C:/Users/jpval/Downloads/fiesta-del-chancho-muerto-en-talca.jpg'; // Cambia la ruta según sea necesario
    await page.setInputFiles('input[type="file"]', filePath); // Elegir archivo
    await expect(page.locator('text=fiesta-del-chancho-muerto-en-talca.jpg')).toBeVisible(); // Verificar que el archivo se muestre en pantalla

    // Hacer clic en el botón "Crear Evento"
    await page.click('button:has-text("Crear Evento")'); 
    // Verificar que aparece el mensaje de éxito
    await expect(page.locator('text=ddddd')).toBeVisible(); 

    // Hacer clic en el botón "Aceptar"
    await page.click('button:has-text("Aceptar")'); 

    // Verificar que estás de vuelta en la vista principal
    await expect(page).toHaveURL ('http://localhost:3000/'); 
});

});

