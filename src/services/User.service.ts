import UserModel from "../models/User.model";
import { IUser, IUserResponse, IUserLogin } from "../interfaces/User.interface";
import { Validation } from "../validations/validation";
import { UserValidation } from "../validations/User.validation";
import { ResponseError } from "../error/response.error";

import jwt from "jsonwebtoken";

export class UserService {
  static async registerUser(userData: Partial<IUser>): Promise<IUserResponse> {
    // validasi request register
    const registerRequest = Validation.validate(UserValidation.REGISTER, userData);

    console.log("registerRequest:", registerRequest);

    // cek apakah user sudah ada
    const existingUser = await UserModel.findOne({
      $or: [{ email: userData.email }, { username: userData.username }],
    });

    if (existingUser) {
      throw new ResponseError(400, "Username atau email sudah terdaftar");
    }

    // save data user terbaru
    const user = await UserModel.create(registerRequest);

    console.log("new user data:", user);

    return user;
  }

  static async findUserByEmail(email: string): Promise<IUser | null> {
    return UserModel.findOne({ email });
  }

  static async loginUser(payload: IUserLogin): Promise<IUserResponse> {
    // validasi request login
    const requestLogin = Validation.validate(UserValidation.LOGIN, payload);

    // validasi apakah user ada
    const user: IUser | null = await UserModel.findOne({ email: payload.email });

    // validasi password
    const isPasswordValid = user ? await user.comparePassword(payload.password) : false;

    if (!user || !isPasswordValid) {
      throw new ResponseError(400, "Email/Password anda tidak valid");
    }

    // generate token
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        email: user.email,
        kelas: user.kelas,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: process.env.JWT_EXPIRES as string,
      }
    );

    return {
      username: user.username,
      token,
      type: "bearer",
      expiresIn: process.env.JWT_EXPIRES as string,
    };
  }
}
