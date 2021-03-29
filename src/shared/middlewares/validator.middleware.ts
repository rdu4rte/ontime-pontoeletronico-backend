import { Request, Response, NextFunction, RequestHandler } from "express";
import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { JsonResult } from "inversify-express-utils/dts/results";
import { sanitize } from "class-sanitizer";

export function Validate(type: any, skipMissingProperties = false): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    const dtoObj = plainToClass(type, req.body);

    console.log(req.body, dtoObj); // test

    validate(dtoObj, { skipMissingProperties }).then((err: ValidationError[]) => {
      if (err.length > 0) {
        const dtoErrors = err.map((err: ValidationError) => (Object as any).values(err.constraints)).join(", ");
        console.log(dtoErrors);
        next({
          dtoErrors,
          statusCode: 400,
        });
      } else {
        sanitize(dtoObj);
        req.body = dtoObj;
        next();
      }
    });
  };
}
