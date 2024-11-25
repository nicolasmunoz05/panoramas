import mongoose from "mongoose";
import { expect } from "chai";
import Comentario from "../models/comentarioModel.js";


describe("Modelo Comentario", () => {
  it("Debería crear un comentario válido", async () => {
    const comentario = new Comentario({
      usuario_comentario: new mongoose.Types.ObjectId(),
      texto_comentario: "Buen panorama",
      nota_comentario: 5,
      relacionadoCon_comentario: {
        tipo: "Panorama",
        id: new mongoose.Types.ObjectId(),
      },
    });
    const savedComentario = await comentario.save();
    expect(savedComentario._id).to.exist;
    expect(savedComentario.nota_comentario).to.equal(5);
  });

  it("Debería fallar si falta la nota", async () => {
    try {
      const comentario = new Comentario({
        texto_comentario: "Comentario sin nota",
        relacionadoCon_comentario: {
          tipo: "Evento",
          id: new mongoose.Types.ObjectId(),
        },
      });
      await comentario.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors).to.have.property("nota_comentario");
    }
  });
});
