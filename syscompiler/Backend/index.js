const parser = require('./Gramaticas/Gramatica')
const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())

app.use(express.json())

const PORT = 5000

app.post("/", async (req, res)=>{
    const {entrada} = req.body
    const respuesta = parser.parse(entrada)
    return res.send({message: respuesta.toString()})
})

app.listen(PORT, ()=>console.log("SERVIDOR INICIADO EN EL PUERTO: "+PORT))
