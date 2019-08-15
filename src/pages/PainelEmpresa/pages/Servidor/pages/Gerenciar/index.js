import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";

import './style.css';

import api from './../../../../../../services/api';

import CardServidor from './components/CardServidor';



export default class GerenciarServidores extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMounted: true,
            usuarioLogado: true,
            informacoesUsuario: [],

            servidores: [],

            servidorSelecionado: '',
            informacoesDoServidor: [],

            countRender: 1,
            logout: false
        };

        // Filho Manda Mensagem Para o Pai
        this.SolicitarDadosDaApi = this.SolicitarDadosDaApi.bind(this, true);
    }

    componentDidMount() {
        this.setState({ isMounted: true });

        if (this.state.isMounted) {
            this.pegarServidoresDoBanco(); 
        }
           
    }
    componentWillUnmount() {
        this.setState({ isMounted: false, countRender: this.state.countRender + 1 });
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

    // Filho Manda Mensagem Para o Pai
    SolicitarDadosDaApi(atualizarPaginaDoServidor) {
        if(atualizarPaginaDoServidor === true){
            this.pegarServidoresDoBanco();
            this.render();
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
                        <CardServidor key={i} servidor={element} mandaDadosParaComponentePai={this.SolicitarDadosDaApi} />
                    )}
                  
                </div>
            </div>
          </div>
        );
    }


}