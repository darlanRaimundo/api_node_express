import { ICustomerRepository } from "../repositories/CustomerRepository";
import { ICustomerWallet, IUpdateCustomerWalletsInput } from "../types/global";

export interface IUpdateCustomerWalletsDTO {
  customerRepository: ICustomerRepository;
}

export interface IUpdateCustomerWalletsUseCaseOutput {
  message: string;
  updatedCustomer?: ICustomerWallet;
}

export default class UpdateCustomerWalletsUseCase {
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
