var express = require('express');
var router = express.Router();
const { verifyJWT } = require('../verifyJWT');
const { Pool } = require('pg');
const { conn } = require('../db');


router.get('/', verifyJWT, (req, res) => {
    const {usuario, cnpj}  = req.user
    const pool  = new Pool (conn())    
    var qry = `select * from produtos where empresa='${cnpj}'`
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

router.get('/msg', verifyJWT, (req, res) => {
  const {usuario, cnpj}  = req.user
  const pool  = new Pool (conn())    
  var qry = `select * from menssagens where empresa='${cnpj}'`
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
  
router.get('/:codproduto', verifyJWT, (req, res) => { 
    const {usuario, cnpj}  = req.user
    const pool  = new Pool (conn())     
    qry = `select * from produtos where cod_produto='${req.params.codproduto}' and empresa='${cnpj}'` 
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
    const {cnpj} = req.user
    const pool  = new Pool(conn())     
    let dados = req.body;
    
    qryText = `insert into produtos(
      empresa,
      cod_produto,
      descricao,
      preco,
      promocao,
      imagem,
      validade
      ) values (
      '${cnpj}'
      ,'${dados.cod_produto}'
      ,'${dados.descricao}'
      ,${dados.preco}
      ,${dados.promocao}
      ,'${String(dados.imagem)}'
      ,to_date('${String(dados.validade)}','YYYY.MM.DD'))`;

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


router.post('/msg', verifyJWT, (req, res) => {
  const {cnpj} = req.user
  const pool  = new Pool(conn())     
  let dados = req.body;
  
  qryText = `insert into menssagens(
    empresa,
    msg
    ) values (
    '${cnpj}'
    ,'${dados.menssagem}'
    )`;

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
    const qryText = `delete from produtos where empresa='${cnpj}'`
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


router.delete('/:codproduto', verifyJWT, (req, res) => {    
  const {usuario, cnpj}  = req.user
  const pool  = new Pool (conn())
  const qryText = `delete from produtos where and cod_produto='${req.params.codproduto}' and empresa='${cnpj}'`
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