export interface ICustomerWallet {
  id: string;
  name: string;
  parentId: string;
  birthDate: Date;
  cellphone: string;
  phone: string;
  email: string;
  occupation: string;
  state: string;
  createdAt: Date;
}

export interface ISaveCustomerWalletInput {
  id: string;
  parentId: string;
  name: string;
  birthDate: Date;
  cellphone: string;
  phone: string;
  email: string;
  occupation: string;
  state: string;
}

export interface IUpdateCustomerWalletsInput {
  customerId: string;
  parentId: string;
  name: string;
  birthDate: Date;
  cellphone: string;
  phone: string;
  email: string;
  occupation: string;
  state: string;
}
