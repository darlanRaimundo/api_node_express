import { uuid }  from 'uuidv4'
import { ICustomerWallet, ISaveCustomerWalletInput, IUpdateCustomerWalletsInput } from '../types/global'
import { Request, Response } from 'express'
import data from '../data/customerWallets.json'

const customerWalletsMock = data

export const listCustomerWalletsController = async (req: Request, res: Response) => {
    // getCustomerWalletsUseCase
    const _customerWalletsMock = customerWalletsMock.customerWallets.data 

    res.json({
        message: 'Carteira de cliente resgatas com sucesso!',
        data: _customerWalletsMock
    })
}

export const saveCustomerWalletsController = (req: Request, res: Response) => {
    const body = req.body as ISaveCustomerWalletInput | null

    if (!body){
        return {
            message: 'Corpo da requisição não informado!'
        }
    }

    try {
        // getCustomerWalletsUseCase
        const _customerWalletsMock: ICustomerWallet[] = customerWalletsMock.customerWallets.data as unknown as ICustomerWallet[] 
        const _birthDate = new Date(body.birthDate)
        _customerWalletsMock.push({
            id: uuid(),
            parentId: uuid(),
            name: body.name,
            birthDate: _birthDate,
            cellphone: body.cellphone,
            phone: body.phone,
            email: body.email,
            occupation: body.occupation,
            state: body.state,
            createdAt: new Date()
        } as ICustomerWallet)

        res.json({
            message: 'Cliente salvo com sucesso!.'
        })
    } catch (error: any) {
        res.json({
            message: error.message
        })
    }
}

export const removeCustomerWallets = (req: Request, res: Response) => {
    const body = req.body as { customerId: string } | null
    if (!body){
        return {
            message: 'Corpo da requisição não informado!'
        }
    }   

    // getCustomerWalletsUseCase
    const _customerWalletsMock = customerWalletsMock.customerWallets.data

    const customerId = body.customerId

    try {
        const foundCustomerIndex = _customerWalletsMock.findIndex(customer => customer.id === customerId)

        if (foundCustomerIndex === -1) {
            res.json( {
                message: 'Cliente não encontrado na base.',
                customerWallets: _customerWalletsMock
            })
        } else {
            _customerWalletsMock.splice(foundCustomerIndex, 1);
            res.json({
                message: 'Cliente encontrado e deletado com sucesso!.',
                customerWallets: _customerWalletsMock
            })
        }
    } catch (error: any) {
        res.json({
            message: error.message,
        })
    }
}

export const updateCustomerWallets = (req: Request, res: Response) => {
    const body = req.body as IUpdateCustomerWalletsInput | undefined
    if (!body){
        res.json({
            message: 'Corpo da requisição não informado!'
        })
        return
    }   

    // getCustomerWalletsUseCase
    const _customerWalletsMock = customerWalletsMock.customerWallets.data as unknown as ICustomerWallet[]
    const customerId = body.customerId

    try {
        const foundCustomerIndex = _customerWalletsMock.findIndex(customer => customer.id === customerId);

        if (foundCustomerIndex === -1) {
            return {
                message: 'Cliente não encontrado na base.',
                data: _customerWalletsMock,
            }
        } else {
            const newCustomer: ICustomerWallet = {
                id: customerId,
                parentId: body.parentId,
                name: body.name,
                birthDate: body.birthDate,
                cellphone: body.cellphone,
                phone: body.phone,
                email: body.email,
                occupation: body.occupation,
                state: body.state,
                createdAt: new Date()
            };

            _customerWalletsMock.splice(foundCustomerIndex, 1, newCustomer);

            res.json({
                message: 'Cliente encontrado e atualizado com sucesso.',
                data: _customerWalletsMock,
            })
        }
    } catch (error: any) {
        res.json({
            message: error.message
        }) 
    }
}