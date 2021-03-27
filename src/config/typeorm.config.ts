import { ConnectionOptions, DatabaseType } from "typeorm";
import { tpHost, tpUser, tpPass, tpDb, tpType } from "./env.config";

export const config: ConnectionOptions = <ConnectionOptions>{
  type: <DatabaseType>tpType,
  host: tpHost,
  username: tpUser,
  password: tpPass,
  database: tpDb,
  synchronize: false,
  migrationsRun: false,
  entities: ["{src, dist}/modules/**/entity/*.entity.{ts, js}"],
  migrations: ["{src, dist}/migration/*.{ts, js}"],
  cli: {
    migrationsDir: "src/migration",
  },
};
