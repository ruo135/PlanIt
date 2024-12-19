// Ruo Yang Jiang 261055118

/**
 * The mongoDB model for the Tags collection.
 * This defines the structure and types expected by each field.
 */
import { InferSchemaType, Schema, model } from 'mongoose'

const TagSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },

  color: {
    type: String,
    required: true,
  },

  isVisible: {
    type: Boolean,
    required: true,
  },
})

type Tag = InferSchemaType<typeof TagSchema>

export default model<Tag>('Tag', TagSchema)
