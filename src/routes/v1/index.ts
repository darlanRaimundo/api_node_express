import { Router } from "express";
import {
  listCustomerWalletsController,
  removeCustomerWalletsController,
  saveCustomerWalletsController,
  updateCustomerWalletsController,
} from "../../controllers/customerWalletsController";

const V1Router = Router();

V1Router.get("/customerWallets", listCustomerWalletsController);
V1Router.post("/customerWallets", saveCustomerWalletsController);
V1Router.put("/customerWallets", updateCustomerWalletsController);
V1Router.delete("/customerWallets", removeCustomerWalletsController);

export default V1Router;
