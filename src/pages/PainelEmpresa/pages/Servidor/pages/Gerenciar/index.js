import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";

import './style.css';

import api from './../../../../../../services/api';

import CardServidor from './components/CardServidor';
import TabelaServidor from './components/TabelaServidor';


export default class GerenciarServidores extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMounted: true,
            usuarioLogado: true,
            informacoesUsuario: [],

            servidores: [],
            inputPesquisa: '',

            countRender: 1,
            logout: false
        };

        // Filho Manda Mensagem Para o Pai
        this.SolicitarDadosDaApi = this.SolicitarDadosDaApi.bind(this, true);
    }

    handleChange = (name) => event => {
        if(name === 'inputPesquisa'){
            this.setState({ [name]: event.target.value }, () =>{
                this.filtrarServidores();
            });
        }else{
            this.setState({ [name]: event.target.value })
        }
        
    };

    filtrarServidores = () => {
        let jsonServidores = this.state.servidores;
        console.log(jsonServidores)
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
            <div className="my-3 my-md-5 page-gerenciar-servidores">
            <div className="container">
            <div className="page-header">
              <h1 className="page-title">
                Servidor
              </h1>
              <div className="page-subtitle">{this.state.servidores.length} servidores cadastrados</div>
              <div className="page-options d-flex">
                <div className="input-icon ml-2">
                  <span className="input-icon-addon">
                    <i className="fe fe-search"></i>
                  </span>
                  <input 
                        type="text"
                        onChange={this.handleChange('inputPesquisa')}
                        value={this.state.inputPesquisa}
                        className="form-control w-10" 
                        placeholder="Procurar Servidor"
                    />
                </div>
                <button className="btn btn-sm btn-primary btn-pesquisar">
                    <span className="fe fe-search"></span>
                </button>
              </div>
            </div>
              <div className="row">
                  <TabelaServidor servidores={this.state.servidores} />
                {/* 
                    {this.state.servidores.map((element, i) => 
                        <CardServidor key={i} servidor={element} mandaDadosParaComponentePai={this.SolicitarDadosDaApi} />
                    )}
                */}  
                </div>
            </div>
          </div>
        );
    }


}