import { AppDataSource } from "../db/connection";
import { Usuario } from "../entities/Usuario";

export const usuarioRepository = AppDataSource.getRepository(Usuario);
