import { ICustomerRepository } from "../repositories/CustomerRepository";
import { ICustomerWallet, UseCase } from "../types/global";

export interface IGetCustomerByIdUseCaseInput {
  id: string;
}

export interface IGetCustomerByIdUseCaseOutput {
  customer: ICustomerWallet; // Define a estrutura da saída do caso de uso, que é uma carteira de cliente especifico.
}

export default class GetCustomerByIdUseCase
  implements
    UseCase<IGetCustomerByIdUseCaseInput, IGetCustomerByIdUseCaseOutput>
{
  private customerRepository: ICustomerRepository;

  constructor(customerRepository: ICustomerRepository) {
    this.customerRepository = customerRepository;
  }

  async execute(input: { id: string }): Promise<IGetCustomerByIdUseCaseOutput> {
    const customer = await this.customerRepository.getCustomer(input.id);

    if (!customer) {
      throw new Error("Cliente não encontrado na base.");
    }

    return { customer };
  }
}
