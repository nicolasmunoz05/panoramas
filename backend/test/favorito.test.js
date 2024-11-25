import mongoose from "mongoose";
import { expect } from "chai";
import Favorito from "../models/favoritoModel.js";

describe("Modelo Favorito", () => {
  it("Debería crear un favorito válido", async () => {
    const favorito = new Favorito({
      usuario_favorito: new mongoose.Types.ObjectId(),
      panorama_favorito: new mongoose.Types.ObjectId(),
    });
    const savedFavorito = await favorito.save();
    expect(savedFavorito._id).to.exist;
    expect(savedFavorito.fecha_agregado_favorito).to.exist;
  });

  it("Debería fallar si falta el usuario", async () => {
    try {
      const favorito = new Favorito({
        panorama_favorito: new mongoose.Types.ObjectId(),
      });
      await favorito.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors).to.have.property("usuario_favorito");
    }
  });
});
