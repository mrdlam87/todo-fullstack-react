import User, { IUser } from "../models/userModel";
import * as factory from "../controllers/handlerFactory";

export const getAllUsers = factory.getAll<IUser>(User);
export const getUser = factory.getOne<IUser>(User, { path: "todos" });
export const createUser = factory.createOne<IUser>(User);
export const updateUser = factory.updateOne<IUser>(User);
export const deleteUser = factory.deleteOne<IUser>(User);
