import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import api from './../../../../../../../../services/api';

import DesenhoDoServidorConectado from './../../../../components/DesenhoDoServidorConectado';
import DesenhoDoServidorDesconectado from './../../../../components/DesenhoDoServidorDesconectado';
import ImagemServidorConectado from './../../../../../../../../assets/images/servidor_ligado.png';
import ImagemServidorDesconectado from './../../../../../../../../assets/images/servidor_desligado.png';
import { FindValueOperator } from 'rxjs/operators/find';

import './style.css';

export default function FormRegister() {
    const [values, setValues] = React.useState({
        nomeDoServidor: '',
        ipDoServidor: '',
        porta: '8728',
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

        avisoCerteza: false,

        redirect: false
    });

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value, servidorConectado: false });
    };

    const adicionarServidor = () =>  {
        const obj = {
           nome: values.nomeDoServidor,
           ip: values.ipDoServidor,
           porta: values.porta,
           interface: values.interface,
           login: values.login,
           senha: values.senha
        };

        if (obj.ip === '') {
            setValues({
                ...values,
                errorNomeDoServidor: false,
                errorCnpj: false,
                errorEmail: false,
                errorSenha: true,
                errorText: 'Senhas são importantes, sabia?'
            });
        }else{
            api.post(`/empresa/${window.localStorage.getItem('segredo')}/servidor`, obj)
            .then(function (response) {
                console.log(response.data);
                setValues({
                    ...values,
                    redirect: true
                });
                
            })
            .catch(function (error) {
                console.log(error);
            })
        }
    };
// Verificação do NOME DO SERVIDOR
const renderFeedbackNomeDoServidor = () => {
    if (values.errorNomeDoServidor) {
      return (
        <div className="invalid-feedback">{values.errorTextNomeDoServidor}</div>
      ) 
    }
}
const trocouNomeDoServidor = () => {
    if(values.nomeDoServidor.length > 0){
        setValues({
            ...values,
            errormomeDoServidor: false,
            successNomeDoServidor: true
        });
    }else if (values.nomeDoServidor === ''){
        setValues({
            ...values,
            errorNomeDoServidor: true,
            successNomeDoServidor: false,
            errorTextNomeDoServidor: 'Seria interessante colocar um nome para o servidor'
        });
    }
}
// Verificação do IP DO SERVIDOR
const renderFeedbackIpDoServidor = () => {
    if (values.errorIpDoServidor) {
      return (
        <div className="invalid-feedback">{values.errorTextIpDoServidor}</div>
      ) 
    }
}
const trocouIpDoServidor = () => {
    if(values.ipDoServidor.length > 0){
        setValues({
            ...values,
            errorIpDoServidor: false,
            successIpDoServidor: true
        });
    }else if (values.IpDoServidor === ''){
        setValues({
            ...values,
            errorIpDoServidor: true,
            successIpDoServidor: false,
            errorTextIpDoServidor: 'Seria interessante colocar um IP para o servidor'
        });
    }
}
    // Certeza do cadastro sem conexão
    const certezaQueQuerAdicionarServidor = () => {
        setValues({ 
            ...values, 
            avisoCerteza: true
        });
    }
    const renderAvisoDeCerteza =() => {
        if(values.avisoCerteza){
            return (
                <div>
                    <div className="alert alert-warning alert-warning" role="alert">
                        <i className="fe fe-info mr-2" aria-hidden="true"></i>
                        Não foi possível estabelecer conexão com o servidor.
                     </div>
                    <button className="btn btn-primary btn-block" onClick={adicionarServidor}>Estou ciente, quero cadastrar mesmo assim</button>
                </div> 
            )
        }else{
            return(
                <button className="btn btn-primary btn-block" onClick={certezaQueQuerAdicionarServidor}>Criar servidor</button>
            )
        }
    }
    // Testar Conexão
    const testarConexao = () =>  {
        const obj = {
            ip: values.ipDoServidor,
            porta: values.porta,
            login: values.login,
            senha: values.senha
        };
        if(values.informacoesServidor !== '' 
            && values.porta !== '' 
            && values.login !== ''
            && values.senha !== ''
            && values.servidorConectado === false ){
                api.post('/servidor/recursos', obj)
                .then(function (response) {
                    console.log(response.data);
                    if(response.data.status === 'success'){
                        setValues({ 
                            ...values, 
                            servidorConectado: true,
                            avisoCerteza: false,
                            informacoesServidor: response.data
                        });
                        console.log(values.informacoesServidor);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
            }
    };
    //Mostrar Desenho
    const renderDesenhoServidorAntigo = () => {
        if (values.servidorConectado) {
            return (
                <DesenhoDoServidorConectado />
            ) 
        }else{
            return (
                <DesenhoDoServidorDesconectado />
            ) 
        }
    }
    //Mostrar Desenho
    const renderDesenhoServidor = () => {
        if (values.servidorConectado) {
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
    const renderInformacoesServidor = () => {
        if (values.servidorConectado) {
            return (
                <div className="informacoesServidor">
                    <div className="alert alert-icon alert-success" role="alert">
                        <i className="fe fe-check mr-2" aria-hidden="true"></i> Conectado com o servidor. 
                    </div>
                    <div className="alert alert-icon alert-primary" role="alert">
                        <i className="fe fe-info mr-2" aria-hidden="true"></i> 
                        {`Arquitetura: ${values.informacoesServidor["architecture-name"]}`}
                        <div className="dropdown-divider"></div>
                        {`Placa: ${values.informacoesServidor["board-name"]}`}
                        <div className="dropdown-divider"></div>
                        {`Versão: ${values.informacoesServidor["version"]}`}
                        <div className="dropdown-divider"></div>
                        {`CPU: ${values.informacoesServidor["cpu"]}`}
                        <div className="dropdown-divider"></div>
                        {`${values.informacoesServidor["cpu-count"]} núcleos`}
                        <div className="dropdown-divider"></div>
                        {`${values.informacoesServidor["cpu-frequency"]} MHz`}
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
    const renderRedirect = () => {
        if (values.redirect) {
          return <Redirect to={{
            pathname: '/painel_empresa/gerenciar_servidores'
          }} />
        }
    }

  return (
    <div className="row row-cards">
        {renderRedirect()}
        <div className="col-sm-12 col-lg-6">
            
            <div className="form-group">
                <label className="form-label">Nome do Servidor</label>
                <input 
                    type="text" 
                    className={"form-control " + (values.errorNomeDoServidor ? ' is-invalid ' : '') + (values.successNomeDoServidor ? ' is-valid ' : '') + (values.nomeDoServidor.length > 0 ? ' is-valid ' : '')}  
                    placeholder="Digite o nome do servidor (Ex. Servidor Inicial)"
                    value={values.nomeDoServidor}
                    onChange={handleChange('nomeDoServidor')}
                    onBlur={trocouNomeDoServidor}
                />
                {renderFeedbackNomeDoServidor()}
            </div>
            <div className="form-group">
                <label className="form-label">IP do Servidor</label>
                <input 
                    type="text" 
                    className={"form-control " + (values.errorIpDoServidor ? ' is-invalid ' : '') + (values.successIpDoServidor ? ' is-valid ' : '') + (values.ipDoServidor.length > 0 ? ' is-valid ' : '')}   
                    placeholder="Digite o IP do servidor (Ex. 192.168.0.1)"
                    value={values.ipDoServidor}
                    onChange={handleChange('ipDoServidor')}
                    onBlur={trocouIpDoServidor}
                />
                 {renderFeedbackIpDoServidor()}
            </div>
            <div className="form-group">
                <label className="form-label">Porta</label>
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Digite a porta do servidor (Ex. 8728)"
                    value={values.porta}
                    onChange={handleChange('porta')}
                />
            </div>
            <div className="form-group">
                <label className="form-label">Interface</label>
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Digite a interface do servidor (Ex. ether1)"
                    value={values.interface}
                    onChange={handleChange('interface')}
                />
            </div>
            <div className="form-group">
                <label className="form-label">Login</label>
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Digite o login do servidor (Ex. admin)"
                    value={values.login}
                    onChange={handleChange('login')}
                />
            </div>
            <div className="form-group">
                <label className="form-label">Senha</label>
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Digite a senha do servidor"
                    value={values.senha}
                    onChange={handleChange('senha')}
                />
            </div>

            <div className="form-group">
                <div className="form-footer">

                    {values.servidorConectado ?
                        <button className="btn btn-primary btn-block" onClick={adicionarServidor}>Criar servidor</button>
                    :
                        <div>
                            {renderAvisoDeCerteza()}
                        </div>
                        
                    }

                </div>
            </div>

        </div>
        <div className="col-sm-12 col-lg-6">
            <div className="row containerTestarConexaoPageAdicionarServidor">
                {testarConexao()}
                <div className="col-sm-4 col-lg-4 containerDesenhoPageAdicionarServidor">
                    {renderDesenhoServidor()}
                </div>
                <div className="col-sm-8 col-lg-8">
                    {renderInformacoesServidor()}
                </div>
            </div>
        </div>
    </div>

  )
};