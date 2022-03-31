var express = require('express');
var router = express.Router();
const { verifyJWT } = require('../verifyJWT');
const { Pool } = require('pg');
const { conn } = require('../db');

router.get('/:cep', verifyJWT, (req, res) => {
  const {usuario, cnpj}  = req.user
  const pool  = new Pool (conn())   
  var qry = `select * from taxa_entrega where empresa='${cnpj}' and cep_inicial <= '${req.params.cep}' and cep_final >= '${req.params.cep}'`
  pool
  .query(qry)
  .then(con => {    
    const dados=con.rows
    res.status(200).send({ auth: true, result: true, dados })
  })
  .catch(err => {
    const e = err.message
    res.status(500).send({ auth: true, result: false, erro: e })      
  })  
})

/*
router.get('/', verifyJWT, (req, res) => {
  const {usuario, cnpj}  = req.user
  const pool  = new Pool (conn())    
  var qry = `select * from taxa_entrega where empresa='${cnpj}`
  pool
  .query(qry)
  .then(con => {    
    const dados=con.rows
    res.status(200).send({ auth: true, result: true, dados })
  })
  .catch(err => {
    const e = err.message
    res.status(500).send({ auth: true, result: false, erro: e })      
  })  
})
 */  

router.post('/', verifyJWT, (req, res) => {
  const {cnpj} = req.user
  const pool  = new Pool(conn())     
  let dados = req.body;
  
  qryText = `insert into taxa_entrega(
    empresa,
    cep_inicial,
    cep_final,
    frete,
    descricao,
    cod_produto
    ) values (
    '${cnpj}'
    ,'${dados.cep_inicial}'
    ,'${dados.cep_final}'
    ,'${dados.frete}'
    ,'${dados.descricao}'
    ,'${dados.cod_produto}')`;

  pool
  .query(qryText)
  .then(() => {
    res.status(200).send({ auth: true, result: true })      
  })
  .catch(err => {
    const e = err.message
    console.log(e);
    res.status(500).send({ auth: true, result: false, erro: e })
})           
})
  


router.delete('/', verifyJWT, (req, res) => {    
    const {usuario, cnpj}  = req.user
    const pool  = new Pool (conn())
    let dados = req.body;
    const qryText = `delete from taxa_entrega where empresa='${cnpj}' and id_cep = ${dados.id_cep} `
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