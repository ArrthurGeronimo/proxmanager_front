import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import validator from 'validator';
import { isCNPJ, formatToCNPJ } from 'brazilian-values';
import { cnpjMask } from './../../../../services/masks';

import './style.css';

import api from './../../../../services/api';

export default function FormRegister() {
    const [values, setValues] = React.useState({
        razaoSocial: '',
        cnpj: '',
        email: '',
        senha: '',
        inputConfirmaSenha: '',

        errorCnpj: false,
        errorTextCnpj: 'CNPJ não pode ser vazio',
        successCnpj: false,
        successTextCnpj: 'CNPJ ainda não registrado',

        errorEmail: false,
        errorTextEmail: 'Precisamos de um email',
        successEmail: false,
        successTextEmail: 'Email ainda não registrado',

        errorRazaoSocial: false,
        errorTextRazaoSocial: 'Sua Razão Social não pode ser vazia',
        successRazaoSocial: false,

        errorSenha: false,
        errorTextSenha: 'É sempre bom colocar uma senha',
        successSenha: false,
        successTextSenha: '',

        aceitouTermos: false,
        errorTermos: false,
        errorTextTermos: 'Você precisa aceitar os termos.',

        redirect: false
    });

    const handleChange = name => event => {
        if(name === 'cnpj'){
            setValues({ ...values, [name]: cnpjMask(event.target.value) });
        }else{
            setValues({ ...values, [name]: event.target.value });
        }
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

        if(values.aceitouTermos === false){
            setValues({
                ...values,
                errorTermos: true
            });
        }else if(obj.dado.razaoSocial === ''){
            setValues({
                ...values,
                errorRazaoSocial: true,
                errorTextRazaoSocial: 'Não está esquecendo a sua RAZÃO SOCIAL?'
            });
        }else if (obj.dado.cnpj === '') {
            setValues({
                ...values,
                errorRazaoSocial: false,
                errorCnpj: true,
                errorTextCnpj: 'Cadê o seu CNPJ?'
            });
        }else if (obj.dado.email === '') {
            setValues({
                ...values,
                errorRazaoSocial: false,
                errorCnpj: false,
                errorEmail: true,
                errorTextEmail: 'Não esqueceu o EMAIL?'
            });
        }else if (obj.autenticacao.senha === '') {
            setValues({
                ...values,
                errorRazaoSocial: false,
                errorCnpj: false,
                errorEmail: false,
                errorSenha: true,
                errorText: 'Senhas são importantes, sabia?'
            });
        }else if(values.successCnpj === true &&
                values.successEmail === true &&
                values.successRazaoSocial === true &&
                values.successSenha === true &&
                values.aceitouTermos === true){
            api.post('/empresa', obj)
            .then(function (response) {
                console.log(response.data);
                // TRATAR ERROS AQUI
                if(response.data.status === 'success'){  
                    setValues({
                        ...values,
                        errorRazaoSocial: false,
                        errorCnpj: false,
                        errorEmail: false,
                        errorSenha: false,
                        redirect: true
                    });
                }
            })
            .catch(function (error) {
                console.log(error);
            })
        }
    };

    // Verificação da RAZÃO SOCIAL
    const renderFeedbackRazaoSocial = () => {
        if (values.errorRazaoSocial) {
          return (
            <div className="invalid-feedback">{values.errorTextRazaoSocial}</div>
          ) 
        }
    }
    const trocouRazaoSocial = () => {
        if(values.razaoSocial.length > 0){
            setValues({
                ...values,
                errorRazaoSocial: false,
                successRazaoSocial: true
            });
        }else if (values.razaoSocial === ''){
            setValues({
                ...values,
                errorRazaoSocial: true,
                successRazaoSocial: false,
                errorTextRazaoSocial: 'Seria interessante colocar uma Razão Social'
            });
        }
    }
    // Verificação CNPJ
    const renderFeedbackCnpj = () => {
        if (values.errorCnpj) {
          return (
            <div className="invalid-feedback">{values.errorTextCnpj}</div>
          ) 
        }else if(values.successCnpj){
            return (
                <div className="valid-feedback">{values.successTextCnpj}</div>
            ) 
        }
    }
    const verificarCnpj = () => {
        if(isCNPJ(values.cnpj)){
            console.log('CNPJ Válido')
            const obj = {
                'dado.cnpj': values.cnpj 
            };

            api.post('/empresas/verificadisponibilidade', obj)
            .then(function (response) {
                if(response.data.status === 'success'){
                    setValues({
                        ...values,
                        errorCnpj: false,
                        successCnpj: true,
                        errorTextCnpj: 'CNPJ válido'
                    });
                }
                if(response.data.status === 'error'){
                    setValues({
                        ...values,
                        errorCnpj: true,
                        successCnpj: false,
                        errorTextCnpj: 'CNPJ já cadastrado no sistema'
                    });
                }
            })
            .catch(function (error) {
                console.log(error);
            })
        }else{
            setValues({
                ...values,
                errorCnpj: true,
                successCnpj: false,
                errorTextCnpj: 'Insira um CNPJ válido'
            });
        }  
    }
    // Verificação EMAIL
    const renderFeedbackEmail = () => {
        if (values.errorEmail) {
          return (
            <div className="invalid-feedback">{values.errorTextEmail}</div>
          ) 
        }else if(values.successEmail){
            return (
                <div className="valid-feedback">{values.successTextEmail}</div>
            )
        }
    }
    const verificarEmail = () => {
        if(validator.isEmail(values.email)){
            const obj = {
                'dado.email': values.email 
            };

            api.post('/empresas/verificadisponibilidade', obj)
            .then(function (response) {
                if(response.data.status === 'success'){
                    setValues({
                        ...values,
                        errorEmail: false,
                        successEmail: true,
                        errorTextEmail: 'Email válido'
                    });
                }
                if(response.data.status === 'error'){
                    setValues({
                        ...values,
                        errorEmail: true,
                        successEmail: false,
                        errorTextEmail: 'Email já cadastrado no sistema'
                    });
                }
            })
            .catch(function (error) {
                console.log(error);
            })
        }else{
            setValues({
                ...values,
                errorEmail: true,
                successEmail: false,
                errorTextEmail: 'Insira um email válido'
            });
        }  
    }
    // Verificação da SENHA
    const verificarCamposDeSenhas = () => {
        if(values.senha.length > 1 && values.inputConfirmaSenha.length > 1){
            if(values.inputConfirmaSenha === values.senha){
                setValues({
                    ...values,
                    errorSenha: false,
                    successSenha: true,
                    successTextSenha: 'As senhas conferem'
                });
            }else{
                setValues({
                    ...values,
                    errorSenha: true,
                    successSenha: false,
                    errorTextSenha: 'As senhas não são iguais'
                });
            }
        }
    }
    const trocouSenha = () => {
        if(values.inputConfirmaSenha.length > 1){
            setValues({
                ...values,
                errorSenha: true,
                successSenha: false,
                errorTextSenha: 'As senhas não são iguais'
            });
        }else if (values.inputConfirmaSenha === ''){
            setValues({
                ...values,
                successSenha: false
            });
        }
    }
    const renderFeedbackSenha = () => {
        if (values.errorSenha) {
          return (
            <div className="invalid-feedback">{values.errorTextSenha}</div>
          ) 
        }else if(values.successSenha){
            return (
                <div className="valid-feedback">{values.successTextSenha}</div>
            )
        }
    }
    // Botão TERMOS
    const apertouBotaoDosTermos = () => {
        if(values.aceitouTermos === false){
            setValues({
                ...values,
                aceitouTermos: true,
                errorTermos: false
            });
        }else if(values.aceitouTermos === true){
            setValues({
                ...values,
                aceitouTermos: false,
                errorTermos: true
            });
        }
    }
    const renderFeedbackTermos = () => {
        if (values.errorTermos) {
            return (
              <div className="invalid-feedback" style={{display:"block"}}>{values.errorTextTermos}</div>
            ) 
        }
    }
    // Redirecionamento para a página de LOGIN
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
                <label className="form-label">Razão Social<span className="form-required">*</span></label>
                <input 
                    type="text" 
                    className={"form-control " + (values.errorRazaoSocial ? ' is-invalid ' : '') + (values.successRazaoSocial ? ' is-valid ' : '') + (values.razaoSocial.length > 0 ? ' is-valid ' : '')} 
                    placeholder="Digite sua razão social"
                    value={values.razaoSocial}
                    onChange={handleChange('razaoSocial')}
                    onBlur={trocouRazaoSocial}
                /> 
                {renderFeedbackRazaoSocial()}
            </div>
            <div className="form-group">
                <label className="form-label">CNPJ<span className="form-required">*</span></label>
                <input 
                    type="text" 
                    className={"form-control " + (values.errorCnpj ? ' is-invalid ' : '') + (values.successCnpj ? ' is-valid ' : '')}  
                    placeholder="Digite seu CNPJ"
                    value={values.cnpj}
                    onChange={handleChange('cnpj')}
                    onBlur={verificarCnpj}
                />
                {renderFeedbackCnpj()}
            </div>
            <div className="form-group">
                <label className="form-label">Email<span className="form-required">*</span></label>
                <input 
                    type="email" 
                    className={"form-control " + (values.errorEmail ? ' is-invalid ' : '') + (values.successEmail ? ' is-valid ' : '')}  
                    placeholder="Digite seu email"
                    value={values.email}
                    onChange={handleChange('email')}
                    onBlur={verificarEmail}
                />
                {renderFeedbackEmail()}
            </div>
            <div className="form-group">
                <label className="form-label">Senha<span className="form-required">*</span></label>
                <input 
                    type="password" 
                    className={"form-control " + (values.errorSenha ? ' is-invalid ' : '') + (values.successSenha ? ' is-valid ' : '')}  
                    placeholder="Digite sua senha"
                    value={values.senha}
                    onChange={handleChange('senha')}
                    onBlur={trocouSenha}
                />
            </div>
            <div className="form-group">
                <label className="form-label">Confirme a sua senha<span className="form-required">*</span></label>
                <input 
                    type="password" 
                    className={"form-control " + (values.errorSenha ? ' is-invalid ' : '') + (values.successSenha ? ' is-valid ' : '')}  
                    placeholder="Confirme a sua senha"
                    value={values.inputConfirmaSenha}
                    onChange={handleChange('inputConfirmaSenha')}
                    onBlur={verificarCamposDeSenhas}
                />
                {renderFeedbackSenha()}
            </div>
            <div className="form-group">
                <label className="custom-control custom-checkbox">
                    <input type="checkbox" 
                        className={"custom-control-input "}
                        onClick={apertouBotaoDosTermos} 
                    />
                    <span className="custom-control-label">Concordo com os  <a href="#">termos e política</a></span>
                </label>
                {renderFeedbackTermos()}
            </div>
            <div className="form-footer">
                <button className="btn btn-primary btn-block" onClick={submitEmpresa}>Criar nova conta</button>
            </div>
        </div>
    </div>
  )
};