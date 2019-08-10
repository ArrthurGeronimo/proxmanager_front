import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";

import api from './../../../../../services/api';

export default class Elementos extends Component {
    constructor(props) {
        super(props);
        this.state = {
          usuarioLogado: true,
          informacoesUsuario: [],

          servidores: [],

          logout: false
        };
    }

    componentDidMount() {
        this.pegarServidoresDoBanco(); 
    }

    pegarServidoresDoBanco = () =>  {
        api.get(`/empresa/${window.localStorage.getItem('segredo')}/servidores`)
        .then(res => {
            this.setState({
                servidores: res.data.servidores
          });
        })
        .catch(function (error) {
            console.log(error);
        })
    };


    render() {
        return (
            <div class="my-3 my-md-5">
            <div class="container">
              <div class="page-header">
                <h1 class="page-title">
                  Servidores
                </h1>
              </div>
              <div class="row">
                
                    {this.state.servidores.map((element, i) =>
                    <div class="col-md-6 col-xl-4">
                        <div class="card" id={element._id}>
                            <div class={"card-status " + (element.nome === 'NOME' ? ' bg-red ' : ' bg-green ')}></div>
                            <div class="card-header">
                            <h3 class="card-title">{element.nome}</h3>
                            <div class="card-options">
                                <a href="#" class="card-options-collapse" data-toggle="card-collapse"><i class="fe fe-chevron-up"></i></a>
                                <a href="#" class="card-options-remove" data-toggle="card-remove"><i class="fe fe-x"></i></a>
                            </div>
                            </div>
                            <div class="card-body">
                                {element.ip} : {element.porta} : {element.login} : {element.senha}
                                <span class={"badge "+(element.nome === 'NOME' ? ' badge-danger ' : ' badge-success ')}>{(element.nome === 'NOME' ? ' Desconectado ' : ' Sucesso ')}</span>
                            </div>
                        </div>
                        </div>
                    )}
                  
                </div>
              
            </div>
          </div>
        );
    }


}