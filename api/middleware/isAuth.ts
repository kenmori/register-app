import { MiddlewareFn } from "type-graphql";
import { MyContext } from "../types/MyContext";
import jwt from "jsonwebtoken";

const APP_SECRET = process.env.SESSION_SECRET || "fafafafa";

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  const authorization = context.req.headers["authorization"];
  try {
    const token = authorization?.replace('Beare ', '');
    const user = jwt.verify(token, APP_SECRET) as any;
    context.res.locals.userId = user.id
    return next()
  } catch (err) {
    throw new Error(err.message);
  }
}
