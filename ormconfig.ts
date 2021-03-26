import { tpHost, tpUser, tpPass, tpDb } from "./src/config/env.config";

module.exports = {
  type: "postgres",
  host: tpHost,
  username: tpUser,
  password: tpPass,
  database: tpDb,
  synchronize: false,
  migrationsRun: false,
  entities: ["dist/src/modules/**/entity/*.entity.js"],
  migrations: ["dist/src/migration/*.js"],
  cli: {
    migrationsDir: "src/migration",
  },
};
