import { Customer } from "../models/CustomerModel";
import { ICustomerWallet } from "../types/global";

export interface ICustomerRepository {
  getCustomer(id: string): Promise<ICustomerWallet>;
  getAllCustomers(): Promise<ICustomerWallet[]>;
  createCustomer(data: ICustomerWallet): Promise<ICustomerWallet>;
  updateCustomer(data: ICustomerWallet): Promise<ICustomerWallet>;
  removeCustomer(id: string): Promise<boolean>;
}

export class CustomerRepository implements ICustomerRepository {
  async getCustomer(id: string): Promise<ICustomerWallet> {
    const customers = await Customer.findById(id);
    return customers as ICustomerWallet;
  }

  async getAllCustomers(): Promise<ICustomerWallet[]> {
    const customers = await Customer.find();
    return customers as ICustomerWallet[];
  }

  async createCustomer(data: ICustomerWallet): Promise<ICustomerWallet> {
    const customer = new Customer({
      parentId: data.parentId,
      name: data.name,
      birthDate: data.birthDate,
      cellphone: data.cellphone,
      phone: data.phone,
      email: data.email,
      occupation: data.occupation,
      state: data.state,
      createdAt: new Date(),
    } as ICustomerWallet);

    return await customer.save();
  }
  async updateCustomer(data: ICustomerWallet): Promise<ICustomerWallet> {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      {
        _id: data.id,
      },
      data
    ).exec();

    return updatedCustomer as ICustomerWallet;
  }
  async removeCustomer(id: string): Promise<boolean> {
    const foundCustomer = await Customer.findByIdAndDelete({
      _id: id,
    }).exec();

    return !!foundCustomer;
  }
}
