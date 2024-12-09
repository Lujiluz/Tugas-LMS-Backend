import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan, { TokenIndexer } from "morgan";
import { readdirSync } from "fs";
import fileUpload from "express-fileupload";
import path from "path";
import dotenv from "dotenv";
import connectToDatabase from "./db/mongo";
import { publicRoutes } from "./routes/public-routes";
dotenv.config();

const PORT = process.env.PORT || 8000;

const app = express();

// bikin custom token function yang type-safety
declare module "morgan" {
  interface TokenIndexer {
    clientIp?: (req: Request, res: Response) => string;
    xForwardedFor?: (req: Request, res: Response) => string;
  }
}

// buat logger
morgan.token("client-ip", (req: Request) => {
  const ip = req.ip || (req.socket.remoteAddress as string) || (req.connection.remoteAddress as string);
  return ip;
});

morgan.token("x-forwarded-for", (req: Request) => {
  const xForwardedFor = req.headers["x-forwarded-for"] as string;
  return Array.isArray(xForwardedFor) ? xForwardedFor[0] : xForwardedFor || "N/A";
});

const ipMonitorFormat = ":method :url :status :res[content-length] - :response-time ms :client-ip :x-forwarded-for";

app.use(cors());
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan(ipMonitorFormat));

// route testing buat mastiin API jalan
app.get("/", (req, res) => {
  res.send({ message: "API jalan boskuhh!🚀" });
});

// import routes
app.use("/api", publicRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectToDatabase();
});
