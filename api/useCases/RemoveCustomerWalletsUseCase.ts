import { ICustomerRepository } from "../repositories/CustomerRepository";
import { IRemoveCustomerWalletsInput, UseCase } from "../types/global";

export interface IRemoveCustomerWalletsDTO {
  customerRepository: ICustomerRepository;
}

export interface IRemoveCustomerWalletsUseCaseOutput {
  message: string;
}

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
