import React, { Component } from 'react';

import FormAdicionar from './components/FormAdicionar';

const ServidorAdicionar = () => (
  <div className="my-3 my-md-5">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">
            Adicionar Servidor
          </h1>
          <div className="page-subtitle">1 - 12 of 1713 photos</div>
          <div className="page-options d-flex">
            <select className="form-control custom-select w-auto">
              <option value="asc">Newest</option>
              <option value="desc">Oldest</option>
            </select>
            <div className="input-icon ml-2">
              <span className="input-icon-addon">
                <i className="fe fe-search"></i>
              </span>
              <input type="text" className="form-control w-10" placeholder="Search photo"/>
            </div>
          </div>
        </div>
          
          <FormAdicionar />
          
      </div>
  </div>
)
export default ServidorAdicionar