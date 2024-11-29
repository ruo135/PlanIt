import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

// Create express app
const app = express();

// <Middleware
app.use(bodyParser.json());
app.use(cors());

// Print the request payload to console
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(req.path, req.method);
  next();
});

// Import routes from routes folder
import TagRoute from "./routes/TagRoute";
import UserRoute from "./routes/UserRoute";

// Make app use routes
app.use("/api/tag", TagRoute);
app.use("/api/user", UserRoute);

// Handles error: used in catch block of every fct that interacts with the db
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  let errorMessage = "An unknown error occured.";
  if (error instanceof Error) errorMessage = error.message;
  res.status(500).json({ error: errorMessage });
});

// Handles wrong endpoint
app.use((req, res, next) => {
  next(Error("Endpoint not found :("));
});

// </Middleware

// Connect to mongoose
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    // Listen for requests
    app.listen(process.env.PORT, () => {
      console.log(
        `Connected to MongoDB and listening on port ` + process.env.PORT
      );
    });
  })
  .catch((error) => {
    //throws error if the MONGO_URI string has the wrong user or pw
    console.log(error);
  });
