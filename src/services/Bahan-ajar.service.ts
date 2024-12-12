import { Schema, Types } from "mongoose";
import { IKelas } from "../interfaces/Kelas.interface";
import KelasModel from "../models/Kelas.model";
import { KelasValidation } from "../validations/Kelas.validation";
import { Validation } from "../validations/validation";
import UserModel from "../models/User.model";
import { ResponseError } from "../error/response.error";
import { IUser } from "../interfaces/User.interface";
import { IBahanAjar } from "../interfaces/Bahan-ajar.interface";
import { BahanAjarValidation } from "../validations/Bahan-ajar.validation";
import BahanAjarModel from "../models/Bahan-ajar.model";
import { AppError } from "../middlewares/error-middlewar";

export class BahanAjarService {
  static async createBahanAjar(data: Partial<IBahanAjar>): Promise<IBahanAjar> {
    // validasi request create kelas
    const requestKelas = Validation.validate(BahanAjarValidation.CREATE, data);

    const bahanAjar = await BahanAjarModel.create(requestKelas);
    return bahanAjar;
  }

  static async getBahanAjar(materiID: string): Promise<IBahanAjar[]> {
    const bahanAjar = await BahanAjarModel.find({ materi: new Types.ObjectId(materiID) })
      .populate({
        path: "materi",
        select: "-_id name description",
      })
      .select("-__v");
    console.log(bahanAjar);

    if (!bahanAjar) throw new AppError("Bahan ajar dengan materi ini tidak ditemukan", 404);
    return bahanAjar;
  }
}
