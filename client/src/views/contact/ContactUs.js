import React, { Component } from "react";
import Iframe from 'react-iframe';
import axios from 'axios';
import $ from "jquery";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css'
import es from 'react-phone-input-2/lang/es.json'
//import IndexNavbar from "components/Navbars/IndexNavbar.js";
import DefaultFooter from "components/Footers/DefaultFooter";
import 'assets/css/pagesStyle/contact/contact.css';
// reactstrap components
import {
  Button,
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
import ContactUsHeader from "components/Headers/ContactUsHeader.js";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import AlertDanger from "components/index-sections/AlertDanger.js";
import ModalMini from "components/index-sections/ModalMini.js";
import ModalSpinner from "components/index-sections/ModalSpinner.js";

const formValid = formError => {
  let valid = true;
  Object.values(formError).forEach(val => {
    val === true && (valid = false);
  });
  return valid;
};

class ContactUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '', email: '', phone: '', localisation: '', message: '',
      nameFocus: 0, emailFocus: 0, numberFocus: 0, messageFocus: 0,
      phoneInsialize: '', phoneValid: null, modalSpinner: false,
      modal: false,
      modalClass: '',
      modalColor: '',
      modalMessage: '',
      modalName: ''
      , className:
      {
        nameError: ''
        , emailError: ''
        , phoneError: ''
        , messageError: ''
      },
      formError:
      {
        nameError: false
        , emailError: false
        , phoneError: false
        , messageError: false
      }
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    import('assets/css/chunk.css').then(console.log("ok"));

    window.scrollTo(0, 0);
    document.body.classList.add("contact-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    return function cleanup() {
      document.body.classList.remove("contact-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }
  /*
   const  [nameFocus, setNameFocus] = React.useState(false)
   const [emailFocus, setEmailFocus] = React.useState(false)
   const [numberFocus, setNumberFocus] = React.useState(false)
   React.useEffect(() => {
    
   })*/
  handleSubmit(e) {
    e.preventDefault();
    const name = $.trim(this.state.name);
    const email = $.trim(this.state.email);
    const phone = $.trim(this.state.phone);
    const message = $.trim(this.state.message);
    const localisation = $.trim(this.state.localisation);

    if (formValid(this.state.formError) && name !== '' && email !== '' && phone !== '' && message !== '' && localisation !== '') {
      this.setState({ modalSpinner: true });
      axios({
        method: "POST",
        url: "http://localhost:8080/api/Email/SendMail",
        data: {
          name: name,
          phone: phone,
          email: email,
          message: message,
          localisation: localisation
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
      this.verifieAfter(name, email, phone, message);
    }
  }
  ModalClose = () => {
    this.setState({ modal: false });
  }

  verifieAfter = (name, email, phone, message) => {
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
    if (phone === '') {
      this.setState({ phoneValid: false });
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
  messageError = () => {
    let formError = this.state.formError;
    this.setState({ formError, [this.messageError]: false });
  }
  phoneVerification = (phone, country) => {

    let formError = this.state.formError;
    if (phone !== '') {
      if (phone.match(/^212[0-9]{9}$/)) {
        this.setState({ localisation: country.name });
        this.setState({ phone: phone });
        this.setState({ formError, [this.phoneError]: false });
      }
      else {
        this.setState({ formError, [this.phoneError]: true });
      }
    }
  };


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
      case 'message':
        if ($.trim(value).length > 5) {
          this.setState({ message: value });
          formError.messageError = false;
          className.messageError = "input-group-focus-sucess";
        }
        else {
          this.setState({ message: '' });
          formError.messageError = true;
          className.messageError = "input-group-focus-danger";
        }
        break;

      default:
        break;
    }
  }


  resetForm() {
    let className = this.state.className;
    this.setState({ phoneInsialize: ' ' });
    document.getElementById('contact-form').reset();
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
    this.setState({ phone: '' });
    this.setState({ localisation: '' });
    this.setState({ phoneValid: null });
  }



  render() {

    return (
      <>
        <IndexNavbar />
        <div className="wrapper" >
          <ContactUsHeader />
          <div className="main contact-bg-white">
            <div className="contact-content">

              <Container>
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

                <Row>

                  <Col className="ml-auto mr-auto" md="5">
                    <h2 className="title">Envoyez-nous un message</h2>
                    <p className="description">
                      Vous pouvez nous contacter pour tout ce qui concerne nos produits.
                      Nous prendrons contact avec vous dans les plus brefs délais. <br></br>
                      <br></br>
                    </p>
                    <Form id="contact-form" onSubmit={this.handleSubmit} method="post" role="form">

                      <label>Votre Prénom</label>
                      <InputGroup
                        className={this.state.nameFocus ? (this.state.className.nameError === '' ? "input-group-focus" : this.state.className.nameError) : this.state.className.nameError}
                        id="name"
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText  >
                            <i className="now-ui-icons users_circle-08"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          className="input"
                          aria-label="Votre Prénom..."
                          autoComplete="off"
                          placeholder="Votre Prénom..."
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
                      <label>Adresse Email</label>
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
                          aria-label="Email ici..."
                          autoComplete="off"
                          placeholder="Email ici..."
                          type="email"
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
                      <label>Téléphone</label>

                      <PhoneInput
                        localization={es}
                        onChange={(phone, country) => this.phoneVerification(phone, country)}
                        isValid={(phone, country) => {
                          if (phone !== '') {
                            if (phone.match(/^212[0-9]{9}$/)) {
                              return true;
                            }
                            else {
                              return 'Invalid value: ' + phone + ', ' + country.name;
                            }
                          }
                          return this.state.phoneValid;
                        }}
                        value={this.state.phoneInsialize}
                      />
                      <br>
                      </br>
                      <FormGroup className={this.state.messageFocus ? (this.state.className.messageError === '' ? "" : this.state.className.messageError) : this.state.className.messageError}
                      >
                        <label>Votre message</label>
                        <Input
                          name="message"
                          rows="6"
                          type="textarea"
                          className="textarea"
                          onFocus={() => this.setState({ messageError: this.state.messageError + 1 })}
                          onBlur={() => this.setState({ messageError: 0 })}
                          onChange={this.handleChange.bind(this)}
                        ></Input>
                      </FormGroup>
                      {this.state.formError.messageError ?
                        <AlertDanger id="message_error" action={this.messageError.bind(this)} value={this.state.formError.messageError} message="Syntaxe erroné." error="le message doit comporte au moins un mot." />
                        : null
                      }
                      <div className="submit text-center">
                        <Button
                          className="btn-raised btn-round"
                          color="info"
                          defaultValue="Contact Us"
                          type="submit"
                        >
                          Contactez Nous
                        </Button>
                      </div>

                    </Form>
                  </Col>
                  <Col className="ml-auto mr-auto" md="5">
                    <div className="info info-horizontal mt-5">
                      <div className="icon icon-info">
                        <i className="now-ui-icons location_pin"></i>
                      </div>
                      <div className="description">
                        <h4 className="info-title">Retrouvez-nous au bureau</h4>
                        <p>
                          Ecole Supérieure de Technologie d'Agadir,  <br></br>
                          B.P 33/S, <br></br>
                          Agadir 80000
                        </p>
                      </div>
                    </div>
                    <div className="info info-horizontal">
                      <div className="icon icon-info">
                        <i className="now-ui-icons tech_mobile"></i>
                      </div>
                      <div className="description">
                        <h4 className="info-title">Appelez-nous</h4>
                        <p>
                          Tawjih<br></br>
                          05282-32583 <br></br>
                          Mon - Fri, 8:00-22:00
                        </p>
                      </div>
                    </div>
                    <div className="info info-horizontal">
                      <div className="icon icon-info">
                        <i className="business_briefcase-24 now-ui-icons"></i>
                      </div>
                      <div className="description">
                        <h4 className="info-title">Information Légale</h4>
                        <p>
                          Creative Tim Ltd. <br></br>
                          VAT · EN2341241 <br></br>
                          IBAN · EN8732ENGB2300099123 <br></br>
                          Bank · Great Britain Bank
                        </p>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
          <div className="big-map" id="contactUs2Map">
            <div className="big-map" id="contactUs2Map">

              <Iframe url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3441.046660242997!2d-9.581933285230768!3d30.406418008337557!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdb3b696ddc99b19%3A0x559600239b0202af!2sEcole%20Sup%C3%A9rieure%20de%20Technologie%20d&#39;Agadir%20(ESTA)!5e0!3m2!1sfr!2sma!4v1585867782842!5m2!1sfr!2sma"
                position="absolute"
                width="100%"
                id="myId"
                frameBorder="0"
                className="myClassname"
                height="100%"
                styles={{ height: "25px" }} />
            </div>
          </div>

        </div>
        <DefaultFooter />
      </>
    )
  }
}

export default ContactUs;
