import { Request } from 'express';

declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    type TypedRequest<P = any, B = any, Q = any> = Request<P, any, B, Q>;
  }
}
