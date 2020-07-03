var express = require('express');
var router = express.Router();
const isCpf = require('iscpf');
const { verifyJWT } = require('../verifyJWT');
const { Pool } = require('pg');
const { conn } = require('../db');




router.get('/', verifyJWT, (req, res) => {
    const {cnpj,cpf}  = req.user
    const pool  = new Pool (conn())    
    var qry = `select * from cadastro where cpf='${cpf}' and empresa='${cnpj}'`
    pool
    .query(qry)
    .then(con => {    
      const dados=con.rows[0]
      res.status(200).send({ auth: true, result: true, dados })
    })
    .catch(err => {
      const e = err.message
      res.status(500).send({ auth: true, result: false, erro: e })      
    })  
})

router.post('/', verifyJWT, (req, res) => {
    
    const { cnpj, cpf}  = req.user;
    /*if (isCpf(cpf)===false){
      res.status(500).send({ auth: true, result: false, erro: 'CPF inválido.' });
      return;
    } */ 
    const pool  = new Pool (conn())    
    var qry = `INSERT INTO CADASTRO (cpf,nome,email,empresa,endereco,fone,sobrenome,numero,cep,bairro,cidade)
    VALUES
    ('${cpf}','${req.body.nome}','${req.body.email}','${cnpj}','${req.body.endereco}','${req.body.fone}','${req.body.sobrenome}','${req.body.numero}','${req.body.cep}','${req.body.bairro}','${req.body.cidade}')
    ON CONFLICT (CPF,empresa) 
    DO 
       UPDATE SET nome = '${req.body.nome}',email = '${req.body.email}' ,endereco = '${req.body.endereco}',fone = '${req.body.fone}',sobrenome = '${req.body.sobrenome}',numero = '${req.body.numero}',cep = '${req.body.cep}',bairro = '${req.body.bairro}',cidade = '${req.body.cidade}'`  
    pool
    .query(qry)
    .then(() => {          
      res.status(200).send({ auth: true, result: true })
    })
    .catch(err => {
      const e = err.message
      res.status(500).send({ auth: true, result: false, erro: e })      
    })  
})

router.delete('/', verifyJWT, (req, res) => {
    const {cpf}  = req.user
    const pool  = new Pool (conn())    
    var qry = `delete from cadastro where cpf='${cpf}'`
    pool
    .query(qry)
    .then(() => {    
      res.status(200).send({ auth: true, result: true })
    })
    .catch(err => {
      const e = err.message
      res.status(500).send({ auth: true, result: false, erro: e })      
    })  
})

module.exports = router