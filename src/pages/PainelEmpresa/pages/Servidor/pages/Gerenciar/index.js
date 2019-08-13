import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";

import './style.css';

import api from './../../../../../../services/api';
import servidorDesligado from './../../../../../../assets/images/servidor_desligado.png';
import servidorLigado from './../../../../../../assets/images/servidor_ligado.png';

import ModalEdit from './components/ModalEdit';

export default class Elementos extends Component {
    constructor(props) {
        super(props);
        this.state = {
          usuarioLogado: true,
          informacoesUsuario: [],

          servidores: [],

          servidorSelecionado: '',

          data: "Default parent state",

          logout: false
        };

        // Filho Manda Mensagem Para o Pai
        this.SolicitarDadosDaApi = this.SolicitarDadosDaApi.bind(this, true);
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
            console.log('API!!!')
        })
        .catch(function (error) {
            console.log(error);
        })
    };

    // Filho Manda Mensagem Para o Pai
    SolicitarDadosDaApi(atualizarPaginaDoServidor) {
        if(atualizarPaginaDoServidor === true){
            return this.pegarServidoresDoBanco();
        }
    }


    render() {
        return (
            <div className="my-3 my-md-5">
            <div className="container">
              <div className="page-header">
                <h1 className="page-title">
                  Servidores
                </h1>
              </div>
              <div className="row">
                
                    {this.state.servidores.map((element, i) => 
                    <div className="col-md-4 col-xl-4" key={i}>
                        <div className="card" id={element._id}>
                            <div className={"card-status " + (element.nome === 'NOME' ? ' bg-red ' : ' bg-green ')}></div>
                            <div className="card-header">
                            <h3 className="card-title">{element.nome}</h3>
                            <div className="card-options">
                                <ModalEdit servidor={element} mandaDadosParaComponentePai={this.SolicitarDadosDaApi} />
                            </div>
                            </div>
                            <div className="card-body">
                                <div className="card-body-image">
                                    <img src={servidorDesligado} alt="servidor desligado" />
                                    <span className={"badge "+(element.nome === 'NOME' ? ' badge-danger ' : ' badge-success ')}>{(element.nome === 'NOME' ? ' Desconectado ' : ' Sucesso ')}</span>
                                </div>
                                <div className="card-body-informations">
                                    <small class="text-muted">{element.ip}</small>
                                </div>
                              


                            {/*   {element.ip} : {element.porta} : {element.login} : {element.senha}
                                <span className={"badge "+(element.nome === 'NOME' ? ' badge-danger ' : ' badge-success ')}>{(element.nome === 'NOME' ? ' Desconectado ' : ' Sucesso ')}</span> */}

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