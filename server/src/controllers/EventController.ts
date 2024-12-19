// Ruo Yang Jiang 261055118

import createHttpError from 'http-errors'
import { RequestHandler } from 'express'
import EventModel from '../models/EventModel'
import { assertIsDefined } from '../util/assertIsDefined'
import mongoose from 'mongoose'
import TagModel from '../models/TagModel'

interface CreateEventBody {
  title?: string
  description?: string
  startDate?: Date
  endDate?: Date
  tagId?: mongoose.Types.ObjectId
}
// prettier-ignore
export const createEvent: RequestHandler<unknown,unknown,CreateEventBody,unknown> = async (req, res, next) => {
  const { title, description, startDate, endDate, tagId} = req.body;
  const authenticatedUserId = req.session.userId;

  try {
    assertIsDefined(authenticatedUserId);

    if (!title || !startDate || !endDate) {
      throw createHttpError(
        400,
        "Events need a title, start date and end date"
      );
    }

    const start = new Date(startDate)
    const end = new Date(endDate)

    const month = (start.getMonth() + 1).toString().padStart(2, "0");
    const year = start.getFullYear();
    const monthAndYearDate = `${month}/${year}`;
    
    const newEvent = await EventModel.create({
      userId: authenticatedUserId,
      title,
      description,
      startDate: start,
      endDate: end,
      monthAndYear: monthAndYearDate,
      tagId
    });

    res.status(200).json(newEvent);
  } catch (error) {
    next(error);
  }
};

interface UpdateEventParams {
  eventId: string
}

interface UpdateEventBody {
  title?: string
  description?: string
  startDate?: Date
  endDate?: Date
  tagId?: mongoose.Types.ObjectId
}

// prettier-ignore
export const updateEvent: RequestHandler<UpdateEventParams, unknown, UpdateEventBody, unknown> = async (req, res, next) => {
  const { eventId } = req.params;
  let { title, description, startDate, endDate, tagId } = req.body
  const authenticatedUserId = req.session.userId;

  try {
    assertIsDefined(authenticatedUserId);

    if (!mongoose.isValidObjectId(eventId)) {
      throw createHttpError(400, "Invalid event id");
    }

    const event = await EventModel.findById(eventId);
    if (!event) {
      throw createHttpError(404, "Event not found");
    }

    if (!event.userId.equals(authenticatedUserId)) {
      throw createHttpError(401, "You cannot access this event");
    }

    if (!title) title = event.title;
    if (!description) description = event.description;
    if (!startDate) startDate = new Date(event.startDate);
    if (!endDate) endDate = event.endDate;
    if (!tagId) tagId = event.tagId;

    const startDate_dateObject = new Date(startDate)
    const month = (startDate_dateObject.getMonth() + 1).toString().padStart(2, "0");
    const year = startDate_dateObject.getFullYear();
    const monthAndYearDate = `${month}/${year}`;

    const updatedTodo = await EventModel.findByIdAndUpdate(
      eventId,
      {
        title,
        description,
        startDate,
        endDate,
        monthAndYear: monthAndYearDate,
        tagId,
      },
      { new: true }
    );
    res.status(200).json(updatedTodo);


  } catch (error) {
    next(error);
  }
};

export const getAllEvents: RequestHandler = async (req, res, next) => {
  const authenticatedUserId = req.session.userId

  try {
    assertIsDefined(authenticatedUserId)

    const events = await EventModel.find({
      userId: authenticatedUserId,
    })

    res.status(200).json(events)
  } catch (error) {
    next(error)
  }
}

export const getEventsForMonth: RequestHandler = async (req, res, next) => {
  const { monthAndYear } = req.params
  const authenticatedUserId = req.session.userId

  try {
    assertIsDefined(authenticatedUserId)

    const events = await EventModel.find({
      userId: authenticatedUserId,
      monthAndYear: monthAndYear,
    })

    res.status(200).json(events)
  } catch (error) {
    next(error)
  }
}

// prettier-ignore
export const getAllVisibileEventsForCurrentMonth: RequestHandler = async (req, res, next) => {
  const authenticatedUserId = req.session.userId;

  try {
    assertIsDefined(authenticatedUserId);

    // get visible tags
    const visibleTagIds = await TagModel.find({userId:authenticatedUserId, isVisible: true}).select("_id")

    // Extract only the _id values into an array
    const tagIdArray = visibleTagIds.map((tag) => tag._id);

    // Get today's date in mm/yyyy format
    const today = new Date()
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const year = today.getFullYear();
    const monthYearformattedDate = `${month}/${year}`;

    const visibleEvents = await EventModel.find({
      $and: [
        { monthAndYear: monthYearformattedDate },
        {
          $or: [
            { tagId: { $in: tagIdArray } },
            { tagId: { $exists: false } },
            { tagId: null },
          ],
        },
      ],
    });
    
    res.status(200).json(visibleEvents);

  } catch (error) {
    next(error);
  }
};

export const deleteEvent: RequestHandler = async (req, res, next) => {
  const { eventId } = req.params
  const authenticatedUserId = req.session.userId

  try {
    assertIsDefined(authenticatedUserId)

    if (!mongoose.isValidObjectId(eventId)) {
      throw createHttpError(400, 'Invalid event id')
    }

    const todo = await EventModel.findById(eventId).exec()

    if (!todo) {
      throw createHttpError(404, 'Event not found')
    }

    if (!todo.userId.equals(authenticatedUserId)) {
      throw createHttpError(401, 'You cannot access this event')
    }

    await EventModel.findByIdAndDelete(eventId)
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
}
