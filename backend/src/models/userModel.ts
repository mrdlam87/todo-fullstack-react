import { Document, Schema, model } from "mongoose";

export interface IUser extends Document {
  name: string;
}

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "A user must have a name."],
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

userSchema.virtual("todos", {
  ref: "Todo",
  foreignField: "user",
  localField: "_id",
});

userSchema.pre("find", function (next) {
  this.select("-__v");
  next();
});

const User = model<IUser>("User", userSchema);

export default User;
