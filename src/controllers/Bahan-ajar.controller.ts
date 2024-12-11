import { NextFunction, Request, Response } from "express";
import { IKelas } from "../interfaces/Kelas.interface";
import { KelasService } from "../services/Kelas.service";
import { AuthRequest } from "../middlewares/token.middleware";
import { IBahanAjar } from "../interfaces/Bahan-ajar.interface";
import { BahanAjarService } from "../services/Bahan-ajar.service";

export class BahanAjarController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: IBahanAjar = req.body as IBahanAjar;

      const bahanAjar = await BahanAjarService.createBahanAjar(request);

      res.status(201).json({
        status: "success",
        message: "Berhasil membuat bahan ajar baru",
        data: bahanAjar,
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  static async get(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const materiID = req.params.materiID;

      const bahanAjar = await BahanAjarService.getBahanAjar(materiID);
      res.status(200).json({
        status: "success",
        message: "Berhasil mendapatkan data baan ajar",
        data: bahanAjar,
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
}
