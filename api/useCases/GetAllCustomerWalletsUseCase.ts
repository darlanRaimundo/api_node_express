import { ICustomerRepository } from "../repositories/CustomerRepository"; // Importa a interface `ICustomerRepository`, que define os métodos para interagir com os dados de clientes.
import { ICustomerWallet, UseCase } from "../types/global"; // Importa os tipos `ICustomerWallet` e `UseCase` para tipagem.

export interface IGetAllCustomerWalletsDTO {
  customerRepository: ICustomerRepository; // Define a estrutura do DTO (Data Transfer Object) que contém a dependência de `ICustomerRepository`.
}

export interface IGetAllCustomerWalletsUseCaseOutput {
  customers: ICustomerWallet[]; // Define a estrutura da saída do caso de uso, que é uma lista de carteiras de clientes.
}

/*
 * Caso de uso GetAllCustomerWalletsUseCase: Classe responsável por listar todas as carteiras de clientes.
 * Ela implementa a interface UseCase e define o método execute, que executa a lógica de listar as carteiras de clientes.
 */

export default class GetAllCustomerWalletsUseCase
  implements
    UseCase<IGetAllCustomerWalletsDTO, IGetAllCustomerWalletsUseCaseOutput>
{
  private customerRepository: ICustomerRepository;

  constructor(customerRepository: ICustomerRepository) {
    this.customerRepository = customerRepository;
  }

  async execute(): Promise<IGetAllCustomerWalletsUseCaseOutput> {
    const customers = await this.customerRepository.getAllCustomers();

    if (!customers) {
      throw new Error("Cliente não encontrado na base.");
    }

    return { customers };
  }
}
