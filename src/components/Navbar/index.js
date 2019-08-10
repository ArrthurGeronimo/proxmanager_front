import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";

import api from './../../services/api';

import Logo from './../../assets/images/logo_temp.png';
import Avatar from './../../assets/images/avatar.jpg';

const avatarStyle = {
  backgroundImage: `url(${Avatar})`
};

export default class Elementos extends Component {
    constructor(props) {
        super(props);
        this.state = {
          usuarioLogado: false,
          informacoesUsuario: [],

          logout: false
        };
    }
    render() {
        return (
          <div className="header py-4">
            {this.redirectLogout()}
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
                      <div className="nav-item  d-md-flex">
                        <Link className="btn btn-sm btn-outline-primary" to="/painel_empresa/inicio" href="javascript:void(0)" onClick={this.verificarSeEstaLogado}>Painel Empresa</Link>
                      </div>
                      */}
                      {this.renderBotaoEntrar()}
                      {this.renderBotaoRegistro()}
                      {this.renderNotificacoes()}
                      {this.renderOpcoesProfile()}
                  </div>
                  <a href="#" className="header-toggler d-lg-none ml-3 ml-lg-0" data-toggle="collapse" data-target="#headerMenuCollapse">
                    <span className="header-toggler-icon"></span>
                  </a>
              </div>
          </div>
        </div>
        );
    }

  verificarSeEstaLogado = () => {
    console.log('VERIFICANDO')
    if (window.sessionStorage.getItem('autenticacao') === 'true') {
      console.log('Verificando se está logado')
      let tokenValue = window.sessionStorage.getItem('token');
      const obj = {
        token: tokenValue
      };
      api.post('/checarToken', obj)
        .then(res => {
          if (res.status === 200) {
            this.setState({
              usuarioLogado: true,
              informacoesUsuario: res.data.empresa
            }, () => {
              console.log(this.state.usuarioLogado)
            })
          } else {
            const error = new Error(res.error);
            throw error;
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
  }

  renderBotaoEntrar = () => {
    if(this.state.usuarioLogado === false){
      return(
        <div className="nav-item  d-md-flex">
          <Link className="btn btn-sm btn-outline-primary" to="/entrar" href="javascript:void(0)" onClick={this.verificarSeEstaLogado}>Entrar</Link>
        </div>
      )
    }
  }
  renderBotaoRegistro = () => {
    if(this.state.usuarioLogado === false){
      return(
        <div className="nav-item  d-md-flex">
          <Link className="btn btn-sm btn-outline-primary" to="/registro" href="javascript:void(0)" onClick={this.verificarSeEstaLogado}>Registro</Link>
        </div>
      )
    }
  }

  renderNotificacoes = () => {
    if(this.state.usuarioLogado === true){
      return(
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
      )
    }
  }

  renderOpcoesProfile = () => {
    if(this.state.usuarioLogado === true){
      return(
        <div className="dropdown">
            <a href="javascript:void(0)" className="nav-link pr-0 leading-none" data-toggle="dropdown" href="javascript:void(0)">
            <span className="avatar" style={avatarStyle}></span>
            <span className="ml-2 d-none d-lg-block">
              <span className="text-default">NOME</span>
              <small className="text-muted d-block mt-1">Programador</small>
            </span>
          </a>
          <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
            <a className="dropdown-item" href="javascript:void(0)">
              <i className="dropdown-icon fe fe-user"></i> Profile
            </a>
            <a className="dropdown-item" href="javascript:void(0)">
              <i className="dropdown-icon fe fe-settings"></i> Settings
            </a>
            <a className="dropdown-item" href="javascript:void(0)">
              <span className="float-right"><span className="badge badge-primary">6</span></span>
              <i className="dropdown-icon fe fe-mail"></i> Inbox
            </a>
            <a className="dropdown-item" href="javascript:void(0)">
              <i className="dropdown-icon fe fe-send"></i> Message
            </a>
            <div className="dropdown-divider"></div>
            <a className="dropdown-item" href="javascript:void(0)">
              <i className="dropdown-icon fe fe-help-circle"></i> Need help?
            </a>
            <a className="dropdown-item" href="javascript:void(0)" onClick={this.logout}>
              <i className="dropdown-icon fe fe-log-out"></i> Sign out
            </a>
          </div>
        </div>
      )
    }
  }

  logout = () =>{
    console.log('LOGOUT')
    if(this.state.logout === false){
      this.setState({ logout: true }, () => {
        window.sessionStorage.removeItem('login');
        window.sessionStorage.removeItem('autenticacao');
        window.sessionStorage.removeItem('token');
      });
    }
  }

  redirectLogout = () => {
    if (this.state.logout) {
      return <Redirect to={{
        pathname: '/'
      }} />
    }
}

}