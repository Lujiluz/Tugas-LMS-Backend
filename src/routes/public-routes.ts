import express from "express";
import { UserController } from "../controllers/User.controller";

export const publicRoutes = express.Router();

publicRoutes.post("/users/register", UserController.register);
