import React, { Component } from "react";
import ReactDOM from "react-dom";

import CelulaDaTabela from './../CelulaDaTabela/index';
import './style.css';

export default class TabelaServidor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

filtrarServidores = () => {
    //let jsonServidores = this.state.servidores;
    //console.log(this.props.servidores)
    for(let i=0; i < this.props.servidores.length; i++){
        let toString = JSON.stringify(this.props.servidores[i]).toLowerCase();
        let inputPesquisa = (this.props.filtro.toLowerCase());
        let verificaSeTem = toString.includes(inputPesquisa);
        let linhaDaTabela = document.getElementById('linhaDaTabela'+this.props.servidores[i]._id);
        if(verificaSeTem){
            if(linhaDaTabela !== null){
                linhaDaTabela.classList.add("elementoAparece");
                linhaDaTabela.classList.remove("elementoDesaparece");
            }
        }else{
            if(linhaDaTabela !== null){
                linhaDaTabela.classList.add("elementoDesaparece");
                linhaDaTabela.classList.remove("elementoAparece");
            }  
        }
    }
}

  render() {
    return (
    <div className="col-12">
        <div className="card">
            <div className="table-responsive table-gerenciar-servidores">
                <table className="table card-table table-vcenter text-nowrap">
                    <thead>
                        <tr>
                            <th className="w-1">Conexão</th>
                            <th>Nome</th>
                            <th>Autenticação</th>
                            <th>Informações</th>
                            <th>Cadastros</th>
                        </tr>
                    </thead>
                    <tbody>

                    {this.filtrarServidores()}

                        {this.props.servidores.map((elemento, i) => 

                            <CelulaDaTabela key={i} servidor={elemento} />

                        )}

                    </tbody>
                </table>
            </div>
        </div>
    </div>
    );
  }
}