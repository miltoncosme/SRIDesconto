const bodyParser = require('body-parser')
const { verifyJWT } = require('./verifyJWT')
var http = require('http')
cors = require('cors')
const { Pool } = require('pg')
const express = require('express')
const app = express();
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const helmet = require('helmet')
var jwt = require('jsonwebtoken')
require('dotenv-safe').config()
const { conn } = require('./db')
app.options('*', cors())

app.use(bodyParser.json())

app.use(function(req, res, next) {  
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
  })

app.post('/login', (req, res) => {   
  const {usuario} = req.body;//'sri';
  const {senha} = req.body;//'740516';  
  const {cnpj} = req.body;//'740516';
  const {cpf} = req.body;//'740516';  
  if (usuario==='sri' && senha==='740516'){
    try {
      var token = jwt.sign({usuario, cnpj, cpf}, process.env.SECRET, {
        expiresIn: 3200
      })
      res.status(200).send({ auth: true, token })      
    } catch {
      res.status(500).send({ auth: false, erro: 'Houve falha na validação.' })      
    }
  } else {
    res.status(500).send({ auth: false, erro: 'Usuário não autorizado.' })      
  }
})




app.use('/produto', require('./modulos/produto'))
app.use('/cadastro', require('./modulos/cliente'))
app.use('/lista', require('./modulos/lista'))

app.use(logger('dev'))
app.use(helmet())
app.use(express.json())
app.use(cookieParser())
var server = http.createServer(app);
server.listen(3001, ()=> console.log('Servidor ON'))



