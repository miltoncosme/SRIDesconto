//const bodyParser = require('body-parser');
var http = require('http');
cors = require('cors');
const express = require('express');
const app = express();
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const helmet = require('helmet');
var jwt = require('jsonwebtoken');
require('dotenv-safe').config();
app.options('*', cors());
const { Pool } = require('pg');
const { conn } = require('./db');

app.use(express.json({limit: '1mb', extended: true}));

app.use(function(req, res, next) {  
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
})

app.post('/login', async (req, res) => {   
 
  const {usuario} = req.body;//'sri';
  const {senha} = req.body;//'740516';  
  const {cnpj} = req.body;//'740516';
  const {cpf} = req.body;//'740516';  
  if (usuario==='sri' && senha==='740516'){
    try {
      var token = jwt.sign({usuario, cnpj, cpf}, process.env.SECRET, {
        expiresIn: 3200
      })
      const pool  = new Pool (conn());
      try {
        const con = await pool.query(`select nome from cadastro where cpf='${cpf}' and empresa='${cnpj}'`)
        return res.status(200).send({ auth: true, token, cadastrado:(con.rows.length > 0) });        
      } catch (err) {
        res.status(500).send({ auth: false, erro: `Houve falha na validação. Segui: ${err.message}` })
      }
    } catch {
      res.status(500).send({ auth: false, erro: 'Houve falha na validação.' });
    }
  } else {
    res.status(500).send({ auth: false, erro: 'Usuário não autorizado.' });
  }
});

app.use('/produto', require('./modulos/produto'));
app.use('/cadastro', require('./modulos/cliente'));
app.use('/lista', require('./modulos/lista'));
app.use('/pedidos', require('./modulos/pedidos'));
app.use('/menssagens', require('./modulos/menssagens'));
app.use('/slide', require('./modulos/slide'));
app.use('/banners', require('./modulos/banners'));
app.use('/valorCarrinho', require('./modulos/lista'));

app.use(logger('dev'));
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
var server = http.createServer(app);
server.listen(process.env.PORT, ()=> console.log(`Servidor ON. Port: ${process.env.PORT}.`));



