import { Customer } from "../models/CustomerModel";
import { ICustomerWallet } from "../types/global";

export interface ICustomerRepository {
  getCustomer(id: string): Promise<ICustomerWallet>; // Método para buscar um cliente por ID.
  getAllCustomers(): Promise<ICustomerWallet[]>; // Método para buscar todos os clientes.
  createCustomer(data: ICustomerWallet): Promise<ICustomerWallet>; // Método para criar um novo cliente.
  updateCustomer(data: Partial<ICustomerWallet>): Promise<ICustomerWallet>; // Método para atualizar um cliente existente.
  removeCustomer(id: string): Promise<boolean>; // Método para remover um cliente pelo ID.
}

/*
  * A classe CustomerRepository implementa os métodos definidos pela interface ICustomerRepository.
    Ela é responsável por interagir diretamente com o banco de dados (utilizando o modelo Mongoose Customer).

  -> Métodos:
    getCustomer: Busca um cliente pelo ID.
    getAllCustomers: Busca todos os clientes.
    createCustomer: Cria um novo cliente.
    updateCustomer: Atualiza os dados de um cliente existente.
    removeCustomer: Remove um cliente com base no ID.
*/
export class CustomerRepository implements ICustomerRepository {
  /*
   * Método getCustomer: Recupera um cliente específico pelo ID. Usa o método findById do Mongoose para buscar o cliente no banco de dados.
   * O retorno é tipado como ICustomerWallet para garantir que os dados do cliente estejam no formato correto.
   */
  async getCustomer(id: string): Promise<ICustomerWallet> {
    const customers = await Customer.findById(id); // Faz uma consulta no banco de dados pelo ID.
    return customers as ICustomerWallet; // Retorna o cliente encontrado como tipo `ICustomerWallet`.
  }

  /*
   * Método getAllCustomers: Recupera todos os clientes armazenados no banco de dados. A consulta Customer.find() retorna todos os registros da coleção de clientes.
   * O retorno é tipado como um array de ICustomerWallet.
   */
  async getAllCustomers(): Promise<ICustomerWallet[]> {
    const customers = await Customer.find(); // Recupera todos os clientes do banco de dados.
    return customers as ICustomerWallet[]; // Retorna todos os clientes como um array do tipo `ICustomerWallet`.
  }

  /*
   * Método createCustomer: Cria um novo cliente a partir dos dados passados (que devem seguir o tipo ICustomerWallet).
   * O cliente é instanciado utilizando o modelo Customer do Mongoose e, após ser configurado, é salvo no banco de dados com customer.save().
   * Retorna o cliente recém-criado.
   */
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
      createdAt: new Date(), // Define a data de criação do cliente.
    } as ICustomerWallet); // Tipagem explícita de `data` como `ICustomerWallet`.

    return await customer.save(); // Salva o cliente no banco de dados e retorna o cliente salvo.
  }

  /*
   * Método updateCustomer: Atualiza um cliente existente no banco de dados com base no ID.
   * A função findByIdAndUpdate do Mongoose é utilizada para encontrar o cliente pelo ID e aplicar as atualizações com os dados fornecidos.
   * Retorna o cliente atualizado.
   */
  async updateCustomer(data: ICustomerWallet): Promise<ICustomerWallet> {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      {
        _id: data.id, // Identificador do cliente a ser atualizado.
      },
      data // Os dados que serão usados para atualização.
    ).exec(); // Executa a operação de atualização no banco de dados.

    return updatedCustomer as ICustomerWallet; // Retorna o cliente atualizado como tipo `ICustomerWallet`.
  }

  /*
   * Método removeCustomer: Remove um cliente do banco de dados com base no ID.
   * Utiliza findByIdAndDelete para procurar e deletar o cliente.
   * Retorna true se o cliente foi removido com sucesso (ou seja, se o cliente foi encontrado e excluído), e false caso contrário.
   */
  async removeCustomer(id: string): Promise<boolean> {
    const foundCustomer = await Customer.findByIdAndDelete({
      _id: id, // Identificador do cliente a ser removido.
    }).exec(); // Executa a remoção do cliente.

    return !!foundCustomer; // Retorna um valor booleano, indicando se o cliente foi encontrado e removido com sucesso.
  }
}
