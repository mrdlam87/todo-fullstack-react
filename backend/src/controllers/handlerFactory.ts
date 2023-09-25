import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import { Model, Document } from "mongoose";
import { Request, Response, NextFunction } from "express";

type DocumentType<T extends Document> = T;

export const getAll = <T extends Document>(Model: Model<DocumentType<T>>) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.find({});

    res.status(200).json({
      status: "success",
      results: doc.length,
      data: doc,
    });
  });

export const getOne = <T extends Document>(Model: Model<DocumentType<T>>) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.findById(req.params.id);

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

export const createOne = <T extends Document>(Model: Model<DocumentType<T>>) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.create(req.body);

    res.status(200).json({
      status: "success",
      data: doc,
    });
  });

export const updateOne = <T extends Document>(Model: Model<DocumentType<T>>) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) return next(new AppError("No document found with that ID", 404));

    res.status(200).json({
      status: "success",
      data: doc,
    });
  });

export const deleteOne = <T extends Document>(Model: Model<DocumentType<T>>) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) return next(new AppError("No document found with that ID", 404));

    res.status(204).json({
      status: "success",
      data: null,
    });
  });
