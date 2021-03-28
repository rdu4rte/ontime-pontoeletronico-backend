import { injectable } from "inversify";
import Logger from "./winston.logger";
import { ConnectionOptions, createConnection, DatabaseType } from "typeorm";
import { tpHost, tpUser, tpPass, tpDb, tpType, nodeEnv } from "../config/env.config";

@injectable()
export class TypeOrmService {
  private logger = Logger;

  public async connection(): Promise<any> {
    const options: any = config;

    try {
      await createConnection(options);
      this.logger.info("[TypeORM] Database Connected");
    } catch (err) {
      this.logger.error(`[TypeORM] Failed to connect: ${err}`);
      process.exit(1);
    }

    return options;
  }
}

export const config: ConnectionOptions = <ConnectionOptions>{
  type: <DatabaseType>tpType,
  host: tpHost,
  username: tpUser,
  password: tpPass,
  database: tpDb,
  synchronize: false,
  migrationsRun: false,
  entities: [nodeEnv === "production" ? "dist/src/modules/**/entity/*.entity.js" : "src/modules/**/entity/*.entity.ts"],
  migrations: ["dist/src/migration/*.js"],
  cli: {
    migrationsDir: "src/migration",
  },
};
