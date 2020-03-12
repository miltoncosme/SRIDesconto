var express = require('express');
var router = express.Router();
const { verifyJWT } = require('../verifyJWT');
const { Pool } = require('pg');
const { conn } = require('../db');


router.get('/', verifyJWT, (req, res) => {
    const {cpf}  = req.user
    const {usuario, cnpj}  = req.user
    const pool  = new Pool (conn())  
    var qry = `select a.codproduto
    ,b.descricao 
    ,b.preco
    ,b.promocao
    ,b.imagem
    from cliproduto a ,produtos b
    where a.cliente ='${cpf}'
      and a.empresa = '${cnpj}'
      and a.empresa = b.empresa
      and a.codproduto = b.cod_produto`;
    pool
    .query(qry)
    .then(con => {    
      const dados=con.rows
      dados.forEach(data=>
        data.imagem=String(data.imagem)
      )
      res.status(200).send({ auth: true, result: true, dados })
    })
    .catch(err => {
      const e = err.message
      res.status(500).send({ auth: true, result: false, erro: e })      
    })  
})
  
  
router.post('/', verifyJWT, (req, res) => {  
    const {cpf} = req.user
    const {usuario,cnpj} = req.user
    const pool  = new Pool(conn())     
    let dados = req.body
        
    qryText = `insert into cliproduto(
      cliente,
      codproduto,
      empresa
      ) values (
      '${cpf}'
      ,'${dados.cod_produto}'
      ,'${cnpj}'
      )`;
    pool
    .query(qryText)
    .then(() => {
      res.status(200).send({ auth: true, result: true })      
    })
    .catch(err => {
      const e = err.message
      res.status(500).send({ auth: true, result: false, erro: e })
  })           
})


router.delete('/:codproduto', verifyJWT, (req, res) => {    
    const {cpf}  = req.user
    const pool  = new Pool (conn())
    var qryText
    if (req.params.codproduto==='todos'){
        qryText = `delete from cliproduto where cliente='${cpf}'`
    } else {
        qryText = `delete from cliproduto where cliente='${cpf}' and codproduto='${req.params.codproduto}'`
    }    
    pool
      .query(qryText)
      .then(() => {
        res.status(200).send({ auth: true, result: true })
      })  
      .catch((err) => { 
        const e = err.message
        res.status(500).send({ auth: true, result: false, erro: e })
      })
})


module.exports = router