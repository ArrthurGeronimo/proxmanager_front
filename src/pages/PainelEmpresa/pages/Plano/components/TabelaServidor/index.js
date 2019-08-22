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
            this.filtrarServidores(); 
        }
    });
}
componentWillUnmount() {
    this.setState({ isMounted: false});
}
// Pegando Mensagem do Filho
PegandoMensagemDoComponenteFilho = (value) => {
    console.log('TabelaServidor: CHEGOU MENSAGEM DO FILHO')
    if(value){
    this.props.mandaDadosParaComponentePai(true); // avisa o pai
    }
}
// Filtragem dos elementos
filtrarServidores = () => {
    for(let i=0; i < this.props.servidores.length; i++){
        let toString = JSON.stringify(this.props.servidores[i]).toLowerCase();
        let inputPesquisa = (this.props.filtro.toLowerCase());
        let verificaSeTem = toString.includes(inputPesquisa);
        let linhaDaTabela = document.getElementById('linhaDaTabela'+this.props.servidores[i]._id);
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
            <div className="table-responsive table-gerenciar-servidores">
                <table className="table card-table table-vcenter text-nowrap">
                    <thead>
                        <tr>
                            <th className="w-1">Conexão</th>
                            <th>Nome</th>
                            <th>Autenticação</th>
                            <th>Informações</th>
                            <th>Cadastros</th>
                        </tr>
                    </thead>
                    <tbody>

                    {this.filtrarServidores()}

                        {this.props.servidores.map((elemento, i) => 

                            <LinhaDaTabela key={i} servidor={elemento} mandaDadosParaComponentePai={this.PegandoMensagemDoComponenteFilho} />

                        )}

                    </tbody>
                </table>
            </div>
        </div>
    </div>
    );
  }
}