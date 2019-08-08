import React from 'react'
import { Link } from "react-router-dom";


export const navBarEmpresa = ({ props }) => {
  return(
    <div className="header collapse d-lg-flex p-0" id="headerMenuCollapse">
        <div className="container">
            <div className="row align-items-center">
                <div className="col-lg-3 ml-auto">
                    <form className="input-icon my-3 my-lg-0">
                    <input type="search" className="form-control header-search" placeholder="Search&hellip;" tabindex="1"/>
                    <div className="input-icon-addon">
                        <i className="fe fe-search"></i>
                    </div>
                    </form>
                </div>
                <div className="col-lg order-lg-first">
                <ul className="nav nav-tabs border-0 flex-column flex-lg-row">
                  <li className="nav-item">
                    <Link to={`${props.match.url}/inicio`} className="nav-link active"><i className="fe fe-home"></i> Inicio</Link>
                  </li>
                  <li className="nav-item">
                    <a href="javascript:void(0)" className="nav-link" data-toggle="dropdown"><i className="fe fe-box"></i> Infraestrutura</a>
                    <div className="dropdown-menu dropdown-menu-arrow">
                      <a href="#" className="dropdown-item ">Servidores</a>
                      <a href="#" className="dropdown-item ">CTO's</a>
                      <a href="#" className="dropdown-item ">CEO's</a>
                      <a href="#" className="dropdown-item ">Mapa da Rede</a>
                      <a href="#" className="dropdown-item ">Logs</a>
                    </div>
                  </li>
                  <li className="nav-item">
                    <a href="#" className="nav-link"><i className="fe fe-image"></i> Planos</a>
                  </li>
                  <li className="nav-item dropdown">
                    <a href="javascript:void(0)" className="nav-link" data-toggle="dropdown"><i className="fe fe-calendar"></i> Clientes</a>
                    <div className="dropdown-menu dropdown-menu-arrow">
                      <a href="#" className="dropdown-item ">Clientes</a>
                      <a href="#" className="dropdown-item ">Planos</a>
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
  )
}
export default navBarEmpresa