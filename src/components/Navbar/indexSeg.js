import React from 'react'
import { Link } from "react-router-dom";

import api from './../../services/api';

import Logo from './../../assets/images/logo_temp.png';
import Avatar from './../../assets/images/avatar.jpg';

const avatarStyle = {
    backgroundImage: `url(${Avatar})`
};

export default function NavBar() {
  const [values, setValues] = React.useState({
    usuarioAutenticado: false,
    usuarioLogado: 
  });

  //console.log(values)
  const verificaSeEstaLogado = () => {
    if (window.sessionStorage.getItem('autenticacao') === 'true') {
      console.log('Verificando se está logado')
      let tokenValue = window.sessionStorage.getItem('token');
      const obj = {
        token: tokenValue
      };
      api.post('/checarToken', obj)
        .then(res => {
          if (res.status === 200) {
            setValues({
              usuarioLogado: res.data.empresa
            });
            console.log(res.data.empresa)
            //console.log(values.usuarioLogado[0])
          } else {
            const error = new Error(res.error);
            throw error;
          }
        })
        .catch(err => {
          //console.error(err);
        });
      return (
        <ContainerUsuarioAutenticado />
      ) 
    }else{
      return (
        <ContainerUsuarioNaoAutenticado />
      ) 
    }
  }
  const ContainerUsuarioAutenticado = () => {
    return (
      <p>Autenticou</p>
    ) 
  }
  const ContainerUsuarioNaoAutenticado = () => {
    return (
      <p>NÃO Autenticou</p>
    ) 
  }

  return(
    <div className="header py-4">
      <div className="container">
          <div className="d-flex">
            <Link className="header-brand" to="/" href="javascript:void(0)">
              <img src={Logo} className="header-brand-img" alt="tabler logo" />
            </Link>
              <div className="d-flex order-lg-2 ml-auto">
                  {/*
                  <div className="nav-item d-none d-md-flex">
                    <a href="https://github.com/tabler/tabler" className="btn btn-sm btn-outline-primary">Source code</a>
                  </div>
                  */}
                  <div className="nav-item  d-md-flex">
                    <Link className="btn btn-sm btn-outline-primary" to="/entrar" href="javascript:void(0)" onClick={verificaSeEstaLogado}>Entrar</Link>
                  </div>
                  <div className="nav-item  d-md-flex">
                    <Link className="btn btn-sm btn-outline-primary" to="/registro" href="javascript:void(0)">Registro</Link>
                  </div>
                  <div className="nav-item  d-md-flex">
                    <Link className="btn btn-sm btn-outline-primary" to="/painel_empresa/inicio" href="javascript:void(0)">Painel Empresa</Link>
                  </div>
                  <div className="dropdown d-none d-md-flex">
                      <a className="nav-link icon" data-toggle="dropdown" href="javascript:void(0)">
                          <i className="fe fe-bell"></i>
                          <span className="nav-unread"></span>
                      </a>
                      <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                          <a href="/" className="dropdown-item d-flex" href="javascript:void(0)">
                          <span className="avatar mr-3 align-self-center" style={avatarStyle}></span>
                          <div>
                              <strong>Nathan</strong> pushed new commit: Fix page load performance issue.
                              <div className="small text-muted">10 minutes ago</div>
                          </div>
                          </a>
                      </div>
                  </div>
                  <div className="dropdown">
                    <a href="#" className="nav-link pr-0 leading-none" data-toggle="dropdown" href="javascript:void(0)">
                      <span className="avatar" style={avatarStyle}></span>
                      <span className="ml-2 d-none d-lg-block">
                        <span className="text-default">{values.usuarioLogado}</span>
                        <small className="text-muted d-block mt-1">Programador</small>
                      </span>
                    </a>
                    <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                      <a className="dropdown-item" href="#">
                        <i className="dropdown-icon fe fe-user"></i> Profile
                      </a>
                      <a className="dropdown-item" href="#">
                        <i className="dropdown-icon fe fe-settings"></i> Settings
                      </a>
                      <a className="dropdown-item" href="#">
                        <span className="float-right"><span className="badge badge-primary">6</span></span>
                        <i className="dropdown-icon fe fe-mail"></i> Inbox
                      </a>
                      <a className="dropdown-item" href="#">
                        <i className="dropdown-icon fe fe-send"></i> Message
                      </a>
                      <div className="dropdown-divider"></div>
                      <a className="dropdown-item" href="#">
                        <i className="dropdown-icon fe fe-help-circle"></i> Need help?
                      </a>
                      <a className="dropdown-item" href="#">
                        <i className="dropdown-icon fe fe-log-out"></i> Sign out
                      </a>
                    </div>
                  </div>
              </div>
              <a href="#" className="header-toggler d-lg-none ml-3 ml-lg-0" data-toggle="collapse" data-target="#headerMenuCollapse">
                <span className="header-toggler-icon"></span>
              </a>
          </div>
      </div>
    </div>
  )
}