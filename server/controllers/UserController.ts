import UserModel from "../models/UserModel";
import bcrypt from "bcrypt";
import { RequestHandler } from "express";

interface CreateUserBody {
  username?: string;
  email?: string;
  password?: string;
  events?: {};
  todos?: {};
}

export const registerUser: RequestHandler<
  unknown,
  unknown,
  CreateUserBody,
  unknown
> = async (req, res, next) => {
  try {
    const { username, email, password, events, todos } = req.body;
    const hashedPassword = await bcrypt.hash(password!, 10);
    // const newUser = await User.create({
    //   username,
    //   email,
    //   password: hashedPassword,
    //   events,
    //   todos,
    // });
    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
      events,
      todos,
    });
    await newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    next(error);
  }
};
