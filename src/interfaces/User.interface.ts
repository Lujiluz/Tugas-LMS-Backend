import { Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserResponse {
  username: string;
  token?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
