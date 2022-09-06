import React, { Component } from "react";

import './../../assets/css/pagesStyle/profilePage/logIn.css'

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Container,
    Col
} from "reactstrap";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import TransparentFooter from "components/Footers/TransparentFooter";


class RecoverPWD extends Component {
    constructor() {
        super();
        this.state = {
            firstFocus: false,
            lastFocus: false,
            motDePasse: "",
            motDePasse2: "",
            errors: {}
        };
    }

    componentDidMount() {
        document.body.classList.add("login-page");
        document.body.classList.add("sidebar-collapse");
        document.documentElement.classList.remove("nav-open");
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
    }

    componentWillUnmount() {
        document.body.classList.remove("login-page");
        document.body.classList.remove("sidebar-collapse");
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value, errors: {} });
    }

    Submit = (e) => {
        e.preventDefault();
        // validate password
        if (this.state.motDePasse.length < 6) {
            this.setState({ errors: { motDePasse: "Mot de passe doit avoir au moins 6 characters" } });
        } else if (this.state.motDePasse2.length === 0) {
            this.setState({ errors: { motDePasse2: "Confirmer votre mot de passe" } });
        } else if (this.state.motDePasse !== this.state.motDePasse2) {
            this.setState({ errors: { motDePasse2: "Les mots de passe ne correspondent pas" } });
        } else {
            fetch('/users/resetPWD', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password: this.state.motDePasse, token: this.props.match.params.id })
            })
                .then(res => res.json())
                .then(res => {
                    if (res.updated) {
                        this.props.history.push('/login');
                    } else {
                        this.setState({ errors: { motDePasse: res.msg } });
                    }
                })
        }
    }

    render() {
        return (
            <>
                <IndexNavbar />


                <div className="page-header clear-filter" filter-color="blue">
                    <div
                        className="page-header-image"
                        style={{
                            backgroundImage: "url(" + require("assets/img/login.jpg") + ")"
                        }}
                    ></div>
                    <div className="content logIn-topMargin">
                        <Container>
                            <Col className="ml-auto mr-auto" md="8">
                                <Card className="card-login card-plain">
                                    <Form className="form">
                                        <CardHeader className="text-center">
                                            <div className="logo-container" style={{ width: '200px', marginBottom: '20px' }}>
                                                LOGO
                                            </div>
                                        </CardHeader>
                                        <CardBody style={{ paddingBottom: "0" }}>
                                            <p className="error-message">{this.state.errors.motDePasse}</p>
                                            <InputGroup
                                                className={
                                                    "no-border input-lg" +
                                                    (this.state.firstFocus ? " input-group-focus" : "")
                                                }
                                            >
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="now-ui-icons ui-1_lock-circle-open"></i>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    placeholder="Nouveau Mot de passe..."
                                                    type="password"
                                                    name="motDePasse"
                                                    onFocus={() => this.setState({ firstFocus: true })}
                                                    onBlur={() => this.setState({ firstFocus: false })}
                                                    onChange={this.onChange}
                                                ></Input>
                                            </InputGroup>
                                            <p className="error-message">{this.state.errors.motDePasse2}</p>
                                            <InputGroup
                                                className={
                                                    "no-border input-lg" +
                                                    (this.state.lastFocus ? " input-group-focus" : "")
                                                }
                                            >
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="now-ui-icons objects_key-25"></i>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    placeholder="Confirmer Mot de passe..."
                                                    type="password"
                                                    name="motDePasse2"
                                                    id="motDePasse"
                                                    onFocus={() => this.setState({ lastFocus: true })}
                                                    onBlur={() => this.setState({ lastFocus: false })}
                                                    onChange={this.onChange}
                                                ></Input>
                                            </InputGroup>
                                        </CardBody>
                                        <CardFooter className="text-center">
                                            <Button
                                                block
                                                className="btn-round"
                                                color="info"
                                                onClick={this.Submit}
                                                size="lg"
                                            >
                                                Modifier Mot de passe
                                            </Button>
                                            <div className="pull-left">
                                                <h6>
                                                    <a
                                                        className="link"
                                                        href="/login"
                                                    >
                                                        Se connecter
                                                    </a>
                                                </h6>
                                            </div>
                                            <div className="pull-right">
                                                <h6>
                                                    <a
                                                        className="link"
                                                        href='/signup'
                                                    >
                                                        Créer un Compte
                                                    </a>
                                                </h6>
                                            </div>
                                        </CardFooter>
                                    </Form>
                                </Card>
                            </Col>
                        </Container>
                    </div>
                    <TransparentFooter />
                </div>
            </>
        );
    }
}



export default (RecoverPWD);