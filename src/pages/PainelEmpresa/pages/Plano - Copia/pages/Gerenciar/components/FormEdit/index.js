import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import api from './../../../../../../../../services/api';

import DesenhoDoServidorConectado from './../../../../components/DesenhoDoServidorConectado';
import DesenhoDoServidorDesconectado from './../../../../components/DesenhoDoServidorDesconectado';
import { FindValueOperator } from 'rxjs/operators/find';

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

        redirect: false
    });

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value, servidorConectado: false });
    };

    const submitEmpresa = () =>  {
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
                errorRazaoSocial: false,
                errorCnpj: false,
                errorEmail: false,
                errorSenha: true,
                errorText: 'Senhas são importantes, sabia?'
            });
        }else{
            api.post(`/empresa/${window.localStorage.getItem('segredo')}/servidor`, obj)
            .then(function (response) {
                console.log(response.data);
                // TRATAR ERROS AQUI
                
            })
            .catch(function (error) {
                console.log(error);
            })
        }
    };

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
    const renderDesenhoServidor = () => {
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
    //Mostrar Informações
    const renderInformacoesServidor = () => {
        if (values.servidorConectado) {
            return (
                <div className="informacoesServidor">
                    <div className="alert alert-icon alert-success" role="alert">
                        <i className="fe fe-check mr-2" aria-hidden="true"></i> Conectado com o servidor. 
                    </div>
                    <div className="alert alert-icon alert-primary" role="alert">
                        <i className="fe fe-bell mr-2" aria-hidden="true"></i> 
                       {`Arquitetura: ${values.informacoesServidor["architecture-name"]}  -  Placa: ${values.informacoesServidor["board-name"]}  -  Versão: ${values.informacoesServidor["version"]}`}
                    </div>
                    <div className="alert alert-icon alert-primary" role="alert">
                        <i className="fe fe-bell mr-2" aria-hidden="true"></i>
                        {`CPU: ${values.informacoesServidor["cpu"]}  -  ${values.informacoesServidor["cpu-count"]} Cores  -  ${values.informacoesServidor["cpu-frequency"]} MHz`}
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

  return (
    <div className="row row-cards">
        <div className="col-sm-12 col-lg-6">
            
            <div className="form-group">
                <label className="form-label">Nome do Servidor</label>
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Digite o nome do servidor (Ex. Servidor Inicial)"
                    value={values.nomeDoServidor}
                    onChange={handleChange('nomeDoServidor')}
                />
            </div>
            <div className="form-group">
                <label className="form-label">IP do Servidor</label>
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Digite o IP do servidor (Ex. 192.168.0.1)"
                    value={values.ipDoServidor}
                    onChange={handleChange('ipDoServidor')}
     
                />
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
                    <button className="btn btn-primary btn-block" onClick={submitEmpresa}>Criar servidor</button>
                </div>
            </div>

        </div>
        <div className="col-sm-12 col-lg-6">
            <div className="row">
                {testarConexao()}
                <div className="col-sm-4 col-lg-4">
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