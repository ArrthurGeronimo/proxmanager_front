import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from "react-router-dom";

import NavBar from './components/Navbar';

import {pageHome} from './pages/Home';
import {pageLogin} from './pages/Login';
import {pageRegistro} from './pages/Registro';
import {pagePainelEmpresa} from './pages/PainelEmpresa';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <NavBar />
          <Route exact path="/" component={pageHome} />
          <Route path="/entrar" component={pageLogin} />
          <Route path="/registro" component={pageRegistro} />
          <Route path="/painel_empresa" component={pagePainelEmpresa} />
        </div>
      </BrowserRouter>
    );
  }
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