import { Role } from "./../../modules/user/dto/user.dto";
import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { jwtSecret } from "../../config/env.config";
import Logger from "../../config/winston.logger";

export function AuthRole(...roles: Role[]) {
  return async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const user = req.user;

    if (!roles.includes(user.role)) {
      Logger.error(`User role not authorized, role: ${user.role}, id: ${user.id}`);
      res.json({
        message: "User role not authorized",
        statusCode: 403,
      });
      return;
    }
    next();
  };
}
