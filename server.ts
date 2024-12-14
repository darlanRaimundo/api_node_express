import express, { json } from 'express'
import 'dotenv/config'
import { MainRouter } from './api/routes/index.routes'
import mongoose from 'mongoose'

const app = express()
app.use(json())
const port = process.env.PORT

mongoose.connect('mongodb+srv://darlanRaimundo:nagini100@customerswallet.toiuo.mongodb.net/customerWallets?retryWrites=true&w=majority&appName=CustomersWallet')

app.use('/', MainRouter)
// RODANDO APLICAÇÃO NA PORTA SETADA
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})