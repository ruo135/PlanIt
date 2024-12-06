import { RequestHandler } from "express";
import createHttpError from "http-errors";

/**
 * This function is a middleware called by a route. It is executed
 * before the logic in the routes that call it and is used to ensure
 * the user is connected before they can access private data.
 */
export const requireAuth: RequestHandler = (req, res, next) => {
  if (req.session.userId) {
    next(); // if authenticated, forward to the api call function
  } else {
    next(createHttpError(401, "User not authenticated")); //otherwise forward to error handling middleware
  }
};
