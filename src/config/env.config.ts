import * as dotenv from "dotenv";

export const nodeEnv: string = process.env.NODE_ENV;
export const port: number = +process.env.PORT || +process.env.CUSTOM_PORT;

if (nodeEnv === "develop") {
  dotenv.config({ path: ".env-develop" });
} else if (nodeEnv === "prod") {
  dotenv.config({ path: ".env" });
}

// db
export const tpHost: string = process.env.DB_HOST;
export const tpPort: number = +process.env.DB_PORT;
export const tpUser: string = process.env.DB_USERNAME;
export const tpPass: string = process.env.DB_PASSWORD;
export const tpDb: string = process.env.DB_DATABASE;

// jwt
export const jwtSecret: string = process.env.JWT_SECRET;
export const jwtRefresh: string = process.env.JWT_REFRESH;
export const jwtExpires: number = +process.env.JWT_EXPIRESIN;
export const jwtExpiresRef: number = +process.env.JWT_REFRESH_EXPIRESIN;

// argon2
export const argonSalt: number = +process.env.SALT;
