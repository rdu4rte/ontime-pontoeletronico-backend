import { injectable, decorate } from "inversify";
import { Repository, createQueryBuilder, InsertResult, UpdateResult } from "typeorm";
import { User } from "./entity/user.entity";
import { UserDTO } from "./dto/user.dto";
import { UpdateDTO } from "./dto/update-user.dto";

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
    const entity = Object.assign(new User(), {
      username: userDTO.username,
      email: userDTO.email,
      firstName: userDTO.firstName,
      lastName: userDTO.lastName,
      password: userDTO.password.p1,
    });

    return await createQueryBuilder()
      .insert()
      .into(User)
      .values(entity)
      .execute()
      .then((value: InsertResult) => {
        return value;
      });
  }

  // find by name
  public async findByName(name: string): Promise<User> {
    return await createQueryBuilder(User, "user").addSelect("user.password").where({ username: name }).getOne();
  }

  // update
  public async updateOne(id: number, updateDto: UpdateDTO): Promise<UpdateResult> {
    // const entity = Object.assign(new User(), {
    //   username: updateDto.username ? updateDto.username : null,
    //   email: updateDto.email ? updateDto.email : null,
    //   firstName: updateDto.firstName ? updateDto.firstName : null,
    //   lastName: updateDto.lastName ? updateDto.lastName : null,
    // });

    return await createQueryBuilder()
      .update(User)
      .set({
        username: updateDto.username,
        email: updateDto.email,
        firstName: updateDto.firstName,
        lastName: updateDto.lastName,
      })
      .where({ id: id })
      .execute()
      .then((value: UpdateResult) => {
        return value;
      });
  }

  // delete
}
