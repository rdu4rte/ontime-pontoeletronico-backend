import { Role } from "./../../modules/user/dto/user.dto";
import { Request, Response, NextFunction } from "express";

export function AuthRole(...roles: Role[]) {
  return async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const user = req.user;

    if (!roles.includes(user.role)) {
      res.json({
        message: "User role not authorized",
        statusCode: 403,
      });
      return;
    }
    next();
  };
}
