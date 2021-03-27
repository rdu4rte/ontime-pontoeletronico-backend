import { Request, Response, NextFunction } from "express";
import { inject } from "inversify";
import { BaseHttpController, controller, httpGet } from "inversify-express-utils";
import { JsonResult } from "inversify-express-utils/dts/results";
import Logger from "../../services/winston.logger";
import { TYPES } from "../../ioc/types";
import { UserService } from "./user.service";

@controller("/api/v1/user")
export class UserController extends BaseHttpController {
  private logger = Logger;

  constructor(@inject(TYPES.UserService) private userService: UserService) {
    super();
  }

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
}