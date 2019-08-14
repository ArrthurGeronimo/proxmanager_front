import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import api from './../../../../../../../../services/api';

import DesenhoDoServidorConectado from './../../../../components/DesenhoDoServidorConectado';
import DesenhoDoServidorDesconectado from './../../../../components/DesenhoDoServidorDesconectado';
import { FindValueOperator } from 'rxjs/operators/find';

export default function FormRegister() {
const [values, setValues] = React.useState({
    

    redirect: false
});

const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
};

const adicionarPlano = () =>  {
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
                    <button className="btn btn-primary btn-block" onClick={adicionarPlano}>Criar Plano</button>
                </div>
            </div>

        </div>
        <div className="col-sm-12 col-lg-6">
            
        </div>
    </div>

  )
};