// Ruo Yang Jiang 261055118

import createHttpError from 'http-errors'
import { RequestHandler } from 'express'
import { assertIsDefined } from '../util/assertIsDefined'
import ThemeModel from '../models/ThemeModel'

export const getTheme: RequestHandler = async (req, res, next) => {
  const authenticatedUserId = req.session.userId

  try {
    assertIsDefined(authenticatedUserId)

    const theme = await ThemeModel.findOne({ userId: authenticatedUserId })
    res.status(200).json(theme)
  } catch (error) {
    next(error)
  }
}

interface updateThemeBody {
  theme?: 'light' | 'dark' | undefined
}
//prettier-ignore
export const updateTheme: RequestHandler<unknown, unknown, updateThemeBody, unknown> = async (req, res, next) => {
  const { theme } = req.body
  const authenticatedUserId = req.session.userId;

  try {
    assertIsDefined(authenticatedUserId);

    if (!theme) {
      throw createHttpError(400, "Theme is required");
    }

    const newTheme = await ThemeModel.findOneAndUpdate({userId: authenticatedUserId}, {theme: theme}, {new: true})
    res.status(200).json(newTheme);
  } catch(error) {
    next(error);
  }

};
