import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/User.service";
import { IUser, IUserLogin, IUserResponse } from "../interfaces/User.interface";

export class UserController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const request: IUser = req.body as IUser;
      console.log("payload:", request);

      const user = await UserService.registerUser(request);
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

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const request: IUserLogin = req.body as IUserLogin;

      const performLogic = await UserService.loginUser(request);
      res.status(200).json({
        status: "success",
        message: "Berhasil login",
        data: performLogic,
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
}
