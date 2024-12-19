// Ruo Yang Jiang 261055118

import UserModel from '../models/UserModel'
import bcrypt from 'bcrypt'
import { RequestHandler } from 'express'
import createHttpError from 'http-errors'
import ThemeModel from '../models/ThemeModel'
import { assertIsDefined } from '../util/assertIsDefined'
import EventModel from '../models/EventModel'
import TagModel from '../models/TagModel'
import TodoModel from '../models/TodoModel'

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.session.userId)
      .select('+email')
      .exec()
    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}

interface CreateUserBody {
  username?: string
  email?: string
  password?: string
}

//prettier-ignore
export const registerUser: RequestHandler<unknown,unknown,CreateUserBody,unknown> = async (req, res, next) => {

  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw(createHttpError(400, "Parameters missing."))
    }
  
    const existingEmail = await UserModel.findOne({email: email}).exec();
    if (existingEmail) {
      throw createHttpError(409, "A user with this email already exists. Please log in instead.");
    }
    
    const hashedPassword = await bcrypt.hash(password!, 10);
    const newUser = await UserModel.create({
      email,
      password: hashedPassword
    });

    req.session.userId = newUser._id;

    //set theme to default
    await ThemeModel.create({userId: req.session.userId, theme: "light"})

    req.session.destroy((error) => {
      if (error) {
        next(error)
      }
    })
    
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

interface LoginBody {
  email?: string
  password?: string
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
      next(error)
    } else {
      res.sendStatus(200)
    }
  })
}

interface UpdatePasswordBody {
  email?: string
  password?: string
  newPassword?: string
}
//prettier-ignore
export const updatePassword: RequestHandler<unknown, unknown, UpdatePasswordBody, unknown> = async (req, res, next) => {
  const { email, password, newPassword } = req.body
  const authenticatedUserId = req.session.userId
  
  try {
    assertIsDefined(authenticatedUserId)

    if (!email || !password || !newPassword) {
      throw(createHttpError(400, "Parameters missing."))
    }
  
    const user = await UserModel.findOne({ email: email }).select("+password +email").exec()
    if (!user) {
      throw createHttpError(401, "No User Found");
    }
    if (authenticatedUserId !== req.session!.userId) {
      throw createHttpError(
        400,
        'Email does not match current logged-in session'
      )
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw createHttpError(401, "Invalid Previous Password");
    }
    
    const hashedPassword = await bcrypt.hash(newPassword!, 10);
    const updateUser = await UserModel.findByIdAndUpdate(user._id, { password: hashedPassword }, {new: true});
    
    res.status(200).json(updateUser);
  } catch (error) {
    next(error);
  }
}

export const deleteUser: RequestHandler = async (req, res, next) => {
  const authenticatedUserId = req.session.userId

  try {
    assertIsDefined(authenticatedUserId)

    // Delete Events
    await EventModel.deleteMany({ userId: authenticatedUserId })

    // Delete Tags
    await TagModel.deleteMany({ userId: authenticatedUserId })

    // Delete Todo
    await TodoModel.deleteMany({ userId: authenticatedUserId })

    // Delete Theme
    await ThemeModel.deleteMany({ userId: authenticatedUserId })

    await UserModel.findByIdAndDelete(authenticatedUserId)

    req.session.destroy((error) => {
      if (error) {
        next(error)
      }
    })
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
}
