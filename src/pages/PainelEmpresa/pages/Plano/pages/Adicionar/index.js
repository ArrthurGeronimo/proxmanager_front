import React, { Component } from 'react';

import FormAdicionar from './components/FormAdicionar';

const PlanoAdicionar = () => (
  <div className="my-3 my-md-5">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">
            Adicionar Plano
          </h1>
          <div className="page-subtitle">Lorem ipsum dolor</div>
          <div className="page-options d-flex">
            <div className="input-icon ml-2">
              <span className="input-icon-addon">
                <i className="fe fe-search"></i>
              </span>
              <input type="text" className="form-control w-10" placeholder="Procurar Plano"/>
            </div>
          </div>
        </div>
          
          <FormAdicionar />
          
      </div>
  </div>
)
export default PlanoAdicionar