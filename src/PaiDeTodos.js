import React, { Component } from 'react';
import { render } from 'react-dom';
import { Route, Router } from "react-router-dom";
import history from './history';
import withAuth from './services/auth';

import api from './services/api';

import NavBar from './components/Navbar';

import pageHome from './pages/Home';
import {pageLogin} from './pages/Login';
import {pageRegistro} from './pages/Registro';
import {pagePainelEmpresa} from './pages/PainelEmpresa';

export default function App() {

  const [values, setValues] = React.useState({
    usuarioAutenticado: null,
    usuarioLogado: 'USUARIO',
    ultimoCaminho: ''
  });

  const VerificarAutenticacao = () => {
    console.log('VERIFICANDO');
    setValues({
      ...values,
      usuarioAutenticado: true,
      usuarioLogado: 'response.data'
    });
  }

  history.listen((location) => {
    //${location.pathname}
    setValues({
      ...values,
      ultimoCaminho: 'location.pathname'
    });
    console.log(location.pathname);
    /*
    if (window.sessionStorage.getItem('autenticacao') === 'true'){
      if(typeof window.sessionStorage.getItem('segredo') === 'undefined' || window.sessionStorage.getItem('segredo') === null ){
        //console.log('Não tem Segredo')
      }else{
        let segredo = window.sessionStorage.getItem('segredo');
        api.get(`/empresa/${segredo}`)
        .then(response => {
          
        })
        console.log(values.usuarioAutenticado)
      }
    }else{
      //console.log('Não Autenticado')
    }
    */

    console.log('alterou')
    VerificarAutenticacao()
  
  });

  return(
    <Router history={history} >
      <div>
        <NavBar usuarioAutenticado={values.usuarioAutenticado} usuarioLogado={values.usuarioLogado} />
        <Route exact path="/" component={pageHome} />
        <Route path="/entrar" component={pageLogin} />
        <Route path="/registro" component={pageRegistro} />
        <Route path="/painel_empresa" component={withAuth(pagePainelEmpresa)} />
      </div>
    </Router>
  )
}

render(<App />, document.getElementById('root'));

/**
 * React Router 4.1.2 example
 * This snippet includes following examples:
 * 
 * - Basic multi-view application 
 * - Route Parameters (views/Catalog)
 * - Nested Routes with sub-viws (views/Nested)
 */