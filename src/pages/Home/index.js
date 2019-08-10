import React, { Component } from 'react'

import NavBarSistemaAutenticado from './../../components/Layout/NavBarAutenticado';
import NavBarSistemaNaoAutenticado from './../../components/Layout/NavbarNaoAutenticado';


export const pageHome= () => {

  const renderMenuSistema = () => {
    if(window.localStorage.getItem('autenticacao') === 'true'){
      return(
        <NavBarSistemaAutenticado />
      )
    }else{
      return(
        <NavBarSistemaNaoAutenticado />
      )
    }
  }

  return(
    <div>
      {renderMenuSistema()}
      <h3>SITE AQUI</h3>
    </div>
  )
}