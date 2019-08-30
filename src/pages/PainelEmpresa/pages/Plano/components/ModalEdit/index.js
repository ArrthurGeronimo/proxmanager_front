import React, { Component } from 'react';
import { Popup, Modal } from 'semantic-ui-react';
import { priceMask } from './../../../../../../services/masks';
import './style.css';
import ModalDelete from './../ModalDelete';
import CardProgresso from './../CardProgressoFeedback';

export default class ModalEditServidores extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMounted: false,
      open: false,
      idDoPlano: '',
      nomeDoPlano: '',
      slug: '',
      slugSugerido: '',
      preco: '',
      download: '',
      upload: '',
      pppoe: true,
      servidores: [],
      servidoresSelecionados: [],
      jsonServidoresSelecionados: {},
      plano: [],
      renderFeedbackPlano: false,
      renderFeedbackPlanoCadastradoComSucesso: false,
      sicronizacaoEmAndamento: false
    }
    // Pegando Mensagem do Filho
    this.PegandoMensagemDoComponenteFilho = this.PegandoMensagemDoComponenteFilho.bind(this, true);
  }
// Funções Gerais
show = () => this.setState({ open: true })
close = () => this.setState({ open: false })
handleChange = name => event => {
  if(name === 'preco'){
    this.setState({ [name]: priceMask(event.target.value) });
  }else{
      this.setState({ [name]: event.target.value });
  }
};
// HandleChange : CHECKBOX's
toggleChange = name => event => {
  this.setState({
    [name]: event.target.checked,
  }, () => {
    //console.log(this.state)
  });
}
// Pegando Mensagem do Filho
VerificaSeCadastrouPlanoComSucesso = (value) => {
  if(value){
    this.setState({ renderFeedbackPlanoCadastradoComSucesso: true });
  }
}
// Lifecycle do Componente
componentDidMount() {
  this.setState({ isMounted: true }, () => {
    //console.log(this.props.plano)
    this.setState({ 
      ...this.state,
      idDoPlano: this.props.plano._id,
      nomeDoPlano: this.props.plano.nome,
      slug: this.props.plano.slug,
      preco: this.props.plano.preco,
      download: this.props.plano.download,
      upload: this.props.plano.upload,
      servidores: this.props.plano.servidor
    }, () => {
      //console.log(this.state.servidores)
    });
  });
}
componentWillUnmount() {
  this.setState({ isMounted: false });
}
// Pegando Mensagem do Filho
PegandoMensagemDoComponenteFilho = (value) => {
  if(value){
    this.setState({ open: false });
    this.props.mandaDadosParaComponentePai(true); // avisa o pai
  }
}
// Editar Servidor
editarPlano = () =>  {
  const obj = {
    _id: this.state.idDoPlano,
    nome: this.state.nomeDoPlano,
    slug: this.state.slug,
    download: this.state.download,
    upload: this.state.upload,
    preco: this.state.preco,
    tipoDeAutenticacao:{
        pppoe: true
    },
    servidor: this.state.servidoresSelecionados
  };
  this.setState({
      plano: obj,
      renderFeedbackPlano: true
  })
};

// Render Container
renderContainerFeedbackEditaPlano = () => {
  if(this.state.renderFeedbackPlano){
      //console.log('Feedback! Cadastrar Plano');
      return(
          <div>
              <h1 className="page-title">Sicronização do Plano</h1>

              <CardProgresso 
                  icone='fe-refresh-cw' 
                  animacaoIcone={true} 
                  categoria='EditarPlano'
                  elemento={this.state.plano}
                  avisaPaiQueCadastrouPlanoComSucesso={this.VerificaSeCadastrouPlanoComSucesso.bind(this)}
                  avisaPaiQueCadastroDoPlanoDeuErro={this.VerificaSeCadastroDoPlanoDeuErro}
              />

              {/* VERIFICA SE O PLANO EXISTE 

              {this.state.servidoresSelecionados.map((element, i) => 
                  this.renderCardCadastroServidor(element, i)
              )}
              */}

          </div>
      )
  }else{
      return(
          <div>
          </div>
      )
  }
}

renderContainerFeedbackCadastraServidores = () => {
  if(this.state.sicronizacaoEmAndamento){
      if(this.state.renderFeedbackPlanoCadastradoComSucesso){
          //console.log('Feedback! Cadastrar Servidores');
          return(
              <div>
  
                  {this.state.servidoresSelecionados.map((element, i) => 
                      this.renderCardCadastroServidor(element, i)
                  )}
  
              </div>
          )
      }else{
          return(
              <div>
              </div>
          )
      }
  }
}
// RENDER card de progresso do salvamento do servidor
renderCardCadastroServidor = (element, index) => {
  return (
      <CardProgresso 
          key={index}
          icone='fe-refresh-cw' 
          animacaoIcone={true} 
          categoria='EditarNoServidor'
          elemento={element}
          idDoPlano={this.state.idDoPlanoCriado}
      />
  )
}
// MONTA ARRAY dos servidores
arrumarServidores = () =>{
  //console.log('Arruma Array');
  this.props.listaServidores.map((elemento1, i) => 
    this.state.servidores.map((elemento2) =>  
      elemento1.nome === elemento2.nome ? 
        this.state[`servidor${i}`] === true || this.state[`servidor${i}`] === undefined ? (
      // Foi MARCADO
          setTimeout(() => {
            let json = JSON.stringify({ _id: elemento2._id, nome: elemento2.nome, ativo: elemento2.ativo, sincronizado: elemento2.sincronizado });
            let jsonServidores = JSON.parse(json);
            this.setState({
                servidoresSelecionados: [...this.state.servidoresSelecionados, jsonServidores]
            });
          }, 100)
        )  : (
        // NÃO Foi Desmarcado
        setTimeout(() => {
          let json = JSON.stringify({ _id: elemento2._id, nome: elemento2.nome, ativo: false, sincronizado: elemento2.sincronizado });
          let jsonServidores = JSON.parse(json);
          this.setState({
              servidoresSelecionados: [...this.state.servidoresSelecionados, jsonServidores]
          });
        }, 100)
      ) : (
      // NÃO ACHOU
        this.state[`servidor${i}`] ?  (
          // Foi MARCADO
          setTimeout(() => {
            let json = JSON.stringify({ _id: elemento1._id, nome: elemento1.nome, ativo: true, sincronizado: false });
            let jsonServidores = JSON.parse(json);
            this.setState({
                servidoresSelecionados: [...this.state.servidoresSelecionados, jsonServidores]
            });
          }, 100)
        ) : (
          // NÃO Foi MARCADO
          setTimeout(() => {
            let variavelQualquer = 'Não Achou : Não Foi Marcado';
          }, 100)
        )
      )
    )
  )
  
  setTimeout(() => {
    this.setState({
      sicronizacaoEmAndamento: true
    }, () => {
      this.editarPlano();
    })
  }, 1000)


/*
  for (let i = 0; i < this.state.servidores.length; i++){
      if(this.state[`servidor${i}`] === true){
          var json = JSON.stringify({ _id: this.state.servidores[i]._id, nome: this.state.servidores[i].nome });
          let jsonServidores = JSON.parse(json);
          setTimeout(() => {
              this.setState({
                  servidoresSelecionados: [...this.state.servidoresSelecionados, jsonServidores],
                  sicronizacaoEmAndamento: true
              }, () => {
                  //this.adicionarPlano();
              });
          }, 1000);
      }
  }
*/
}


  render() {
    return (
      <div>
        {this.props.origemDoBotao === 'tabela' ?
          <Popup
            header='Atualizar Plano'
            content={'Clique aqui para alterar informações do plano ou para deletá-lo.'}
            on='hover'
            trigger={
              <label className="selectgroup-item" onClick={this.show}>
                <input type="radio" name="icon-input" value="1" className="selectgroup-input"/>
                <span className="selectgroup-button selectgroup-button-icon botao-tabela-servidor"><i className="fe fe-edit"></i></span>
              </label>
            }
          />
        :
          <Popup
            header='Atualizar Plano'
            content={'Clique aqui para alterar informações do plano ou para deletá-lo.'}
            on='hover'
            trigger={
              <a className="card-options-collapse" href="javascript:void(0)" onClick={this.show}>
                <i className="fe fe-edit"></i>
              </a>
            }
          />
        }

        <Modal size={'fullscreen'} open={this.state.open} onClose={this.close}>
          <Modal.Header>Atualizando Plano</Modal.Header>
          <Modal.Content>

            <div className="row row-cards">
              <div className="col-sm-12 col-lg-6">
                <div className="ui horizontal divider">Informações do Plano</div>
                  <div className="form-group">
                      <label className="form-label">Nome do Plano</label>
                      <input 
                          type="text" 
                          className="form-control" 
                          placeholder="Digite o nome do servidor (Ex. Servidor Inicial)"
                          value={this.state.nomeDoPlano}
                          onChange={this.handleChange('nomeDoPlano')}
                      />
                  </div>
                  <div className="form-group buttonInside">
                      <label className="form-label">Nome no Mikrotik</label>
                      <Popup
                          header='Nome no Mikrotik'
                          content={'O nome deverá ser único e não poderá ter espaços e nem caracteres especiais'}
                          on='focus'
                          trigger={
                              <input 
                                  type="text" 
                                  className="form-control" 
                                  placeholder={"Digite o nome que será salvo no Mikrotik (Ex. " + this.state.slugSugerido + " )"}
                                  value={this.state.slug}
                                  onChange={this.handleChange('slug')}
                              />
                          }
                      />
                  </div>
                  <div className="form-group">
                      <label className="form-label">Preço do Plano</label>
                      <div className="input-group">
                          <span className="input-group-prepend">
                              <span className="input-group-text">R$</span>
                          </span>
                              <input 
                                  type="text" 
                                  className="form-control"
                                  placeholder="Digite o preço do plano (Ex. 180)"
                                  value={this.state.preco}
                                  onChange={this.handleChange('preco')}
                              />
                      </div>
                  </div>
                  <div className="form-group">
                      <label className="form-label">Download</label>
                      <div className="input-group">
                          <input 
                              type="text" 
                              className="form-control" 
                              value={this.state.download}
                              onChange={this.handleChange('download')}
                              placeholder="Digite a velocidade do download (Ex. 2048)"
                          />
                          <span className="input-group-append">
                              <span className="input-group-text">KB/s</span>
                          </span>
                      </div>
                  </div>
                  <div className="form-group">
                      <label className="form-label">Upload</label>
                      <div className="input-group">
                          <input 
                              type="text" 
                              className="form-control" 
                              value={this.state.upload}
                              onChange={this.handleChange('upload')}
                              placeholder="Digite a velocidade do upload (Ex. 2048)"
                          />
                          <span className="input-group-append">
                              <span className="input-group-text">KB/s</span>
                          </span>
                      </div>
                  </div>
                  <div className="ui horizontal divider">Autenticação</div>
                  <div className="form-group">
                      <div className="form-label">Por enquanto só temos suporte a PPPoE</div>
                      <div className="custom-controls-stacked">
                          <label className="custom-control custom-radio">
                              <input type="radio" className="custom-control-input" disabled checked />
                              <div className="custom-control-label">PPPoE</div>
                          </label>
                      </div>
                  </div>
                  <div className="ui horizontal divider">Servidores</div>
                  <div className="form-group">
                      <div className="form-label">Selecione os servidores para cadastrar o plano</div>
                      <div className="custom-controls-stacked">

                          {this.props.listaServidores.map((elemento1, i) => 
                            this.state.servidores.map((elemento2, j) =>  
                              elemento1.nome === elemento2.nome ?
                                <label className="custom-control custom-checkbox" key={i}>
                                    <input 
                                        type="checkbox" 
                                        className="custom-control-input"
                                        defaultChecked={elemento2.ativo ? true : false}
                                        onChange={this.toggleChange(`servidor${i}`)} />
                                    <span className="custom-control-label">{elemento2.nome}</span>
                                </label>
                              :
                                <label className="custom-control custom-checkbox" key={i}>
                                      <input 
                                          type="checkbox" 
                                          className="custom-control-input"
                                          defaultChecked={false}
                                          onChange={this.toggleChange(`servidor${i}`)} />
                                      <span className="custom-control-label">{elemento1.nome}</span>
                                </label>
                            )
                          )}

                          {/* 
                            <label className="custom-control custom-checkbox" key={i}>
                                  <input 
                                      type="checkbox" 
                                      className="custom-control-input"
                                      defaultChecked={false}
                                      onChange={this.toggleChange(`servidor${i}`)} />
                                  <span className="custom-control-label">{elemento1.nome}</span>
                            </label>
                          */}

                      </div>
                  </div>
                </div>

                <div className="col-sm-12 col-lg-6">
                    <div className="containerFeedbackPlano">
                        
                      {this.renderContainerFeedbackEditaPlano()}
                      {this.renderContainerFeedbackCadastraServidores()}
                        
                    </div>
                </div>
            </div>

          </Modal.Content>
          <Modal.Actions>
            <ModalDelete idDoServidor={this.state.idDoServidor} mandaDadosParaComponentePai={this.PegandoMensagemDoComponenteFilho} />
            <button className="btn btn-secondary" onClick={this.close}>Cancelar</button>

            <button className="btn btn-green" onClick={this.arrumarServidores} style={{marginLeft: "20px"}}>Atualizar</button>
            
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}