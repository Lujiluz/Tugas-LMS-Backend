import { Types } from "mongoose";

export interface IBahanAjar {
  title: string;
  bab: number;
  content: object[];
  materi: Types.ObjectId;
}
