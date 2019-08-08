import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import api from './../../../../services/api';

export default function FormRegister() {
    const [values, setValues] = React.useState({
        razaoSocial: '',
        cnpj: '',
        email: '',
        senha: '',

        alertaRazaoSocial: false,
        alertaCNPJ: false,
        alertaEmail: false,
        alertaSenha: false,
        alertaCategoria: 'primary',
        alertaIcone: 'fe-alert-triangle',
        alertaTexto: 'Teste de Texto',

        redirect: false
    });

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    const submitEmpresa = () =>  {
        const obj = {
            dado: {
              razaoSocial: values.razaoSocial,
              cnpj: values.cnpj,
              email: values.email
            },
            autenticacao:{
                senha: values.senha
            }
        };

        if(obj.dado.razaoSocial === ''){
            setValues({
                ...values,
                alertaRazaoSocial: true,
                alertaCategoria: 'warning',
                alertaIcone: 'fe-alert-triangle',
                alertaTexto: 'Não está esquecendo a sua RAZÃO SOCIAL?'
            });
        }else if (obj.dado.cnpj === '') {
            setValues({
                ...values,
                alertaRazaoSocial: false,
                alertaCNPJ: true,
                alertaCategoria: 'warning',
                alertaIcone: 'fe-alert-triangle',
                alertaTexto: 'Cadê o seu CNPJ?'
            });
        }else if (obj.dado.email === '') {
            setValues({
                ...values,
                alertaRazaoSocial: false,
                alertaCNPJ: false,
                alertaEmail: true,
                alertaCategoria: 'warning',
                alertaIcone: 'fe-alert-triangle',
                alertaTexto: 'Não esqueceu o EMAIL?'
            });
        }else if (obj.autenticacao.senha === '') {
            setValues({
                ...values,
                alertaRazaoSocial: false,
                alertaCNPJ: false,
                alertaEmail: false,
                alertaSenha: true,
                alertaCategoria: 'warning',
                alertaIcone: 'fe-alert-triangle',
                alertaTexto: 'Senhas são importantes, sabia?'
            });
        }else{
            api.post('/empresa', obj)
            .then(function (response) {
                console.log(response.data);
                // TRATAR ERROS AQUI
                if(response.data.status === 'success'){  
                    setValues({
                        ...values,
                        redirect: true
                    });
                }
            })
            .catch(function (error) {
                console.log(error);
            })
        }
    };

    const renderAlertaRazaoSocial = () => {
        if (values.alertaRazaoSocial) {
          return (
            <div className={`alert alert-${values.alertaCategoria} alert-dismissible`}>
                <button type="button" className="close" data-dismiss="alert"></button>
                <i className={`fe ${values.alertaIcone} mr-2`} aria-hidden="true"></i>{values.alertaTexto}
            </div>
          ) 
        }
    }
    const renderAlertaCNPJ = () => {
        if (values.alertaCNPJ) {
          return (
            <div className={`alert alert-${values.alertaCategoria} alert-dismissible`}>
                <button type="button" className="close" data-dismiss="alert"></button>
                <i className={`fe ${values.alertaIcone} mr-2`} aria-hidden="true"></i>{values.alertaTexto}
            </div>
          ) 
        }
    }
    const renderAlertaEmail = () => {
        if (values.alertaEmail) {
          return (
            <div className={`alert alert-${values.alertaCategoria} alert-dismissible`}>
                <button type="button" className="close" data-dismiss="alert"></button>
                <i className={`fe ${values.alertaIcone} mr-2`} aria-hidden="true"></i>{values.alertaTexto}
            </div>
          ) 
        }
    }
    const renderAlertaSenha = () => {
        if (values.alertaSenha) {
          return (
            <div className={`alert alert-${values.alertaCategoria} alert-dismissible`}>
                <button type="button" className="close" data-dismiss="alert"></button>
                <i className={`fe ${values.alertaIcone} mr-2`} aria-hidden="true"></i>{values.alertaTexto}
            </div>
          ) 
        }
    }

    const renderRedirect = () => {
        if (values.redirect) {
          return <Redirect to={{
            pathname: '/entrar'
          }} />
        }
    }

  return (
    <div className="card">
        {renderRedirect()}
        <div className="card-body p-6">
            <div className="card-title">Criando uma nova conta</div>
            <div className="form-group">
                <label className="form-label">Razão Social</label>
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Digite sua razão social"
                    value={values.razaoSocial}
                    onChange={handleChange('razaoSocial')}
                />
            </div>
            {renderAlertaRazaoSocial()}
            <div className="form-group">
                <label className="form-label">CNPJ</label>
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Digite seu CNPJ"
                    value={values.cnpj}
                    onChange={handleChange('cnpj')}
                />
            </div>
            {renderAlertaCNPJ()}
            <div className="form-group">
                <label className="form-label">Email</label>
                <input 
                    type="email" 
                    className="form-control" 
                    placeholder="Digite seu email"
                    value={values.email}
                    onChange={handleChange('email')}
                />
            </div>
            {renderAlertaEmail()}
            <div className="form-group">
                <label className="form-label">Senha</label>
                <input 
                    type="password" 
                    className="form-control" 
                    placeholder="Digite sua senha"
                    value={values.senha}
                    onChange={handleChange('senha')}
                />
            </div>
            {renderAlertaSenha()}
            <div className="form-group">
                <label className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" />
                    <span className="custom-control-label">Concordo com os  <a href="#">termos e política</a></span>
                </label>
            </div>
            <div className="form-footer">
                <button className="btn btn-primary btn-block" onClick={submitEmpresa}>Criar nova conta</button>
            </div>
        </div>
    </div>
  )
};