import { AppDataSource } from "../db/connection";
import { Cliente } from "../entities/Cliente";

export const clienteRepository = AppDataSource.getRepository(Cliente);
