import { Container } from "inversify";
import { TYPES } from "./types";
import { TypeOrmService } from "../services/typeorm.service";
import { UserRepository } from "../modules/user/user.repository";
import { UserService } from "../modules/user/user.service";
import { UsersController } from "../modules/user/controllers/users.controller";
import { UserController } from "../modules/user/controllers/user.controller";

export class ContainerConfigLoader {
  public static Load(): Container {
    const container = new Container();

    // services
    container.bind<TypeOrmService>(TYPES.TypeOrmService).to(TypeOrmService).inSingletonScope();

    // repositories
    container.bind<UserRepository>(TYPES.UserRepository).to(UserRepository).inSingletonScope();

    // services
    container.bind<UserService>(TYPES.UserService).to(UserService).inSingletonScope();

    // controllers
    container.bind<UsersController>(TYPES.UsersController).to(UsersController).inSingletonScope();
    container.bind<UserController>(TYPES.UserController).to(UserController).inSingletonScope();

    return container;
  }
}
