import { ICustomerRepository } from "../repositories/CustomerRepository"; // Importa a interface `ICustomerRepository`, que define os métodos para interagir com os dados de clientes.
import { IRemoveCustomerWalletsInput, UseCase } from "../types/global"; // Importa os tipos `IRemoveCustomerWalletsInput` e `UseCase` para tipagem.

export interface IRemoveCustomerWalletsDTO {
  customerRepository: ICustomerRepository; // Define a estrutura do DTO (Data Transfer Object) que contém a dependência de `ICustomerRepository`.
}

export interface IRemoveCustomerWalletsUseCaseOutput {
  message: string; // Define a estrutura da saída do caso de uso, que é uma mensagem de sucesso.
}

/*
 * Caso de uso RemoveCustomerWalletsUseCase: Classe responsável por remover um cliente da base de dados.
 * Ela implementa a interface UseCase e define o método execute, que executa a lógica de remoção de um cliente.
 */
export default class RemoveCustomerWalletsUseCase
  implements
    UseCase<IRemoveCustomerWalletsInput, IRemoveCustomerWalletsUseCaseOutput>
{
  private customerRepository: ICustomerRepository;

  constructor(customerRepository: ICustomerRepository) {
    this.customerRepository = customerRepository;
  }

  async execute(
    input: IRemoveCustomerWalletsInput
  ): Promise<IRemoveCustomerWalletsUseCaseOutput> {
    if (!input) {
      throw new Error("Dados da requisição não informados.");
    }

    const removedCustomer = await this.customerRepository.removeCustomer(
      input.id
    );

    if (!removedCustomer) {
      throw new Error("Cliente não encontrado na base.");
    } else {
      return {
        message: "Cliente encontrado e removido com sucesso.",
      };
    }
  }
}
