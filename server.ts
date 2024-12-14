import express, { json } from 'express'
import 'dotenv/config'
import { MainRouter } from './api/routes/index.routes'

const app = express()
const port = process.env.PORT

app.use(json())
app.use('/', MainRouter)
// RODANDO APLICAÇÃO NA PORTA SETADA
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})