import {
  ICustomerWallet,
  ISaveCustomerWalletInput,
  IUpdateCustomerWalletsInput,
} from "../types/global";
import { Request, Response } from "express";
import data from "../data/customerWallets.json";
import mongoose, { Schema } from "mongoose";
import { returnErrorMessage } from "../services";

const customerWalletsMock = data;

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
  // TODO -> getCustomerWalletsUseCase
  const customers = await Customer.find();

  res.json({
    message: "Carteira de cliente resgatas com sucesso!",
    data: customers,
  });
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
    let errorMessage = "";
    if (typeof error === "string") {
      errorMessage = error.toUpperCase();
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.json({
      message: errorMessage,
    });
  }
};

export const removeCustomerWallets = (req: Request, res: Response) => {
  const body = req.body as { customerId: string } | null;
  if (!body) {
    return {
      message: "Corpo da requisição não informado!",
    };
  }

  // getCustomerWalletsUseCase
  const _customerWalletsMock = customerWalletsMock.customerWallets.data;

  const customerId = body.customerId;

  try {
    const foundCustomerIndex = _customerWalletsMock.findIndex(
      (customer) => customer.id === customerId
    );

    if (foundCustomerIndex === -1) {
      res.json({
        message: "Cliente não encontrado na base.",
        customerWallets: _customerWalletsMock,
      });
    } else {
      _customerWalletsMock.splice(foundCustomerIndex, 1);
      res.json({
        message: "Cliente encontrado e deletado com sucesso!.",
        customerWallets: _customerWalletsMock,
      });
    }
  } catch (error) {
    let errorMessage = "";
    if (typeof error === "string") {
      errorMessage = error.toUpperCase();
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.json({
      message: errorMessage,
    });
  }
};

export const updateCustomerWallets = (req: Request, res: Response) => {
  const body = req.body as IUpdateCustomerWalletsInput | undefined;
  if (!body) {
    res.json({
      message: "Corpo da requisição não informado!",
    });
    return;
  }

  // getCustomerWalletsUseCase
  const _customerWalletsMock = customerWalletsMock.customerWallets
    .data as unknown as ICustomerWallet[];
  const customerId = body.customerId;

  try {
    const foundCustomerIndex = _customerWalletsMock.findIndex(
      (customer) => customer.id === customerId
    );

    if (foundCustomerIndex === -1) {
      return {
        message: "Cliente não encontrado na base.",
        data: _customerWalletsMock,
      };
    } else {
      const newCustomer: ICustomerWallet = {
        id: customerId,
        parentId: body.parentId,
        name: body.name,
        birthDate: body.birthDate,
        cellphone: body.cellphone,
        phone: body.phone,
        email: body.email,
        occupation: body.occupation,
        state: body.state,
        createdAt: new Date(),
      };

      _customerWalletsMock.splice(foundCustomerIndex, 1, newCustomer);

      res.json({
        message: "Cliente encontrado e atualizado com sucesso.",
        data: _customerWalletsMock,
      });
    }
  } catch (error) {
    const errorMessage = returnErrorMessage(error);
    res.json({
      message: errorMessage,
    });
  }
};
