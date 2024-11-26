import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer;
mongoose.set("strictQuery", true);

// Configurar la base de datos en memoria
before(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

// Limpiar los datos después de cada prueba
afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

// Cerrar la conexión después de las pruebas
after(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});
