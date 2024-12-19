// Ruo Yang Jiang 261055118

/**
 * The mongoDB model for the Events collection.
 * This defines the structure and types expected by each field.
 */
import { InferSchemaType, Schema, model } from 'mongoose'
const EventSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },

  startDate: {
    type: Date,
    required: true,
  },

  endDate: {
    type: Date,
    required: true,
  },

  monthAndYear: {
    type: String,
    required: true,
  },

  tagId: {
    type: Schema.Types.ObjectId,
  },
})

type Event = InferSchemaType<typeof EventSchema>

export default model<Event>('Event', EventSchema)
