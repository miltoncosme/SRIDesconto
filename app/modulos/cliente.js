var express = require('express')
var router = express.Router()
const { verifyJWT } = require('../verifyJWT')
const { Pool } = require('pg')
const { conn } = require('../db')



router.get('/', verifyJWT, (req, res) => {
    const {cpf}  = req.user
    const pool  = new Pool (conn())    
    var qry = `select * from cadastro where cpf='${cpf}'`
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
    const { cnpj, cpf}  = req.user
    const pool  = new Pool (conn())    
    var qry = `insert into cadastro(cpf,nome,email,empresa)values('${cpf}','${req.body.nome}','${req.body.email}','${cnpj}')`
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