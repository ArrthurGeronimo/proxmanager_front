import React from 'react';
import { Link, Route, Redirect } from "react-router-dom";

import NavBarSistemaAutenticado from './../../components/Layout/NavBarAutenticado';
import NavBarSistemaNaoAutenticado from './../../components/Layout/NavbarNaoAutenticado';
//import NavBarEmpresa from './Components/NabBarEmpresa';

import Inicio from './pages/Inicio';
import ServidorAdicionar from './pages/Servidor/adiciona';
import ServidorGerenciar from './pages/Servidor/gerencia';
import PlanoAdicionar from './pages/Plano/adiciona';
import PlanoGerenciar from './pages/Plano/gerencia';
import ClienteAdicionar from './pages/Cliente/adiciona';
import ClienteGerenciar from './pages/Cliente/gerencia';

export const pagePainelEmpresa = ({ match }) => {

  const renderMenuSistema = () => {
    if(window.localStorage.getItem('autenticacao') === 'true'){
      return(
        <NavBarSistemaAutenticado />
      )
    }else{
      return(
        <NavBarSistemaNaoAutenticado />
      )
    }
  }
  return (
    <div>
      {renderMenuSistema()}
      <div className="header collapse d-lg-flex p-0" id="headerMenuCollapse">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-3 ml-auto">
              <form className="input-icon my-3 my-lg-0">
                <input type="search" className="form-control header-search" placeholder="Search&hellip;"/>
                  <div className="input-icon-addon">
                    <i className="fe fe-search"></i>
                  </div>
              </form>
            </div>
            <div className="col-lg order-lg-first">
              <ul className="nav nav-tabs border-0 flex-column flex-lg-row">
                <li className="nav-item">
                  <Link to={`${match.url}/inicio`} className="nav-link active"><i className="fe fe-home"></i> Inicio</Link>
                </li>
                <li className="nav-item">
                  <a href="javascript:void(0)" className="nav-link" data-toggle="dropdown"><i className="fe fe-box"></i> Infraestrutura</a>
                  <div className="dropdown-menu dropdown-menu-arrow">
                    <Link to={`${match.url}/adicionar_servidor`} className="dropdown-item">Adicionar Servidor</Link>
                    <Link to={`${match.url}/gerenciar_servidores`} className="dropdown-item">Gerenciar Servidores</Link>
                    <a href="#" className="dropdown-item ">CTO's</a>
                    <a href="#" className="dropdown-item ">CEO's</a>
                    <a href="#" className="dropdown-item ">Mapa da Rede</a>
                    <a href="#" className="dropdown-item ">Logs</a>
                  </div>
                </li>
                <li className="nav-item dropdown">
                  <a href="javascript:void(0)" className="nav-link" data-toggle="dropdown"><i className="fe fe-image"></i> Planos</a>
                  <div className="dropdown-menu dropdown-menu-arrow">
                    <Link to={`${match.url}/adicionar_plano`} className="dropdown-item">Adicionar Plano</Link>
                    <Link to={`${match.url}/gerenciar_planos`} className="dropdown-item">Gerenciar Planos</Link>
                  </div>
                </li>
                <li className="nav-item dropdown">
                  <a href="javascript:void(0)" className="nav-link" data-toggle="dropdown"><i className="fe fe-calendar"></i> Clientes</a>
                  <div className="dropdown-menu dropdown-menu-arrow">
                    <Link to={`${match.url}/adicionar_cliente`} className="dropdown-item">Adicionar Clientes</Link>
                    <Link to={`${match.url}/gerenciar_cliente`} className="dropdown-item">Gerenciar Clientes</Link>
                    <a href="#" className="dropdown-item ">IP Pool</a>
                  </div>
                </li>
                <li className="nav-item dropdown">
                  <a href="javascript:void(0)" className="nav-link" data-toggle="dropdown"><i className="fe fe-calendar"></i> Financeiro</a>
                  <div className="dropdown-menu dropdown-menu-arrow">
                    <a href="#" className="dropdown-item ">Carnês</a>
                    <a href="#" className="dropdown-item ">Boletos</a>
                  </div>
                </li>
                <li className="nav-item dropdown">
                  <a href="javascript:void(0)" className="nav-link" data-toggle="dropdown"><i className="fe fe-calendar"></i> ProXNet</a>
                  <div className="dropdown-menu dropdown-menu-arrow">
                    <a href="#" className="dropdown-item ">Funcionários</a>
                    <a href="#" className="dropdown-item ">Documentos</a>
                    <a href="#" className="dropdown-item ">Produtos</a>
                    <a href="#" className="dropdown-item ">Importar Clientes do MK-Auth</a>
                  </div>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link"><i className="fe fe-image"></i> OS's</a>
                </li>
              </ul>
            </div>
          </div> 
        </div>
      </div>

      {/*default message*/}
      <Route exact path={match.url} render={() => (
        <Redirect to={`${match.url}/inicio`}/>
      )}/>
      
      <Route path={`${match.url}/:sectionName`} component={SubView}/>
    </div>
  )
};

const SubView = ({ match }) => {
  if(match.params.sectionName === 'inicio'){
    return(
      <Inicio />
    )
  }else if(match.params.sectionName === 'adicionar_servidor'){
    return(
      <ServidorAdicionar />
    )
  }else if(match.params.sectionName === 'gerenciar_servidores'){
    return(
      <ServidorGerenciar />
    )
  }else if(match.params.sectionName === 'gerenciar_planos'){
    return(
      <PlanoGerenciar />
    )
  }else if(match.params.sectionName === 'adicionar_plano'){
    return(
      <PlanoAdicionar />
    )
  }else if(match.params.sectionName === 'adicionar_cliente'){
    return(
      <ClienteAdicionar />
    )
  }else if(match.params.sectionName === 'gerenciar_cliente'){
    return(
      <ClienteGerenciar />
    )
  }else{
    return(
      <div>
        <h3>Section: {match.params.sectionName}</h3>
      </div>
    )
  }
};