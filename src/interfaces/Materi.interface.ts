import { Document, Types } from "mongoose";

export interface IMateri extends Document {
    name: string
    description: string
    kelas: Types.ObjectId
}