import express, { json } from 'express'
import { MainRouter } from './api/routes/index.routes'

const app = express()
const port = 8080

app.use(json())
app.use('/', MainRouter)
// RODANDO APLICAÇÃO NA PORTA SETADA
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})