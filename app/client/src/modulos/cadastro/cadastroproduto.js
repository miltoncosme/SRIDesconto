/*eslint-disable*/
import React from "react"

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
//import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
//import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
//import PriorityHigh from "@material-ui/icons/PriorityHigh";
//import Check from "@material-ui/icons/Check";
//import Warning from "@material-ui/icons/Warning";
import Close from "@material-ui/icons/Close";
import Edit from "@material-ui/icons/Edit";
//import Favorite from "@material-ui/icons/Favorite";
import LibraryBooks from "@material-ui/icons/LibraryBooks";

// core components
import Table from "components/Table/Table.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Pagination from "components/Pagination/Pagination.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";

import styles from "assets/jss/material-dashboard-pro-react/views/buttonsStyle.js";

import Modal  from 'react-bootstrap/Modal'
import ReactModal from 'react-modal'




const useStyles = makeStyles(styles);

const axios = require('axios').default;


export default function CadastroProduto() {
  const [modoEx, setmMdoEx] = React.useState(0);
  const swNormal = () => setmMdoEx(0);
  const swEdicao = () => setmMdoEx(1);
  const swConsulta = () => setmMdoEx(5);
  
  const classes = useStyles()

  const buttons = [    
    { color: "success", icon: Edit },
    { color: "danger", icon: Close }
  ].map((prop, key) => {
    return (
      <Button color={prop.color} size="sm" className={classes.actionButton} key={key} onClick={swEdicao}>
        <prop.icon className={classes.icon} />
      </Button>
    )
  })
  
  const [data, setData] = React.useState(()=>{
  
  const ListaProd = function(){

  var pp = []
  const vhost=function(){
    var sub = String(window.location.hostname).split('.')[0]
    return `http://${sub}.localhost:3000/produto`
  }
  const token = localStorage.getItem('tokenSRIAPP')
  
  axios({
      method: 'get',
      url: vhost(),
      headers: {'Content-Type':'application/json','x-access-token': token}
  })
  .then((res) => {
      //const {data} = res
      if (res.data.result) {
          console.log(res.data.dados)
          const {dados} = res.data            
          for (var i in dados){ 
              let id         = dados[i]["id"]
              let codproduto = dados[i]["codproduto"]
              let descricao  = dados[i]["descricao"]
              let compra     = dados[i]["compra"]
              let venda      = dados[i]["venda"]
              let estoque    = dados[i]["estoque"]
              let p = [String(id)
                      ,codproduto
                      ,descricao
                      ,compra.replace('.',',')
                      ,venda.replace('.',',')
                      ,estoque.replace('.',',')
                      ,buttons]
              pp.push(p)                
          }
          console.log(pp)
          setData(pp)
      }          
  })
  .catch((err) => {     
      console.log('erro: ', err.response)
      try {
        if (!err.response.data.auth) {
          localStorage.setItem('tokenSRIAPP','')
          window.location.reload()
        }
      } catch (error) {
        console.log(error)
      }
  })
  }
  ListaProd()
  return []
})

  switch(modoEx) {
    case 0: return (
      <Card>
        <CardBody>
          <GridContainer>        
            <GridItem xs={12} sm={12} md={12}>
              <div className={classes.cardHeader}>
                <h4 className={classes.cardTitle}>Cadastro de Produtos</h4>
              </div>
              <div className={classes.cardContentLeft}>
                <Button className={classes.marginRight}>Cadastrar Novo</Button>
              </div>
            </GridItem>          
          </GridContainer>
          <Table 
            tableHead={["#","Código EAN","Descrição","Pr. Compra","Pr. Venda","Estoque","Ações"]}  
            tableData={data}
            customCellClasses={[
              classes.center,
              classes.right,
              classes.right
          ]}
          // 0 is for classes.center, 4 is for classes.right, 5 is for classes.right
          customClassesForCells={[0, 4, 6]}
          customHeadCellClasses={[
              classes.center,
              classes.right,
              classes.right
          ]}
          // 0 is for classes.center, 4 is for classes.right, 5 is for classes.right
          customHeadClassesForCells={[0, 4, 6]}          
          />
  
                  {/*
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>            
              <div className={classes.cardContentRigth}>              
                <Pagination
                  pages={[
                    { text: "Anterior" },
                    { text: 1 },
                    { text: 2 },
                    { active: true, text: 3 },
                    { text: 4 },
                    { text: 5 },
                    { text: "Próximo" }
                  ]}
                  color="info"
                />
              </div>
            </GridItem>          
                </GridContainer>*/}
        </CardBody>      
      </Card> 
    );
    case 1:
      return (
        <Card>
          <CardHeader color="success" icon>
              <CardIcon color="success">
                <Edit />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>Date Picker</h4>
          </CardHeader>
          <CardBody>
            <GridContainer>        
              <GridItem xs={12} sm={12} md={12}>
                <div className={classes.cardHeader}>
                  <h4 className={classes.cardTitle}>Cadastro de Produtos (Modo Edição)</h4>
                </div>
                <div className={classes.cardContentLeft}>
                  <Button className={classes.marginRight}>Salvar</Button>
                  <Button className={classes.marginRight} onClick={swNormal}>Voltar</Button>
                </div>
              </GridItem> 
              <GridItem xs={12} sm={12} md={12}>

              </GridItem>         
            </GridContainer>
          </CardBody>
        </Card>
        )
    case 2:  
      return (
        <Card>
          <CardBody>
          </CardBody>
        </Card>
    ) 
  }


  
}
