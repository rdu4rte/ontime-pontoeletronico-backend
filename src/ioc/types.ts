export const TYPES = {
  // services
  TypeOrmService: Symbol("TypeOrmService"),
  JwtMiddleware: Symbol("JwtMiddleware"),
  Utils: Symbol("Utils"),

  // repositories
  UserRepository: Symbol("UserRepository"),
  ClockRepository: Symbol("ClockRepository"),

  // services
  UserService: Symbol("UserService"),
  ClockService: Symbol("ClockService"),

  // controllers
  UserController: Symbol("UserController"),
  ClockController: Symbol("ClockController"),
};
