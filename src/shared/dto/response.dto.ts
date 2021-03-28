import { IsNotEmpty, IsString } from "class-validator";

export class MessageDTO {
  @IsNotEmpty()
  @IsString()
  message: string;
}
