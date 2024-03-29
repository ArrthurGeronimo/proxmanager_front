import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import TabelaComponente from './components/TabelaPlanos';

import './style.css';

import api from './../../../../../../services/api';

export default class Elementos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMounted: true,
            usuarioLogado: true,
            informacoesUsuario: [],

            planos: [],

            logout: false
        };

        // Filho Manda Mensagem Para o Pai
        this.SolicitarDadosDaApi = this.SolicitarDadosDaApi.bind(this, true);
    }

    componentDidMount() {
        this.setState({ isMounted: true });

        if (this.state.isMounted) {
            this.pegarPlanosDoBanco(); 
        }
           
    }
    componentWillUnmount() {
        this.setState({ isMounted: false});
    }

    pegarPlanosDoBanco = () =>  {
        api.get(`/empresa/${window.localStorage.getItem('segredo')}/servidores`)
        .then(res => {
            this.setState({
                planos: res.data.servidores
            }, () => {
                console.log('CHAMOU A API: ')
                console.log(this.state.planos)
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
                        Planos
                    </h1>
                </div>
                <div className="row">
                    <div className="col-sm-12 col-lg-12">
                        <TabelaComponente planos={this.state.planos} />
                    </div>
                </div>
            </div>
          </div>
        );
    }


}