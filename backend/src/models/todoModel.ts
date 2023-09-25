import { Document, Schema, Types, model, IndexOptions } from "mongoose";

export interface ITodo extends Document {
  name: string;
  dateCreated: Date;
  dateCompleted: Date;
  complete: Boolean;
  user: Types.ObjectId;
}

const todoSchema = new Schema({
  name: {
    type: String,
    required: [true, "A todo must have a description."],
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  dateCompleted: {
    type: Date,
  },
  complete: {
    type: Boolean,
    default: false,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Todo must belong to a user"],
  },
});

todoSchema.index({ user: 1, name: 1 }, { unique: true } as IndexOptions);

todoSchema.pre("find", function (next) {
  this.select("-__v");
  next();
});

const Todo = model<ITodo>("Todo", todoSchema);

export default Todo;
