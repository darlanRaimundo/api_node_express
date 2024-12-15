import { Router } from "express";
import {
  listCustomerWalletsController,
  saveCustomerWalletsController,
} from "../../controllers/customerWalletsController";

const V1Router = Router();

V1Router.get("/customerWallets", listCustomerWalletsController);

V1Router.post("/customerWallets", saveCustomerWalletsController);

export default V1Router;
