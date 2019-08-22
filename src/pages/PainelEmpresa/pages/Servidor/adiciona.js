import React, { Component } from 'react';

import FormAdicionar from './components/FormAdicionar';

export default class PageAdicionaServidor extends Component {
  render() {
    return (
      <div className="my-3 my-md-5">
        <div className="container">
          <div className="page-header">
            <h1 className="page-title">
              Adicionar Servidor
            </h1>
          </div>
            
          <FormAdicionar />
            
        </div>
      </div>
    )
  }
}
