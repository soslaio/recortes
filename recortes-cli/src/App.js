
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import './App.css';

import React from 'react';
import LoadingOverlay from 'react-loading-overlay';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { analisarResposta, getRequestHeaders, Formatters } from './util';
import { Jumbotron, Button, Row, Col, Container, Form } from 'react-bootstrap';


export default class App extends React.Component {

    columns = [{
        dataField: 'id',
        text: 'Id',
        headerStyle: (colum, colIndex) => {
            return { width: '100px' };
        }
    }, {
        dataField: 'data_publicacao',
        text: 'Data',
        headerStyle: (colum, colIndex) => {
            return { width: '150px' };
        }
    }, {
        dataField: 'recorte',
        text: 'Recorte',
        formatter: Formatters.palavrasContadas,
        formatExtraData: {
            quantidadePalavras: 5
        }
    }];

    expandRow = {
        renderer: row => (
            <div>
                <p>{row.recorte}</p>
            </div>
        )
    };

    constructor(props) {
        super(props);

        // 00000181319918260236
        this.state = {
            termo: '',
            recortes: [],
            usuario: '',
            senha: '',
            isActive: false,
            tipoPesquisa: 'nup'
        };
    }

    get termosAjustados() {

        return this.state.termo.split(' ').join('-');
    }

    get objetoTipoPesquisa() {
        const tipo = {
            nup: {
                label: 'Número do Processo',
                placeholder: 'Digite o número do processo',
                url: `http://localhost:8001/api/recortes/?nup=${this.state.termo}`
            },
            t: {
                label: 'Data de Criação',
                placeholder: 'Data de criação do processo',
                url: `http://localhost:8001/api/recortes/?t=${this.state.termo}`
            },
            q: {
                label: 'Termos',
                placeholder: 'Termos separados por espaços',
                url: `http://localhost:8001/api/recortes/?q=${this.termosAjustados}`
            }
        }
        return tipo[this.state.tipoPesquisa];
    }


    pesquisar(event) {

        // Evita que o formulário seja enviado.
        event.preventDefault();

        const url = this.objetoTipoPesquisa.url;
        console.log(url)
        const headers = getRequestHeaders(this.state.usuario, this.state.senha);

        // Ativa o loading.
        this.setState({ isActive: true });

        // Executa a consulta remota.
        fetch(url, headers)
            .then(analisarResposta)
            .then(response => response.json())
            .then(jsonResponse => {

                this.setState({
                    recortes: jsonResponse,
                    isActive: false
                })
            })
            .catch(err => {

                this.setState({ isActive: false });
                alert(err.message)
            })
    }

    handleTermo(event) {

        this.setState({ termo: event.target.value });
    }

    handleSenha(event) {

        this.setState({ senha: event.target.value });
    }

    handleUsuario(event) {

        this.setState({ usuario: event.target.value });
    }

    handleRadioChange(event) {
        this.setState({
            termo: '',
            recortes: [],
            tipoPesquisa: event.target.value
        });
    }

    render() {
        return (
            <div>
                <Jumbotron>
                    <h1>Pesquisa de Recortes</h1>
                </Jumbotron>
                <Container>
                    <Form>
                        <Row>
                            <Col sm={4}>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="usuario">
                                            <Form.Label className="Label">Usuário</Form.Label>
                                            <Form.Control placeholder="Login" value={this.state.usuario}
                                                onChange={this.handleUsuario.bind(this)} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="senha">
                                            <Form.Label className="Label">Senha</Form.Label>
                                            <Form.Control type="password" placeholder="Senha" value={this.state.senha}
                                                onChange={this.handleSenha.bind(this)} autoComplete="off" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label className="Label">
                                                Tipo de Pesquisa
                                            </Form.Label>
                                            <Form.Check
                                                type="radio"
                                                label="Número do Processo"
                                                value="nup"
                                                onChange={this.handleRadioChange.bind(this)}
                                                checked={this.state.tipoPesquisa === 'nup'}
                                            />
                                            <Form.Check
                                                type="radio"
                                                label="Data de Publicação"
                                                value="t"
                                                onChange={this.handleRadioChange.bind(this)}
                                                checked={this.state.tipoPesquisa === 't'}
                                            />
                                            <Form.Check
                                                type="radio"
                                                label="Termos"
                                                value="q"
                                                onChange={this.handleRadioChange.bind(this)}
                                                checked={this.state.tipoPesquisa === 'q'}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="formNup">
                                            <Form.Label className="Label">
                                                {this.objetoTipoPesquisa.label}
                                            </Form.Label>
                                            <Form.Control type="text" placeholder={this.objetoTipoPesquisa.placeholder} value={this.state.termo}
                                                onChange={this.handleTermo.bind(this)} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Button size="sm" variant="primary" type="submit" onClick={this.pesquisar.bind(this)} >
                                            Pesquisar
                                    </Button>
                                    </Col>
                                </Row>
                            </Col>
                            <Col sm>
                                <h3>Resultado da Pesquisa</h3>
                                <LoadingOverlay active={this.state.isActive} spinner text='Pesquisando...'>
                                    <BootstrapTable bootstrap4 keyField='id' data={this.state.recortes} columns={this.columns}
                                        pagination={paginationFactory()} striped hover expandRow={this.expandRow} />
                                </LoadingOverlay>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </div>
        );
    }
}
