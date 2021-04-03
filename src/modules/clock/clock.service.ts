import { inject, injectable } from "inversify";
import Logger from "../../config/winston.logger";
import { MessageDTO } from "../../shared/dto/response.dto";
import { TYPES } from "../../ioc/types";
import { Utils } from "../../shared/utils/validation";
import { ClockRepository } from "./clock.repository";
import { ClockDTO } from "./dto/clock.dto";
import { UserRepository } from "../user/user.repository";
import { User } from "../user/entity/user.entity";
import moment from "moment";

@injectable()
export class ClockService {
  private logger = Logger;

  constructor(
    @inject(TYPES.ClockRepository) private clockRepository: ClockRepository,
    @inject(TYPES.UserRepository) private userRepository: UserRepository,
    @inject(TYPES.Utils) private utils: Utils,
  ) {}

  public async insertEntry(user: User): Promise<MessageDTO | any> {
    moment.locale("pt-br");
    const date = moment().format();

    const newEntry: ClockDTO = {
      userId: user.id,
      entry: moment(date).format("HH:mm:ss"),
      day: +moment(date).format("DD"),
      month: +moment(date).format("MM"),
      year: +moment(date).year(),
    };

    const result = await this.utils.classValidation(ClockDTO, newEntry).then((validatedEntry: ClockDTO) => {
      if (validatedEntry) {
        return validatedEntry;
      }
    });

    const userEntity = await this.userRepository.getById(newEntry.userId);

    if (!userEntity || !result) {
      return {
        message: `Invalid entry or user not found by Id ${newEntry.userId}`,
      };
    }

    const hitsOnDay = await this.clockRepository.checkHits(newEntry.userId, newEntry.day, newEntry.month);

    await this.clockRepository.insertEntry(result);
    return {
      message: `New entry for user "${userEntity.username}", ${newEntry.entry} - ${newEntry.day}/${newEntry.month}/${newEntry.year}`,
    };
  }
}
