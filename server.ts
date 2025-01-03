import express, { json } from "express";
import "dotenv/config";
import { MainRouter } from "./api/routes/index.routes";
import mongoose from "mongoose";
import { asyncTimeout } from "./api/services";

const app = express();
const port = process.env.PORT || 8080;

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
