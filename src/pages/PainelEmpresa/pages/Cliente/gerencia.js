import React, { Component } from 'react';
import { Popup } from 'semantic-ui-react';
import './gerencia.css';

import api from './../../../../services/api';
import ContainerCards from './components/ContainerCards';
import TabelaServidor from './components/TabelaServidor';


export default class GerenciarServidores extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMounted: false,

            servidores: [],
            inputPesquisa: '',
            mostrarVisualizacao: false,
            visualizacaoAtiva: 'tabela'
        };
        // Pegando Mensagem do Filho
        this.SolicitarDadosDaApi = this.SolicitarDadosDaApi.bind(this, true);
    }

    handleChange = (name) => event => {
        this.setState({ [name]: event.target.value })
    };

// Lifecycle do Componente
    componentDidMount() {
        this.setState({ isMounted: true }, () =>{
            if (this.state.isMounted) {
                this.pegarServidoresDoBanco(); 
            }
        });
    }
    componentWillUnmount() {
        this.setState({ isMounted: false});
    }
// Consultas a API
    pegarServidoresDoBanco = () =>  {
        api.get(`/empresa/${window.localStorage.getItem('segredo')}/servidores`)
        .then(res => {
            this.setState({
                servidores: res.data.servidores,
                mostrarVisualizacao: true
            });
        })
        .catch(function (error) {
            console.log(error);
        })
    };
// Pegando Mensagem do Filho
    SolicitarDadosDaApi = (value) => {
        if(value){
            this.pegarServidoresDoBanco();
        }
    }
// Alternar entre as visualizações
    alternarVisualizacao = (visualizacao) =>{
        if(this.state.visualizacaoAtiva !== visualizacao){
            this.setState({ visualizacaoAtiva: visualizacao })
        }
    }
// Renderiza a Visualização
    renderVisualizacao = () => {
        if(this.state.mostrarVisualizacao){
            if(this.state.visualizacaoAtiva === 'tabela'){
                return(
                    <TabelaServidor servidores={this.state.servidores} filtro={this.state.inputPesquisa} mandaDadosParaComponentePai={this.SolicitarDadosDaApi} />
                )
            }else if(this.state.visualizacaoAtiva === 'cartao'){
                return(
                    <ContainerCards servidores={this.state.servidores} filtro={this.state.inputPesquisa} mandaDadosParaComponentePai={this.SolicitarDadosDaApi} />
                )
            }
        }
    }

    render() {
        return (
            <div className="my-3 my-md-5 page-gerenciar-servidores">
            <div className="container">
            <div className="page-header">
              <h1 className="page-title">
                Clientes
              </h1>
              <div className="page-subtitle">{this.state.servidores.length} servidores cadastrados</div>
              <div className="page-options d-flex">
                <Popup
                    header='Visualização por cartões'
                    content={'Clique aqui para alternar a visualização para cartões.'}
                    on='hover'
                    trigger={
                        <button 
                        className={"btn btn-sm btn-alternar-visualizacao " + (this.state.visualizacaoAtiva === 'cartao' ? 'btn-alternar-visualizacao-active' : '')}
                        onClick={() => {this.alternarVisualizacao('cartao')}}>
                            <span className="fe fe-grid"></span>
                        </button>
                    }
                />
                <Popup
                    header='Visualização por tabela'
                    content={'Clique aqui para alternar a visualização para tabela.'}
                    on='hover'
                    trigger={
                        <button 
                            className={"btn btn-sm btn-alternar-visualizacao " + (this.state.visualizacaoAtiva === 'tabela' ? 'btn-alternar-visualizacao-active' : '')} 
                            onClick={() => {this.alternarVisualizacao('tabela')}}>
                            <span className="fe fe-list"></span>
                        </button>
                    }
                />
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
                {/* 
                <button className="btn btn-sm btn-primary btn-pesquisar">
                    <span className="fe fe-search"></span>
                </button>
                */}
              </div>
            </div>
              <div className="row">
                    {this.renderVisualizacao()}
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