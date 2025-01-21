import { ICustomerRepository } from "../repositories/CustomerRepository"; // Importa a interface `ICustomerRepository`, que define os métodos para interagir com os dados de clientes.
import {
  ICustomerWallet,
  IUpdateCustomerWalletsInput,
  UseCase,
} from "../types/global"; // Importa os tipos `ICustomerWallet`, `IUpdateCustomerWalletsInput` e `UseCase` para tipagem.

export interface IUpdateCustomerWalletsDTO {
  customerRepository: ICustomerRepository; // Define a estrutura do DTO (Data Transfer Object) que contém a dependência de `ICustomerRepository`.
}

export interface IUpdateCustomerWalletsUseCaseOutput {
  message: string; // Define a estrutura da saída do caso de uso, que é uma mensagem de sucesso.
  updatedCustomer?: ICustomerWallet; // Define a estrutura do cliente atualizado.
}

/*
 * Caso de uso UpdateCustomerWalletsUseCase: Classe responsável por atualizar um cliente na base de dados.
 * Ela implementa a interface UseCase e define o método execute, que executa a lógica de atualizar um cliente.
 */
export default class UpdateCustomerWalletsUseCase
  implements
    UseCase<IUpdateCustomerWalletsInput, IUpdateCustomerWalletsUseCaseOutput>
{
  private customerRepository: ICustomerRepository;

  constructor(customerRepository: ICustomerRepository) {
    this.customerRepository = customerRepository;
  }

  async execute(
    input: IUpdateCustomerWalletsInput
  ): Promise<IUpdateCustomerWalletsUseCaseOutput> {
    const updatedCustomer = await this.customerRepository.updateCustomer(input);

    if (!updatedCustomer) {
      throw new Error("Cliente não encontrado na base.");
    } else {
      return {
        message: "Cliente encontrado e atualizado com sucesso.",
        updatedCustomer,
      };
    }
  }
}
