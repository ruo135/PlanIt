// Ruo Yang Jiang 261055118

/**
 * The mongoDB model for the Todos collection.
 * This defines the structure and types expected by each field.
 */
import { InferSchemaType, Schema, model } from 'mongoose'

const TodoSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },

  todo: {
    type: String,
    required: true,
  },

  isChecked: {
    type: Boolean,
    required: true,
  },
})

type Todo = InferSchemaType<typeof TodoSchema>

export default model<Todo>('Todo', TodoSchema)
