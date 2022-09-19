import { Field, InputType } from "type-graphql";

@InputType()
export class ClienteUpdate {
  @Field(() => String, { nullable: true })
  salida: string;

  @Field(() => String, { nullable: true })
  ingresaCola: string;

  @Field(() => String, { nullable: true })
  salidaCola: string;

  @Field(() => String, { nullable: true })
  comienzaAtencion: string;

  @Field(() => String, { nullable: true })
  terminaAtencion: string;
}
