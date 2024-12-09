import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/User.service";
import { IUser } from "../interfaces/User.interface";

export class UserController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const request: IUser = req.body as IUser;

      const user = await UserService.registerUser(request);
      console.log("user console from controller user:", user);
      res.status(201).json({
        status: "success",
        message: "Berhasil membuat user baru",
        data: {
          user: user.username,
          createdAt: user.createdAt,
        },
      });
    } catch (err) {
      next(err);
    }
  }
}
