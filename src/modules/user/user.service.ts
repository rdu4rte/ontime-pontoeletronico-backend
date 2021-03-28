import { inject, injectable } from "inversify";
import { TYPES } from "../../ioc/types";
import { UserRepository } from "./user.repository";
import { User } from "./entity/user.entity";
import { MessageDTO } from "../../shared/dto/response.dto";
import { UserDTO } from "./dto/user.dto";
import Logger from "../../config/winston.logger";
import { validate } from "class-validator";

@injectable()
export class UserService {
  private logger = Logger;

  constructor(@inject(TYPES.UserRepository) private userRepository: UserRepository) {}

  // fetch
  public async fetchUsers(): Promise<User[] | MessageDTO> {
    const users = await this.userRepository.fetchUsers();

    if (!users.length) {
      return {
        message: "No registered users",
      };
    }

    return users;
  }

  // get by id
  public async getById(id: number): Promise<User | MessageDTO> {
    const user = await this.userRepository.getById(id);

    if (!user) {
      return {
        message: "User not found",
      };
    }

    return user;
  }

  // insert
  public async insertOne(userDTO: UserDTO): Promise<MessageDTO> {
    const { password } = userDTO;

    validate(userDTO).then((err) => {
      if (err.length > 0) {
        this.logger.error(err);
        return {
          message: "Invalid user. Please, try again",
        };
      }
    });

    if (password.p1 !== password.p2) {
      return {
        message: "Passwords dont match",
      };
    }

    await this.userRepository.insertOne(userDTO);
    return {
      message: `User "${userDTO.username}" registered`,
    };
  }

  // update

  // delete
}
