import { Router } from "express";
import { listCustomerWalletsController } from "../../controllers/customerWalletsController";

const V1Router = Router()

V1Router.get(
  '/customerWallets',
  listCustomerWalletsController,
)

export default V1Router