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