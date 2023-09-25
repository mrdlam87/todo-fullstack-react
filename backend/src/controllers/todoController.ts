import { Request, Response, NextFunction } from "express";
import Todo, { ITodo } from "../models/todoModel";
import * as factory from "../controllers/handlerFactory";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import User from "../models/userModel";

export const setTodoUserIds = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.body.user) req.body.user = req.params.userId;

  next();
};

export const getAllUserTodos = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.params.userId;

    const userDoc = await User.findById(user);

    if (!userDoc) {
      return next(new AppError("No user found with that ID", 404));
    }

    const doc = await Todo.find({ user });

    res.status(200).json({
      status: "success",
      results: doc.length,
      data: doc,
    });
  }
);

export const getUserTodo = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id: _id, userId: user } = req.params;

    const doc = await Todo.findOne({ _id, user });

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: doc,
    });
  }
);

export const createUserTodo = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Todo.create(req.body);

    res.status(200).json({
      status: "success",
      data: doc,
    });
  }
);

export const updateUserTodo = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id: _id, userId: user } = req.params;

    const doc = await Todo.findOneAndUpdate({ _id, user }, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: doc,
    });
  }
);

export const deleteUserTodo = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id: _id, userId: user } = req.params;

    const doc = await Todo.findOneAndDelete({ _id, user });

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  }
);

export const getAllTodos = factory.getAll<ITodo>(Todo);
export const getTodo = factory.getOne<ITodo>(Todo);
export const createTodo = factory.createOne<ITodo>(Todo);
export const updateTodo = factory.updateOne<ITodo>(Todo);
export const deleteTodo = factory.deleteOne<ITodo>(Todo);
