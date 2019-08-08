import React from 'react';

import FormLogin from './components/FormLogin';

export const pageLogin = ({ }) => {
  return (
    <div className="page">
      <div className="page-single">
        <div className="container">
          <div className="row">
            <div className="col col-login mx-auto">
              <div className="text-center mb-6">
                <img src="./demo/brand/tabler.svg" className="h-6" alt=""/>
              </div>
              
              <FormLogin />

              <div className="text-center text-muted">
                Ainda não tem um cadastro? <a href="./register.html">Registre-se</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};