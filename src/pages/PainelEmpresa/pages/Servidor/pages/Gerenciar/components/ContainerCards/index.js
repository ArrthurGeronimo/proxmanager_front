import React, { Component } from "react";
import ReactDOM from "react-dom";

import CardServidor from './../CardServidor/index';

export default class ContainerCardsServidores extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isMounted: false
        };
    }

    componentDidMount() {
        this.setState({ isMounted: true }, () => {
            if (this.state.isMounted) {
                this.filtrarServidores(); 
            }
        });
    }

    componentWillUnmount() {
        this.setState({ isMounted: false});
    }

    filtrarServidores = () => {
        for(let i=0; i < this.props.servidores.length; i++){
            let toString = JSON.stringify(this.props.servidores[i]).toLowerCase();
            let inputPesquisa = (this.props.filtro.toLowerCase());
            let verificaSeTem = toString.includes(inputPesquisa);
            let cardServidor = document.getElementById('cardServidor_'+this.props.servidores[i]._id);
            if(verificaSeTem){
                if(cardServidor !== null){
                    cardServidor.classList.add("elementoAparece");
                    cardServidor.classList.remove("elementoDesaparece");
                }
            }else{
                if(cardServidor !== null){
                    cardServidor.classList.add("elementoDesaparece");
                    cardServidor.classList.remove("elementoAparece");
                } 
            }
        }
    }

    render() {
        return (
            <div className="col-12" style={{display: 'contents'}}>
                {this.filtrarServidores()}
                {this.props.servidores.map((elemento, i) => 
                    <CardServidor key={i} servidor={elemento} />
                )}
            </div>
        );
    }
}