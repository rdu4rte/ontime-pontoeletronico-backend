import { Request, Response, NextFunction } from "express";
import { inject } from "inversify";
import { BaseHttpController, controller, httpGet, httpPost } from "inversify-express-utils";
import { JsonResult } from "inversify-express-utils/dts/results";
import { TYPES } from "../../../ioc/types";
import { UserService } from "../user.service";
import { ApiOperationGet, ApiOperationPost, ApiPath } from "swagger-express-ts";

@ApiPath({
  path: "/users",
  name: "Users",
})
@controller("/api/v1/users")
export class UsersController extends BaseHttpController {
  constructor(@inject(TYPES.UserService) private userService: UserService) {
    super();
  }

  @ApiOperationGet({
    description: "Fetch Users",
    responses: {
      200: { description: "Success" },
      500: { description: "Failed to fetch users" },
    },
  })
  @httpGet("/")
  public async fetchUsers(req: Request, res: Response, next: NextFunction): Promise<JsonResult> {
    try {
      const result = await this.userService.fetchUsers();
      return this.json(result, 200);
    } catch (err) {
      return this.json({
        statusCode: 500,
        message: `Internal Server Error: ${err.message}`,
      });
    }
  }

  @ApiOperationPost({
    description: "Register User",
    parameters: {
      body: {
        description: "New User",
        model: "User",
        required: true,
      },
    },
    responses: {
      202: { description: "User registered" },
      500: { description: "Failed to register user" },
    },
  })
  @httpPost("/")
  public async insertOne(req: Request, res: Response, next: NextFunction): Promise<JsonResult> {
    try {
      const result = await this.userService.insertOne(req.body);
      return this.json(result, 202);
    } catch (err) {
      if (err.code == "23505") {
        return this.json({
          statusCode: 409,
          message: "User invalid or user already registered",
          detail: err.detail,
        });
      }

      return this.json({
        statusCode: 500,
        message: `Internal Server Error: ${err.message}`,
      });
    }
  }
}
