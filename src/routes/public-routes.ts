import express from "express";
import { UserController } from "../controllers/User.controller";

export const publicRoutes = express.Router();

publicRoutes.post("/auth/register", UserController.register);
publicRoutes.post("/auth/login", UserController.login);
