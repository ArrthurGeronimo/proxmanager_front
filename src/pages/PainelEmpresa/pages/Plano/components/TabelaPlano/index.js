import React, { Component } from "react";
import LinhaDaTabela from './../LinhaDaTabela';
import './style.css';

export default class TabelaServidor extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isMounted: false
    };
    // Pegando Mensagem do Filho
    this.PegandoMensagemDoComponenteFilho = this.PegandoMensagemDoComponenteFilho.bind(this, true);
  }
// Lifecycle do Componente
componentDidMount() {
    this.setState({ isMounted: true }, () => {
        if (this.state.isMounted) {
            this.filtrarPlanos(); 
        }
    });
}
componentWillUnmount() {
    this.setState({ isMounted: false});
}
// Pegando Mensagem do Filho
PegandoMensagemDoComponenteFilho = (value) => {
    //console.log('TabelaServidor: CHEGOU MENSAGEM DO FILHO')
    if(value){
    this.props.mandaDadosParaComponentePai(true); // avisa o pai
    }
}
// Filtragem dos elementos
filtrarPlanos = () => {
    for(let i=0; i < this.props.planos.length; i++){
        let toString = JSON.stringify(this.props.planos[i]).toLowerCase();
        let inputPesquisa = (this.props.filtro.toLowerCase());
        let verificaSeTem = toString.includes(inputPesquisa);
        let linhaDaTabela = document.getElementById('linhaDaTabela'+this.props.planos[i]._id);
        if(verificaSeTem){
            if(linhaDaTabela !== null){
                linhaDaTabela.classList.add("elementoAparece");
                linhaDaTabela.classList.remove("elementoDesaparece");
            }
        }else{
            if(linhaDaTabela !== null){
                linhaDaTabela.classList.add("elementoDesaparece");
                linhaDaTabela.classList.remove("elementoAparece");
            }  
        }
    }
}

  render() {
    return (
    <div className="col-12">
        <div className="card">
            <div className="table-responsive">
                <table className="table card-table table-vcenter text-nowrap">
                    <thead>
                        <tr>
                            <th className="w-1">Nome</th>
                            <th>Informações</th>
                            <th>Servidores</th>
                            <th>Autenticações</th>
                        </tr>
                    </thead>
                    <tbody>

                    {this.filtrarPlanos()}

                        {this.props.planos.map((elemento, i) => 

                            <LinhaDaTabela key={i} plano={elemento} mandaDadosParaComponentePai={this.PegandoMensagemDoComponenteFilho} />

                        )}

                    </tbody>
                </table>
            </div>
        </div>
    </div>
    );
  }
}