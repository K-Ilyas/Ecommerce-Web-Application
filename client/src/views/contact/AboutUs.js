import React, { Component } from "react";
import Select from "react-select";

import * as ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import axios from 'axios';
import $ from "jquery";
import {
    Badge,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardTitle,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Container,
    Row,
    Col
} from "reactstrap";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import LandingPageHeader from "components/Headers/LandingPageHeader.js";
import DefaultFooter from "components/Footers/DefaultFooter.js";
import AlertDanger from "components/index-sections/AlertDanger.js";
import ModalMini from "components/index-sections/ModalMini.js";
import ModalSpinner from "components/index-sections/ModalSpinner.js";

const Editor = {};
Editor.modules = {
    toolbar: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' },
        { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image', 'video'],
        ['clean']
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    }
}

Editor.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
];
const formValid = formError => {
    let valid = true;
    Object.values(formError).forEach(val => {
        val === true && (valid = false);
    });
    return valid;
};
class AboutUs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '', email: '', select: '', message: '',
            nameFocus: 0, emailFocus: 0, selectFocus: 0, selectValue: '',
            modalSpinner: false,
            modal: false,
            modalClass: '',
            modalColor: '',
            modalMessage: '',
            modalName: ''
            , className:
            {
                nameError: ''
                , emailError: ''
                , selectError: ''
                , messageError: ''
            },
            formError:
            {
                nameError: false
                , emailError: false
                , selectError: false
                , messageError: false
            }
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        import('assets/css/chunk.css').then(console.log("ok"));
        window.scrollTo(0, 0);
        document.body.classList.add("about-us");
        document.body.classList.add("sidebar-collapse");
        document.documentElement.classList.remove("nav-open");
        return function cleanup() {
            document.body.classList.remove("about-us");
            document.body.classList.remove("sidebar-collapse");
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        const name = $.trim(this.state.name);
        const email = $.trim(this.state.email);
        const select = $.trim(this.state.select);
        const message = $.trim(this.state.message);

        if (formValid(this.state.formError) && name !== '' && email !== '' && select !== '' && message !== '') {
            this.setState({ modalSpinner: true });
            axios({
                method: "POST",
                url: "http://localhost:8080/api/Email/AboutUs",
                data: {
                    name: name,
                    select: select,
                    email: email,
                    message: message,
                }
            }).then((response) => {
                if (response.data.msg === 'success') {
                    this.setState({ modalSpinner: false });
                    this.resetForm();
                    this.setState({ modalColor: "#18ce0f" });
                    this.setState({ modalClass: "now-ui-icons ui-2_like" });
                    this.setState({ modalMessage: "votre message est envoyé avec succès" });
                    this.setState({ modalName: "modal-mini modal-success" });
                    this.setState({ modal: true });
                } else if (response.data.msg === 'fail') {
                    this.setState({ modalSpinner: false });
                    this.setState({ modalColor: "#ff3636" });
                    this.setState({ modalClass: "now-ui-icons objects_support-17" });
                    this.setState({ modalMessage: "Message failed to send" });
                    this.setState({ modalName: "modal-mini modal-danger" });
                    this.setState({ modal: true });
                }
            })
                .catch(error => {
                    alert(error);
                    this.setState({ modalSpinner: false });
                    this.setState({ modalColor: "#ff3636" });
                    this.setState({ modalClass: "now-ui-icons objects_support-17" });
                    this.setState({ modalMessage: "Message failed to send" });
                    this.setState({ modalName: "modal-mini modal-danger" });
                    this.setState({ modal: true });
                });
        }
        else {

            this.setState({ modalColor: "#ff3636" });
            this.setState({ modalClass: "now-ui-icons objects_support-17" });
            this.setState({ modalMessage: "vous devez vérifier tous les champs avant d'envoyer votre message" });
            this.setState({ modalName: "modal-mini modal-danger" });
            this.setState({ modal: true });
            this.verifieAfter(name, email, select, message);
        }
    }
    ModalClose = () => {
        this.setState({ modal: false });
    }

    verifieAfter = (name, email, select, message) => {
        let formError = this.state.formError;
        let className = this.state.className;
        if (/^([a-zA-Z0-9._-]+)@([a-z0-9._-]+)\.([a-z]{2,6})$/.test(email)) {
            this.setState({ email: '' });
            formError.emailError = false;
            className.emailError = "input-group-focus-sucess";
        }
        else {
            this.setState({ email: '' });
            formError.emailError = true;
            className.emailError = "input-group-focus-danger";
        }

        if (/^([a-zA-Z]{4,}(?: [a-zA-Z]+){0,2})$/.test(name)) {
            this.setState({ name: '' });
            formError.nameError = false;
            className.nameError = "input-group-focus-sucess";
        }
        else {
            this.setState({ name: '' });
            formError.nameError = true;
            className.nameError = "input-group-focus-danger";
        }
        if ($.trim(message).length > 5) {
            this.setState({ message: '' });
            formError.messageError = false;
            className.messageError = "input-group-focus-sucess";
        }
        else {
            this.setState({ message: '' });
            formError.messageError = true;
            className.messageError = "input-group-focus-danger";
        }
        if (select === '') {
            this.setState({ select: '' });
            this.setState({ selectValue: '' });
            className.selectError = "react-select-danger";
        }

    }

    selectChange = (value) => {
        let className = this.state.className;
        if (value === '') {
            this.setState({ select: '' });
            this.setState({ selectValue: '' });
            className.selectError = "react-select-danger";
        }
        else {
            this.setState({ select: value });
            className.selectError = "react-select-success";
        }
    }

    nameError = () => {
        let formError = this.state.formError;
        this.setState({ formError, [this.nameError]: false });
    }
    emailError = () => {
        let formError = this.state.formError;
        this.setState({ formError, [this.emailError]: false });
    }




    handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        let formError = this.state.formError;
        let className = this.state.className;
        switch (name) {
            case 'email':
                if (/^([a-zA-Z0-9._-]+)@([a-z0-9._-]+)\.([a-z]{2,6})$/.test(value)) {
                    this.setState({ email: value });
                    formError.emailError = false;
                    className.emailError = "input-group-focus-sucess";
                }
                else {
                    this.setState({ email: '' });
                    formError.emailError = true;
                    className.emailError = "input-group-focus-danger";
                }
                break;
            case 'name':
                if (/^([a-zA-Z]{4,}(?: [a-zA-Z]+){0,2})$/.test(value)) {
                    this.setState({ name: value });
                    formError.nameError = false;
                    className.nameError = "input-group-focus-sucess";
                }
                else {
                    this.setState({ name: '' });
                    formError.nameError = true;
                    className.nameError = "input-group-focus-danger";
                }
                break;

            default:
                break;
        }
    }


    resetForm() {
        let className = this.state.className;
        document.getElementById('About-form').reset();
        className.nameError = '';
        className.messageError = '';
        className.emailError = '';
        let formError = this.state.formError;
        this.setState({ email: '' });
        formError.emailError = false;
        this.setState({ name: '' });
        formError.nameError = false;
        this.setState({ message: '' });
        formError.messageError = false;
        this.setState({ select: '' });
        this.setState({ selectValue: '' });

    }

    render() {
        return (
            <>
                {
                    this.state.modal ?
                        <ModalMini class={this.state.modalName} action={this.ModalClose.bind(this)} modalState={this.state.modal} color={this.state.modalColor} className={this.state.modalClass} message={this.state.modalMessage} />
                        : null
                }
                {
                    this.state.modalSpinner ?
                        <ModalSpinner value={this.state.modalSpinner} />
                        : null
                }
                <IndexNavbar />
                <div className="wrapper">
                    <LandingPageHeader />
                    <div className="section">
                        <div className="about-description text-center" style={{ padding: "0" }}>
                            <div className="features-3" style={{ padding: "0" }}>
                                <Container>
                                    <Row>
                                        <Col className="mr-auto ml-auto" md="8">
                                            <h2 className="title">Tawjih</h2>
                                            <h4 className="description">Votre choix d'avenir commence ici.</h4>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="4">
                                            <div className="info info-hover">
                                                <div className="icon icon-success icon-circle">
                                                    <i className="now-ui-icons business_bank"></i>
                                                </div>
                                                <h4 className="info-title">University</h4>
                                                <p className="description">
                                                    Présentation des universités et les etablissement qui ont Affilié a ces universités
                                                </p>
                                            </div>
                                        </Col>
                                        <Col md="4">
                                            <div className="info info-hover">
                                                <div className="icon icon-info icon-circle">
                                                    <i className="now-ui-icons education_hat"></i>
                                                </div>
                                                <h4 className="info-title">Établissement</h4>
                                                <p className="description">
                                                    Présentation des informations de
                                                    des établissements
                                                    avec les formation offre par ses deniers.
                                                </p>
                                            </div>
                                        </Col>
                                        <Col md="4">
                                            <div className="info info-hover">
                                                <div className="icon icon-primary icon-circle">
                                                    <i className="now-ui-icons tech_watch-time"></i>
                                                </div>
                                                <h4 className="info-title">Actualité</h4>
                                                <p className="description">
                                                    Mise a jour des actualités concerne les événements et les formations
                                                </p>
                                            </div>
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                        </div>
                        <div className="separator-line bg-info"></div>
                        <div className="projects-5">
                            <Container>
                                <Row>
                                    <Col className="ml-auto mr-auto text-center" md="8">
                                        <h2 className="title">Nous avons de nombreux avantages</h2>
                                        <h4 className="description">

                                        </h4>
                                        <div className="section-space"></div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="ml-auto" md="5">
                                        <Card
                                            className="card-background card-background-product card-raised"
                                            style={{
                                                backgroundImage:
                                                    "url(" + require("assets/img/bg11.jpg") + ")"
                                            }}
                                        >
                                            <CardBody>
                                                <CardTitle tag="h2">Analyse sociale
                                                </CardTitle>
                                                <p className="card-description">
                                                    Des informations pour vous aider à créer, vous connecter et convertir.
                                                    Comprenez les intérêts, l'influence, les interactions et l'intention
                                                    de votre public. Découvrez des sujets
                                                    émergents et des influenceurs pour toucher de nouveaux publics.
                                                </p>
                                                <Badge className="badge-neutral">ANALYTIQUE</Badge>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col className="mr-auto" md="5">
                                        <div className="info info-horizontal">
                                            <div className="icon icon-danger">
                                                <i className="now-ui-icons ui-2_chat-round"></i>
                                            </div>
                                            <div className="description">
                                                <h4 className="info-title">
                                                    Écoutez les conversations sociales                      </h4>
                                                <p className="description">
                                                    Accédez aux données démographiques, psychographiques et
                                                    à l'emplacement de personnes uniques qui parlent de votre marque.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="info info-horizontal">
                                            <div className="icon icon-danger">
                                                <i className="now-ui-icons business_chart-pie-36"></i>
                                            </div>
                                            <div className="description">
                                                <h4 className="info-title">Analyse des performances</h4>
                                                <p className="description">
                                                    Unifiez les données de Facebook, Instagram, Twitter,
                                                    LinkedIn et Youtube pour obtenir des informations
                                                    riches à partir de rapports faciles à utiliser.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="info info-horizontal">
                                            <div className="icon icon-danger">
                                                <i className="now-ui-icons design-2_ruler-pencil"></i>
                                            </div>
                                            <div className="description">
                                                <h4 className="info-title">Conversions sociales
                                                </h4>
                                                <p className="description">
                                                    Suivez les actions prises sur votre site Web qui
                                                    proviennent de réseaux sociaux et comprenez
                                                    l'impact sur vos résultats.
                                                </p>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <hr></hr>

                            </Container>
                        </div>
                        <div className="about-team team-4">
                            <Container>
                                <Row>
                                    <Col className="ml-auto mr-auto text-center" md="8">
                                        <h2 className="title">L'équipe de travaille</h2>
                                        <h4 className="description">

                                            Description de notre équipe.
                                        </h4>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="ml-auto mr-auto" lg="4" xl="4">
                                        <Card className="card-profile card-plain">
                                            <Row style={{ display: "flex", justifyContent: "center" }}>
                                                <Col md="5">
                                                    <div className="card-image" >
                                                        <a href="#pablo" onClick={e => e.preventDefault()}>
                                                            <img
                                                                alt="..."
                                                                className="rounded-circle img-raised"
                                                                src={require("assets/img/salah.jpg")}
                                                            ></img>
                                                        </a>
                                                    </div>
                                                </Col>
                                                <Col md="11" >
                                                    <CardBody style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                                        <CardTitle tag="h4">Salah Eddine FATIH</CardTitle>
                                                        <h6 className="category">Développeur Web</h6>
                                                        <p className="card-description" style={{ textAlign: "center" }}>
                                                            Étudiant à l'École Supérieure de Téchnologie d'Agadir</p>
                                                        <CardFooter>
                                                            <Button
                                                                className="btn-icon btn-neutral"
                                                                color="twitter"
                                                                href="#pablo"
                                                                onClick={e => e.preventDefault()}
                                                            >
                                                                <i className="fab fa-twitter"></i>
                                                            </Button>
                                                            <Button
                                                                className="btn-icon btn-neutral"
                                                                color="facebook"
                                                                href="#pablo"
                                                                onClick={e => e.preventDefault()}
                                                            >
                                                                <i className="fab fa-facebook-square"></i>
                                                            </Button>
                                                            <Button
                                                                className="btn-icon btn-neutral"
                                                                color="google"
                                                                href="#pablo"
                                                                onClick={e => e.preventDefault()}
                                                            >
                                                                <i className="fab fa-google"></i>
                                                            </Button>
                                                        </CardFooter>
                                                    </CardBody>
                                                </Col>
                                            </Row>
                                        </Card>
                                    </Col>
                                    <Col className="ml-auto mr-auto" lg="4" xl="4">
                                        <Card className="card-profile card-plain">
                                            <Row style={{ display: "flex", justifyContent: "center" }}>
                                                <Col md="5">
                                                    <div className="card-image">
                                                        <a href="#pablo" onClick={e => e.preventDefault()}>
                                                            <img
                                                                alt="..."
                                                                className="rounded-circle img-raised"
                                                                src={require("assets/img/ilyas.jpg")}
                                                            ></img>
                                                        </a>
                                                    </div>
                                                </Col>
                                                <Col md="11">
                                                    <CardBody style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                                        <CardTitle tag="h4">Ilyas KRITET</CardTitle>
                                                        <h6 className="category">Développeur Web</h6>
                                                        <p className="card-description" style={{ textAlign: "center" }}>
                                                            Étudiant à l'École Supérieure de Téchnologie d'Agadir                           </p>
                                                        <CardFooter>
                                                            <Button
                                                                className="btn-icon btn-neutral"
                                                                color="linkedin"
                                                                href="#pablo"
                                                                onClick={e => e.preventDefault()}
                                                            >
                                                                <i className="fab fa-linkedin"></i>
                                                            </Button>
                                                            <Button
                                                                className="btn-icon btn-neutral"
                                                                color="facebook"
                                                                href="#pablo"
                                                                onClick={e => e.preventDefault()}
                                                            >
                                                                <i className="fab fa-facebook-square"></i>
                                                            </Button>
                                                            <Button
                                                                className="btn-icon btn-neutral"
                                                                color="dribbble"
                                                                href="#pablo"
                                                                onClick={e => e.preventDefault()}
                                                            >
                                                                <i className="fab fa-dribbble"></i>
                                                            </Button>
                                                            <Button
                                                                className="btn-icon btn-neutral"
                                                                color="google"
                                                                href="#pablo"
                                                                onClick={e => e.preventDefault()}
                                                            >
                                                                <i className="fab fa-google"></i>
                                                            </Button>
                                                        </CardFooter>
                                                    </CardBody>
                                                </Col>
                                            </Row>
                                        </Card>
                                    </Col>

                                    <Col className="ml-auto mr-auto" lg="4" xl="4">
                                        <Card className="card-profile card-plain">
                                            <Row style={{ display: "flex", justifyContent: "center" }}>
                                                <Col md="5">
                                                    <div className="card-image">
                                                        <a href="#pablo" onClick={e => e.preventDefault()}>
                                                            <img
                                                                alt="..."
                                                                className="rounded-circle img-raised"
                                                                src={require("assets/img/moad.jpg")}
                                                            ></img>
                                                        </a>
                                                    </div>
                                                </Col>
                                                <Col md="11">
                                                    <CardBody style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                                        <CardTitle tag="h4">Moad BANI</CardTitle>
                                                        <h6 className="category">Développeur Web</h6>
                                                        <p className="card-description" style={{ textAlign: "center" }} >
                                                            Étudiant à l'École Supérieure de Téchnologie d'Agadir
                                                        </p>
                                                        <CardFooter>
                                                            <Button
                                                                className="btn-icon btn-neutral"
                                                                color="linkedin"
                                                                href="#pablo"
                                                                onClick={e => e.preventDefault()}
                                                            >
                                                                <i className="fab fa-linkedin"></i>
                                                            </Button>
                                                            <Button
                                                                className="btn-icon btn-neutral"
                                                                color="facebook"
                                                                href="#pablo"
                                                                onClick={e => e.preventDefault()}
                                                            >
                                                                <i className="fab fa-facebook-square"></i>
                                                            </Button>
                                                            <Button
                                                                className="btn-icon btn-neutral"
                                                                color="google"
                                                                href="#pablo"
                                                                onClick={e => e.preventDefault()}
                                                            >
                                                                <i className="fab fa-google"></i>
                                                            </Button>
                                                        </CardFooter>
                                                    </CardBody>
                                                </Col>
                                            </Row>
                                        </Card>
                                    </Col>
                                </Row>
                            </Container>
                        </div>

                        <div className="about-contact">
                            <Container>
                                <Row>
                                    <Col className="mr-auto ml-auto" md="8">
                                        <h2 className="text-center title">Voulez-vous travailler avec nous?
                                        </h2>
                                        <h4 className="text-center description">

                                            Divisez les détails de votre produit ou travail d'agence en plusieurs parties.
                                            Écrivez quelques lignes sur chacun et contactez-nous pour tout
                                            poursuite de la collaboration. Nous vous répondrons dans quelques jours
                                            d'heures.
                                        </h4>
                                        <Form className="contact-form" id="About-form" onSubmit={this.handleSubmit}>
                                            <Row>

                                                <Col md="6">
                                                    <label>Votre nom</label>
                                                    <InputGroup
                                                        className={this.state.nameFocus ? (this.state.className.nameError === '' ? "input-group-focus" : this.state.className.nameError) : this.state.className.nameError}
                                                        id="name"
                                                    >
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText>
                                                                <i className="now-ui-icons users_circle-08"></i>
                                                            </InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input
                                                            className="input"
                                                            autoComplete="firstname"
                                                            placeholder="First Name..."
                                                            type="text"
                                                            name="name"
                                                            onFocus={() => this.setState({ nameFocus: this.state.nameFocus + 1 })}
                                                            onBlur={() => this.setState({ nameFocus: 0 })}
                                                            onChange={this.handleChange.bind(this)}
                                                        ></Input>
                                                    </InputGroup>
                                                    {this.state.formError.nameError ?
                                                        <AlertDanger id="name_error" action={this.nameError.bind(this)} value={this.state.formError.nameError} message="Syntaxe de nom est erroné." error="Votre nom doit comporter un ou deux mots" />
                                                        : null
                                                    }
                                                </Col>



                                                <Col md="6">
                                                    <label>Votre email</label>
                                                    <InputGroup
                                                        className={this.state.emailFocus ? (this.state.className.emailError === '' ? "input-group-focus" : this.state.className.emailError) : this.state.className.emailError}
                                                        id="email"
                                                    >
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText>
                                                                <i className="now-ui-icons ui-1_email-85"></i>
                                                            </InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input
                                                            className="input"
                                                            autoComplete="off"
                                                            placeholder="Email Name..."
                                                            type="text"
                                                            name="email"
                                                            onFocus={() => this.setState({ emailFocus: this.state.emailFocus + 1 })}
                                                            onBlur={() => this.setState({ emailFocus: 0 })}
                                                            onChange={this.handleChange.bind(this)}
                                                        ></Input>
                                                    </InputGroup>
                                                    {this.state.formError.emailError ?
                                                        <AlertDanger id="email_error" action={this.emailError.bind(this)} value={this.state.formError.emailError} message="Syntaxe de email est erroné." error="Syntaxe valid : xxx@example.xyz ." />
                                                        : null
                                                    }
                                                </Col>
                                                <Col md="12">
                                                    <FormGroup>
                                                        <label className="control-label">Speciality</label>
                                                        <Select
                                                            className={this.state.className.selectError === '' ? "react-select react-select-info" : "react-select " + this.state.className.selectError}
                                                            onChange={(value) => { this.setState({ select: value.label }); this.setState({ selectValue: value }) }}
                                                            classNamePrefix="react-select"
                                                            placeholder="Speciality"
                                                            value={this.state.selectValue}
                                                            options={[
                                                                {
                                                                    value: "1",
                                                                    label: "I'm a Designer"
                                                                },
                                                                { value: "2", label: "I'm a Developer" },
                                                            ]}
                                                        ></Select>
                                                    </FormGroup>
                                                </Col>

                                            </Row>
                                            <br>
                                            </br>

                                            <div >
                                                <label>Votre message</label>

                                                <ReactQuill
                                                    theme="snow"
                                                    modules={Editor.modules}
                                                    formats={Editor.formats}
                                                    bounds={'.app'}
                                                    onChange={(value) => { this.setState({ message: value }) }}
                                                    value={this.state.message}
                                                    style={{ height: "140px", marginBottom: "120px" }}
                                                />
                                            </div>

                                            <Row>

                                                <Col className="ml-auto mr-auto text-center" md="4">
                                                    <Button
                                                        className="btn-round mt-4"
                                                        color="info"
                                                        size="lg"
                                                    >
                                                        Let's talk
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </div>
                    <DefaultFooter />
                </div>
            </>
        );

    }
}

export default AboutUs;
