import { jwtSecret } from "./../../config/env.config";
import { IToken } from "./../../modules/user/interface/token.interface";
import { User } from "./../../modules/user/entity/user.entity";
import { sanitize } from "class-sanitizer";
import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { injectable } from "inversify";
import Logger from "../../config/winston.logger";
import argon2 from "argon2";
import * as jwt from "jsonwebtoken";
import { jwtExpires } from "../../config/env.config";

@injectable()
export class Utils {
  private logger = Logger;

  // validate classes
  public async classValidation(type: any, dtoFromBody: any): Promise<any> {
    const dtoObj = plainToClass(type, dtoFromBody);

    const results = await validate(dtoObj, { skipMissingProperties: false }).then((err: ValidationError[]) => {
      if (err.length > 0) {
        const dtoErrors = err.map((err: ValidationError) => (Object as any).values(err.constraints)).join(", ");
        this.logger.error(dtoErrors);
        return false;
      } else {
        sanitize(dtoObj);
        dtoFromBody = dtoObj;
        return dtoFromBody;
      }
    });

    return results;
  }

  // match passwords
  public async matchPasswords(p1: string, p2: string): Promise<boolean> {
    return await argon2.verify(p1, p2);
  }

  // create tokens
  public async createToken(user: User): Promise<IToken> {
    const payload = { id: user.id };

    const token = jwt.sign(payload, jwtSecret, {
      expiresIn: jwtExpires,
    });

    return { token };
  }
}
