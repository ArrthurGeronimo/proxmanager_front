import React, { Component } from 'react'
import { Button, Modal } from 'semantic-ui-react'

import './style.css';
import api from './../../../../../../../../services/api';
import ModalDelete from './../ModalDelete';

export default class ModalEditServidores extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMounted: false,
      
      open: false,
      idDoServidor: '',
      nomeDoServidor: '',
      ipDoServidor: '',
      porta: '',
      interface: '',
      login: '',
      senha: '',

      servidorConectado: false,

      informacoesServidor: {
        "architecture-name": "",
        "board-name": "",
        "cpu": "",
        "cpu-count": "",
        "cpu-frequency": "",
        "version": ""
      }
    }
    // Filho Manda Mensagem Para o Pai
    this.PegandoMensagemDoComponenteFilho = this.PegandoMensagemDoComponenteFilho.bind(this, true);
  }

show = () => this.setState({ open: true })
close = () => this.setState({ open: false })
handleChange = name => event => {
  this.setState({ ...this.state, [name]: event.target.value, servidorConectado: false });
};

componentDidMount() {
  this.setState({ isMounted: true }, () => {
    this.setState({ 
      ...this.state,
      idDoServidor: this.props.servidor._id,
      nomeDoServidor: this.props.servidor.nome,
      ipDoServidor: this.props.servidor.ip,
      porta: this.props.servidor.porta,
      interface: this.props.servidor.interface,
      login: this.props.servidor.login,
      senha: this.props.servidor.senha
    });
  });
}

// Filho Manda Mensagem Para o Pai
PegandoMensagemDoComponenteFilho(value) {
  if(value === true){
    this.setState({ open: false });
    this.props.mandaDadosParaComponentePai(true); // avisa o pai
  }
  if(value === false){
    this.setState({ open: false });
  }
}

// Testar Conexão
testarConexao = () =>  {
   
};
//Mostrar Desenho
renderDesenhoServidor = () => {
    
}
//Mostrar Informações
renderInformacoesServidor = () => {
  
}

  editarServidor = () =>  {
    const obj = {
      nome: this.state.nomeDoServidor,
      ip: this.state.ipDoServidor,
      porta: this.state.porta,
      interface: this.state.interface,
      login: this.state.login,
      senha: this.state.senha
    };

    if (obj.ip === '') {
        console.log('Falta IP');
    }else{
        api.put(`/empresa/${window.localStorage.getItem('segredo')}/servidor/${this.props.servidor._id}`, obj)
        .then(res => {
          console.log('ModalEdit: ATUALIZOU');
          this.setState({ open: false });
          this.props.mandaDadosParaComponentePai(true); // avisa o pai
      })
      .catch(function (error) {
          console.log(error);
      })
    }
  };



  render() {
    return (
      <div>
        <a className="card-options-collapse" href="javascript:void(0)" onClick={this.show}>
          <i className="fe fe-edit"></i>
        </a>

        <Modal size={'fullscreen'} open={this.state.open} onClose={this.close}>
          <Modal.Header>Atualizando Servidor</Modal.Header>
          <Modal.Content>

          <div className="row row-cards">
            <div className="col-sm-12 col-lg-6">
                <div className="form-group">
                    <label className="form-label">Nome do Servidor</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Digite o nome do servidor (Ex. Servidor Inicial)"
                        value={this.state.nomeDoServidor}
                        onChange={this.handleChange('nomeDoServidor')}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">IP do Servidor</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Digite o IP do servidor (Ex. 192.168.0.1)"
                        value={this.state.ipDoServidor}
                        onChange={this.handleChange('ipDoServidor')}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Porta</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Digite a porta do servidor (Ex. 8728)"
                        value={this.state.porta}
                        onChange={this.handleChange('porta')}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Interface</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Digite a interface do servidor (Ex. ether1)"
                        value={this.state.interface}
                        onChange={this.handleChange('interface')}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Login</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Digite o login do servidor (Ex. admin)"
                        value={this.state.login}
                        onChange={this.handleChange('login')}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Senha</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Digite a senha do servidor"
                        value={this.state.senha}
                        onChange={this.handleChange('senha')}
                    />
                </div>
            </div>
            <div className="col-sm-12 col-lg-6">
                <div className="row">
                    {this.testarConexao()}
                    <div className="col-sm-4 col-lg-4">
                        {this.renderDesenhoServidor()}
                    </div>
                    <div className="col-sm-8 col-lg-8">
                        {this.renderInformacoesServidor()}
                    </div>
                </div>
            </div>
        </div>

          </Modal.Content>
          <Modal.Actions>
            <ModalDelete idDoServidor={this.state.idDoServidor} mandaDadosParaComponentePai={this.PegandoMensagemDoComponenteFilho} />
            <button className="btn btn-secondary" onClick={this.close}>Cancelar</button>
            <button className="btn btn-green" onClick={this.editarServidor} style={{marginLeft: "20px"}}>Atualizar</button>
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}