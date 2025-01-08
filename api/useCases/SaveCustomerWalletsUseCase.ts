import { ICustomerRepository } from "../repositories/CustomerRepository";
import { ICustomerWallet } from "../types/global";

export interface ISaveCustomerWalletsDTO {
  customerRepository: ICustomerRepository;
}

export interface ISaveCustomerWalletsUseCaseOutput {
  message: string;
}

export default class SaveCustomerWalletsUseCase {
  private customerRepository: ICustomerRepository;

  constructor(customerRepository: ICustomerRepository) {
    this.customerRepository = customerRepository;
  }

  async execute(
    input: ICustomerWallet
  ): Promise<ISaveCustomerWalletsUseCaseOutput> {
    const customers = await this.customerRepository.createCustomer(input);

    if (!customers) {
      throw new Error("Erro ao salvar clientes na base.");
    }

    return { message: "Clientes salvos com sucesso." };
  }
}
