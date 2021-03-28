import { injectable, decorate } from "inversify";
import { Repository, createQueryBuilder, InsertResult } from "typeorm";
import { User } from "./entity/user.entity";
import { UserDTO } from "./dto/user.dto";

decorate(injectable(), Repository);
export class UserRepository extends Repository<User> {
  // fetch
  public async fetchUsers(): Promise<User[]> {
    return await createQueryBuilder().select("user").from(User, "user").getMany();
  }

  // get by id
  public async getById(id: number): Promise<User> {
    return await createQueryBuilder(User).where({ id: id }).getOne();
  }

  // insert
  public async insertOne(userDTO: UserDTO): Promise<InsertResult> {
    const { username, email, firstName, lastName, password } = userDTO;

    return await createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          username: username,
          email: email,
          firstName: firstName,
          lastName: lastName,
          password: password.p1,
        },
      ])
      .execute()
      .then((value: InsertResult) => {
        console.log(value);
        return value;
      });
  }

  // update

  // delete
}
