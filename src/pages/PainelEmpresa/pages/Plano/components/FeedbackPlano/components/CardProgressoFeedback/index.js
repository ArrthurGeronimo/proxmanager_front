import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";

import api from './../../../../../../../../../../services/api';

export default class FeedbackPlano extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMounted: true,

            icone: '',
            animacaoIcone: true,
            errorSituation: false,
            errorText: '',
            successSituation: false,
            successText: '',
            corDoBackground: 'blue',

            plano: {}

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
                });
            }
        }
           
    }
    componentWillUnmount() {
        this.setState({ isMounted: false});
    }

    executaProcesso = () => {
        if(this.props.categoria === 'CriarPlano'){
            const obj = {
                
            };
        
            console.log(this.state.plano);
        }
    }

    renderTextoDoCard = () =>{
        if(this.props.categoria === 'CriarPlano'){
            return(
                <h4 className="m-0"><small>Cadastrando plano </small> Nome do Servidor <small> no sistema </small></h4>
            )
        }
    }

    renderFeedback = () => {
        return(
            <small className="text-muted">blablabla</small>
        )
    }

    render() {
        return (
            <div className="card p-3">
                <div className="d-flex align-items-center">
                <span className={"stamp stamp-md mr-3 bg-"+(this.state.corDoBackground)}>
                    <i className={"fa fe " + (this.state.icone) + ' ' + (this.state.animacaoIcone ? ' icone-rodando ' : ' ')} aria-hidden="true"></i>
                </span>
                <div className="text-align-justify">
                    {this.renderTextoDoCard()}
                    {this.renderFeedback()}
                </div>
                </div>
            </div>
    );
    }

}