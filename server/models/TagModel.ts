/**
 * The mongoDB model for the Tags collection.
 * This defines the structure and types expected by each field.
 */
import { InferSchemaType, Schema, model } from "mongoose";

const TagSchema = new Schema({
  name: {
    type: String,
    unique: true,
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
});

type Tag = InferSchemaType<typeof TagSchema>;

export default model<Tag>("Tag", TagSchema);
