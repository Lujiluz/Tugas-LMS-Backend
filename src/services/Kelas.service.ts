import { Schema, Types } from "mongoose";
import { IKelas } from "../interfaces/Kelas.interface";
import KelasModel from "../models/Kelas.model";
import { KelasValidation } from "../validations/Kelas.validation";
import { Validation } from "../validations/validation";
import UserModel from "../models/User.model";
import { ResponseError } from "../error/response.error";
import { IUser } from "../interfaces/User.interface";

export class KelasService {
  static async createKelas(data: Partial<IKelas>): Promise<IKelas> {
    // validasi request create kelas
    const requestKelas = Validation.validate(KelasValidation.CREATE, data);

    const kelas = await KelasModel.create(requestKelas);
    return kelas;
  }

  static async getKelas(userId: string): Promise<IUser> {
    // validasi userId
    const isUser = await UserModel.countDocuments({ _id: userId });

    if (!isUser || isUser == 0) {
      throw new ResponseError(404, "User tidak ditemukan");
    }
    const kelas = await UserModel.findById(new Types.ObjectId(userId))
      .populate({
        path: "kelas",
        select: "-_id name description",
      })
      .select("username kelas");
    console.log(kelas);

    if (!kelas) throw new ResponseError(404, "Kelas dengan user ini tidak ditemukan");
    return kelas;
  }
}
