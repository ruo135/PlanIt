/**
 * The mongoDB model for the Todos collection, used inside the User collection.
 * This defines the structure and types expected by each field.
 */
import { InferSchemaType, Schema, model } from "mongoose";

const TodoSchema = new Schema({
  todo: {
    type: String,
    required: true,
  },

  isChecked: {
    type: Boolean,
    required: true,
  },
});

type Todo = InferSchemaType<typeof TodoSchema>;

export default model<Todo>("Todo", TodoSchema);
