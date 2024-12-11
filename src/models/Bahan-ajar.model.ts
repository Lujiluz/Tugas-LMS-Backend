import mongoose, { Model, Schema } from "mongoose";
import { IKelas } from "../interfaces/Kelas.interface";
import { IBahanAjar } from "../interfaces/Bahan-ajar.interface";

const BahanAjarSchema: Schema = new Schema<IBahanAjar>({
  title: {
    type: String,
    required: [true, "Nama kelas harus diisi"],
  },
  bab: {
    type: Number,
    required: [true, "Deskripsi kelas harus diisi"],
  },
  content: {
    type: Schema.Types.Mixed,
    default: [],
  },
  materi: {
    type: Schema.Types.ObjectId,
    ref: "materi",
    requried: [true, "ID Materi harus diisi"],
  },
});

const BahanAjarModel: Model<IBahanAjar> = mongoose.model<IBahanAjar>("bahanAjar", BahanAjarSchema);

export default BahanAjarModel;
