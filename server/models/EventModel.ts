/**
 * The mongoDB model for the Users collection.
 * This defines the structure and types expected by each field.
 */
import { InferSchemaType, Schema, model } from 'mongoose'
const EventSchema = new Schema({
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

  tags: {
    type: [String],
    validate: (arr: string[]) => Array.isArray(arr) && arr.length > 0,
  },
})

type Event = InferSchemaType<typeof EventSchema>

export default model<Event>('Event', EventSchema)
