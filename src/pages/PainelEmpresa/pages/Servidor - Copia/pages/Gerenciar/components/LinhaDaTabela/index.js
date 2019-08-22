import React, { Component } from "react";
import { Popup } from 'semantic-ui-react';
import './style.css';

import api from './../../../../../../../../services/api';
import wifi from './../../../../../../../../assets/images/wifi.png';
import wifiError from './../../../../../../../../assets/images/wireless-error.png';
import animacaServidorConectado from './../../../../../../../../assets/images/animacao-servidor-conectado.gif';
import animacaServidorDesconectado from './../../../../../../../../assets/images/animacao-servidor-desconectado.gif';
import ModalEdit from './../../components/ModalEdit';

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
      this.testarConexao();
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
                    this.testarConexao();
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
// Testa conexão do servidor
    testarConexao = () =>  {
        this.setState({ 
        ...this.state,
        conexaoEstabelecida: false,
        aparecerConteudo: false
        });

        const obj = {
        ip: this.props.servidor.ip,
        porta: this.props.servidor.porta,
        login: this.props.servidor.login,
        senha: this.props.servidor.senha
        };

        api.post('/servidor/recursos', obj)
        .then(res => {
        if(res.data.status === 'success'){
            this.setState({ 
            ...this.state,
            informacoesDoServidor: res.data,
            conexaoEstabelecida: true,
            aparecerConteudo: true
            });
        }else{
            this.setState({ 
            ...this.state,
            aparecerConteudo: true,
            conexaoEstabelecida: false
            });
        }
        })
        .catch(function (error) {
            console.log(error);
        })
    };
// Renderiza quando a conexão FOI estabelecida
    renderConexaoEstabelecidade = () => {
        let hdTotal = this.readableBytes(this.state.informacoesDoServidor['total-hdd-space']);
        let hdUsado = this.state.informacoesDoServidor['total-hdd-space'] - this.state.informacoesDoServidor['free-hdd-space'];
        let memoriaTotal = this.readableBytes(this.state.informacoesDoServidor['total-memory']);
        let memoriaUsada = this.state.informacoesDoServidor['total-memory'] - this.state.informacoesDoServidor['free-memory'];
        let pppoeOffline = this.state.informacoesDoServidor['pppoe-total'] - this.state.informacoesDoServidor['pppoe-online'];
        
            if (this.state.aparecerConteudo){
                return(
                    <React.Fragment>
                        <td>
                            <div className="card-body-informations">
                                <div>
                                    <i className="fe fe-thermometer iconeCardServidor"></i>
                                    <small className="text-muted"> CPU: </small>
                                    <span className="spanPageServidor">{this.state.informacoesDoServidor['cpu-load']} </span>
                                    <small className="text-muted"> % , </small>
                                    <small className="text-muted"> Placa: </small>
                                    <span className="spanPageServidor">{this.state.informacoesDoServidor['board-name']} </span>
                                </div>
                                <div>
                                    <i className="fe fe-cpu iconeCardServidor"></i>
                                    <small className="text-muted"> CPU: </small>
                                    <span className="spanPageServidor">{this.state.informacoesDoServidor.cpu} </span>
                                    <small className="text-muted"> , </small>
                                    <span className="spanPageServidor"> {this.state.informacoesDoServidor['cpu-count']}</span>
                                    <small className="text-muted"> núcleos </small>
                                    <small className="text-muted"> , </small>
                                    <span className="spanPageServidor"> {this.state.informacoesDoServidor['cpu-frequency']}</span>
                                    <small className="text-muted"> MHz </small>
                                </div>
                                <div>
                                    <i className="fe fe-info iconeCardServidor"></i>
                                    <small className="text-muted"> Versão: </small>
                                    <span className="spanPageServidor">{this.state.informacoesDoServidor.version}</span>
                                </div>
                                <div>
                                    <i className="fe fe-hard-drive iconeCardServidor"></i>
                                    <small className="text-muted"> HD: </small>
                                    <span className="spanPageServidor">{this.readableBytes(hdUsado)}</span>
                                    <small className="text-muted"> de </small>
                                    <span className="spanPageServidor"> {hdTotal} </span>
                                    <small className="text-muted"> disponível </small>
                                </div>
                                <div>
                                    <i className="fe fe fe-zap iconeCardServidor"></i>
                                    <small className="text-muted"> Memória: </small>
                                    <span className="spanPageServidor">{this.readableBytes(memoriaUsada)}</span>
                                    <small className="text-muted"> de </small>
                                    <span className="spanPageServidor"> {hdTotal} </span>
                                    <small className="text-muted"> disponível </small>
                                </div>
                                <div>
                                    <i className="fe fe-clock iconeCardServidor"></i>
                                    <small className="text-muted"> Tempo de Atividade: </small>
                                    <span className="spanPageServidor"> {this.state.informacoesDoServidor.uptime}</span>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div className="card-body-informations">
                                <div>
                                    <i className="fe fe-users iconeCardServidor"></i>
                                    <small className="text-muted"> PPPoE Total: </small>
                                    <span className="spanPageServidor"> {this.state.informacoesDoServidor['pppoe-total']}</span>
                                </div>
                                <div>
                                    <i className="fe fe-user-check iconeCardServidor"></i>
                                    <small className="text-muted"> PPPoE Online: </small>
                                    <span className="spanPageServidor"> {this.state.informacoesDoServidor['pppoe-online']}</span>
                                </div>
                                <div>
                                    <i className="fe fe-user-minus iconeCardServidor"></i>
                                    <small className="text-muted"> PPPoE Offline: </small>
                                    <span className="spanPageServidor"> {pppoeOffline}</span>
                                </div>
                                <div>
                                    <i className="fe fe-grid iconeCardServidor"></i>
                                    <small className="text-muted"> Planos Cadastrados: </small>
                                    <span className="spanPageServidor"> {this.state.informacoesDoServidor.planos}</span>
                                </div>
                            </div>
                        </td>
                    </React.Fragment>
                )
            }else{
                return (
                    <React.Fragment>
                        <td className="linhaDaTabelaConectando">
                            <img src={wifi} alt="ícone do wifi" />
                            <p>Conectando</p>
                        </td>
                        <td className="linhaDaTabelaConectando">
                            <img src={wifi} alt="ícone do wifi" />
                            <p>Conectando</p>
                        </td>
                    </React.Fragment>
                )
            }
    };
// Renderiza quando a conexão NÃO FOI estabelecida
    renderConexaoNaoEstabelecidade = () => {
        if (this.state.aparecerConteudo){
            return(
                <React.Fragment>
                    <td className="linhaDaTabelaConectando">
                        <img src={wifiError} alt="ícone do wifi com erro" />
                    </td>
                    <td className="linhaDaTabelaConectando">
                        <img src={wifiError} alt="ícone do wifi com erro" />
                    </td>
                </React.Fragment>
            )
        }else{
            return (
                <React.Fragment>
                    <td className="linhaDaTabelaConectando">
                        <img src={wifi} alt="ícone do wifi" />
                        <p>Conectando</p>
                    </td>
                    <td className="linhaDaTabelaConectando">
                        <img src={wifi} alt="ícone do wifi" />
                        <p>Conectando</p>
                    </td>
                </React.Fragment>
            )
        }
    };
// Função que calcula os MB's
    readableBytes(num) {
        let units = ['B','KB','MB','GB','TB'];
        let bytes = Math.max(num, 0);
        let pow = Math.floor((bytes ? Math.log (bytes) : 0 ) / Math.log(1024));
        pow = Math.min(pow, units.length - 1);

        bytes /= Math.pow(1024, pow);
        return Math.round(bytes * 100)/100 + ' ' + units[pow];
    };

  render() {
        return(
            <tr id={'linhaDaTabela'+this.props.servidor._id} key={this.props.servidor._id} className='celula-servidor-conectado'>
                <td className='td-table-servidor-conexao'>
                    {this.state.conexaoEstabelecida ?
                        <img src={animacaServidorConectado} alt="Ícone Wifi" />
                    :
                        <img src={animacaServidorConectado} alt="Ícone Wifi" />
                    }
                    <span 
                        className={"badge badgePageServidor " +(this.state.conexaoEstabelecida ? ' badge-success ' : ' badge-danger ')}>
                        {(this.state.conexaoEstabelecida ? ' Conectado ' : ' Desconectado ')}
                    </span>
                </td>
                <td>
                    <div style={{display: 'grid'}}>
                        {this.props.servidor.nome}
                        <div className="selectgroup selectgroup-pills">
                            <Popup
                                header='Atualizar'
                                content={'Clique aqui para atualizar a conexão com o servidor.'}
                                on='hover'
                                trigger={
                                    <label className="selectgroup-item" onClick={this.testarConexao}>
                                        <input type="radio" name="icon-input" value="1" className="selectgroup-input"/>
                                        <span className="selectgroup-button selectgroup-button-icon botao-tabela-servidor"><i className="fe fe-refresh-cw"></i></span>
                                    </label>
                                }
                            />
                            <ModalEdit servidor={this.props.servidor} mandaDadosParaComponentePai={this.PegandoMensagemDoComponenteFilho} origemDoBotao='tabela' />
                            <Popup
                                header='Backup'
                                content={''}
                                on='hover'
                                trigger={
                                    <label className="selectgroup-item btn-disable">
                                        <input type="radio" name="icon-input" value="1" className="selectgroup-input"/>
                                        <span className="selectgroup-button selectgroup-button-icon botao-tabela-servidor btn-disable"><i className="fe fe-shield"></i></span>
                                    </label>
                                }
                            />
                            <Popup
                                header='Logs'
                                content={''}
                                on='hover'
                                trigger={
                                    <label className="selectgroup-item btn-disable">
                                        <input type="radio" name="icon-input" value="1" className="selectgroup-input"/>
                                        <span className="selectgroup-button selectgroup-button-icon botao-tabela-servidor btn-disable"><i className="fe fe-clipboard"></i></span>
                                    </label>
                                }
                            />
                            <Popup
                                header='Ver no Mapa'
                                content={''}
                                on='hover'
                                trigger={
                                    <label className="selectgroup-item btn-disable">
                                        <input type="radio" name="icon-input" value="1" className="selectgroup-input"/>
                                        <span className="selectgroup-button selectgroup-button-icon botao-tabela-servidor btn-disable"><i className="fe fe-map-pin"></i></span>
                                    </label>
                                }
                            />
                            <Popup
                                header='Ver Clientes'
                                content={''}
                                on='hover'
                                trigger={
                                    <label className="selectgroup-item btn-disable">
                                        <input type="radio" name="icon-input" value="1" className="selectgroup-input"/>
                                        <span className="selectgroup-button selectgroup-button-icon botao-tabela-servidor btn-disable"><i className="fe fe-users"></i></span>
                                    </label>
                                }
                            />
                            <Popup
                                header='Ver Planos'
                                content={''}
                                on='hover'
                                trigger={
                                    <label className="selectgroup-item btn-disable">
                                        <input type="radio" name="icon-input" value="1" className="selectgroup-input"/>
                                        <span className="selectgroup-button selectgroup-button-icon botao-tabela-servidor btn-disable"><i className="fe fe-grid"></i></span>
                                    </label>
                                }
                            />
                        </div>
                    </div>
                </td>
                <td>
                    <div className="card-body-informations">
                        <div>
                            <i className="fe fe-server iconeCardServidor"></i>
                            <small className="text-muted"> IP: </small>
                            <span className="spanPageServidor"> {this.props.servidor.ip}</span>
                        </div>
                        <div>
                            <i className="fe fe-zap iconeCardServidor"></i>
                            <small className="text-muted"> Porta: </small>
                            <span className="spanPageServidor"> {this.props.servidor.porta}</span>
                        </div>
                        <div>
                            <i className="fe fe-lock iconeCardServidor"></i>
                            <small className="text-muted"> Login: </small>
                            <span className="spanPageServidor"> {this.props.servidor.login}</span>
                        </div>
                        <div>
                            <i className="fe fe-shield iconeCardServidor"></i>
                            <small className="text-muted"> Senha: </small>
                            <span className="spanPageServidor"> {this.props.servidor.senha}</span>
                        </div>
                    </div>
                </td>

                {this.state.conexaoEstabelecida ? 
                /* CONEXÃO ESTABELECIDA */
                    this.renderConexaoEstabelecidade()
                :
                /* CONEXÃO NÃO ESTABELECIDA */
                    this.renderConexaoNaoEstabelecidade()
                }
                
            </tr>
        )
    }
}