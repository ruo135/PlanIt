import UserModel from "../models/UserModel";
import bcrypt from "bcrypt";
import { RequestHandler } from "express";
import createHttpError from "http-errors";
import ThemeModel from "../models/ThemeModel";

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.session.userId)
      .select("+email")
      .exec();
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

interface CreateUserBody {
  username?: string;
  email?: string;
  password?: string;
}

//prettier-ignore
export const registerUser: RequestHandler<unknown,unknown,CreateUserBody,unknown> = async (req, res, next) => {

  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      throw(createHttpError(400, "Parameters missing."))
    }
    const existingUsername = await UserModel.findOne({username: username}).exec();
    if (existingUsername) { throw(createHttpError(409, "Username already taken."))}
  
    const existingEmail = await UserModel.findOne({email: email}).exec();
    if (existingEmail) {
      throw createHttpError(409, "A user with this email already exists. Please log in instead.");
    }
    
    const hashedPassword = await bcrypt.hash(password!, 10);
    const newUser = await UserModel.create({
      username,
      email,
      password: hashedPassword
    });

    req.session.userId = newUser._id;

    //set theme to default
    await ThemeModel.create({userId: req.session.userId, theme: "light"})
    
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

interface LoginBody {
  email?: string;
  password?: string;
}
//prettier-ignore
export const login: RequestHandler<unknown, unknown, LoginBody, unknown> = async (req, res, next) => {
  const { email, password } = req.body
  try{
    if (!email || !password){ 
      throw createHttpError(400,"Parameters missing")
    }

    const user = await UserModel.findOne({ email: email }).select("+password +email").exec()
    if (!user) {
      throw createHttpError(401, "Invalid credentials");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw createHttpError(401, "Invalid credentials");
    }

    req.session!.userId = user._id
    res.status(201).json(user)

  } catch(error) {
    next(error);
  }
}

export const logout: RequestHandler = (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {
      next(error);
    } else {
      res.sendStatus(200);
    }
  });
};
