import { decorate, injectable } from "inversify";
import { Connection, getConnection, Repository } from "typeorm";
import { User } from "./entity/user.entity";

decorate(injectable(), Repository);
export class UserRepository extends Repository<User> {
  private connection: Connection;

  constructor() {
    super();
    this.connection = getConnection();
  }

  // fetch
  public async fetchUsers(): Promise<User[]> {
    return this.connection.createQueryBuilder().select("user").from(User, "user").getMany();
  }

  // get by id

  // insert

  // update

  // delete
}
