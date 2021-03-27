import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { randomBytes } from "crypto";
import * as argon2 from "argon2";
import { argonSalt } from "../../../config/env.config";
import { Role } from "../dto/user.dto";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: true })
  active: boolean;

  @Column()
  password: string;

  @Column("enum", {
    nullable: false,
    enum: Role,
    default: Role.user,
  })
  role: Role;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @BeforeInsert()
  async hashPassword() {
    const salt = randomBytes(argonSalt);
    this.password = await argon2.hash(this.password, { salt });
  }
}
