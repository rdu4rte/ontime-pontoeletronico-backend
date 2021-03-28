import * as express from "express";
import "reflect-metadata";
import { port, nodeEnv } from "./config/env.config";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import compression from "compression";
import { InversifyExpressServer } from "inversify-express-utils";
import { ContainerConfigLoader } from "./ioc/container";
import Logger from "./config/winston.logger";
import * as swagger from "swagger-express-ts";
import { TypeOrmService } from "./services/typeorm.service";
import { TYPES } from "./ioc/types";

const serverStart = async () => {
  const logger = Logger;

  try {
    const container = ContainerConfigLoader.Load();
    const server = new InversifyExpressServer(container);

    const typeorm = container.get<TypeOrmService>(TYPES.TypeOrmService);
    await typeorm.connection();

    server.setConfig((app) => {
      app.use(cors());

      app.use(express.json());
      app.use(express.urlencoded({ extended: true }));

      app.use(
        helmet({
          contentSecurityPolicy: false,
        }),
      );
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
        app.use("/api-docs/swagger", express.static("swagger"));
        app.use("/api-docs/swagger/assets", express.static("node_modules/swagger-ui-dist"));
        app.use(
          swagger.express({
            definition: {
              info: {
                title: "OnTime - Ponto Eletrônico",
                version: "1.0",
              },
              basePath: "/api/v1",
            },
          }),
        );

        logger.info(`[Swagger] Docs running on: http://127.0.0.1:${port}/api-docs/swagger`);
      }
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
