import { Types } from "mongoose";
import { IMateri } from "../interfaces/Materi.interface";
import MateriModel from "../models/Materi.model";
import { MateriValidation } from "../validations/Materi.validation";
import { Validation } from "../validations/validation";
import { ResponseError } from "../error/response.error";

export class MateriService {
  static async createMateri(data: IMateri): Promise<IMateri> {
    // validasi request
    const request = Validation.validate(MateriValidation.CREATE, data);

    const materi = await MateriModel.create(request);

    return materi;
  }

  static async getMateri(kelasId: Types.ObjectId | null): Promise<IMateri[]> {
    if (!kelasId) {
      throw new ResponseError(400, "ID Tidak valid: Kelas tidak ditemukan");
    }
    const materi = await MateriModel.find({ kelas: new Types.ObjectId(kelasId) })
      .populate({
        path: "kelas",
        select: "-_id name description kelas",
      })
      .select("-__v");

    return materi;
  }
}
