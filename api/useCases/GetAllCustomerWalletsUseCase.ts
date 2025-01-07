import { ICustomerRepository } from "../repositories/CustomerRepository";
import { ICustomerWallet, UseCase } from "../types/global";

export interface IGetAllCustomerWalletsDTO {
  customerRepository: ICustomerRepository;
}
export interface IGetAllCustomerWalletsUseCaseOutput {
  customers: ICustomerWallet[];
}

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
