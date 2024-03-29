var express = require('express');
var router = express.Router();
const { verifyJWT } = require('../verifyJWT');
const { Pool } = require('pg');
const { conn } = require('../db');


router.get('/', verifyJWT, (req, res) => {
    const {cpf, cnpj}  = req.user    
    const pool  = new Pool (conn())  
    var qry = `select a.codproduto
    ,b.descricao 
    ,b.preco
    ,b.promocao
    ,b.imagem_grande as imagem
    ,a.qtd
    from cliproduto a ,produtos b
    where a.cliente ='${cpf}'
      and a.empresa = '${cnpj}'
      and a.empresa = b.empresa
      and a.codproduto = b.cod_produto
      and b.validade >= current_date`;
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

router.get('/valorCarrinho', verifyJWT, (req, res) => {
  const {cpf, cnpj}  = req.user    
  const pool  = new Pool (conn())  
  var qry = `select sum(b.preco*a.qtd) as total
    from cliproduto a ,produtos b
  where a.cliente ='${cpf}'
    and a.empresa = '${cnpj}'
    and a.empresa = b.empresa
    and a.codproduto = b.cod_produto
    and b.validade >= current_date`;
  pool
  .query(qry)
  .then(con => {    
    const dados=con.rows[0]
    //dados.forEach(data=>
   //   data.imagem=String(data.imagem)
   // )
    res.status(200).send({ auth: true, result: true, dados })
  })
  .catch(err => {
    const e = err.message
    res.status(500).send({ auth: true, result: false, erro: e })      
  })  
})

router.get('/semimagem', verifyJWT, (req, res) => {
  const {cpf, cnpj}  = req.user    
  const pool  = new Pool (conn())  
  var qry = `select a.codproduto
  ,b.descricao 
  ,b.preco
  ,b.promocao
  ,a.qtd
  from cliproduto a ,produtos b
  where a.cliente ='${cpf}'
    and a.empresa = '${cnpj}'
    and a.empresa = b.empresa
    and a.codproduto = b.cod_produto
    and b.validade >= current_date`;
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
    const {cpf} = req.user;
    const {cnpj} = req.user;
    const pool  = new Pool(conn());
    let dados = req.body;        
    qryText = `insert into cliproduto(
      cliente,
      codproduto,
      empresa,
      qtd
      ) values (
      '${cpf}'
      ,'${dados.cod_produto}'
      ,'${cnpj}'
      ,'${dados.qtd}'
      ) ON CONFLICT (cliente,empresa,codproduto)
	  DO 
       UPDATE SET qtd = cliproduto.qtd + '${dados.qtd}'`;
	  pool
    .query(qryText)
    .then(() => {
      res.status(200).send({ auth: true, result: true })      
    })
    .catch(err => {
      const e = err.message
      res.status(500).send({ auth: true, result: false, erro: e })
  })           
});

router.put('/:cpf/:cnpj/:codproduto/:usado', verifyJWT, (req, res) => {  
  const {cpf, cnpj, codproduto, usado} = req.params;  
  const pool  = new Pool(conn());

  qryText = `update cliproduto
              set usado=${usado} 
             where cliente='${cpf}'
              and empresa='${cnpj}' 
              and codproduto='${codproduto}'`;
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