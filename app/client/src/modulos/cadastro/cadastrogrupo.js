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

// core components
import Table from "components/Table/Table.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Pagination from "components/Pagination/Pagination.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";

import styles from "assets/jss/material-dashboard-pro-react/views/buttonsStyle.js";

const useStyles = makeStyles(styles);

const axios = require('axios').default;

export default function CadastroGrupo() {
  const classes = useStyles()
  const buttons = [    
    { color: "success", icon: Edit },
    { color: "danger", icon: Close }
  ].map((prop, key) => {
    return (
      <Button color={prop.color} size="sm" className={classes.actionButton} key={key}>
        <prop.icon className={classes.icon} />
      </Button>
    )
  })  
  const [data, setData] = React.useState(()=>{  
  const ListaGrupo = function(){
    var pp = []
    const vhost=function(){
      var sub = String(window.location.hostname).split('.')[0]
      return `http://${sub}.localhost:3000/grupoproduto`
    }
    const token = localStorage.getItem('tokenSRIAPP')    
    axios({
        method: 'get',
        url: vhost(),
        headers: {'Content-Type':'application/json','x-access-token': token}
    })
    .then((res) => {      
        if (res.data.result) {
            console.log(res.data.dados)
            const {dados} = res.data            
            for (var i in dados){ 
                let id         = dados[i]["id"]
                if (id) {
                  let descricao  = dados[i]["descricao"]
                  let cor        = dados[i]["cor"]
                  let p = [String(id)
                          ,descricao
                          ,<div style={{backgroundColor: `#${cor}`, width:'100px', height:'25px',borderRadius: '10px'}}> <br /></div>
                          ,buttons]
                  pp.push(p)  
                }              
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
  ListaGrupo()
  return []
})

  return (
    <Card>
      <CardBody>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <div className={classes.cardHeader}>
              <h4 className={classes.cardTitle}>Cadastro de Grupo</h4>
            </div>
            <div className={classes.cardContentLeft}>
              <Button className={classes.marginRight}>Cadastrar Novo</Button>
                {/*              
                     [["1","7892560124560","BISCOITO RECHEADO GUF UN","1,23","2,70","30",buttons],
                        ["2","7891472589613","FEIJAO MULATINHO KICALDO","2,05","4,5","55",buttons]]
                   
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

                    tableHead={["#","Código EAN","Descrição","Pr. Compra","Pr. Venda","Estoque","Ações"]}
                    tableData={[]}
                */}
            </div>
          </GridItem>          
        </GridContainer>
        <Table tableHead={["#","Descrição","Cor","Ações"]}  tableData={data}/>

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
}
