export interface ICustomerWallet {
  id: string
  name: string
  parentId: string
  birthDate: Date
  cellphone: string
  phone: string
  email: string
  occupation: string
  state: string
  createdAt: Date
}

export interface ICustomResponse {
  message: string
  success: boolean  
  data?: any
}

export interface ISaveCustomerWalletInput {
  name: string
  birthDate: string,
  cellphone: string,
  phone: string,
  email: string,
  occupation: string,
  state: string,
}

export interface IUpdateCustomerWalletsInput {
  customerId: string
  parentId: string
  name: string
  birthDate: Date,
  cellphone: string,
  phone: string,
  email: string,
  occupation: string,
  state: string,
}