import TagModel from "../models/TagModel";
import { RequestHandler } from "express";

interface CreateTagBody {
  name?: string;
  color?: string;
  isVisible?: boolean;
}
export const createTag: RequestHandler<
  unknown,
  unknown,
  CreateTagBody,
  unknown
> = async (req, res, next) => {
  try {
    const { name, color, isVisible } = req.body;
    const newTag = await TagModel.create({ name, color, isVisible });

    res.status(200).json(newTag);
  } catch (error) {
    next(error);
  }
};
