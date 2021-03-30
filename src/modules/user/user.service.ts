import { inject, injectable } from "inversify";
import { TYPES } from "../../ioc/types";
import { UserRepository } from "./user.repository";
import { User } from "./entity/user.entity";
import { MessageDTO } from "../../shared/dto/response.dto";
import { UserDTO } from "./dto/user.dto";
import Logger from "../../config/winston.logger";
import { Utils } from "../../shared/utils/validation";
import { CredentialsDTO } from "./dto/credentials.dto";
import { IToken } from "./interface/token.interface";
import { UpdateDTO } from "./dto/update-user.dto";

@injectable()
export class UserService {
  private logger = Logger;

  constructor(
    @inject(TYPES.UserRepository) private userRepository: UserRepository,
    @inject(TYPES.Utils) private utils: Utils,
  ) {}

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
  public async insertOne(userDTO: UserDTO): Promise<MessageDTO | any> {
    const { password } = userDTO;

    if (password.p1 !== password.p2) {
      return {
        message: "Passwords dont match",
      };
    }

    const result = await this.utils.classValidation(UserDTO, userDTO).then((validatedUser: UserDTO) => {
      if (validatedUser) {
        return validatedUser;
      }
    });

    await this.userRepository.insertOne(result);
  }

  // login
  public async loginUser(credentialsDTO: CredentialsDTO): Promise<IToken | MessageDTO> {
    const result = await this.utils
      .classValidation(CredentialsDTO, credentialsDTO)
      .then((validatedUser: CredentialsDTO) => {
        if (validatedUser) {
          return validatedUser;
        }
      });

    const user = await this.userRepository.findByName(result.username);

    if (!user) {
      this.logger.error("User not found");
      return {
        message: "User Invalid",
      };
    }

    const isMatch = await this.utils.matchPasswords(user.password, credentialsDTO.password);

    if (user && isMatch) {
      return this.utils.createToken(user);
    }

    return {
      message: "Invalid Credentials",
    };
  }

  // update
  public async updateOne(id: number, updateDto: UpdateDTO): Promise<User | any> {
    const result = await this.utils.classValidation(UpdateDTO, updateDto).then((validatedUser: UpdateDTO) => {
      if (validatedUser) {
        return validatedUser;
      }
    });

    const user = await this.userRepository.getById(id);

    if (!user) {
      this.logger.error("User not found");
      return {
        message: "User Not Found",
      };
    }

    return await this.userRepository.updateOne(id, result);
  }

  // delete
}
