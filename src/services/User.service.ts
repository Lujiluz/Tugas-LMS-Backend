import UserModel from "../models/User.model";
import { IUser, IUserResponse } from "../interfaces/User.interface";
import { Validation } from "../validations/validation";
import { UserValidation } from "../validations/User.validation";
import { ResponseError } from "../error/response.error";

import bcrypt from "bcrypt";

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

  async findUserByEmail(email: string): Promise<IUser | null> {
    return UserModel.findOne({ email });
  }
}
