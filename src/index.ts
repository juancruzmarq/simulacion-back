import "reflect-metadata";
import { startServer } from "./app";
import dotenv from "dotenv";
import { AppDataSource } from "./db/connection";
dotenv.config();
async function main() {
  AppDataSource.initialize()
    .then(() => {
      console.log("Database connected");
    })
    .catch((err) => {
      console.log("Database connection error", err);
    });
  const app = await startServer();
  app.listen(process.env.PORT, () => {
    console.log(`Server started on http://localhost:${process.env.PORT}`);
  });
}

main();
