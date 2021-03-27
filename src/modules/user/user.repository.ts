import { decorate, injectable } from "inversify";
import { Repository } from "typeorm";
import Logger from "../../services/winston.logger";
import { User } from "./entity/user.entity";

decorate(injectable(), Repository);
export class UserRepository extends Repository<User> {
  private logger = Logger;

  // fetch
  public async fetchUsers(): Promise<User[]> {
    return this.createQueryBuilder().select("user").from(User, "user").getMany();
  }

  // get by id

  // insert

  // update

  // delete
}
