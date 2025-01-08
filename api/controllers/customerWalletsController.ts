import {
  IRemoveCustomerWalletsInput,
  ISaveCustomerWalletInput,
  IUpdateCustomerWalletsInput,
} from "../types/global";
import { Request, Response } from "express";
import { returnErrorMessage } from "../services";
import { Customer } from "../models/CustomerModel";
import { CustomerRepository } from "../repositories/CustomerRepository";
import GetAllCustomerWalletsUseCase from "../useCases/GetAllCustomerWalletsUseCase";
import SaveCustomerWalletsUseCase from "../useCases/SaveCustomerWalletsUseCase";
import UpdateCustomerWalletsUseCase from "../useCases/UpdateCustomerWalletsUseCase";

export const listCustomerWalletsController = async (
  req: Request,
  res: Response
) => {
  try {
    const customerRepository = new CustomerRepository();
    const getAllCustomerWalletsUseCase = new GetAllCustomerWalletsUseCase(
      customerRepository
    );
    const output = await getAllCustomerWalletsUseCase.execute();

    res.json({
      message: "Carteira de cliente resgatas com sucesso!",
      data: output.customers,
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
    const customerRepository = new CustomerRepository();
    const saveCustomerWalletsUseCase = new SaveCustomerWalletsUseCase(
      customerRepository
    );

    const output = await saveCustomerWalletsUseCase.execute(body);

    res.json({
      message: output.message,
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

  try {
    const customerRepository = new CustomerRepository();
    const updateCustomerWalletsUseCase = new UpdateCustomerWalletsUseCase(
      customerRepository
    );

    const output = await updateCustomerWalletsUseCase.execute(body);

    res.json(output);
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
