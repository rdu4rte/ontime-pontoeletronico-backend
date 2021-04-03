import { Container } from "inversify";
import { TYPES } from "./types";
import { Utils } from "../shared/utils/validation";
import { TypeOrmService } from "../services/typeorm.service";
import { UserRepository } from "../modules/user/user.repository";
import { UserService } from "../modules/user/user.service";
import { UserController } from "../modules/user/user.controller";
import { JwtMiddleware } from "../shared/middlewares/jwt.middleware";
import { ClockRepository } from "../modules/clock/clock.repository";
import { ClockService } from "../modules/clock/clock.service";
import { ClockController } from "../modules/clock/clock.controller";

export class ContainerConfigLoader {
  public static Load(): Container {
    const container = new Container();

    // services
    container.bind<TypeOrmService>(TYPES.TypeOrmService).to(TypeOrmService).inSingletonScope();
    container.bind<JwtMiddleware>(TYPES.JwtMiddleware).to(JwtMiddleware);
    container.bind<Utils>(TYPES.Utils).to(Utils).inSingletonScope();

    // repositories
    container.bind<UserRepository>(TYPES.UserRepository).to(UserRepository).inSingletonScope();
    container.bind<ClockRepository>(TYPES.ClockRepository).to(ClockRepository).inSingletonScope();

    // services
    container.bind<UserService>(TYPES.UserService).to(UserService).inSingletonScope();
    container.bind<ClockService>(TYPES.ClockService).to(ClockService).inSingletonScope();

    // controllers
    container.bind<UserController>(TYPES.UserController).to(UserController).inSingletonScope();
    container.bind<ClockController>(TYPES.ClockController).to(ClockController).inSingletonScope();

    return container;
  }
}
