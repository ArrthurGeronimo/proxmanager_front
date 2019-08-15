import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { priceMask } from './../../../../../../../../services/masks';

import './style.css';

import api from './../../../../../../../../services/api';

import DesenhoDoServidorConectado from './../../../../components/DesenhoDoServidorConectado';
import DesenhoDoServidorDesconectado from './../../../../components/DesenhoDoServidorDesconectado';
import { FindValueOperator } from 'rxjs/operators/find';

import CardProgresso from './../CardProgressoFeedback';

export default class AdicionarPlano extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMounted: true,

            nomeDoPlano: '',
            preco: '',
            download: '',
            upload: '',

            pppoe: true,

            servidores: [],
            servidoresSelecionados: [],
            jsonServidoresSelecionados: {},
            plano: [],

            renderFeedbackPlano: false
        };
    }

handleChange = name => event => {
    if(name === 'preco'){
        this.setState({ [name]: priceMask(event.target.value) });
    }else{
        this.setState({ [name]: event.target.value });
    }
};

componentDidMount() {
    this.setState({ isMounted: true });
    if (this.state.isMounted) {
        this.pegarServidoresDoBanco(); 
    }
}

pegarServidoresDoBanco = () =>  {
    api.get(`/empresa/${window.localStorage.getItem('segredo')}/servidores`)
    .then(res => {
        this.setState({
            servidores: res.data.servidores
        }, () => {
            console.log(this.state.servidores)
        });
    })
    .catch(function (error) {
        console.log(error);
    })
};

adicionarPlano = () =>  {

    const obj = {
        nome: this.state.nomeDoPlano,
        download: this.state.download,
        upload: this.state.upload,
        preco: this.state.preco,
        tipoDeAutenticacao:{
            pppoe: true
        },
        servidor: this.state.servidoresSelecionados
    };

    this.setState({
        plano: obj,
        renderFeedbackPlano: true
    })

    console.log(obj);
    
    /*
    api.post(`/empresa/${window.localStorage.getItem('segredo')}/plano`, obj)
    .then(function (response) {
        console.log(response.data);
       
    })
    .catch(function (error) {
        console.log(error);
    })
    */
};

alternarServidor = (idDoServidor, index, nomeDoServidor) =>{
    let array = this.state.servidoresSelecionados;
    let found = array.find(function(element) {
        return element === `{"_id":"${idDoServidor}", "nome":"${nomeDoServidor}"}`;
    });

    if(found === undefined || found === 'undefined' ){
        // ADICIONA NO ARRAY DOS SERVIDORES
        {/* 
        this.setState({
            servidoresSelecionados: [...this.state.servidoresSelecionados, `{"_id":"${idDoServidor}", "nome":"${nomeDoServidor}"}`]
        },() => {
            let teste = this.state.servidoresSelecionados;
            console.log(teste);
            var json = `{"_id":"${idDoServidor}", "nome":"${nomeDoServidor}"}`;
            let obj2 = JSON.parse(this.state.servidoresSelecionados);
            console.log(obj2);
        });
        */}
    }else{
        // REMOVE DO ARRAY DOS SERVIDORES
        this.setState(function(prevState){
            return { servidoresSelecionados : prevState.servidoresSelecionados.filter(function(val, i) {
              return i !== index;
            })};
        });
    }

   
}

renderContainerFeedbackPlano = () => {
    if(this.state.renderFeedbackPlano){
        return(
            <div>
                <h1 className="page-title">Sicronização do Plano</h1>

                <CardProgresso 
                    icone='fe-refresh-cw' 
                    animacaoIcone={true} 
                    categoria='CriarPlano'
                    elemento={this.state.plano}
                />

                {this.state.jsonServidoresSelecionados.map((element, i) => 
                    
                    console.log(element)
                )}

            </div>
        )
    }else{
        return(
            <div>
            </div>
        )
    }
}

render() {

  return (
    <div className="row row-cards">
        <div className="col-sm-12 col-lg-6">
            <div className="ui horizontal divider">Informações do Plano</div>
            <div className="form-group">
                <label className="form-label">Nome do Plano</label>
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Digite o nome do servidor (Ex. Servidor Inicial)"
                    value={this.state.nomeDoPlano}
                    onChange={this.handleChange('nomeDoPlano')}
                />
            </div>
            <div className="form-group">
                <label className="form-label">Preço do Plano</label>
                <div className="input-group">
                    <span className="input-group-prepend">
                        <span className="input-group-text">R$</span>
                    </span>
                        <input 
                            type="text" 
                            className="form-control"
                            placeholder="Digite o preço do plano (Ex. 180)"
                            value={this.state.preco}
                            onChange={this.handleChange('preco')}
                        />
                </div>
            </div>
            <div className="form-group">
                <label className="form-label">Download</label>
                <div className="input-group">
                    <input 
                        type="text" 
                        className="form-control" 
                        value={this.state.download}
                        onChange={this.handleChange('download')}
                        placeholder="Digite a velocidade do download (Ex. 2048)"
                    />
                    <span className="input-group-append">
                        <span className="input-group-text">KB/s</span>
                    </span>
                </div>
            </div>
            <div className="form-group">
                <label className="form-label">Upload</label>
                <div className="input-group">
                    <input 
                        type="text" 
                        className="form-control" 
                        value={this.state.upload}
                        onChange={this.handleChange('upload')}
                        placeholder="Digite a velocidade do upload (Ex. 2048)"
                    />
                    <span className="input-group-append">
                        <span className="input-group-text">KB/s</span>
                    </span>
                </div>
            </div>
            <div className="ui horizontal divider">Autenticação</div>
            <div className="form-group">
                <div className="form-label">Por enquanto só temos suporte a PPPoE</div>
                <div className="custom-controls-stacked">
                    <label className="custom-control custom-radio">
                        <input type="radio" className="custom-control-input" disabled checked />
                        <div className="custom-control-label">PPPoE</div>
                    </label>
                </div>
            </div>
            <div className="ui horizontal divider">Servidores</div>

            <div className="form-group">
                <div className="form-label">Selecione os servidores para cadastrar o plano</div>
                <div className="custom-controls-stacked">

                    {this.state.servidores.map((elemento, i) => 
                        <label className="custom-control custom-checkbox" key={i}>
                            <input type="checkbox" className="custom-control-input" value={elemento._id} onClick={() => { this.alternarServidor(elemento._id, i, elemento.nome) }} />
                            <span className="custom-control-label">{elemento.nome}</span>
                        </label>
                    )}

                </div>
            </div>

            <div className="form-group">
                <div className="form-footer">
                    <button className="btn btn-primary btn-block" onClick={this.adicionarPlano}>Criar Plano</button>
                </div>
            </div>
        </div>

        <div className="col-sm-12 col-lg-6">
            <div className="containerFeedbackPlano">
                

                {this.renderContainerFeedbackPlano()}

            </div>
        </div>

        <div className="col-sm-12 col-lg-6">
            
        </div>

        <div className="col-sm-12 col-lg-12">
            
        </div>
    </div>

  )
  
}

};