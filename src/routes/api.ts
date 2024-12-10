import express from "express";
import { KelasController } from "../controllers/Kelas.controller";
import { verifyToken } from "../middlewares/token.middleware";

export const apiRoutes = express.Router();

apiRoutes.use(verifyToken)

// endpoint kelas
apiRoutes.post("/kelas/create", KelasController.create);
apiRoutes.get('/kelas/get', KelasController.get)
