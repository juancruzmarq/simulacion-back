import { DataSource } from "typeorm";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [path.join(__dirname, "../entities/*")],
  synchronize: true, // TODO: remove this in production
  logging: true,
  migrations: [path.join(__dirname, "../migrations/*")],
});
