import { injectable, decorate } from "inversify";
import { Repository, createQueryBuilder } from "typeorm";
import { User } from "./entity/user.entity";

decorate(injectable(), Repository);
export class UserRepository extends Repository<User> {
  // fetch
  async fetchUsers(): Promise<User[]> {
    return await createQueryBuilder().select("user").from(User, "user").getMany();
  }

  // get by id

  // insert

  // update

  // delete
}
