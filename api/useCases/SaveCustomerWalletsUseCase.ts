import { ICustomerRepository } from "../repositories/CustomerRepository"; // Importa a interface `ICustomerRepository`, que define os métodos para interagir com os dados de clientes.
import {
  ICustomerWallet,
  ISaveCustomerWalletInput,
  UseCase,
} from "../types/global"; // Importa os tipos `ICustomerWallet`, `ISaveCustomerWalletInput` e `UseCase` para tipagem.

export interface ISaveCustomerWalletsDTO {
  customerRepository: ICustomerRepository; // Define a estrutura do DTO (Data Transfer Object) que contém a dependência de `ICustomerRepository`.
}

export interface ISaveCustomerWalletsUseCaseOutput {
  message: string; // Define a estrutura da saída do caso de uso, que é uma mensagem de sucesso.
}

/*
 * Caso de uso SaveCustomerWalletsUseCase: Classe responsável por salvar um cliente na base de dados.
 * Ela implementa a interface UseCase e define o método execute, que executa a lógica de salvar um cliente.
 */
export default class SaveCustomerWalletsUseCase
  implements
    UseCase<ISaveCustomerWalletInput, ISaveCustomerWalletsUseCaseOutput>
{
  private customerRepository: ICustomerRepository;

  constructor(customerRepository: ICustomerRepository) {
    this.customerRepository = customerRepository;
  }

  async execute(
    input: ISaveCustomerWalletInput
  ): Promise<ISaveCustomerWalletsUseCaseOutput> {
    const customers = await this.customerRepository.createCustomer(
      input as ICustomerWallet
    );

    if (!customers) {
      throw new Error("Erro ao salvar clientes na base.");
    }

    return { message: "Clientes salvos com sucesso." };
  }
}
