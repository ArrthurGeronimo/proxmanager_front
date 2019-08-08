import React, { Component } from 'react';
import { Form, Input, TextArea, Button, Select } from 'semantic-ui-react';
import axios from 'axios';

class FormExampleCaptureValues extends Component {
  state = { 
    name: '', 
    email: '', 
    submittedName: '', 
    submittedEmail: '',

    razaoSocial: '',
    cnpj: '',
    email: '',
    senha: '',
    celular: '',
    telefoneFixo: '',
    rua: '',
    bairro: '',
    numero: '',
    cidade: '',
    estado: '',
    pais: '',
    cep: '',
    latitude: '',
    longitude: '',
    complemento: ''
 
}

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    const obj = {
        dado: {
          razaoSocial: this.state.razaoSocial,
          cnpj: this.state.cnpj,
          email: this.state.email,
          contato: [
            {
                "celular" : this.state.celular
            },
            {
                "telefoneFixo" : this.state.telefoneFixo
            }
          ],
          endereco: {
            cep: this.state.cep,
            rua: this.state.rua,
            numero: this.state.numero,
            bairro: this.state.bairro,
            complemento: this.state.complemento,
            cidade: this.state.cidade,
            estado: this.state.estado,
            pais: this.state.pais,
            latitude: this.state.latitude,
            longitude: this.state.longitude
          }
        },
        autenticacao:{
            senha: this.state.senha
        }
    };

    if(obj.dado.razaoSocial === ''){
        console.log('SEM NOME')
      }else if (obj.dado.cnpj === '') {
        console.log('SEM CNPJ')
      }else if (obj.dado.email === '') {
        console.log('SEM EMAIL')
      }else if (obj.dado.senha === '') {
        console.log('SEM SENHA')
      }else{
        axios.post('https://proxmanager.herokuapp.com/cBsSJa8UNz/empresa', obj)
        .then(function (response) {
            // handle success
            console.log(response);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
      }
  }

  render() {

    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
            <div class="ui horizontal divider">Dados</div>
            <Form.Group>
                <Form.Field
                    control={Input}
                    label='Razão Social'
                    placeholder='Razão Social'
                    name='razaoSocial'
                    onChange={this.handleChange}
                    value={this.state.razaoSocial}
                />
            </Form.Group>    
            <Form.Group>
                <Form.Field
                    control={Input}
                    label='CNPJ'
                    placeholder='CNPJ'
                    name='cnpj'
                    onChange={this.handleChange}
                    value={this.state.cnpj}
                />
            </Form.Group>
            <Form.Group>
                <Form.Field
                    control={Input}
                    label='Email'
                    placeholder='Email'
                    name='email'
                    onChange={this.handleChange}
                    value={this.state.email}
                />
            </Form.Group>
            <Form.Group>
                <Form.Field
                    control={Input}
                    label='Senha'
                    placeholder='Senha'
                    name='senha'
                    onChange={this.handleChange}
                    value={this.state.senha}
                />
            </Form.Group>
            <div class="ui horizontal divider">Contato</div>
            <Form.Group>
                <Form.Field
                    control={Input}
                    label='Celular'
                    placeholder='Celular'
                    name='celular'
                    onChange={this.handleChange}
                    value={this.state.celular}
                />
            </Form.Group>
            <Form.Group>
                <Form.Field
                    control={Input}
                    label='Telefone Fixo'
                    placeholder='Telefone Fixo'
                    name='telefoneFixo'
                    onChange={this.handleChange}
                    value={this.state.telefoneFixo}
                />
            </Form.Group>
            <div class="ui horizontal divider">Endereço</div>
            <Form.Group>
                <Form.Field
                    control={Input}
                    label='CEP'
                    placeholder='CEP'
                    name='cep'
                    onChange={this.handleChange}
                    value={this.state.cep}
                />
            </Form.Group>
            <Form.Group>
                <Form.Field
                    control={Input}
                    label='Rua'
                    placeholder='Rua'
                    name='rua'
                    onChange={this.handleChange}
                    value={this.state.rua}
                />
            </Form.Group>
            <Form.Group>
                <Form.Field
                    control={Input}
                    label='Bairro'
                    placeholder='Bairro'
                    name='bairro'
                    onChange={this.handleChange}
                    value={this.state.bairro}
                />
            </Form.Group>
            <Form.Group>
                <Form.Field
                    control={Input}
                    label='Número'
                    placeholder='Número'
                    name='numero'
                    onChange={this.handleChange}
                    value={this.state.numero}
                />
            </Form.Group>
            <Form.Group>
                <Form.Field
                    control={Input}
                    label='Cidade'
                    placeholder='Cidade'
                    name='cidade'
                    onChange={this.handleChange}
                    value={this.state.cidade}
                />
            </Form.Group>
            <Form.Group>
                <Form.Field
                    control={Input}
                    label='Estado'
                    placeholder='Estado'
                    name='estado'
                    onChange={this.handleChange}
                    value={this.state.estado}
                />
            </Form.Group>
            <Form.Group>
                <Form.Field
                    control={Input}
                    label='País'
                    placeholder='País'
                    name='pais'
                    onChange={this.handleChange}
                    value={this.state.pais}
                />
            </Form.Group>
            <Form.Group>
                <Form.Field
                    control={Input}
                    label='Complemento'
                    placeholder='Complemento'
                    name='complemento'
                    onChange={this.handleChange}
                    value={this.state.complemento}
                />
            </Form.Group>
            <Form.Group>
                <Form.Field
                    control={Input}
                    label='Latitude'
                    placeholder='Latitude'
                    name='latitude'
                    onChange={this.handleChange}
                    value={this.state.latitude}
                />
            </Form.Group>
            <Form.Group>
                <Form.Field
                    control={Input}
                    label='Longitude'
                    placeholder='Longitude'
                    name='longitude'
                    onChange={this.handleChange}
                    value={this.state.longitude}
                />
            </Form.Group>
         
            <Form.Button content='Submit' />
        </Form>
        <strong>onChange:</strong>
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
      </div>
    )
  }
}

export default FormExampleCaptureValues