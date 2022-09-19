import { ApolloError } from "apollo-server";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Usuario } from "../entities/Usuario";
import { usuarioRepository } from "../repositories/UsuarioRepository";
import { UsuarioCreate } from "./Types/usuario.inputs.types";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "secret";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d";
const HASH_SALT = 10;

@Resolver()
export class UsuarioResolver {
  @Mutation(() => Usuario, { description: "Crear un nuevo usuario" })
  async createUsuario(
    @Arg("usuario", () => UsuarioCreate) usuario: UsuarioCreate
  ) {
    {
      try {
        const password = await bcrypt.hash(usuario.password, HASH_SALT);

        const usuarioCreated = usuarioRepository.create({
          email: usuario.email,
          password,
        });
        await usuarioRepository.save(usuarioCreated);
        return usuarioCreated;
      } catch (e) {
        console.log(e);
        return new ApolloError("Error al crear el usuario", "500");
      }
    }
  }

  @Mutation(() => Usuario, { description: "Actualizar un usuario" })
  async updateUsuario(
    @Arg("id", () => Number) id: number,
    @Arg("usuario", () => UsuarioCreate) usuario: UsuarioCreate
  ) {
    try {
      const usuarioUpdated = await usuarioRepository.update(id, usuario);
      return usuarioUpdated;
    } catch (e) {
      console.log(e);
      return new ApolloError("Error al actualizar el usuario", "500");
    }
  }

  @Mutation(() => Usuario, { description: "Eliminar un usuario" })
  async deleteUsuario(@Arg("id", () => Number) id: number) {
    try {
      const usuarioDeleted = await usuarioRepository.delete(id);
      return usuarioDeleted;
    } catch (e) {
      console.log(e);
      return new ApolloError("Error al eliminar el usuario", "500");
    }
  }

  @Query(() => String, { description: "Login de un usuario" })
  async login(
    @Arg("email", () => String) email: string,
    @Arg("password", () => String) password: string
  ) {
    try {
      const usuario = await usuarioRepository.findOne({
        where: { email },
      });
      if (!usuario) {
        return new ApolloError("Datos no validos", "404");
      }
      const passwordMatch = await bcrypt.compare(password, usuario.password);
      if (!passwordMatch) {
        return new ApolloError("Datos no validos", "401");
      }
      const token = jwt.sign(
        { id: usuario.id, email: usuario.email },
        JWT_SECRET,
        {
          expiresIn: JWT_EXPIRES_IN,
        }
      );

      return token;
    } catch (e) {
      console.log(e);
      return new ApolloError("Error al iniciar sesión", "500");
    }
  }

  @Query(() => [Usuario], { description: "Obtener todos los usuarios" })
  async getUsuarios() {
    try {
      const usuarios = await usuarioRepository.find();
      return usuarios;
    } catch (e) {
      console.log(e);
      return new ApolloError("Error al obtener los usuarios", "500");
    }
  }

  @Query(() => Usuario, { description: "Obtener un usuario por id" })
  async getUsuario(@Arg("id", () => Number) id: number) {
    try {
      const usuario = await usuarioRepository.findOne({
        where: { id },
      });
      return usuario;
    } catch (e) {
      console.log(e);
      return new ApolloError("Error al obtener el usuario", "500");
    }
  }

  @Query(() => Usuario, { description: "Obtener un usuario por email" })
  async getUsuarioByEmail(@Arg("email", () => String) email: string) {
    try {
      const usuario = await usuarioRepository.findOne({
        where: { email },
      });
      return usuario;
    } catch (e) {
      console.log(e);
      return new ApolloError("Error al obtener el usuario", "500");
    }
  }
}
