import {
  ICustomerWallet,
  ISaveCustomerWalletInput,
  IUpdateCustomerWalletsInput,
} from "../types/global";
import { Request, Response } from "express";
import mongoose, { Schema } from "mongoose";
import { returnErrorMessage } from "../services";

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

const Customer = mongoose.model<ICustomerWallet>("Customer", customerSchema);

export const listCustomerWalletsController = async (
  req: Request,
  res: Response
) => {
  try {
    // TODO -> getCustomerWalletsUseCase
    const customers = await Customer.find();

    res.json({
      message: "Carteira de cliente resgatas com sucesso!",
      data: customers,
    });
  } catch (error) {
    const errorMessage = returnErrorMessage(error);
    res.json({
      message: errorMessage,
    });
  }
};

export const saveCustomerWalletsController = async (
  req: Request,
  res: Response
) => {
  const body = req.body as ISaveCustomerWalletInput | undefined;

  if (!body) {
    res.json({
      message: "Corpo da requisição não informado!",
    });
    return;
  }

  try {
    // TODO -> saveCustomerWalletsUseCase
    const customer = new Customer({
      parentId: body.parentId,
      name: body.name,
      birthDate: body.birthDate,
      cellphone: body.cellphone,
      phone: body.phone,
      email: body.email,
      occupation: body.occupation,
      state: body.state,
      createdAt: new Date(),
    } as ICustomerWallet);

    await customer.save();

    res.json({
      message: "Cliente salvo com sucesso!.",
    });
  } catch (error) {
    const errorMessage = returnErrorMessage(error);
    res.json({
      message: errorMessage,
    });
  }
};

export const updateCustomerWalletsController = async (
  req: Request,
  res: Response
) => {
  const body = req.body as IUpdateCustomerWalletsInput | undefined;

  if (!body) {
    res.json({
      message: "Corpo da requisição não informado!",
    });
    return;
  }

  // TODO -> updateCustomerWalletsUseCase

  try {
    const customerToUpdateId = body.id;
    const updateData = { ...body };

    const updatedCustomer = await Customer.findByIdAndUpdate(
      {
        _id: customerToUpdateId,
      },
      updateData
    ).exec();

    if (!updatedCustomer) {
      res.json({
        message: "Cliente não encontrado na base.",
      });
    } else {
      res.json({
        message: "Cliente encontrado e atualizado com sucesso.",
      });
    }
  } catch (error) {
    const errorMessage = returnErrorMessage(error);
    res.json({
      message: errorMessage,
    });
  }
};

export const removeCustomerWalletsController = async (
  req: Request,
  res: Response
) => {
  const body = req.body as { customerId: string } | null;
  if (!body) {
    res.json({
      message: "Corpo da requisição não informado!",
    });
    return;
  }

  // TODO -> removeCustomerUseCase
  const customerId = body.customerId;

  try {
    const foundCustomer = await Customer.findByIdAndDelete({
      id: customerId,
    }).exec();

    if (!foundCustomer) {
      res.json({
        message: "Cliente não encontrado na base.",
      });
    } else {
      res.json({
        message: "Cliente encontrado e deletado com sucesso!.",
        customer: foundCustomer,
      });
    }
  } catch (error) {
    const errorMessage = returnErrorMessage(error);
    res.json({
      message: errorMessage,
    });
  }
};
