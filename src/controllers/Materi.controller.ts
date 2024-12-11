import { NextFunction, Request, Response } from "express";
import { IMateri } from "../interfaces/Materi.interface";
import { MateriService } from "../services/Materi.service";
import { AuthRequest } from "../middlewares/token.middleware";

export class MateriController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: IMateri = req.body as IMateri;

      const materi = await MateriService.createMateri(request);

      res.status(201).json({
        status: "success",
        message: "Berhasil membuat materi baru",
        data: materi,
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  static async get(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const materi = await MateriService.getMateri(req.user.kelas);

      res.status(200).json({
        status: "success",
        message: "Berhasil mendapatkan data materi",
        data: materi,
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
}
