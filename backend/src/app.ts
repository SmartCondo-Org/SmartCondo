import "express-async-errors";
import express from "express";
import cors from "cors";
import { authRoutes } from "./modules/auth/routes/authRoutes";
import { financeiroRoutes } from "./modules/financeiro/routes/financeiroRoutes";
import { ocorrenciaRoutes } from "./modules/ocorrencias/routes/ocorrenciaRoutes";
import { errorHandler } from "./shared/middlewares/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/auth", authRoutes);
app.use("/financeiro", financeiroRoutes);
app.use("/ocorrencias", ocorrenciaRoutes);

app.use(errorHandler);

export default app;
