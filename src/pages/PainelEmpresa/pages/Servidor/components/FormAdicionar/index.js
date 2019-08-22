import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './style.css';
import api from './../../../../../../services/api';
import ImagemServidorConectado from './../../../../../../assets/images/animacao-servidor-conectado.gif';
import ImagemServidorDesconectado from './../../../../../../assets/images/animacao-servidor-desconectado.gif';

export default class FormAdicionaServidor extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isMounted: false,
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
        },
        errorNomeDoServidor: false,
        errorTextNomeDoServidor: 'Coloque um nome no servidor',
        successNomeDoServidor: false,
        errorIpDoServidor: false,
        errorTextIpDoServidor: 'Coloque um IP para o servidor',
        successIpDoServidor: false,
        errorPorta: false,
        errorTextPorta: 'Coloque uma Porta para o servidor',
        successPorta: false,
        errorInterface: false,
        errorTextInterface: 'Coloque uma Interface para o servidor',
        successInterface: false,
        errorLogin: false,
        errorTextLogin: 'Coloque uma Login para o servidor',
        successLogin: false,
        errorSenha: false,
        errorTextSenha: 'Coloque uma Senha para o servidor',
        successSenha: false,
        avisoCerteza: false,
        redirect: false
        }
    }
    handleChange = name => event => {
        this.setState({ ...this.state, [name]: event.target.value, servidorConectado: false });
    };
// Lifecycle do Componente
    componentDidMount() {
        this.setState({ isMounted: true });
    }
    componentWillUnmount() {
        this.setState({ isMounted: false });
    }
// ADICIONA servidor
    adicionarServidor = () =>  {
        const obj = {
           nome: this.state.nomeDoServidor,
           ip: this.state.ipDoServidor,
           porta: this.state.porta,
           interface: this.state.interface,
           login: this.state.login,
           senha: this.state.senha
        };

        if (obj.ip === '') {
            //Validação
        }else{
            api.post(`/empresa/${window.localStorage.getItem('segredo')}/servidor`, obj)
            .then(res => {
                if(res.data.status === 'success'){
                    this.setState({
                        ...this.state,
                        redirect: true
                    });
                }
            })
            .catch(function (error) {
                //console.log(error);
            })
        }
    };
// Verificação do NOME DO SERVIDOR
    renderFeedbackNomeDoServidor = () => {
        if (this.state.errorNomeDoServidor) {
            return (
                <div className="invalid-feedback">{this.state.errorTextNomeDoServidor}</div>
            ) 
        }
    }
    trocouNomeDoServidor = () => {
        if(this.state.nomeDoServidor.length > 0){
            this.setState({
                ...this.state,
                errorNomeDoServidor: false,
                successNomeDoServidor: true
            });
        }else if (this.state.nomeDoServidor === ''){
            this.setState({
                ...this.state,
                errorNomeDoServidor: true,
                successNomeDoServidor: false,
                errorTextNomeDoServidor: 'Seria interessante colocar um nome para o servidor'
            });
        }
    }
// Verificação do IP DO SERVIDOR
    renderFeedbackIpDoServidor = () => {
        if (this.state.errorIpDoServidor) {
            return (
                <div className="invalid-feedback">{this.state.errorTextIpDoServidor}</div>
            ) 
        }
    }
    trocouIpDoServidor = () => {
        if(this.state.ipDoServidor.length > 0){
            this.setState({
                ...this.state,
                errorIpDoServidor: false,
                successIpDoServidor: true
            });
        }else if (this.state.ipDoServidor === ''){
            this.setState({
                ...this.state,
                errorIpDoServidor: true,
                successIpDoServidor: false,
                errorTextIpDoServidor: 'Seria interessante colocar um IP para o servidor'
            });
        }
    }
// Verificação da PORTA do servidor
    renderFeedbackPorta = () => {
        if (this.state.errorPorta) {
            return (
                <div className="invalid-feedback warning-feedback">{this.state.errorTextPorta}</div>
            ) 
        }
    }
    trocouPorta = () => {
        if(this.state.porta.length > 0){
            this.setState({
                ...this.state,
                errorPorta: false,
                successPorta: true
            });
        }else if (this.state.porta === ''){
            this.setState({
                ...this.state,
                errorPorta: true,
                successPorta: false,
                errorTextPorta: 'Se nenhuma porta for digitada ela irá receber o valor padrão: 8728'
            });
        }
    }
// Verificação da INTERFACE do servidor
    renderFeedbackInterface = () => {
        if (this.state.errorInterface) {
            return (
                <div className="invalid-feedback warning-feedback">{this.state.errorTextInterface}</div>
            ) 
        }
    }
    trocouInterface = () => {
        if(this.state.interface.length > 0){
            this.setState({
                ...this.state,
                errorInterface: false,
                successInterface: true
            });
        }else if (this.state.interface === ''){
            this.setState({
                ...this.state,
                errorInterface: true,
                successInterface: false,
                errorTextInterface: 'Não quer colocar a interface do seu servidor?'
            });
        }
    }
// Verificação do LOGIN do servidor
    renderFeedbackLogin = () => {
        if (this.state.errorLogin) {
            return (
                <div className="invalid-feedback">{this.state.errorTextLogin}</div>
            ) 
        }
    }
    trocouLogin = () => {
        if(this.state.login.length > 0){
            this.setState({
                ...this.state,
                errorLogin: false,
                successLogin: true
            });
        }else if (this.state.login === ''){
            this.setState({
                ...this.state,
                errorLogin: true,
                successLogin: false,
                errorTextLogin: 'É preciso colocar um login para a conexão com o servidor.'
            });
        }
    }
// Verificação do SENHA do servidor
    renderFeedbackSenha = () => {
        if (this.state.errorSenha) {
            return (
                <div className="invalid-feedback">{this.state.errorTextSenha}</div>
            ) 
        }
    }
    trocouSenha = () => {
        if(this.state.senha.length > 0){
            this.setState({
                ...this.state,
                errorSenha: false,
                successSenha: true
            });
        }else if (this.state.senha === ''){
            this.setState({
                ...this.state,
                errorSenha: true,
                successSenha: false,
                errorTextSenha: 'É preciso colocar um Senha para a conexão com o servidor.'
            });
        }
    }
// Certeza do cadastro sem conexão
    certezaQueQuerAdicionarServidor = () => {
        this.setState({
            ...this.state, 
            avisoCerteza: true
        });
    }
    renderAvisoDeCerteza =() => {
        if(this.state.avisoCerteza){
            return (
                <div>
                    <div className="alert alert-warning alert-warning" role="alert">
                        <i className="fe fe-info mr-2" aria-hidden="true"></i>
                        Não foi possível estabelecer conexão com o servidor.
                     </div>
                    <button className="btn btn-primary btn-block" onClick={this.adicionarServidor}>Estou ciente, quero cadastrar mesmo assim</button>
                </div> 
            )
        }else{
            return(
                <button className="btn btn-primary btn-block" onClick={this.certezaQueQuerAdicionarServidor}>Criar servidor</button>
            )
        }
    }
// Testar Conexão
    testarConexao = () =>  {
        if(this.state.login !== ''
        && this.state.senha !== ''
        && this.state.servidorConectado === false ){
            if(this.state.porta === ''){
                this.setState({
                    ...this.state,  
                    porta: '8728'
                });
            }

            const obj = {
                ip: this.state.ipDoServidor,
                porta: this.state.porta,
                login: this.state.login,
                senha: this.state.senha
            }
            
            api.post('/servidor/recursos', obj)
            .then(res => {
                if(res.data.status === 'success'){
                    console.log(res.data);
                    this.setState({
                        ...this.state,
                        errorPorta: false,
                        servidorConectado: true,
                        avisoCerteza: false,
                        informacoesServidor: res.data
                    });
                }else{
                    console.log(res.data);
                    this.setState({
                        ...this.state,
                        errorIpDoServidor: true, 
                        errorTextIpDoServidor: 'O IP está correto?',
                        errorPorta: true,
                        errorTextPorta: 'Certeza que a porta está correta?',
                        errorLogin: true,
                        errorTextLogin: 'Esse é o Login correto?',
                        errorSenha: true,
                        errorTextSenha: 'A senha do servidor é essa mesmo?'
                    });
                }
                
            })
            .catch(function (error) {
                console.log(error);
            })
        }
    };
//Mostrar Desenho
    renderDesenhoServidor = () => {
        if (this.state.servidorConectado) {
            return (
                <img src={ImagemServidorConectado} alt="Servidor Conectado" />
            ) 
        }else{
            return (
                <img src={ImagemServidorDesconectado} alt="Servidor Desconectado" />
            ) 
        }
    }
//Mostrar Informações
    renderInformacoesServidor = () => {
        if (this.state.servidorConectado) {
            return (
                <div className="informacoesServidor">
                    <div className="alert alert-icon alert-success" role="alert">
                        <i className="fe fe-check mr-2" aria-hidden="true"></i> Conectado com o servidor. 
                    </div>
                    <div className="alert alert-icon alert-primary" role="alert">
                        <i className="fe fe-info mr-2" aria-hidden="true"></i> 
                        {`Arquitetura: ${this.state.informacoesServidor["architecture-name"]}`}
                        <div className="dropdown-divider"></div>
                        {`Placa: ${this.state.informacoesServidor["board-name"]}`}
                        <div className="dropdown-divider"></div>
                        {`Versão: ${this.state.informacoesServidor["version"]}`}
                        <div className="dropdown-divider"></div>
                        {`CPU: ${this.state.informacoesServidor["cpu"]}`}
                        <div className="dropdown-divider"></div>
                        {`${this.state.informacoesServidor["cpu-count"]} núcleos`}
                        <div className="dropdown-divider"></div>
                        {`${this.state.informacoesServidor["cpu-frequency"]} MHz`}
                    </div>
                </div>
            ) 
        }else{
            return (
                <div className="informacoesServidor">
                    <div className="alert alert-icon alert-warning" role="alert">
                        <i className="fe fe-alert-triangle mr-2" aria-hidden="true"></i> Não conectado com o servidor 
                    </div>
                </div>
            ) 
        }
    }
// Redirecionamento para a página de GERENCIAR SERVIDORES
    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to={{
            pathname: '/painel_empresa/gerenciar_servidores'
          }} />
        }
    }

    render() {
        return (
            <div className="row row-cards">
                {this.renderRedirect()}
                <div className="col-sm-12 col-lg-6">
                    
                    <div className="form-group">
                        <label className="form-label">Nome do Servidor</label>
                        <input 
                            type="text" 
                            className={"form-control " + (this.state.errorNomeDoServidor ? ' is-invalid ' : '') + (this.state.successNomeDoServidor ? ' is-valid ' : '') + (this.state.nomeDoServidor.length > 0 ? ' is-valid ' : '')}  
                            placeholder="Digite o nome do servidor (Ex. Servidor Inicial)"
                            value={this.state.nomeDoServidor}
                            onChange={this.handleChange('nomeDoServidor')}
                            onBlur={this.trocouNomeDoServidor}
                        />
                        {this.renderFeedbackNomeDoServidor()}
                    </div>
                    <div className="form-group">
                        <label className="form-label">IP do Servidor</label>
                        <input 
                            type="text" 
                            className={"form-control " + (this.state.errorIpDoServidor ? ' is-invalid ' : '') + (this.state.successIpDoServidor ? ' is-valid ' : '') + (this.state.ipDoServidor.length > 0 ? ' is-valid ' : '')}
                            placeholder="Digite o IP do servidor (Ex. 192.168.0.1)"
                            value={this.state.ipDoServidor}
                            onChange={this.handleChange('ipDoServidor')}
                            onBlur={this.trocouIpDoServidor}
                        />
                        {this.renderFeedbackIpDoServidor()}
                    </div>
                    <div className="form-group">
                        <label className="form-label">Porta</label>
                        <input 
                            type="text" 
                            className={"form-control " + (this.state.errorPorta ? ' is-invalid is-valid-warning ' : '') + (this.state.successPorta ? ' is-valid ' : '') + (this.state.porta.length > 0 ? ' is-valid ' : '')}
                            placeholder="Digite a porta do servidor (Ex. 8728)"
                            value={this.state.porta}
                            onChange={this.handleChange('porta')}
                            onBlur={this.trocouPorta}
                        />
                        {this.renderFeedbackPorta()}
                    </div>
                    <div className="form-group">
                        <label className="form-label">Interface</label>
                        <input 
                            type="text" 
                            className={"form-control " + (this.state.errorInterface ? ' is-invalid is-valid-warning ' : '') + (this.state.successInterface ? ' is-valid ' : '') + (this.state.interface.length > 0 ? ' is-valid ' : '')}
                            placeholder="Digite a interface do servidor (Ex. ether1)"
                            value={this.state.interface}
                            onChange={this.handleChange('interface')}
                            onBlur={this.trocouInterface}
                        />
                        {this.renderFeedbackInterface()}
                    </div>
                    <div className="form-group">
                        <label className="form-label">Login</label>
                        <input 
                            type="text" 
                            className={"form-control " + (this.state.errorLogin ? ' is-invalid ' : '') + (this.state.successLogin ? ' is-valid ' : '') + (this.state.login.length > 0 ? ' is-valid ' : '')} 
                            placeholder="Digite o login do servidor (Ex. admin)"
                            value={this.state.login}
                            onChange={this.handleChange('login')}
                            onBlur={this.trocouLogin}
                        />
                        {this.renderFeedbackLogin()}
                    </div>
                    <div className="form-group">
                        <label className="form-label">Senha</label>
                        <input 
                            type="text" 
                            className={"form-control " + (this.state.errorSenha ? ' is-invalid ' : '') + (this.state.successSenha ? ' is-valid ' : '') + (this.state.senha.length > 0 ? ' is-valid ' : '')} 
                            placeholder="Digite a senha do servidor"
                            value={this.state.senha}
                            onChange={this.handleChange('senha')}
                            onBlur={this.trocouSenha}
                        />
                        {this.renderFeedbackSenha()}
                    </div>

                    <div className="form-group">
                        <div className="form-footer">

                            {this.state.servidorConectado ?
                                <button className="btn btn-primary btn-block" onClick={this.adicionarServidor}>Criar servidor</button>
                            :
                                <div>
                                    {this.renderAvisoDeCerteza()}
                                </div>
                                
                            }

                        </div>
                    </div>

                </div>
                <div className="col-sm-12 col-lg-6">
                    <div className="row containerTestarConexaoPageAdicionarServidor">
                        {this.testarConexao()}
                        <div className="col-sm-4 col-lg-4 containerDesenhoPageAdicionarServidor">
                            {this.renderDesenhoServidor()}
                        </div>
                        <div className="col-sm-8 col-lg-8">
                            {this.renderInformacoesServidor()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}