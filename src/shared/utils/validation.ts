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
import { Clock } from "../../modules/clock/entity/clock.entity";
import moment from "moment";

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

  // calculate hours
  public async calculateHours(times: Clock[]): Promise<any> {
    const timesArray: any = [];
    times.map((time) => {
      timesArray.push(moment(time.entry, "HH:mm:ss"));
    });

    const dt1 = timesArray[0];
    const dt2 = timesArray[1];
    const dt3 = timesArray[2];
    const dt4 = timesArray[3];

    const ts1 = dt2 - dt1;
    const ts2 = dt4 - dt3;

    const duration = moment.utc(ts1 + ts2);
    const time = duration.format("HH:mm:ss");

    return { time: time, hits: timesArray };
  }
}
