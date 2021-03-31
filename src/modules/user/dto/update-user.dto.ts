import { ApiModel, ApiModelProperty } from "swagger-express-ts";
import { IsAlphanumeric, IsBoolean, IsEmail, IsOptional, IsString } from "class-validator";

@ApiModel({
  description: "Update User",
  name: "UpdateUser",
})
export class UpdateDTO {
  @ApiModelProperty({
    description: "Username",
    required: false,
  })
  @IsAlphanumeric()
  @IsString()
  @IsOptional()
  username: string;

  @ApiModelProperty({
    description: "First Name",
    required: false,
  })
  @IsOptional()
  firstName: string;

  @ApiModelProperty({
    description: "Last Name",
    required: false,
  })
  @IsOptional()
  lastName: string;

  @ApiModelProperty({
    description: "Email",
    required: false,
  })
  @IsEmail()
  @IsOptional()
  email: string;
}
