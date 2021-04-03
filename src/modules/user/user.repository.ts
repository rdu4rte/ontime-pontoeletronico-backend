import { injectable, decorate } from "inversify";
import { Repository, createQueryBuilder, InsertResult, UpdateResult, DeleteResult } from "typeorm";
import { User } from "./entity/user.entity";
import { UserDTO } from "./dto/user.dto";
import { UpdateDTO } from "./dto/update-user.dto";

decorate(injectable(), Repository);
export class UserRepository extends Repository<User> {
  // fetch
  public async fetchUsers(): Promise<User[]> {
    return await createQueryBuilder().from(User, "user").getMany();
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
    return await createQueryBuilder()
      .update(User)
      .set(updateDto)
      .where({ id: id })
      .execute()
      .then((value: UpdateResult) => {
        return value;
      });
  }

  // delete
  public async deleteOne(id: number): Promise<any> {
    return await createQueryBuilder()
      .delete()
      .from(User)
      .where({ id: id })
      .execute()
      .then((res: DeleteResult) => {
        if (res.affected === 0) {
          return {
            message: `Nothing here to delete, user not found by Id ${id}`,
            rowsAffected: res.affected,
          };
        }

        return {
          message: `User deleted by Id ${id}`,
          rowsAffected: res.affected,
        };
      })
      .catch((reason: any) => {
        return {
          message: `Failed to delete by Id ${id}`,
          detail: reason,
        };
      });
  }
}
