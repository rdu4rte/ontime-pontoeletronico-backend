import { inject, injectable } from "inversify";
import { TYPES } from "../../ioc/types";
import Logger from "../../services/winston.logger";
import { UserRepository } from "./user.repository";
import { User } from "./entity/user.entity";

@injectable()
export class UserService {
  private logger = Logger;

  constructor(@inject(TYPES.UserRepository) private userRepository: UserRepository) {}

  // fetch
  public async fetchUsers(): Promise<User[]> {
    return this.userRepository.fetchUsers();
  }

  // get by id

  // insert

  // update

  // delete
}
