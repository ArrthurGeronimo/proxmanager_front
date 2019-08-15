import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";

import api from './../../../../../../../../services/api';

export default class FeedbackPlano extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMounted: true,

            icone: '',
            animacaoIcone: true,
            corDoBackground: 'blue',
            executouOperacao: false,
            errorOperacao: false,
            errorText: '',
            successOperacao: false,
            successText: '',
            

            plano: [],
            servidor: []

        };

    }

    componentDidMount() {
        this.setState({ isMounted: true });

        if (this.state.isMounted) {
            this.setState({ 
                isMounted: true,
                icone: this.props.icone,
                animacaoIcone: this.props.animacaoIcone ,
            });

            if(this.props.categoria === 'CriarPlano'){
                this.setState({ 
                    plano: this.props.elemento
                }, () => {
                    this.criarPlano();
                });
            }else if(this.props.categoria === 'SalvarNoServidor'){
                this.setState({ 
                    servidor: this.props.elemento
                }, () => {
                    this.salvarNoServidor();
                });
            }
        }
           
    }
    componentWillUnmount() {
        this.setState({ isMounted: false});
    }

    criarPlano = () => {
        api.post(`/empresa/${window.localStorage.getItem('segredo')}/plano`, this.state.plano)
        .then(res => {
            console.log(res.data)
            if(res.data.status === 'success'){
                this.setState({ 
                    icone: 'fe-check',
                    animacaoIcone: false,
                    corDoBackground: 'green',
                    executouOperacao: true,
                    successOperacao: true,
                    successText: 'Plano salvo no banco com sucesso'
                });
            }else if(res.data.status === 'error'){
                this.setState({ 
                    icone: 'fe fe-x',
                    animacaoIcone: false,
                    corDoBackground: 'red',
                    executouOperacao: true,
                    errorOperacao: true,
                    errorText: 'Opa, alguma coisa deu errada...'
                });
            }
            
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    salvarNoServidor = () => {
        //
    }

    executarNovamente = () => {
        if(this.props.categoria === 'CriarPlano'){
            this.setState({ 
                icone: 'fe-refresh-cw',
                animacaoIcone: true,
                corDoBackground: 'blue',
                executouOperacao: false,
            }, () => {
                this.criarPlano();
            });
        }
    }

    renderTextoDoCard = () =>{
        if(this.props.categoria === 'CriarPlano'){
            return(
                <h4 className="m-0"><small>Cadastrando plano </small> {this.state.plano.nome} <small> no sistema </small></h4>
            )
        }else if(this.props.categoria === 'SalvarNoServidor'){
            return(
                <h4 className="m-0"><small>Cadastrando plano no servidor </small> {this.state.servidor.nome} </h4>
            )
        }
    }

    renderFeedback = () => {
        if(this.state.executouOperacao){
            if(this.state.errorOperacao){
                return(
                    <small className="text-red">{this.state.errorText}</small>
                )
            }else if(this.state.successOperacao){
                return(
                    <small className="text-green">{this.state.successText}</small>
                )
            }
            
        }  
    }

    renderBotaoTentarNovamente = () => {
        if(this.state.errorOperacao){
            return(
                <a href="javascript:void(0)" className="float-right small text-align-right" onClick={() => {this.executarNovamente()}}>Tentar novamente</a>
            )
        }
    }

    render() {
        return (
            <div className="card p-3 cardFeedbackPlano">
                <div className="d-flex align-items-center">
                    <span className={"stamp stamp-md mr-3 bg-"+(this.state.corDoBackground)}>
                        <i className={"fa fe " + (this.state.icone) + ' ' + (this.state.animacaoIcone ? ' icone-rodando ' : ' ')} aria-hidden="true"></i>
                    </span>
                    <div className="text-align-justify">
                        {this.renderTextoDoCard()}
                        {this.renderFeedback()}
                    </div>
                </div>
                {this.renderBotaoTentarNovamente()}
            </div>
    );
    }

}