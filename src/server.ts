import express, { json } from "express";
import "dotenv/config";
import mongoose from "mongoose";
import { MainRouter } from "./routes/index.routes";
import { asyncTimeout } from "./services";
import cors from "cors";

const app = express();
const port = process.env.PORT || 8080;

app.use(
  cors({
    origin: "*",
  })
);
app.use(json());
app.use("/", MainRouter);

asyncTimeout(0, async () => {
  await mongoose.connect(
    "mongodb+srv://darlanRaimundo:nagini100@customerswallet.toiuo.mongodb.net/customerWallets?retryWrites=true&w=majority&appName=CustomersWallet"
  );

  // RODANDO APLICAÇÃO NA PORTA SETADA
  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });
});

export default app;
