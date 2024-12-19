// Ruo Yang Jiang 261055118

/**
 * The mongoDB model for the Users collection.
 * This defines the structure and types expected by each field.
 */
import { InferSchemaType, Schema, model } from 'mongoose'
import Event from './EventModel'
import Todo from './TodoModel'

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
})

type User = InferSchemaType<typeof UserSchema>

export default model<User>('User', UserSchema)
