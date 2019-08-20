import React, { Component } from 'react';
import { Popup } from 'semantic-ui-react'

import api from './../../../../../../../../services/api';
import wifi from './../../../../../../../../assets/images/wifi.png';
import servidorDesligado from './../../../../../../../../assets/images/servidor_desligado.png';
import servidorLigado from './../../../../../../../../assets/images/servidor_ligado.png';
import animacaServidorEntrando from './../../../../../../../../assets/images/animacao-servidor-entrando.gif';
import animacaServidorConectado from './../../../../../../../../assets/images/animacao-servidor-conectado.gif';
import animacaServidorDesconectado from './../../../../../../../../assets/images/animacao-servidor-desconectado.gif';
import ModalEdit from './../../components/ModalEdit';

export default class CardServidor extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isMounted: false,
      informacoesDoServidor: [],
      conexaoEstabelecida: false,
      aparecerConteudo: false,
      
      id: '',
      ip: '',
      porta: '',
      login: '',
      senha: ''
    }

    // Filho Manda Mensagem Para o Pai
    this.PegandoMensagemDoComponenteFilho = this.PegandoMensagemDoComponenteFilho.bind(this, true);
  }

  componentDidMount() {
    this.setState({ isMounted: true }, () => {
      if (this.state.isMounted) {
        this.setState({ 
          conexaoEstabelecida: false,
          informacoesDoServidor: [],
          aparecerConteudo: false,
          
          id: '',
          ip: '',
          porta: '',
          login: '',
          senha: ''
        }, () => {
          this.testarConexao();
          this.render();
        });
      }
    });
  }

  componentWillUnmount() {
    this.setState({ 
      isMounted: false,
      conexaoEstabelecida: false,
      informacoesDoServidor: [],
      aparecerConteudo: false,
      id: '',
      ip: '',
      porta: '',
      login: '',
      senha: ''
    });
  }

   // Filho Manda Mensagem Para o Pai
   PegandoMensagemDoComponenteFilho(atualizarPaginaDoServidor) {
    if(atualizarPaginaDoServidor === true){
      this.atualizarCardDoServidor();
      this.testarConexao();
    }
  }

  atualizarCardDoServidor = () => {
    this.props.mandaDadosParaComponentePai(true);
  }

  testarConexao = () =>  {
    const obj = {
      ip: this.props.servidor.ip,
      porta: this.props.servidor.porta,
      login: this.props.servidor.login,
      senha: this.props.servidor.senha
    };

    this.setState({ 
      ...this.state,
      informacoesDoServidor: [],
      conexaoEstabelecida: false,
      aparecerConteudo: false,
      id: this.props.servidor._id,
      ip: this.props.servidor.ip,
      porta: this.props.servidor.porta,
      login: this.props.servidor.login,
      senha: this.props.servidor.senha
    });
    
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

  renderConexaoEstabelecidade = () => {
    let hdTotal = this.readableBytes(this.state.informacoesDoServidor['total-hdd-space']);
    let hdUsado = this.state.informacoesDoServidor['total-hdd-space'] - this.state.informacoesDoServidor['free-hdd-space'];

    let memoriaTotal = this.readableBytes(this.state.informacoesDoServidor['total-memory']);
    let memoriaUsada = this.state.informacoesDoServidor['total-memory'] - this.state.informacoesDoServidor['free-memory'];

    let pppoeOffline = this.state.informacoesDoServidor['pppoe-total'] - this.state.informacoesDoServidor['pppoe-online'];
    if(this.state.aparecerConteudo){
      return (
        <div className="card-body-informations">
          <div>
          <i className="fe fe-server iconeCardServidor"></i>
          <span className="spanPageServidor">{this.state.ip}</span>
          <small className="text-muted"> : </small>
          <span className="spanPageServidor">{this.state.porta}</span>
      </div>
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
      <div className="dropdown-divider"></div>
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
      <div className="dropdown-divider"></div>
      <div>
          <i className="fe fe-grid iconeCardServidor"></i>
          <small className="text-muted"> Planos Cadastrados: </small>
          <span className="spanPageServidor"> {this.state.informacoesDoServidor.planos}</span>
      </div>
      {/* 
        <div>
          <i className="fe fe-users iconeCardServidor"></i>
          <small className="text-muted"> PPPoE: </small>
          <Popup basic content='PPPoE Online' trigger={
            <span className="spanPageServidorGreen"> {this.state.informacoesDoServidor['pppoe-online']}</span>
          } />
          <small className="text-muted"> / </small>
          <Popup basic content='PPPoE Offline' trigger={
            <span className="spanPageServidorRed"> {pppoeOffline}</span>
          } />
          <small className="text-muted"> / </small>
          <Popup basic content='PPPoE Total' trigger={
            <span className="spanPageServidor"> {this.state.informacoesDoServidor['pppoe-total']}</span>
          } />
        </div>
      */}
      </div>
      )
    }else{
      return(
        <div className="card-body-conexao">
          <img src={wifi} alt="wifi" />
          <small className="text-muted"> Conectando...</small>
        </div>
      )
    }
  }

  renderConexaoNaoEstabelecidade = () => {
    if (this.state.aparecerConteudo){
      return(
        <div className="card-body-informations">
          <small className="text-muted"> Sem conexão com o servidor.</small>
          <small className="text-muted"> Verifique as informações de conexão do servidor.</small>
          <br />
          <div>
            <i className="fe fe-server iconeCardServidor"></i>
            <small className="text-muted"> IP: </small>
            <span className="spanPageServidor"> {this.state.ip}</span>
          </div>
          <div>
            <i className="fe fe-zap iconeCardServidor"></i>
            <small className="text-muted"> Porta: </small>
            <span className="spanPageServidor"> {this.state.porta}</span>
          </div>
          <div>
            <i className="fe fe-lock iconeCardServidor"></i>
            <small className="text-muted"> Login: </small>
            <span className="spanPageServidor"> {this.state.login}</span>
          </div>
          <div>
            <i className="fe fe-shield iconeCardServidor"></i>
            <small className="text-muted"> Senha: </small>
            <span className="spanPageServidor"> {this.state.senha}</span>
          </div>
        </div>
      )
    }else{
      return (
        <div className="card-body-conexao">
          <img src={wifi} alt="wifi" />
          <small className="text-muted"> Conectando...</small>
        </div>
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
    return (
      <div className="col-md-4 col-xl-4" key={this.state._id}>
        <div className="card cardServidor" id={this.props.servidor._id}>
            <div className={"card-status " + (this.state.conexaoEstabelecida ? ' bg-green ' : ' bg-red ')}></div>
            <div className="card-header">
                <h3 className="card-title">{this.props.servidor.nome}</h3>
                <div className="card-options">
                  <a href="javascript:void(0)" onClick={this.testarConexao} className="icon"><i className="fe fe-refresh-cw"></i></a>
                  <ModalEdit servidor={this.props.servidor} mandaDadosParaComponentePai={this.PegandoMensagemDoComponenteFilho} />
                  <div className="item-action dropdown dropdown-proxmanager">
                    <a href="javascript:void(0)" data-toggle="dropdown" className="icon"><i className="fe fe-more-vertical"></i></a>
                    <div className="dropdown-menu dropdown-menu-right">
                      <a href="javascript:void(0)" className="dropdown-item"><i className="dropdown-icon fe fe-shield"></i> Backup </a>
                      <a href="javascript:void(0)" className="dropdown-item"><i className="dropdown-icon fe fe-clipboard"></i> Logs </a>
                      <a href="javascript:void(0)" className="dropdown-item"><i className="dropdown-icon fe fe-map-pin"></i> Ver no Mapa</a>
                      <div className="dropdown-divider"></div>
                      <a href="javascript:void(0)" className="dropdown-item"><i className="dropdown-icon fe fe-users"></i> Ver Clientes</a>
                      <a href="javascript:void(0)" className="dropdown-item"><i className="dropdown-icon fe fe-grid"></i> Ver Planos</a>
                    </div>
                  </div>
                </div>
            </div>
            <div className="card-body card-body-custom">
              
                <div className="card-body-image">
                  {this.state.conexaoEstabelecida ?
                    <img src={animacaServidorConectado} alt="servidor ligado" />
                  :
                    <img src={animacaServidorDesconectado} alt="servidor desligado" />
                  }
                    <span className={"badge badgePageServidor "+(this.state.conexaoEstabelecida ? ' badge-success ' : ' badge-danger ')}>{(this.state.conexaoEstabelecida ? ' Conectado ' : ' Desconectado ')}</span>
                </div>

                  {this.state.conexaoEstabelecida ? 
                  /* CONEXÃO ESTABELECIDA */
                    this.renderConexaoEstabelecidade()
                  :
                  /* CONEXÃO NÃO ESTABELECIDA */
                    this.renderConexaoNaoEstabelecidade()
                  }

            </div>
        </div>
    </div>
    );
  }
}