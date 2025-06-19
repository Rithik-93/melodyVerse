import { User } from "@prisma/client";

// extwnd the express request interface to include userId
// This allows us to access the userId in requst handlers without typeScript errors
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}
