import mongoose, { Schema } from "mongoose";
import { ICustomerWallet } from "../types/global";

const customerSchema = new Schema<ICustomerWallet>({
  name: { type: String, required: true },
  parentId: { type: String, required: true },
  birthDate: { type: Date, required: true },
  cellphone: { type: String, required: true },
  phone: { type: String, required: false },
  email: { type: String, required: true },
  occupation: { type: String, required: true },
  state: { type: String, required: true },
  createdAt: { type: Date, required: true },
});

export const Customer = mongoose.model<ICustomerWallet>(
  "Customer",
  customerSchema
);
