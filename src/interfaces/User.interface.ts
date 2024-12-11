import { Document, Types } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  kelas?: Types.ObjectId | null;
  createdAt: Date;
  updatedAt: Date;
  comparePassword: (password: string) => Promise<boolean>;
}

export interface IUserResponse {
  username: string;
  token?: string;
  type?: string;
  expiresIn?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserLogin {
  email: string;
  password: string;
}
