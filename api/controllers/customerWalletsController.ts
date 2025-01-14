import {
  IRemoveCustomerWalletsInput,
  ISaveCustomerWalletInput,
  IUpdateCustomerWalletsInput,
} from "../types/global"; // Importa tipos de dados relacionados às operações de carteiras de clientes.
import { Request, Response } from "express"; // Importa os tipos Request e Response do Express para tipar as funções de controle.
import { returnErrorMessage } from "../services"; // Função para formatar mensagens de erro.
import { CustomerRepository } from "../repositories/CustomerRepository"; // Repositório para interagir com os dados de clientes.
import GetAllCustomerWalletsUseCase from "../useCases/GetAllCustomerWalletsUseCase"; // Caso de uso para listar todas as carteiras de clientes.
import SaveCustomerWalletsUseCase from "../useCases/SaveCustomerWalletsUseCase"; // Caso de uso para salvar uma carteira de cliente.
import UpdateCustomerWalletsUseCase from "../useCases/UpdateCustomerWalletsUseCase"; // Caso de uso para atualizar uma carteira de cliente.
import RemoveCustomerWalletsUseCase from "../useCases/RemoveCustomerWalletsUseCase"; // Caso de uso para remover uma carteira de cliente.

// Listar todas as carteiras dos clientes, capturando qualquer erro que possa ocorrer durante o processo e retornando uma mensagem apropriada.
export const listCustomerWalletsController = async (
  req: Request,
  res: Response
) => {
  try {
    const customerRepository = new CustomerRepository(); // Cria uma instância do repositório de clientes.
    const getAllCustomerWalletsUseCase = new GetAllCustomerWalletsUseCase(
      customerRepository
    ); // Cria uma instância do caso de uso para listar carteiras de clientes.
    const output = await getAllCustomerWalletsUseCase.execute(); // Executa a lógica de listar as carteiras.

    // Envia uma resposta JSON com sucesso e os dados das carteiras.
    res.json({
      message: "Carteira de cliente resgatadas com sucesso!",
      data: output.customers,
    });
  } catch (error) {
    // Caso ocorra erro, captura e retorna uma mensagem de erro formatada.
    const errorMessage = returnErrorMessage(error);
    res.json({
      message: errorMessage,
    });
  }
};

// Salvar as informações da carteira de um cliente, tratando possíveis erros e retornando uma resposta com a mensagem do resultado.
export const saveCustomerWalletsController = async (
  req: Request,
  res: Response
) => {
  const body = req.body as ISaveCustomerWalletInput | undefined; // Captura o corpo da requisição.

  // Verifica se o corpo da requisição foi informado.
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
    ); // Cria o caso de uso para salvar a carteira do cliente.

    const output = await saveCustomerWalletsUseCase.execute(body); // Executa o caso de uso.

    res.json({
      message: output.message, // Retorna uma mensagem com o resultado da operação.
    });
  } catch (error) {
    // Em caso de erro, retorna uma mensagem de erro.
    const errorMessage = returnErrorMessage(error);
    res.json({
      message: errorMessage,
    });
  }
};

// Atualizar a carteira de um cliente, tratando os erros e retornando uma resposta com o resultado da operação.
export const updateCustomerWalletsController = async (
  req: Request,
  res: Response
) => {
  const body = req.body as IUpdateCustomerWalletsInput | undefined; // Captura o corpo da requisição.

  // Verifica se o corpo da requisição foi informado.
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
    ); // Cria o caso de uso para atualizar a carteira do cliente.

    const output = await updateCustomerWalletsUseCase.execute(body); // Executa a atualização.

    res.json(output); // Retorna o resultado da atualização.
  } catch (error) {
    // Caso ocorra erro, retorna uma mensagem de erro.
    const errorMessage = returnErrorMessage(error);
    res.json({
      message: errorMessage,
    });
  }
};

// Remover a carteira de um cliente, tratando erros e retornando uma resposta com o status da remoção.
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

  const customerId = body.id; // Obtém o ID do cliente do corpo da requisição.

  try {
    const customerRepository = new CustomerRepository();
    const removeCustomerWalletsUseCase = new RemoveCustomerWalletsUseCase(
      customerRepository
    ); // Cria o caso de uso para remover a carteira do cliente.
    const output = await removeCustomerWalletsUseCase.execute({
      id: customerId,
    }); // Executa a remoção da carteira.

    res.json({
      message: output.message, // Retorna uma mensagem com o resultado da remoção.
    });
  } catch (error) {
    // Caso ocorra erro, retorna uma mensagem de erro.
    const errorMessage = returnErrorMessage(error);
    res.json({
      message: errorMessage,
    });
  }
};
