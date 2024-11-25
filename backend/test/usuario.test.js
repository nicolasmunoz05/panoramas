import mongoose from "mongoose";
import { expect } from "chai";
import Usuario from "../models/usuarioModel.js";

describe("Modelo Usuario", () => {
  it("Debería crear un usuario válido", async () => {
    const usuario = new Usuario({
      nombre_usuario: "TestUser",
      contrasena_usuario: "12345",
      fecha_nacimiento_usuario: new Date("2000-01-01"),
      telefono_usuario: "123456789",
      email_usuario: "test@example.com",
    });
    const savedUser = await usuario.save();
    expect(savedUser._id).to.exist;
    expect(savedUser.nombre_usuario).to.equal("TestUser");
  });

  it("Debería fallar si falta un campo requerido", async () => {
    try {
      const usuario = new Usuario({
        contrasena_usuario: "12345",
        fecha_nacimiento_usuario: new Date("2000-01-01"),
        telefono_usuario: "123456789",
      });
      await usuario.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors).to.have.property("nombre_usuario");
    }
  });
});
