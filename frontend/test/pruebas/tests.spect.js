// tests.spec.js
const { test, expect } = require('@playwright/test');

test.describe('Pruebas de Eventos', () => {
  
    test('Buscar evento y panorama', async ({ page }) => {
        // Ir a la página principal
        await page.goto('http://localhost:3000'); // Cambia la URL según sea necesario
    
        // Buscar un evento
        await page.fill('input[placeholder="Buscar eventos, panoramas..."]', 'Concierto de Verano'); // Cambia el nombre del evento según sea necesario
        await page.press('input[placeholder="Buscar eventos, panoramas..."]', 'Enter');
    
        // Verificar que se redirige a la descripción del evento
        await page.click('text=Concierto de Verano'); // Asegúrate de que el texto coincide con el evento
        await expect(page).toHaveURL('http://localhost:3000/description/6706c50f7cbaa730035e5c7e'); // Verificar que la URL sea correcta
    
        // Volver a la página principal
        await page.click('text=ChilExplora!'); // Cambia el selector si es necesario
        await expect(page).toHaveURL('http://localhost:3000/'); // Verificar que estás de vuelta en la página principal
    
        // Buscar un panorama
        await page.fill('input[placeholder="Buscar eventos, panoramas..."]', 'Fiesta del Sol'); // Cambia el nombre del panorama según sea necesario
        await page.press('input[placeholder="Buscar eventos, panoramas..."]', 'Enter');
    
        // Verificar que se redirige a la descripción del panorama
        await page.click('text=Fiesta del Sol'); // Asegúrate de que el texto coincide con el panorama
        await expect(page).toHaveURL('http://localhost:3000/description/6700055e24d4a65ac7852842'); // Cambia a la URL correcta del panorama
    
        // Volver a la página principal
        await page.click('text=ChilExplora!'); // Cambia el selector si es necesario
        await expect(page).toHaveURL('http://localhost:3000/'); // Verificar que estás de vuelta en la página principal
    });

    test('Buscar eventos o panoramas que no existen', async ({ page }) => {
        // Ir a la página principal
        await page.goto('http://localhost:3000'); // Cambia la URL según sea necesario
    
        // Buscar un evento que no existe
        await page.fill('input[placeholder="Buscar eventos, panoramas..."]', 'Fiesta del Chancho Muerto'); // Evento que no existe
        await page.press('input[placeholder="Buscar eventos, panoramas..."]', 'Enter');
    
        // Verificar que no se encuentra ningún evento o panorama
        const content = await page.locator('body').innerText();
        expect(content).toContain('ChilExplora!'); // Asegúrate de que el navbar esté visible
        expect(content).not.toContain('Fiesta del Chancho Muerto'); // Verifica que el evento no aparezca
    
        // Buscar otro panorama que no existe
        await page.fill('input[placeholder="Buscar eventos, panoramas..."]', 'Laguna del Maulé'); // Panorama que no existe
        await page.press('input[placeholder="Buscar eventos, panoramas..."]', 'Enter');
    
        // Verificar que no se encuentra ningún evento o panorama
        const contentAfterSecondSearch = await page.locator('body').innerText();
        expect(contentAfterSecondSearch).toContain('ChilExplora!'); // Asegúrate de que el navbar esté visible
        expect(contentAfterSecondSearch).not.toContain('Laguna del Maulé'); // Verifica que el panorama no aparezca
    });
    


//inicio sesion
    test('Iniciar sesión existosamente', async ({ page }) => {
      //ir a la pagina principal
      await page.goto('http://localhost:3000');
      //busca y hace clic en el boton de de iniciar de sesión
      await page.click('text=Iniciar sesión');
      //completar el formulario de inicio de sesion
      await page.fill('input[placeholder="correo@ejempplo.com"]', 'test5@gmail.com');
      await page.fill('input[placeholder="*"]', '12345');
      await page.click('button[type="submit"]');

      //verificar que aparece el mensaje de inicio sesion exitoso
      await expect(page.locator('text=Inicio de sesión exitoso')).toBeVisible();

      //hacer clir en el boton "Aceptar"
      await page.click('Button:has-text("Aceptar")');

      // Verifica que estás en la página principal
      await expect(page).toHaveURL('http://localhost:3000')

      // Buscar y hacer clic en el botón de cerrar sesión
      await page.click('text=Cerrar sesión');

      // Verifica que estás de vuelta en la página principal sin sesión iniciada
      await expect(page).toHaveURL('http://localhost:3000/');

    });

    //incio sesion erronea
    test('No permitir inicio de sesión con cuenta no creada', async ({ page }) => {
      // Ir a la página principal
      await page.goto('http://localhost:3000'); // Cambia la URL según sea necesario

      // Buscar y hacer clic en el botón de iniciar sesión
      await page.click('text=Iniciar sesión'); // Cambia el selector si es necesario

      // Completar el formulario de inicio de sesión con credenciales inválidas
      await page.fill('input[placeholder="correo@ejemplo.com"]', 'inexistente@gmail.com'); // Email que no existe
      await page.fill('input[placeholder="*"]', 'wrongpassword'); // Contraseña incorrecta
      await page.click('button[type="submit"]'); // Presionar el botón de Iniciar Sesión

      // Verificar que aparece el mensaje de contraseña incorrecta
      await expect(page.locator('text=Contraseña incorrecta')).toBeVisible(); // Asegúrate de que el texto coincide
    });





//registro

test('Registro de usuario - Opción desde Login y desde la página principal', async ({ page }) => {
    // Ir a la página principal
    await page.goto('http://localhost:3000');

    await page.click('text=Iniciar sesión'); 

    // Opción 1: Ir a la vista de registro desde el login
    await page.goto('http://localhost:3000/login'); // Cambia la URL según sea necesario

    // Hacer clic en el botón de "Regístrate"
    await page.click('text=Regístrate'); 

    // Verificar que estás en la vista de registro
    await expect(page).toHaveURL('http://localhost:3000/register'); // Cambia a la URL correcta de registro

    // Hacer clic en el botón "ChilExplora!" para volver a la página principal
    await page.click('text=ChilExplora!'); // Cambia el selector si es necesario

    // Verificar que estás de vuelta en la página principal
    await expect(page).toHaveURL('http://localhost:3000/'); // Cambia a la URL de la página principal

    // Opción 2: Ir a la vista de registro desde la página principal
    await page.click('text=Registrarse'); // Hacer clic en el botón de "Registrarse"

    // Verificar que estás en la vista de registro
    await expect(page).toHaveURL('http://localhost:3000/register'); // Cambia a la URL correcta de registro

    // Intentar registrarse sin llenar campos
    await page.click('button[type="submit"]'); // Hacer clic en el botón de "Registrarse"

    // Verificar que aparece el mensaje de error
    await expect(page.locator('text=rellene los datos')).toBeVisible(); // Asegúrate de que el texto coincide

    // Completar los campos requeridos
    await page.fill('input[name="nombre_usuario"]', 'Jerman Espindola'); // Nombre de usuario
    await page.fill('input[name="contrasena_usuario"]', 'Jerman12'); // Contraseña
    await page.fill('input[name="telefono_usuario"]', '973535353'); // Teléfono
    await page.fill('input[name="email_usuario"]', 'testjerman@gmail.com'); // Email
    await page.fill('input[name="fecha_nacimiento_usuario"]', '12-02-1990'); // Fecha de nacimiento (asegúrate de usar el formato correcto)

    // Hacer clic en el botón de "Registrarse"
    await page.click('button[type="submit"]'); // Cambia el selector si es necesario

    // Verificar que aparece el mensaje de registro exitoso
    await expect(page.locator('text=Registro exitoso. Revisa tu correo.')).toBeVisible(); // Asegúrate de que el texto coincide

    // Hacer clic en el botón "Aceptar"
    await page.click('button:has-text("Aceptar")'); // Cambia el selector si es necesario

    // Verificar que estás de vuelta en la vista de inicio de sesión
    await expect(page).toHaveURL('http://localhost:3000/login'); // Cambia a la URL de la página de login
});





//publicar evento
test('Crear un evento', async ({ page }) => {
    // Ir a la página principal (Home)
    await page.goto('http://localhost:3000/'); // Cambia la URL según sea necesario

    // Hacer clic en el botón "Publica con nosotros"
    await page.click('text=Publica con nosotros'); 

    // Verificar que aparece el mensaje de inicio de sesión
    await expect(page.locator('text=Debes iniciar sesión para publicar un evento.')).toBeVisible(); 

    // Hacer clic en el botón "Aceptar"
    await page.click('button:has-text("Aceptar")'); 

    // Verificar que estás en la vista de inicio de sesión
    await expect(page).toHaveURL('http://localhost:3000/login'); // Cambia a la URL de la página de login

    // Completar los campos de inicio de sesión
    await page.fill('input[placeholder="correo@ejemplo.com"]', 'test5@gmail.com'); // Correo Electrónico
    await page.fill('input[placeholder="*"]', '12345'); // Contraseña

    // Hacer clic en el botón de "Iniciar sesión"
    await page.click('button[type="submit"]'); 

    // Verificar que estás de vuelta en la página principal
    await expect(page).toHaveURL('http://localhost:3000/'); 

    // Hacer clic en el botón "Publicar"
    await page.click('text=Publicar'); // Cambia el selector si es necesario

    // Verificar que estás en la vista de publicar evento
    await expect(page).toHaveURL('http://localhost:3000/publicar'); // Cambia a la URL de la página de publicar

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
    await expect(page).toHaveURL ('http://localhost:3000/'); // Cambia a la URL de la página principal
});

});// tests.spec.js

