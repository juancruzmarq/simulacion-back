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
export class Usuario extends BaseEntity {
  @Field(() => Int, { nullable: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String, { nullable: true })
  @Column({ type: "varchar", nullable: false })
  email: string;

  @Field(() => String, { nullable: true })
  @Column({ type: "varchar", nullable: false })
  password: string;

  @Field(() => String, { nullable: true })
  @CreateDateColumn({ type: "timestamp" })
  createdAt: string;

  @Field(() => String, { nullable: true })
  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: string;
}
