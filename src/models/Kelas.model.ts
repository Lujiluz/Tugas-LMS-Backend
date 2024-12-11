import mongoose, { Model, Schema } from "mongoose";
import { IKelas } from "../interfaces/Kelas.interface";

const kelasSchema: Schema = new Schema<IKelas>({
  name: {
    type: String,
    required: [true, "Nama kelas harus diisi"],
  },
  description: {
    type: String,
    required: [true, "Deskripsi kelas harus diisi"],
  },
  grade: {
    type: Number,
    required: [true, "Grade kelas harus diisi"],
  },
});

const KelasModel: Model<IKelas> = mongoose.model<IKelas>("kelas", kelasSchema);

export default KelasModel;
