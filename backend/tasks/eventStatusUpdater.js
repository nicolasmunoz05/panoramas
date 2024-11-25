import cron from "node-cron";
import Evento from "../models/eventoModel.js"; // Ajusta según tu estructura
import moment from "moment";

const actualizarEventos = async () => {
  try {
    const now = new Date();
    const eventosActualizados = []; // Lista para almacenar los nombres de los eventos modificados

    const eventos = await Evento.find({ status_evento: { $ne: "inactivo" } });

    for (const evento of eventos) {
      const fechaTermino = new Date(evento.fecha_termino_evento);
      const horaTermino = evento.hora_termino_evento.split(":");
      fechaTermino.setHours(parseInt(horaTermino[0]), parseInt(horaTermino[1]));

      if (now > fechaTermino) {
        evento.status_evento = "inactivo";
        try {
          await evento.save(); 
          eventosActualizados.push(evento.titulo_evento); // Agregar solo el nombre del evento actualizado a la lista
        } catch (error) {
          console.error(`Error al guardar el evento ${evento._id}: ${error.message}`);
        }
      }
    }

    if (eventosActualizados.length > 0) {
      console.log("Eventos actualizados a 'inactivo':");
      eventosActualizados.forEach((nombreEvento) => {
        console.log(nombreEvento); // Mostrar solo el nombre del evento
      });
    } else {
      console.log("No se actualizaron eventos.");
    }

    console.log(`[${new Date().toISOString()}] Estado de eventos actualizado.`);
  } catch (error) {
    console.error("Error al actualizar eventos:", error);
  }
};

// Ejecutar inmediatamente al iniciar el programa
//actualizarEventos();

// Programar el cron job para que se ejecute cada hora a los minutos 30
cron.schedule("30 * * * *", actualizarEventos);