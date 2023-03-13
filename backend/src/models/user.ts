import mongoose from "mongoose";

interface Todo {
  id: number;
  name: string;
  dateCreated: string;
  dateCompleted: string;
  complete: boolean;
}

interface IUser {
  name: string;
  todos: Todo[];
}

interface userModelInterface extends mongoose.Model<UserDoc> {
  build(attr: IUser): UserDoc;
}

interface UserDoc extends mongoose.Document {
  name: string;
  todos: Todo[];
}

const todoSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: [true, "A todo must have an ID."],
  },
  name: {
    type: String,
    required: [true, "A todo must have a description."],
  },
  dateCreated: {
    type: String,
    default: "",
  },
  dateCompleted: {
    type: String,
    default: "",
  },
  complete: {
    type: Boolean,
    default: false,
  },
});

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A user must have a name."],
    },
    todos: [todoSchema],
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

userSchema.statics.build = (attr: IUser) => {
  return new User(attr);
};

const User = mongoose.model<UserDoc, userModelInterface>("User", userSchema);

export { User };
