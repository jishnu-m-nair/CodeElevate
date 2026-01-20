import 'express-session';
import { OtpData } from '../interfaces/commonInterfaces';

declare module 'express-session' {
  interface SessionData {
    user?: OtpData;
  }
}
import 'express-session';
