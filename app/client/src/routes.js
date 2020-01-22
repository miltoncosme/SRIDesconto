import Panels from "views/Components/Panels.js";
import Dashboard from "views/Dashboard/Dashboard.js";
import Icons from "views/Components/Icons.js";
import SweetAlert from "views/Components/SweetAlert.js"

import RegularForms from "views/Forms/RegularForms.js"
import ValidationForms from "views/Forms/ValidationForms.js"
import ExtendedForms from "views/Forms/ExtendedForms.js"
import Table from "./views/Tables/ReactTables"
import CadastroProduto from "modulos/cadastro/cadastroproduto.js"
import CadastroCliente from "modulos/cadastro/cadastrocliente.js"
import CadastroGrupo from "modulos/cadastro/cadastrogrupo.js"
import CadastroFinalizadora from "modulos/cadastro/cadastrofinalizadora.js"
import CadastroUsuario from "modulos/cadastro/cadastrousuario.js"


// @material-ui/icons

import DashboardIcon from "@material-ui/icons/Dashboard";
import Dvr from "@material-ui/icons/Dvr";
import People from "@material-ui/icons/People";
import Person from "@material-ui/icons/Person";
import MonetizationOn from "@material-ui/icons/MonetizationOn";
import LocalMall from "@material-ui/icons/LocalMall";
import DeviceHub from "@material-ui/icons/DeviceHub";
import List from "@material-ui/icons/List";
import AccountBalance from "@material-ui/icons/AccountBalance";
import Layers from "@material-ui/icons/Layers";
import GridOn from "@material-ui/icons/GridOn";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    mini: "DA",
    icon: DashboardIcon,
    component: Dashboard,
    layout: "/admin"
  },
  {
    collapse: true,
    name: "Cadastro",
    mini: "CA",
    icon: Dvr,
    state: "CadastroCollapse",
    views: [
      {
        collapse: true,
        name: "Produto",
        mini: "CP",
        icon: LocalMall,
        state: "multiCollapse",
        views: [
          {
            path: "/produto",
            name: "Item",
            icon: List,
            component: CadastroProduto,
            layout: "/admin"
          },
          {
            path: "/grupo",
            name: "Grupo",
            icon: DeviceHub,
            component: CadastroGrupo,
            layout: "/admin"
          }
        ]
      },
      {   
        path: "/cliente",
        name: "Cliente",
        icon: People,
        component: CadastroCliente,
        layout: "/admin"
        
      },
      {
        path: "/usuario",
        name: "Usuário",        
        icon: Person,
        component: CadastroUsuario,
        layout: "/admin"
      },
      {
        path: "/finalizadora",
        name: "Finalizadora",        
        icon: MonetizationOn,
        component: CadastroFinalizadora,
        layout: "/admin"
      }
    ]
  },
  {
    collapse: true,
    name: "Estoque",
    mini: "ES",
    icon: Layers,
    state: "EstoqueCollapse",
    views: [{}]
  },
  {
    collapse: true,
    name: "Produção",
    mini: "PR",
    icon: GridOn,
    state: "ProducaoCollapse",
    views: [{}]
  },
  {
    collapse: true,
    name: "Financeiro",
    mini: "FI",
    icon: AccountBalance,
    state: "FinanceiroCollapse",
    views: [{}]
  },
  {
    collapse: true,
    name: "Exemplos",
    mini: "FI",
    icon: AccountBalance,
    state: "ExemplosCollapse",
    views: [
      {
        path: "/icons",
        name: "Icons",
        mini: "I",
        component: Icons,
        layout: "/admin"
      },
      {
        path: "/alerts",
        name: "alerts",
        mini: "I",
        component: SweetAlert,
        layout: "/admin"
      },
      {
        path: "/table",
        name: "table",
        mini: "I",
        component: Table,
        layout: "/admin"
      },
      {
        path: "/panels",
        name: "panels",
        mini: "I",
        component: Panels,
        layout: "/admin"
      },
      {
        path: "/regularforms",
        name: "RegularForms",
        mini: "I",
        component: RegularForms,
        layout: "/admin"
      },
      {
        path: "/extendedforms",
        name: "ExtendedForms",
        mini: "I",
        component: ExtendedForms,
        layout: "/admin"
      },
      {
        path: "/validationforms",
        name: "ValidationForms",
        mini: "I",
        component: ValidationForms,
        layout: "/admin"
      }
    ]
  }
];
export default dashRoutes;
