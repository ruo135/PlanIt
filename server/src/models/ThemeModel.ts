// Ruo Yang Jiang 261055118

/**
 * The mongoDB model for the Theme collection.
 * This defines the structure and types expected by each field.
 */
import { InferSchemaType, Schema, model } from 'mongoose'
const ThemeSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },

  theme: {
    type: String,
    required: true,
  },
})

type Theme = InferSchemaType<typeof ThemeSchema>

export default model<Theme>('Theme', ThemeSchema)
