declare namespace Express {
  export interface Request {
    user: any;
    authorization: any;
  }
  export interface Response {
    user: any;
  }
}
