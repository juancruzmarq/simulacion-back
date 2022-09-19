import { ApolloError } from "apollo-server";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Cliente } from "../entities/Cliente";
import { ClienteUpdate } from "./Types/cliente.inputs.types";
import { clienteRepository } from "../repositories/ClienteRepository";

@Resolver()
export class ClienteResolver {
  @Mutation(() => Cliente, { description: "Crear un nuevo cliente" })
  async createCliente() {
    try {
      const cliente = clienteRepository.create({
        llegada: new Date().toISOString(),
      });
      await clienteRepository.save(cliente);
      return cliente;
    } catch (e) {
      console.log(e);
      return new ApolloError("Error al crear el cliente", "500");
    }
  }

  @Mutation(() => Cliente, { description: "Actualizar un cliente" })
  async updateCliente(
    @Arg("id") id: number,
    @Arg("cliente", () => ClienteUpdate) cliente: ClienteUpdate
  ) {
    try {
      const findCliente = await Cliente.findOne({ where: { id } });
      if (!findCliente) return new ApolloError("Cliente no encontrado", "404");
      await Cliente.update({ id }, cliente);
      const clienteUpdated = await Cliente.findOne({ where: { id } });
      return clienteUpdated;
    } catch (e) {
      console.log(e);
      return new ApolloError("Error al actualizar el cliente", "500");
    }
  }

  @Mutation(() => Boolean, { description: "Eliminar un cliente" })
  async deleteCliente(@Arg("id") id: number) {
    try {
      const findCliente = await Cliente.findOne({ where: { id } });
      if (!findCliente) return new ApolloError("Cliente no encontrado", "404");
      await Cliente.delete({ id });
      return true;
    } catch (e) {
      console.log(e);
      return new ApolloError("Error al eliminar el cliente", "500");
    }
  }

  @Query(() => [Cliente], { description: "Obtener todos los clientes" })
  async getClientes() {
    try {
      const clientes = await Cliente.find();
      return clientes;
    } catch (e) {
      console.log(e);
      return new ApolloError("Error al obtener los clientes", "500");
    }
  }

  @Query(() => Cliente, { description: "Obtener un cliente" })
  async getCliente(@Arg("id") id: number) {
    try {
      const cliente = await Cliente.findOne({ where: { id } });
      if (!cliente) return new ApolloError("Cliente no encontrado", "404");
      return cliente;
    } catch (e) {
      console.log(e);
      return new ApolloError("Error al obtener el cliente", "500");
    }
  }
}
