import * as express from "express";
import "reflect-metadata";
import { port, nodeEnv } from "./config/env.config";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import compression from "compression";
import { InversifyExpressServer } from "inversify-express-utils";
import { ContainerConfigLoader } from "./ioc/container";
import Logger from "./services/winston.logger";
import { createConnection } from "typeorm";
import { config } from "./config/typeorm.config";

const serverStart = async () => {
  const logger = Logger;

  try {
    const container = ContainerConfigLoader.Load();
    const server = new InversifyExpressServer(container);

    server.setConfig((app) => {
      app.use(express.static("public"));

      app.use(cors());

      app.use(express.json());
      app.use(express.urlencoded({ extended: true }));

      app.use(helmet());
      app.use(compression());

      app.use(
        rateLimit({
          windowMs: 5 * 60 * 1000, // 5min
          max: 100,
          message: "Too many requests, try again later.",
        }),
      );

      if (nodeEnv === "development") {
        // swagger
      }

      createConnection(config)
        .then(() => {
          logger.info("[TypeORM] Database connected");
        })
        .catch((err) => {
          logger.error(`Failed to connect database, ${err}`);
        });
    });

    const serverInstance = server.build();
    serverInstance.listen(port, () => {
      logger.info(`[Bootstrap] Server running on: http://127.0.0.1:${port}/api/v1/`);
    });
  } catch (err) {
    logger.error(`Error starting server: ${err.message}`);
    process.exit(1);
  }
};

serverStart();
