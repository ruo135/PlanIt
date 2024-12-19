// Ruo Yang Jiang 261055118

import createHttpError from 'http-errors'
import { RequestHandler } from 'express'
import TagModel from '../models/TagModel'
import { assertIsDefined } from '../util/assertIsDefined'
import mongoose from 'mongoose'
import EventModel from '../models/EventModel'

interface CreateTagBody {
  name?: string
  color?: string
  isVisible?: boolean
}
// prettier-ignore
export const createTag: RequestHandler<unknown,unknown,CreateTagBody,unknown> = async (req, res, next) => {
  const { name, color, isVisible } = req.body;
  const authenticatedUserId = req.session.userId;

  try {
    assertIsDefined(authenticatedUserId);

    if (!name || !color || !isVisible) {
      throw createHttpError(400, "Tags must have a name, color and isVisible tag.");
    }
    
    const tag = await TagModel.findOne({name: name, userId: authenticatedUserId})
    if (tag) {
      throw createHttpError(400, "Tags cannot have duplicate names")
    }

    const newTag = await TagModel.create({
      userId: authenticatedUserId,
      name,
      color,
      isVisible,
    });

    res.status(200).json(newTag);
  } catch (error) {
    next(error);
  }
};

export const getAllTags: RequestHandler = async (req, res, next) => {
  const authenticatedUserId = req.session.userId

  try {
    assertIsDefined(authenticatedUserId)

    const tags = await TagModel.find({ userId: authenticatedUserId })
    res.status(200).json(tags)
  } catch (error) {
    next(error)
  }
}

interface UpdateTagParams {
  tagId: string
}

interface UpdateTagBody {
  name?: string
  color?: string
}

// prettier-ignore
export const updateTag: RequestHandler<UpdateTagParams, unknown, UpdateTagBody, unknown> = async (req, res, next) => {
  const { tagId } = req.params;
  let { name, color } = req.body
  const authenticatedUserId = req.session.userId;

  try {
    assertIsDefined(authenticatedUserId);

    if (!mongoose.isValidObjectId(tagId)) {
      throw createHttpError(400, "Invalid tag id");
    }

    const tag = await TagModel.findById(tagId)
    if (!tag) {
      throw createHttpError(404, "Tag not found")
    }

    if (!tag.userId.equals(authenticatedUserId)) {
      throw createHttpError(401, "You cannot access this tag");
    }

    if (!name) name = tag.name;
    if (!color) color = tag.color;

    const tagNameTaken = await TagModel.findOne({name: name, userId: authenticatedUserId});
    if(tagNameTaken && tagNameTaken.name !== tag.name){
      throw createHttpError(400, "Tags cannot have duplicate names")
    }

    const updatedTag = await TagModel.findByIdAndUpdate(tagId, { name: name, color:color }, {new: true});
    res.status(200).json(updatedTag)


  } catch (error) {
    next(error);
  }
};

export const toggleVisibility: RequestHandler = async (req, res, next) => {
  const { tagId } = req.params
  const authenticatedUserId = req.session.userId

  try {
    assertIsDefined(authenticatedUserId)
    if (!mongoose.isValidObjectId(tagId)) {
      throw createHttpError(400, 'Invalid tag id')
    }

    const tag = await TagModel.findById(tagId).exec()

    if (!tag) {
      throw createHttpError(404, 'Tag not found')
    }

    if (!tag.userId.equals(authenticatedUserId)) {
      throw createHttpError(401, 'You cannot access this tag')
    }

    const updatedTag = await TagModel.findByIdAndUpdate(
      tagId,
      {
        isVisible: !tag.isVisible,
      },
      { new: true }
    )

    res.status(200).json(updatedTag)
  } catch (error) {
    next(error)
  }
}

export const deleteTag: RequestHandler = async (req, res, next) => {
  const { tagId } = req.params
  const authenticatedUserId = req.session.userId

  try {
    assertIsDefined(authenticatedUserId)

    if (!mongoose.isValidObjectId(tagId)) {
      throw createHttpError(400, 'Invalid tag id')
    }

    const tag = await TagModel.findById(tagId).exec()

    if (!tag) {
      throw createHttpError(404, 'Tag not found')
    }

    if (!tag.userId.equals(authenticatedUserId)) {
      throw createHttpError(401, 'You cannot access this tag')
    }

    await TagModel.findByIdAndDelete(tagId)

    await EventModel.updateMany(
      { tagId: tagId }, // Find events where the `tagId` matches the deleted tag
      { $unset: { tagId: 1 } } // Remove the `tagId` field
    )
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
}
