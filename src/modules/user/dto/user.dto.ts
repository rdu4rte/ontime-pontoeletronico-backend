import { IsAlphanumeric, IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";

export enum Role {
  admin = "admin",
  user = "user",
}

export class UserDTO {
  @IsNotEmpty()
  @IsAlphanumeric()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsBoolean()
  active: boolean;

  password: PasswordDTO;

  @IsEnum(Role)
  role: Role;
}

export class PasswordDTO {
  @IsNotEmpty()
  @IsString()
  p1: string;
  p2: string;
}
