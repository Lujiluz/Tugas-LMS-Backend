import { Document, Types } from "mongoose";

export interface IKelas extends Document {
  name: string;
  description: string;
  grade: number;
}

// export interface IGetKelas {}
