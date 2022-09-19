import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Cliente extends BaseEntity {
  @Field(() => Int, { nullable: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String, { nullable: true })
  @Column({ type: "timestamp", nullable: false })
  llegada: string;

  @Field(() => String, { nullable: true })
  @Column({ type: "timestamp", nullable: true })
  salida: string;

  @Field(() => String, { nullable: true })
  @Column({ type: "timestamp", nullable: true })
  ingresaCola: string;

  @Field(() => String, { nullable: true })
  @Column({ type: "timestamp", nullable: true })
  salidaCola: string;

  @Field(() => String, { nullable: true })
  @Column({ type: "timestamp", nullable: true })
  comienzaAtencion: string;

  @Field(() => String, { nullable: true })
  @Column({ type: "timestamp", nullable: true })
  terminaAtencion: string;

  @Field(() => String, { nullable: true })
  @CreateDateColumn({ type: "timestamp" })
  createdAt: string;

  @Field(() => String, { nullable: true })
  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: string;
}
