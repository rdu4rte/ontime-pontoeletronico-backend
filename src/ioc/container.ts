import { Container } from "inversify";

export class ContainerConfigLoader {
  public static Load(): Container {
    const container = new Container();

    // db

    // server services

    // repositories

    // services

    // controllers

    return container;
  }
}
