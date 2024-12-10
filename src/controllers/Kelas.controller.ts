import { NextFunction, Request, Response } from "express";
import { IKelas } from "../interfaces/Kelas.interface";
import { KelasService } from "../services/Kelas.service";
import { AuthRequest } from "../middlewares/token.middleware";

export class KelasController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: IKelas = req.body as IKelas;

      const kelas = await KelasService.createKelas(request);
      res.status(201).json({
        status: "success",
        message: "Berhasil membuat kelas baru!",
        data: kelas,
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  static async get(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const kelas = await KelasService.getKelas(req.user.id as string);

      res.status(200).json({
        status: "success",
        message: "Berhasil menambahkan data kelas!",
        data: kelas,
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
}
