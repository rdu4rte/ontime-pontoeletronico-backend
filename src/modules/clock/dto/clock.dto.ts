import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiModel, ApiModelProperty } from "swagger-express-ts";

@ApiModel({
  description: "New Entry",
  name: "NewEntry",
})
export class ClockDTO {
  @ApiModelProperty({
    description: "Entry",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  entry: string;

  @ApiModelProperty({
    description: "Day",
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  day: number;

  @ApiModelProperty({
    description: "Year",
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  year: number;

  @ApiModelProperty({
    description: "Month",
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  month: number;

  @ApiModelProperty({
    description: "User Id",
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
