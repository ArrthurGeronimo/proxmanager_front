import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Popup } from 'semantic-ui-react';

import ModalEdit from './../ModalEdit';
import wifi from './../../../../../../../../assets/images/wifi.png';
import animacaServidorConectado from './../../../../../../../../assets/images/animacao-servidor-conectado.gif';
import animacaServidorDesconectado from './../../../../../../../../assets/images/animacao-servidor-desconectado.gif';
import api from './../../../../../../../../services/api';

export default class CelulaDaTabelaServidores extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        informacoesDoServidor: [],
        conexaoEstabelecida: true,
        aparecerConteudo: false
    };
  }

componentDidMount() {
    this.testarConexao();
}

testarConexao = () =>  {
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
        }, () => {
            console.log(this.state.informacoesDoServidor)
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


renderTabela = (elemento) =>{
    const obj = {
        ip: elemento.ip,
        porta: elemento.porta,
        login: elemento.login,
        senha: elemento.senha
    };
    api.post('/servidor/recursos', obj)
    .then(res => {
    if(res.data.status === 'success'){
        console.log(res.data);
    }else{
    this.setState({ 
        ...this.state,
        aparecerConteudo: true
    });
    }
    })
    .catch(function (error) {
        console.log(error);
    })


    if (this.state.aparecerConteudo){
        if(this.state.conexaoEstabelecida){
            return(
                <tr key={elemento._id}>
                    <td className="td-table-servidor-conexao">
                        <img src={animacaServidorConectado} alt="Animação Servidor" />
                        <span className={"badge badgePageServidor badge-success"}>Conectado</span>
                    </td>
                    <td>{elemento.nome}</td>
                    <td>
                        <div className="card-body-informations">
                            <div>
                                <i className="fe fe-server iconeCardServidor"></i>
                                <small className="text-muted"> IP: </small>
                                <span className="spanPageServidor"> {elemento.ip}</span>
                            </div>
                            <div>
                                <i className="fe fe-zap iconeCardServidor"></i>
                                <small className="text-muted"> Porta: </small>
                                <span className="spanPageServidor"> {elemento.porta}</span>
                            </div>
                            <div>
                                <i className="fe fe-lock iconeCardServidor"></i>
                                <small className="text-muted"> Login: </small>
                                <span className="spanPageServidor"> {elemento.login}</span>
                            </div>
                            <div>
                                <i className="fe fe-shield iconeCardServidor"></i>
                                <small className="text-muted"> Senha: </small>
                                <span className="spanPageServidor"> {elemento.senha}</span>
                            </div>
                        </div>
                    </td>
                    <td>
                        Conectando
                    </td>
                    <td>
                        ...
                    </td>
                    <td>
                        Ações
                    </td>
                </tr>
            )
        }else{
            //Conexão não estabelecina
        }
        
    }else{
        return(
            <tr key={elemento._id} className="td-table-servidor-conectando">
                <td>
                    <img src={wifi} alt="Ícone Wifi" />
                </td>
                <td>
                    {elemento.nome}
                </td>
                <td>
                    <div className="card-body-informations">
                        <div>
                            <i className="fe fe-server iconeCardServidor"></i>
                            <small className="text-muted"> IP: </small>
                            <span className="spanPageServidor"> {elemento.ip}</span>
                        </div>
                        <div>
                            <i className="fe fe-zap iconeCardServidor"></i>
                            <small className="text-muted"> Porta: </small>
                            <span className="spanPageServidor"> {elemento.porta}</span>
                        </div>
                        <div>
                            <i className="fe fe-lock iconeCardServidor"></i>
                            <small className="text-muted"> Login: </small>
                            <span className="spanPageServidor"> {elemento.login}</span>
                        </div>
                        <div>
                            <i className="fe fe-shield iconeCardServidor"></i>
                            <small className="text-muted"> Senha: </small>
                            <span className="spanPageServidor"> {elemento.senha}</span>
                        </div>
                    </div>
                </td>
                <td>
                    Conectando
                </td>
                <td>
                    ...
                </td>
                <td>
                    Ações
                </td>
            </tr>
        )
    }
}


readableBytes(num) {
    let units = ['B','KB','MB','GB','TB'];
    let bytes = Math.max(num, 0);
    let pow = Math.floor((bytes ? Math.log (bytes) : 0 ) / Math.log(1024));
    pow = Math.min(pow, units.length - 1);

    bytes /= Math.pow(1024, pow);
    return Math.round(bytes * 100)/100 + ' ' + units[pow];
}

  render() {
    if(this.state.aparecerConteudo){
        if(this.state.conexaoEstabelecida){
            let hdTotal = this.readableBytes(this.state.informacoesDoServidor['total-hdd-space']);
            let hdUsado = this.state.informacoesDoServidor['total-hdd-space'] - this.state.informacoesDoServidor['free-hdd-space'];
            let memoriaTotal = this.readableBytes(this.state.informacoesDoServidor['total-memory']);
            let memoriaUsada = this.state.informacoesDoServidor['total-memory'] - this.state.informacoesDoServidor['free-memory'];
            let pppoeOffline = this.state.informacoesDoServidor['pppoe-total'] - this.state.informacoesDoServidor['pppoe-online'];
            return (
                <tr id={'linhaDaTabela'+this.props.servidor._id} key={this.props.servidor._id} className='celula-servidor-conectado'>
                    <td className='td-table-servidor-conexao'>
                        <img src={animacaServidorConectado} alt="Ícone Wifi" />
                        <span className={"badge badgePageServidor badge-success"}>Conectado</span>
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
                                <label className="selectgroup-item">
                                    <input type="radio" name="icon-input" value="1" className="selectgroup-input"/>
                                    <span className="selectgroup-button selectgroup-button-icon botao-tabela-servidor"><i className="fe fe-refresh-cw"></i></span>
                                </label>
                            }
                        />
                        <Popup
                            header='Editar'
                            content={'Clique aqui para editar os dados do servidor.'}
                            on='hover'
                            trigger={
                                <label className="selectgroup-item">
                                    <input type="radio" name="icon-input" value="1" className="selectgroup-input"/>
                                    <span className="selectgroup-button selectgroup-button-icon botao-tabela-servidor"><ModalEdit servidor={this.props.servidor} mandaDadosParaComponentePai={this.PegandoMensagemDoComponenteFilho} /></span>
                                </label>
                            }
                        />
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
                        <Popup
                            header='Deletar'
                            content={'Clique aqui para deletar esse servidor.'}
                            on='hover'
                            trigger={
                                <label className="selectgroup-item">
                                    <input type="radio" name="icon-input" value="1" className="selectgroup-input"/>
                                    <span className="selectgroup-button selectgroup-button-icon botao-tabela-servidor"><i className="fe fe-trash-2"></i></span>
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
                </tr>
            );
        }else{
            return (
                <tr id={'linhaDaTabela'+this.props.servidor._id} key={this.props.servidor._id} className='celula-servidor-desconectado'>
                    <td className='td-table-servidor-conexao'>
                        <img src={animacaServidorDesconectado} alt="Ícone Wifi" />
                        <span className={"badge badgePageServidor badge-danger"}>Desconectado</span>
                    </td>
                    <td>
                        {this.props.servidor.nome}
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
                    <td>
                        ...
                    </td>
                    <td>
                        ...
                    </td>
                </tr>
            );
        }
    }else{
        return (
            <tr id={'linhaDaTabela'+this.props.servidor._id} key={this.props.servidor._id} className="td-table-servidor-conectando">
                <td>
                    <img src={wifi} alt="Ícone Wifi" />
                </td>
                <td>
                    {this.props.servidor.nome}
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
                <td>
                    Conectando
                </td>
                <td>
                    ...
                </td>
            </tr>
        );
    }
    
  }
}