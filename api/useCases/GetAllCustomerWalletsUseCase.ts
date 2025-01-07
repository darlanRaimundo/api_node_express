import { ICustomerRepository } from "../repositories/CustomerRepository";
import { ICustomerWallet } from "../types/global";

export default class GetAllCustomerWalletsUseCase {
  constructor(private customerRepository: ICustomerRepository) {}

  async execute(): Promise<ICustomerWallet[]> {
    const customers = await this.customerRepository.getAllCustomers();

    if (!customers) {
      throw new Error("Cliente não encontrado na base.");
    }

    return customers;
  }
}
