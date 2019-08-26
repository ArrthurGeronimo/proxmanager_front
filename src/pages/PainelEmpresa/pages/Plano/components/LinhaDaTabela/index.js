import React, { Component } from "react";
import { Popup } from 'semantic-ui-react';
import './style.css';

import api from './../../../../../../services/api';
import ModalEdit from './../ModalEdit';

export default class LinhaDaTabelaServidor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMounted: false,
            
            informacoesDoServidor: [],
            conexaoEstabelecida: true,
            aparecerConteudo: false
        };
        // Pegando Mensagem do Filho
        this.PegandoMensagemDoComponenteFilho = this.PegandoMensagemDoComponenteFilho.bind(this, true);
    }

// Lifecycle do Componente
componentDidMount() {
    this.setState({ isMounted: true }, () => {
      console.log(this.props.plano)
    });
  }
  componentWillUnmount() {
    this.setState({ isMounted: false });
  }
// Pegando Mensagem do Filho
    PegandoMensagemDoComponenteFilho = (value) => {
        if(value){
            {/* Procura o Elemento, se encontrar é porque o elemento foi só atualizado, senão ele foi apagado */}
            api.get(`/empresa/${window.localStorage.getItem('segredo')}/servidor/${this.props.servidor._id}`)
            .then(res => {
                if(res.data.status === 'success'){
                this.props.mandaDadosParaComponentePai(true);
                this.setState({ 
                    ...this.state,
                    conexaoEstabelecida: false,
                    aparecerConteudo: false
                }, () => {
                    setTimeout(() => {
                    //
                    }, 1000);
                });
                }else{
                this.props.mandaDadosParaComponentePai(true);
                }
            })
            .catch(function (error) {
                console.log(error);
            })
        }
    }

  render() {
        return(
            <tr id={'linhaDaTabela'+this.props.plano._id} key={this.props.plano._id} className='celula-plano-conectado'>
                <td>
                    <div style={{display: 'grid'}}>
                        {this.props.plano.nome}
                        <div className="selectgroup selectgroup-pills">
                            <ModalEdit plano={this.props.plano} mandaDadosParaComponentePai={this.PegandoMensagemDoComponenteFilho} origemDoBotao='tabela' />
                            <Popup
                                header='Clientes'
                                content={'Clique aqui para ver a lista com todos os clientes nesse plano'}
                                on='hover'
                                trigger={
                                    <label className="selectgroup-item btn-disable">
                                        <input type="radio" name="icon-input" value="1" className="selectgroup-input"/>
                                        <span className="selectgroup-button selectgroup-button-icon botao-tabela-servidor btn-disable"><i className="fe fe-users"></i></span>
                                    </label>
                                }
                            />
                        </div>
                    </div>
                </td>
                <td>
                    <div className="card-body-informations">
                        <div>
                            <i className="fe fe-tag iconeCardServidor"></i>
                            <small className="text-muted"> Preço: </small>
                            <small className="text-muted"> R$</small>
                            <span className="spanPageServidor"> {this.props.plano.preco}</span>
                        </div>
                        <div>
                            <i className="fe fe-trending-down iconeCardServidor"></i>
                            <small className="text-muted"> Download: </small>
                            <span className="spanPageServidor"> {this.props.plano.download}</span>
                            <small className="text-muted"> KB/s</small>
                        </div>
                        <div>
                            <i className="fe fe-trending-up iconeCardServidor"></i>
                            <small className="text-muted"> Upload: </small>
                            <span className="spanPageServidor"> {this.props.plano.upload}</span>
                            <small className="text-muted"> KB/s</small>
                        </div>
                    </div>
                </td>
                <td>
                    <div className="card-body-informations">
                        {this.props.plano.servidor.map((elemento, i) => 

                            <div key={i}>
                                <i className="fe fe-server iconeCardServidor"></i>
                                <span className="spanPageServidor"> {elemento.nome}</span>
                            </div>

                        )}
                    </div>
                </td>
                <td>
                    <div className="card-body-informations">
                        <div>
                            <i className="fe fe-shield iconeCardServidor"></i>
                            <span className="spanPageServidor"> PPPoE </span>
                        </div>
                    </div>
                </td>

            </tr>
        )
    }
}