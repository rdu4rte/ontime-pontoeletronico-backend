import { inject } from "inversify";
import { BaseHttpController, controller, httpGet, httpPost } from "inversify-express-utils";
import { TYPES } from "../../ioc/types";
import { ClockService } from "./clock.service";
import { Request, Response, NextFunction } from "express";
import { JsonResult } from "inversify-express-utils/dts/results";
import { ApiOperationGet, ApiOperationPost, ApiPath } from "swagger-express-ts";

@ApiPath({
  path: "/clock",
  name: "Clock",
})
@controller("/api/v1/clock")
export class ClockController extends BaseHttpController {
  constructor(@inject(TYPES.ClockService) private clockService: ClockService) {
    super();
  }

  @ApiOperationPost({
    description: "New Entry",
    path: "",
    parameters: {},
    security: {
      apiKeyHeader: [],
    },
    responses: {
      202: { description: "Success" },
      500: { description: "Failed To Insert New Entry" },
    },
  })
  @httpPost("/", TYPES.JwtMiddleware)
  public async insertEntry(req: Request, res: Response, next: NextFunction): Promise<JsonResult> {
    try {
      const result = await this.clockService.insertEntry(req.user);
      return this.json(result, 202);
    } catch (err) {
      return this.json({
        statusCode: 500,
        message: `Internal Server Error: ${err.message}`,
      });
    }
  }

  @ApiOperationGet({
    description: "Check My Hits",
    path: "/checkhits",
    parameters: {},
    security: {
      apiKeyHeader: [],
    },
    responses: {
      200: { description: "Success" },
      500: { description: "Failed To Check Hits" },
    },
  })
  @httpGet("/checkhits", TYPES.JwtMiddleware)
  public async checkHits(req: Request, res: Response, next: NextFunction): Promise<JsonResult> {
    try {
      const result = await this.clockService.checkMyHits(req.user);
      return this.json(result, 200);
    } catch (err) {
      return this.json({
        statusCode: 500,
        message: `Internal Server Error: ${err.message}`,
      });
    }
  }
}
