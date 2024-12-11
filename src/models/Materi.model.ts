import mongoose, { Model, Schema } from "mongoose";
import { IMateri } from "../interfaces/Materi.interface";

const materiSchema: Schema = new Schema<IMateri>({
  name: {
    type: String,
    required: [true, "Nama Materi harus diisi"],
  },
  description: {
    type: String,
    required: [true, "Deskripsi Materi harus diisi"],
  },
  kelas: {
    type: Schema.Types.ObjectId,
    ref: "kelas",
    required: [true, "ID Kelas harus diisi"],
  },
});

const MateriModel: Model<IMateri> = mongoose.model<IMateri>("materi", materiSchema);

export default MateriModel;
