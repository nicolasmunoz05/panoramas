import mongoose from "mongoose";
import { expect } from "chai";
import Panorama from "../models/panoramaModel.js";

describe("Modelo Panorama", () => {
  it("Debería crear un panorama válido", async () => {
    const panorama = new Panorama({
      titulo_panorama: "Museo",
      descripcion_panorama: "Visita al museo",
      dias_panorama: "Lunes a Viernes",
      horario_inicio_panorama: "10:00",
      horario_termino_panorama: "18:00",
      direccion_panorama: "Avenida Principal 123",
      ubicacion_ciudad_panorama: "Ciudad",
      ubicacion_region_panorama: "Región",
      ubicacion_comuna_panorama: "Comuna",
      creador_panorama: new mongoose.Types.ObjectId(),
      status_panorama: "activo",
    });
    const savedPanorama = await panorama.save();
    expect(savedPanorama._id).to.exist;
    expect(savedPanorama.titulo_panorama).to.equal("Museo");
  });

  it("Debería fallar si falta un campo requerido", async () => {
    try {
      const panorama = new Panorama({
        descripcion_panorama: "Panorama sin título",
      });
      await panorama.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors).to.have.property("titulo_panorama");
    }
  });
});
