import React, { Component } from 'react';
import $ from 'jquery';
import Iframe from 'react-iframe';
import PhoneInput from 'react-phone-input-2'
import es from 'react-phone-input-2/lang/es.json'
import axios from 'axios';

// core components
import ConatctUsHeader from "components/Headers/ContactUsHeader2.js";
import DefaultFooter from "components/Footers/DefaultFooter";
import 'assets/css/pagesStyle/contact/contact.css';

import './../../assets/css/pagesStyle/homePage/home.css';
import './../../assets/css/pagesStyle/info/schoolList.css';
import './../../assets/css/pagesStyle/actualite/actualite.css';
import './../../assets/css/pagesStyle/actualite/article.css';




// reactstrap components

import {
  Button,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,

} from "reactstrap";
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

class ContactUs2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      iconPills: "1",
      pills: "1",
      type: "",
      type_search_id: "",
      formations: [],
      etablissements: [],
      formations_all: [],
      lengthList: 0,
      startPage: 0,
      endPage: 0,
      currentPage: 0,
      pagesCount: 1,
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
    this.pageSize = 10;
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  componentDidMount() {
    window.scrollTo(0, 0);
    // Change bootsrap class on window resize
    $(window).resize(function () {
      if ($(window).width() <= 1068) {
        $('.col-LR-width').addClass('col-12');
        $('.container-right').removeClass('col-lg').addClass('col-lg-6');
      } else {
        $('.col-LR-width').removeClass('col-12');
        $('.container-right').addClass('col-lg').removeClass('col-lg-6');
      }
    }).resize();





  }
  componentWillUnmount() {
    document.body.classList.remove("sidebar-collapse");
  }

  componentWillReceiveProps(newProps) {

  }



  clickProgBtn = () => {
    $(".list_formations-btn").css('background-color', "white");
    $(".list_etablissements-btn").css('background-color', "transparent");
    $(".list_etablissements").css('display', "none");
    $(".list_formations").css('display', "block");
    this.setState({ pagesCount: Math.ceil(this.state.formations.length / this.pageSize), currentPage: 0, lengthList: this.state.formations.length });
  }
  clickEtabBtn = () => {
    $(".list_formations-btn").css('background-color', "transparent");
    $(".list_etablissements-btn").css('background-color', "white");
    $(".list_etablissements").css('display', "block");
    $(".list_formations").css('display', "none");
    this.setState({ pagesCount: Math.ceil(this.state.etablissements.length / this.pageSize), currentPage: 0, lengthList: this.state.etablissements.length });
  }

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
        url: "http://localhost:8090/api/Email/SendMail",
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
          console.log("Errror");
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
        <ConatctUsHeader type={this.props.match.params.type} type_search_id={this.props.match.params.id} />
        {
          this.state.modal ?
            <ModalMini className={this.state.modalName} action={this.ModalClose.bind(this)} modalState={this.state.modal} color={this.state.modalColor} class={this.state.modalClass} message={this.state.modalMessage} />
            : null
        }
        {
          this.state.modalSpinner ?
            <ModalSpinner value={this.state.modalSpinner} />
            : null
        }

        <div className="main">

          <div className='row mainContainer' style={{ paddingTop: "12px" }}>

            <div className='col col-LR-width'>

              {/*Forum contact */}
              <div className="news-card">
                <h3 className="news-title">
                  <span>Contact</span>
                </h3>
              </div>

              <div className='row '>
                <div className='col col  col-lg-6 col-md-6 col-12 '>

                  <div className='container-non'>
                    <h2><span>Contact</span></h2>

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


                  </div>
                </div>

                <div className='col col  col-lg-6 col-md-6 col-12'>

                  <div className='container-non'>
                    <div style={{ marginBottom: "10px", height: "207px" }}>
                      <Iframe url="https://www.google.com/maps/embed?pb"
                        width="100%"
                        id="myId"
                        frameBorder="0"
                        className="myClassname"
                        height="100%"
                        styles={{ border: 0 }} />
                    </div>
                    <div className="contact-info">
                      <ul>
                        <li><i className="fas fa-map-marker-alt"></i><a target="_blank" rel="noopener noreferrer" href="www"> Lorem ipsum dolor, sit amet consectetur adipisicing elit.</a></li>
                        <li><i className="fas fa-globe"></i>-</li>
                        <li><i className="fas fa-phone-alt"></i><a target="_blank" rel="noopener noreferrer" href="tel:+212 xxx-xxx-xxx">+212 xxx-xxx-xxx</a></li>
                        <li><i className="far fa-envelope"></i><a target="_blank" rel="noopener noreferrer" href="mailto:company@company.com">company@company.com</a></li>
                        <li><i className="fa fa-facebook-square"></i><a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com">LOGO </a></li>
                        <li><i className="fa fa-instagram"></i><a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com">LOGO </a></li>
                        <li><i className="fa fa-whatsapp"></i><a target="_blank" rel="noopener noreferrer" href="https://api.whatsapp.com">+212 xxx-xxx-xxx</a></li>

                        <li><i className="far fa-clock" ></i>

                          <table>
                            <tbody>
                              <tr>
                                <td><strong>Lundi - Vendredi</strong></td>
                                <td><strong>:</strong></td>
                                <td>08:00 - 12:00 <strong>|</strong> 14:00 - 18:00</td>
                              </tr>
                              <tr>
                                <td><strong>Samedi</strong></td>
                                <td><strong>:</strong></td>
                                <td>08:00 - 12:00</td>
                              </tr>
                            </tbody>
                          </table>
                        </li>
                      </ul>
                    </div>
                  </div>

                </div>

              </div>

              {/* Contact Information */}

            </div>
          </div>
        </div >
        <DefaultFooter />
      </>
    );
  }
}


export default ContactUs2;