import mongoose from "mongoose";
import { expect } from "chai";
import Evento from "../models/eventoModel.js";

describe("Modelo Evento", () => {
  it("Debería crear un evento válido", async () => {
    const evento = new Evento({
      titulo_evento: "Concierto",
      fecha_inicio_evento: new Date(),
      fecha_termino_evento: new Date(),
      descripcion_evento: "Concierto de prueba",
      ubicacion_comuna_evento: "Centro",
      direccion_evento: "Calle Falsa 123",
      ubicacion_ciudad_evento: "Ciudad",
      ubicacion_region_evento: "Región",
      hora_inicio_evento: "18:00",
      hora_termino_evento: "21:00",
      categoria_evento: "Música",
    });
    const savedEvento = await evento.save();
    expect(savedEvento._id).to.exist;
    expect(savedEvento.titulo_evento).to.equal("Concierto");
  });

  it("Debería fallar si falta un campo requerido", async () => {
    try {
      const evento = new Evento({
        fecha_inicio_evento: new Date(),
        descripcion_evento: "Evento sin título",
      });
      await evento.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors).to.have.property("titulo_evento");
    }
  });
});
