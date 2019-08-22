import React, { Component } from 'react'
import { Button, Modal } from 'semantic-ui-react'

import './style.css';

import api from './../../../../../../../../services/api';

export default class ModalDeleteServidor extends Component {
  state = {
    isMounted: false,

    open: false,
    idDoServidor: '',
    inputDelete: '' 
  }

  handleChange = name => event => {
    this.setState({ ...this.state, [name]: event.target.value });
  };

  closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
    this.setState({ closeOnEscape, closeOnDimmerClick, open: true })
  }
  close = () => this.setState({ open: false })

  componentDidMount() {
    this.setState({ isMounted: true }, () => {
      this.setState({ 
        ...this.state,
        idDoServidor: this.props.idDoServidor
      });
    })
  }

  componentWillUnmount() {
    this.setState({ isMounted: false });
  }

  apagarServidor = () => {
    api.delete(`/empresa/${window.localStorage.getItem('segredo')}/servidor/${this.state.idDoServidor}`)
    .then(res => {
      if(res.data.status === 'success'){
        this.setState({ open: false })
        this.props.mandaDadosParaComponentePai('DELETAR'); // avisa o pai
      }
    })
    .catch(function (error) {
        console.log(error);
    })
  }

  render() {
    return (
      <div>
        <button className="btn btn-red btn-delete" onClick={this.closeConfigShow(true, false)}>Deletar Servidor</button>
        <Modal
          open={this.state.open}
          closeOnEscape={this.state.closeOnEscape}
          closeOnDimmerClick={this.state.closeOnDimmerClick}
          onClose={this.close}
        >
          <Modal.Header>Deletando o Servidor</Modal.Header>
          <Modal.Content>
            <p>Você tem certeza que deseja deletar o servidor?</p>
            <p>Digite "DELETAR" no campo abaixo e confirme no botão.</p>
            <input 
              type="text" 
              className="form-control" 
              value={this.state.inputDelete}
              onChange={this.handleChange('inputDelete')}
            />
          </Modal.Content>
          <Modal.Actions>
            <button className="btn btn-green" onClick={this.close}>Cancelar</button>
            {this.state.inputDelete === 'DELETAR' ? 
              <button className="btn btn-red" onClick={this.apagarServidor} style={{marginLeft: "20px"}}>Deletar</button>
            :
              <button className="btn btn-red btn-disable" style={{marginLeft: "20px"}}>Deletar</button>
            }
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}