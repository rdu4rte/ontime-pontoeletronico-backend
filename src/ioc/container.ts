import { Container } from "inversify";
import { TYPES } from "./types";
import { UserRepository } from "../modules/user/user.repository";
import { UserService } from "../modules/user/user.service";
import { UserController } from "../modules/user/user.controller";
import { TypeOrmService } from "../services/typeorm.service";

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
    container.bind<UserController>(TYPES.UserController).to(UserController).inSingletonScope();

    return container;
  }
}
