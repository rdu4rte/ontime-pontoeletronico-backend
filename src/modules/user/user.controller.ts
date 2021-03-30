import { inject } from "inversify";
import { BaseHttpController, controller, httpGet, httpPost, httpPut } from "inversify-express-utils";
import { TYPES } from "../../ioc/types";
import {
  ApiOperationGet,
  ApiOperationPost,
  ApiOperationPut,
  ApiPath,
  SwaggerDefinitionConstant,
} from "swagger-express-ts";
import { UserService } from "./user.service";
import { Request, Response, NextFunction } from "express";
import { JsonResult } from "inversify-express-utils/dts/results";

@ApiPath({
  path: "/users",
  name: "Users",
})
@controller("/api/v1/users")
export class UserController extends BaseHttpController {
  constructor(@inject(TYPES.UserService) private userService: UserService) {
    super();
  }

  @ApiOperationGet({
    description: "Fetch Users",
    path: "",
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

  @ApiOperationGet({
    description: "Get User By Id",
    path: "/{id}",
    parameters: {
      path: {
        id: {
          required: true,
          type: SwaggerDefinitionConstant.Parameter.Type.STRING,
        },
      },
    },
    responses: {
      200: { description: "Success" },
      500: { description: "Failed to get user or user is not registered" },
    },
  })
  @httpGet("/:id")
  public async getById(req: Request, res: Response, next: NextFunction): Promise<JsonResult> {
    try {
      const result = await this.userService.getById(+req.params.id);
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
    path: "/signup",
    parameters: {
      body: {
        description: "New User",
        model: "User",
        required: true,
      },
    },
    responses: {
      201: { description: "User Registered" },
      409: { description: "User already registered" },
      500: { description: "Failed to register user" },
    },
  })
  @httpPost("/signup")
  public async insertOne(req: Request, res: Response, next: NextFunction): Promise<JsonResult> {
    try {
      const result = await this.userService.insertOne(req.body);
      return this.json(result, 201);
    } catch (err) {
      if (err.code == "23505") {
        return this.json({
          statusCode: 409,
          message: "User already registered",
          detail: err.detail,
        });
      }

      return this.json({
        statusCode: 500,
        message: `Internal Server Error: ${err.message}`,
      });
    }
  }

  @ApiOperationPost({
    description: "Login User",
    path: "/signin",
    parameters: {
      body: {
        description: "Login Credentials",
        model: "Credentials",
        required: true,
      },
    },
    responses: {
      202: { description: "User Logged In" },
      500: { description: "Internal Server Error" },
    },
  })
  @httpPost("/signin")
  public async loginUser(req: Request, res: Response, next: NextFunction): Promise<JsonResult> {
    try {
      const result = await this.userService.loginUser(req.body);
      return this.json(result, 202);
    } catch (err) {
      return this.json({
        statusCode: 500,
        message: `Internal Server Error: ${err.message}`,
      });
    }
  }

  @ApiOperationPut({
    description: "Update User",
    path: "/{id}",
    parameters: {
      path: {
        id: {
          required: true,
          type: SwaggerDefinitionConstant.Parameter.Type.STRING,
        },
      },
      body: {
        description: "Update User",
        model: "UpdateUser",
        required: false,
      },
    },
    responses: {
      204: { description: "User Updated" },
      500: { description: "Internal Server Error" },
    },
  })
  @httpPut("/:id")
  public async updateUser(req: Request, res: Response, next: NextFunction): Promise<JsonResult> {
    try {
      const result = await this.userService.updateOne(+req.params.id, req.body);
      return this.json(result, 204);
    } catch (err) {
      return this.json({
        statusCode: 500,
        message: `Internal Server Error: ${err.message}`,
      });
    }
  }
}
