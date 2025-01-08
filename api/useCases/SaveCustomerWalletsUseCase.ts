import { ICustomerRepository } from "../repositories/CustomerRepository";
import {
  ICustomerWallet,
  ISaveCustomerWalletInput,
  UseCase,
} from "../types/global";

export interface ISaveCustomerWalletsDTO {
  customerRepository: ICustomerRepository;
}

export interface ISaveCustomerWalletsUseCaseOutput {
  message: string;
}

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
