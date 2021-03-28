import { IsAlphanumeric, IsBoolean, IsEmail, IsEnum, IsNotEmpty } from "class-validator";
import { ApiModel, ApiModelProperty } from "swagger-express-ts";

export enum Role {
  admin = "admin",
  user = "user",
}

@ApiModel({
  description: "Passwords",
  name: "Password",
})
export class PasswordDTO {
  @ApiModelProperty({
    description: "Password",
    required: true,
  })
  @IsNotEmpty()
  p1: string;

  @ApiModelProperty({
    description: "Confirm Password",
    required: true,
  })
  @IsNotEmpty()
  p2: string;
}

@ApiModel({
  description: "New User",
  name: "User",
})
export class UserDTO {
  @ApiModelProperty({
    description: "Username",
    required: true,
  })
  @IsNotEmpty()
  @IsAlphanumeric()
  username: string;

  @ApiModelProperty({
    description: "First Name",
    required: true,
  })
  @IsNotEmpty()
  firstName: string;

  @ApiModelProperty({
    description: "Last Name",
    required: true,
  })
  @IsNotEmpty()
  lastName: string;

  @ApiModelProperty({
    description: "Email",
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsBoolean()
  active: boolean;

  @ApiModelProperty({
    description: "Passwords",
    required: true,
    model: "Password",
  })
  password: PasswordDTO;

  @IsEnum(Role)
  role: Role;
}
