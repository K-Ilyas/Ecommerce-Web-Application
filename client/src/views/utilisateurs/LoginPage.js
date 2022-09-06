import React, { Component } from "react";
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import $ from 'jquery';
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
  Col,
  Modal,
  ModalBody
} from "reactstrap";

import { signin } from '../../redux/actions/authActions';

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import TransparentFooter from "components/Footers/TransparentFooter";
import Alert from "reactstrap/lib/Alert";
import { FadeLoader } from "react-spinners";


class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      firstFocus: false,
      lastFocus: false,
      email: "",
      motDePasse: "",
      errors: {},
      resetPwdModal: false,
      recoverEmail: ""
    };
  }



  componentDidMount() {
    document.body.classList.add("login-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    // Clear Errors
    const redirect = this.props.location.search
      ? this.props.location.search.split('=')[1]
      : '/';
    if (this.props.userInfo) {
      this.props.history.push(redirect);
    }
  }


  componentWillUnmount() {
    document.body.classList.remove("login-page");
    document.body.classList.remove("sidebar-collapse");
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  Submit = (e) => {
    e.preventDefault();

    // Create new User
    const User = {
      email: this.state.email,
      motDePasse: this.state.motDePasse
    };

    this.props.signin(User.email, User.motDePasse);

  }
  componentDidUpdate(props) {
    const redirect = this.props.location.search
      ? this.props.location.search.split('=')[1]
      : '/';
    if (this.props.userInfo) {
      this.props.history.push(redirect);

    }
  }
  recoverPWD = (e) => {
    e.preventDefault();
    if (this.state.recoverEmail.length > 0) {
      fetch('/users/recoverPWD', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: this.state.recoverEmail })
      })
        .then(res => res.json())
        .then(res => {
          if (!res.emailSent) {
            this.setState({ errors: res });
          } else {
            this.setState({ errors: {} });
            $(".profileUpdated").show();
            this.setState({ resetPwdModal: false });
          }
        });
    }
  }

  render() {
    const redirect = this.props.location.search
      ? this.props.location.search.split('=')[1]
      : '/';

    return (
      <>
        <IndexNavbar />
        <Modal isOpen={this.state.resetPwdModal} toggle={() => this.setState({ resetPwdModal: false, recoverEmail: "", errors: {} })}>
          <div className="modal-header justify-content-center">
            <button
              className="close"
              type="button"
              onClick={() => this.setState({ resetPwdModal: false, recoverEmail: "", errors: {} })}
            >
              <i className="now-ui-icons ui-1_simple-remove"></i>
            </button>
            <h4 className="title title-up">Mot de passe oublié</h4>
          </div>
          <form>
            <ModalBody>
              <p className="success-message profileUpdated" style={{ margin: 0, paddingBottom: "5px" }}>Email de récuperation envoyé !</p>
              <p>Entrez votre address Email</p>
              <p className="error-message" style={{ textAlign: "left" }}>{this.state.errors.recoverEmail}</p>
              <Input
                placeholder="Email..."
                type="text"
                name="recoverEmail"
                style={{ padding: "0.9rem", borderRadius: "4px" }}
                onChange={this.onChange}
              ></Input>
            </ModalBody>
            <div className="modal-footer">
              <Button color="info" type="submit" onClick={this.recoverPWD}>
                Envoyer Email de récuperation
              </Button>
            </div>
          </form>
        </Modal>



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
                  <Form className="form" >
                    <CardHeader className="text-center">
                      <div className="logo-container" style={{ width: '200px', marginBottom: '20px' }}>
                        LOGO
                      </div>
                    </CardHeader>
                    <CardBody>
                      <p className="error-message">{this.state.errors.email}</p>
                      <InputGroup
                        className={
                          "no-border input-lg" +
                          (this.state.firstFocus ? " input-group-focus" : "")
                        }
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="now-ui-icons users_circle-08"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Email ou Nom d'utilisateur..."
                          type="text"
                          name="email"
                          onFocus={() => this.setState({ firstFocus: true })}
                          onBlur={() => this.setState({ firstFocus: false })}
                          onChange={this.onChange}
                          autoComplete="on"
                        ></Input>
                      </InputGroup>
                      <p className="error-message">{this.state.errors.password}</p>
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
                          placeholder="Mot de passe..."
                          type="password"
                          name="motDePasse"
                          id="motDePasse"
                          onFocus={() => this.setState({ lastFocus: true })}
                          onBlur={() => this.setState({ lastFocus: false })}
                          onChange={this.onChange}
                          autoComplete="on"
                        ></Input>
                      </InputGroup>
                    </CardBody>
                    <CardFooter className="text-center">
                      <Button
                        block
                        className="btn-round"
                        color="info"
                        href="#pablo"
                        onClick={this.Submit}
                        size="lg"
                      >
                        Commencer
                      </Button>

                      {
                        this.props.loading &&
                        <div style={{ display: 'flex', justifyContent: "center" }}>  <FadeLoader
                          color={"#2ca8ff"}
                          margin="2"
                          height="18"
                          width="3"
                          loading={true}
                        /></div>}

                      {this.props.error &&
                        <Alert color="danger">
                          {this.props.error}
                        </Alert>}
                      <div className="pull-left">
                        <h6>
                          <a
                            className="link"
                            href={`/signup?redirect=${redirect}`}
                          >
                            Créer un Compte
                          </a>
                        </h6>
                      </div>
                      <div className="pull-right">
                        <h6>
                          <a
                            className="link"
                            href="#pablo"
                            onClick={e => { e.preventDefault(); this.setState({ resetPwdModal: true }) }}
                          >
                            Mot de passe oublié ?
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
LoginPage.propTypes = {
  signin: PropTypes.func.isRequired,
  userInfo: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.string
}

const mapStateToProps = state => ({

  userInfo: state.userSignin.userInfo,
  loading: state.userSignin.loading,
  error: state.userSignin.error

})

export default connect(mapStateToProps, { signin })(LoginPage);