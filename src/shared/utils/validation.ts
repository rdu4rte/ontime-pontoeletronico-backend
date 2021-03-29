import { sanitize } from "class-sanitizer";
import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { injectable } from "inversify";
import Logger from "../../config/winston.logger";

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
}
