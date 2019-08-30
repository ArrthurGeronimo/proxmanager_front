import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Tab } from 'semantic-ui-react';
import './style.css';
import api from './../../../../../../services/api';
import ImagemServidorConectado from './../../../../../../assets/images/animacao-servidor-conectado.gif';
import ImagemServidorDesconectado from './../../../../../../assets/images/animacao-servidor-desconectado.gif';

export default class FormAdicionaServidor extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isMounted: false,
        //Dados Pessoais
        tipoDePessoa: '',
        nomeDoCliente: '',
        email: '',
        telefone: [],
        //Pessoa Física
        rg: '',
        cpf: '',
        dataDeNascimento: '',
        estadoCivil: '',
        //Pessoa Jurídica
        tipoDePessoaJuridica: '',
        cnpj: '',
        nomeRepresentante: '',
        cpfDoRepresentante: '',
        //
        redirect: false
        }
    }
    handleChange = name => event => {
        this.setState({ ...this.state, [name]: event.target.value });
    };
// Lifecycle do Componente
    componentDidMount() {
        this.setState({ isMounted: true });
    }
    componentWillUnmount() {
        this.setState({ isMounted: false });
    }

    panes = [
        {
            menuItem: 'Dados Pessoais',
            render: () => <Tab.Pane attached={false}>DADOS PESSOAIS</Tab.Pane>,
        },
        {
            menuItem: 'Endereços',
            render: () => <Tab.Pane attached={false}>ENDEREÇOS</Tab.Pane>,
        },
        {
            menuItem: 'Circuito Primário',
            render: () => <Tab.Pane attached={false}>Circuito Primário Content</Tab.Pane>,
        },
        {
            menuItem: 'Circuito Secundário',
            render: () => <Tab.Pane attached={false}>Circuito Secundário Content</Tab.Pane>,
        },
        {
            menuItem: 'Dados do Pagamento',
            render: () => <Tab.Pane attached={false}>Dados do Pagamento Content</Tab.Pane>,
        }
    ]

    // Redirecionamento para a página de GERENCIAR SERVIDORES
    renderRedirect = () => {
        if (this.state.redirect) {
        return <Redirect to={{
            pathname: '/painel_empresa/gerenciar_clientes'
        }} />
        }
    }

    render() {
        return (
            <div className="row row-cards">
                {this.renderRedirect()}
                <div className="col-sm-12 col-lg-9">
                    
                <Tab menu={{ secondary: true, pointing: true }} panes={this.panes} />

                </div>
                <div className="col-sm-12 col-lg-3">
                    
                </div>
            </div>
        )
    }

}