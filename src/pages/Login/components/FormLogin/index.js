import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import api from './../../../../services/api';

import './style.css';

export default function FormRegister() {
    const [values, setValues] = React.useState({
        login: '',
        senha: '',

        errorLogin: false,
        errorTextLogin: 'Seus dados estão incorretos.',
        redirect: false
    });

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value, errorLogin: false });
    };

    const fazerLogin = () =>  {
        if(values.login === '' || values.senha === ''){
            setValues({
                ...values,
                errorLogin: true,
                errorTextLogin: 'Preencha os campos.',
            });
        }

        const obj = {
            login: values.login,
            senha: values.senha
        };
        api.post('/logar', obj,{
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            if(response.data.status === 'success'){
                //console.log('LOGOU: '+response)
                //console.log(response)
                window.localStorage.setItem('autenticacao', "true");
                window.localStorage.setItem('token', response.data.token);
                window.localStorage.setItem('login', values.login);
                window.localStorage.setItem('segredo', response.data.empresa._id);
                //setUsuario(response.data.empresa)
                //usuario = response.data.empresa;
                setValues({
                    ...values,
                    redirect: true
                });
            }
          })
        .catch(function (error) {
            setValues({
                ...values,
                errorLogin: true,
                    errorTextLogin: 'Seus dados estão incorretos.',
            });
        })
    };

    const renderFeedbackLogin = () => {
        if (values.errorLogin) {
          return (
            <div className="invalid-feedback invalid-feedback-custom-pageLogin">{values.errorTextLogin}</div>
          ) 
        }
    }
    // Redirecionamento para a página de LOGIN
    const renderRedirect = () => {
        if (values.redirect) {
          return <Redirect to={{
            pathname: '/painel_empresa'
          }} />
        }
    }

  return (
    <div className="card">
        {renderRedirect()}
        <div className="card-body p-6">
            <div className="card-title">Entre com a sua conta</div>
                {renderFeedbackLogin()}
                <div className="form-group">
                    <label className="form-label">Email ou CNPJ</label>
                    <input 
                        className="form-control" 
                        placeholder="Digite seu email ou CNPJ"
                        value={values.login}
                        onChange={handleChange('login')}            
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">
                        Senha
                        <a href="./forgot-password.html" className="float-right small">Eu esqueci a minha senha</a>
                    </label>
                    <input 
                        type="password" 
                        className="form-control" 
                        placeholder="Digite sua senha"
                        value={values.senha}
                        onChange={handleChange('senha')}
                    />
                </div>
                <div className="form-group">
                    <label className="custom-control custom-checkbox">
                      <input type="checkbox" className="custom-control-input" />
                      <span className="custom-control-label">Me lembre</span>
                    </label>
                </div>
                <div className="form-footer">
                    {values.login === ''
                    || values.senha === ''
                    || values.errorLogin === true ?
                
                    <button type="submit" className="btn btn-primary btn-block btn-disable" >Entrar</button>
                    :
                    <button type="submit" className="btn btn-primary btn-block" onClick={fazerLogin}>Entrar</button>
                    
                    }
                    
                </div>
        </div>
    </div>
  )
};