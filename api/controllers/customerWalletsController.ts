import {
  ICustomerWallet,
  IRemoveCustomerWalletsInput,
  ISaveCustomerWalletInput,
  IUpdateCustomerWalletsInput,
} from "../types/global";
import { Request, Response } from "express";
import { returnErrorMessage } from "../services";
import { Customer } from "../models/CustomerModel";
import { CustomerRepository } from "../repositories/CustomerRepository";
import GetAllCustomerWalletsUseCase from "../useCases/GetAllCustomerWalletsUseCase";

export const listCustomerWalletsController = async (
  req: Request,
  res: Response
) => {
  try {
    const customerRepository = new CustomerRepository();
    const getAllCustomerWalletsUseCase = new GetAllCustomerWalletsUseCase(
      customerRepository
    );
    const customers = getAllCustomerWalletsUseCase.execute();

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
  const body = req.body as IRemoveCustomerWalletsInput | null;
  if (!body) {
    res.json({
      message: "Corpo da requisição não informado!",
    });
    return;
  }

  // TODO -> removeCustomerUseCase
  const customerId = body.id;

  try {
    const foundCustomer = await Customer.findByIdAndDelete({
      _id: customerId,
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
