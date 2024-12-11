import express from "express";
import { KelasController } from "../controllers/Kelas.controller";
import { verifyToken } from "../middlewares/token.middleware";
import { MateriController } from "../controllers/Materi.controller";
import { BahanAjarController } from "../controllers/Bahan-ajar.controller";

export const apiRoutes = express.Router();

apiRoutes.use(verifyToken);

// endpoint kelas
apiRoutes.post("/kelas/create", KelasController.create);
apiRoutes.get("/kelas/get", KelasController.get);

// endpoint materi
apiRoutes.post("/materi/create", MateriController.create);
apiRoutes.get("/materi/get", MateriController.get);

// endpoint bahan ajar
apiRoutes.post('/bahan-ajar/create', BahanAjarController.create)
apiRoutes.get("/bahan-ajar/get/:materiID", BahanAjarController.get);
