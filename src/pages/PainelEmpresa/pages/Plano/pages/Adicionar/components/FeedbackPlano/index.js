import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";

import api from './../../../../../../../../services/api';

import './style.css';

import CardProgresso from './components/CardProgressoFeedback';

export default class FeedbackPlano extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMounted: true,

            plano:[],

            iconeRodando: true,
            icone: 'fe-refresh-cw'
        };

    }

    componentDidMount() {
        this.setState({ isMounted: true });

        if (this.state.isMounted) {
            //
        }
           
    }
    componentWillUnmount() {
        this.setState({ isMounted: false});
    }

    pegarArrumarProps = () =>  {
        
    };

    // Filho Manda Mensagem Para o Pai
    SolicitarDadosDaApi(atualizarPaginaDoServidor) {
        if(atualizarPaginaDoServidor === true){
            //
        }
    }

    render() {
        return (
            <div className="containerFeedbackPlano">
                <h1 className="page-title">Sicronização do Plano</h1>

                <CardProgresso 
                    icone={this.state.icone} 
                    animacaoIcone={this.state.iconeRodando} 
                    categoria='CriarPlano'
                    elemento={this.state.plano}
                />

            </div>
        );
    }


}