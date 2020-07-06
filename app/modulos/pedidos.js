const express = require('express');
const router = express.Router();
const { verifyJWT } = require('../verifyJWT');
const { Pool } = require('pg');
const { conn } = require('../db');


router.get('/', verifyJWT, (req, res) => {
    const {cpf,cnpj}  = req.user
      
    const pool  = new Pool (conn())    
    var qry = `select * from pedido where cliente='${cpf}' and empresa = '${cnpj}'`
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
}
)

router.put('/pagamento/:uid', verifyJWT, (req, res) => {
  const {idempresa, id, dbclient} = req.user;
  const pool  = new Pool (conn(dbclient));  
  qryText = `update pedido set autorizacao_pagamento='${req.body.idpagamento}'
            where id_pedido=${req.params.uid}`
  pool
    .query(qryText)
    .then(() => {
      res.status(200).send({ auth:true, result:true })      
    })
    .catch(err=>{
      res.status(800).send({ auth:true, result:false, erro:err.message })
    })
})

router.put('/:uid/:ustatus', verifyJWT, (req, res) => {
  const {idempresa, id, dbclient} = req.user;
  const pool  = new Pool (conn(dbclient));  
  qryText = `update pedido set status='${req.params.ustatus}'
            where id_pedido=${req.params.uid}`
  pool
    .query(qryText)
    .then(() => {
      res.status(200).send({ auth:true, result:true })      
    })
    .catch(err=>{
      res.status(800).send({ auth:true, result:false, erro:err.message })
    })
})


router.get('/itens/:uid', verifyJWT, (req, res) => {
  const {cpf,cnpj}  = req.user
    
  const pool  = new Pool (conn())    
  var qry = `select * from itens_pedido where id_pedido='${req.params.uid}'`
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



router.get('/lista', verifyJWT, (req, res) => {
  const {cpf,cnpj}  = req.user
    const pool  = new Pool (conn())    
  var qry = `SELECT a.id_pedido
            ,a.total
            ,a.status
            ,a.empresa
            ,a.cliente
            ,a.data_pedido
            ,a.entrega
            ,b.cpf
            ,b.nome
            ,b.sobrenome
            ,b.endereco
            ,b.numero
            ,b.bairro            
            ,b.cidade            
            ,b.cep            
            ,b.fone
            ,b.email
            ,a.origem
            ,a.autorizacao_pagamento
            ,a.forma_pagamento
            ,b.endereco
            ,a.numero
            ,a.cep
            ,a.bairro
            ,a.cidade
            ,a.nome_favorecido
            ,a.sobrenome_favorecida
            ,a.fone_favorecido
            ,a.obs
            ,a.presente
            FROM PEDIDO A, CADASTRO B
            WHERE A.cliente = b.cpf
            and a.empresa = '${cnpj}'`
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

router.post('/', verifyJWT, (req, res) => {
    const { cnpj, cpf}  = req.user;
    
    const pool  = new Pool (conn())    
    var qry = `insert into pedido (data_pedido,total,status,empresa,cliente,entrega,origem,forma_pagamento,endereco,numero,cep,bairro,cidade,nome_favorecido,sobrenome_favorecida,fone_favorecido,obs,presente)
               values('${req.body.data_pedido}','${req.body.total}','${req.body.status}','${cnpj}','${cpf}',${req.body.entrega},0,
               '${req.body.forma_pagamento}','${req.body.endereco}','${req.body.numero}','${req.body.cep}','${req.body.bairro}',
               '${req.body.cidade}','${req.body.nome_favorecido}','${req.body.sobrenome_favorecida}','${req.body.fone_favorecido}','${req.body.obs}','${req.body.presente}')
               RETURNING id_pedido `
    pool
    .query(qry)
    .then((result) => {
      var id = result.rows[0].id_pedido;       
       instProd(id,req.body.itens);
          async function instProd(id,itens){
            try {
              for (let i = 0; i < itens.length; i++) {
              
                await pool.query(`insert into itens_pedido(id_pedido,codigo,descricao,qtd,valor)values(${id},'${itens[i].codigo}','${itens[i].descricao}',${itens[i].qtd},${itens[i].valor})`)                
              }
              res.status(200).send({ auth: true, result: true,id:id });               
            } catch (error) {
              res.status(500).send({ auth: true, result: false, erro: error.message });              
            }
             
          }
    })
    .catch(err => {
      const e = err.message
      res.status(500).send({ auth: true, result: false, erro: e })      
    })  
})


module.exports = router


