import React from 'react';
import { Link } from "react-router-dom";

import FormRegistro from './components/FormRegistro';

import NavBarSimples from './../../components/Layout/NavBarSimples';

export const pageRegistro = ({ }) => {
  return (
    <div className="page">
      <NavBarSimples />
      <div className="page-single">
        <div className="container">
          <div className="row">
            <div className="col col-login mx-auto">
              <div className="text-center mb-6">
                <img src="./demo/brand/tabler.svg" className="h-6" alt="" />
              </div>
              
              <FormRegistro />

              <div className="text-center text-muted">
                Já tem um cadastro? 
                <Link  to="/entrar" href="javascript:void(0)"> Entrar</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};