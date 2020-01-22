/*eslint-disable*/
import React from "react"
import SweetAlert from "react-bootstrap-sweetalert";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import Face from "@material-ui/icons/Face";
//import Email from "@material-ui/icons/Email";
// import LockOutline from "@material-ui/icons/LockOutline";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";


import styles from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.js";

const useStyles = makeStyles(styles);

const axios = require('axios').default;

export default function LoginPage() {
  const classes = useStyles();
  const [alert, setAlert] = React.useState(null);

  const basicAlert = (msg) => {
    setAlert(
      <SweetAlert
        style={{ display: "block", marginTop: "-100px" }}
        title={msg}
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
        confirmBtnCssClass={classes.button + " " + classes.success}
      />
    );
  };

  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function() {
    setCardAnimation("");
  }, 700);

  const login = function() {
    const vhost=function(){
      var sub = String(window.location.hostname).split('.')[0]
      return `http://${sub}.localhost:3000/login`
    }
    console.log(vhost())
    axios({
      method: 'post',
      url: vhost(),
      data: {
        user: document.getElementById('firstname').value,
        pwd: document.getElementById('password').value
      }
    })
    .then((res) => {
      const {data} = res      
      if (data.auth) {
        console.log(data.token)
        localStorage.setItem('tokenSRIAPP', data.token)
        window.location.reload()
      } else {
        localStorage.setItem('tokenSRIAPP', '')
      }
    })
    .catch((error) => {      
      const {data} = error.response
      localStorage.setItem('tokenSRIAPP', '')
      basicAlert(data.erro)
    })
  }
  const hideAlert = () => {
    setAlert(null);
  };
  const divStyle = {
    background: '#37BC9B'  
  };
  
  return (
    <div>
      <div className={classes.container}>
      {alert}
        <GridContainer justify="center" alight="center" >
          <GridItem xs={12} sm={6} md={4}>
            <form>
              <Card login className={classes[cardAnimaton]}>
                <CardHeader
                  className={`${classes.cardHeader} ${classes.textCenter}`}
                  color="rose" style={divStyle}
                >
                  <h4 className={classes.cardTitle}>Login</h4>
                  
                </CardHeader>
                <CardBody>
                  <CustomInput
                    labelText="Usuário"
                    id="firstname"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Face className={classes.inputAdornmentIcon} />
                        </InputAdornment>
                      )
                    }}
                  />
                  <CustomInput
                    labelText="Senha"
                    id="password"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Icon className={classes.inputAdornmentIcon}>
                            lock_outline
                          </Icon>
                        </InputAdornment>
                      ),
                      type: "password",
                      autoComplete: "off"
                    }}
                  />
                </CardBody>
                <CardFooter className={classes.justifyContentCenter}>
                  <Button color="rose" simple size="lg" block onClick={login}>
                    Logar
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
