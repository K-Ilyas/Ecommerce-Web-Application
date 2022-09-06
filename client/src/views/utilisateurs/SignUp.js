import React, { Component } from "react";
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { register } from '../../redux/actions/authActions';

import './../../assets/css/pagesStyle/profilePage/logIn.css';


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
import { Link } from "react-router-dom";
import Alert from "reactstrap/lib/Alert";
import { FadeLoader } from "react-spinners";


class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      firstFocus: false,
      lastFocus: false,
      email: "",
      nomUtilisateur: "",
      motDePasse: "",
      motDePasse2: "",
      error_password: false,
      errors: {}
    };
  }


  componentDidMount() {
    document.body.classList.add("login-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    // Clear Errors
  }

  componentDidUpdate(props) {
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
    const newUser = {
      email: this.state.email,
      name: this.state.nomUtilisateur,
      password: this.state.motDePasse,
      password2: this.state.motDePasse2
    };
    if (newUser.password === newUser.password2) {

      this.props.register(newUser.name, newUser.email, newUser.password);
      this.setState({ error_password: false });

    }
    else {
      this.setState({ error_password: true });


    }
  }

  render() {
    const redirect = this.props.location.search
      ? this.props.location.search.split('=')[1]
      : '/';
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
          <div className="content" style={{ marginTop: '140px' }}>
            <Container>
              <Col className="ml-auto mr-auto" md="8" >
                <Card className="card-login card-plain">
                  <Form className="form">
                    <CardHeader className="text-center" >
                      <div className="logo-container" style={{ width: '200px', marginBottom: '20px' }}>
                        LOGO
                      </div>
                    </CardHeader>
                    <div className="social-line">
                      <Button
                        className="btn-neutral btn-icon btn-round"
                        color="facebook"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        <i className="fab fa-facebook-square"></i>
                      </Button>
                      <Button
                        className="btn-neutral btn-icon btn-round"
                        color="twitter"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                        size="lg"
                      >
                        <i className="fab fa-twitter"></i>
                      </Button>
                      <Button
                        className="btn-neutral btn-icon btn-round"
                        color="google"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        <i className="fab fa-google-plus"></i>
                      </Button>
                    </div>
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
                            <i className="now-ui-icons objects_spaceship"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Email"
                          type="email"
                          name="email"
                          defaultValue={this.state.email}
                          onFocus={() => this.setState({ firstFocus: true })}
                          onBlur={() => this.setState({ firstFocus: false })}
                          onChange={this.onChange}
                        ></Input>
                      </InputGroup>
                      <p className="error-message">{this.state.errors.username}</p>
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
                          placeholder="Nom d'utilisateur"
                          type="text"
                          name="nomUtilisateur"
                          defaultValue={this.state.nomUtilisateur}
                          onFocus={() => this.setState({ firstFocus: true })}
                          onBlur={() => this.setState({ firstFocus: false })}
                          onChange={this.onChange}
                        ></Input>
                      </InputGroup>
                      <p className="error-message">{this.state.errors.password}</p>
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
                          placeholder="Mot de passe"
                          type="password"
                          name="motDePasse"
                          id="motDePasse"
                          defaultValue={this.state.motDePasse}
                          onFocus={() => this.setState({ firstFocus: true })}
                          onBlur={() => this.setState({ firstFocus: false })}
                          onChange={this.onChange}
                        ></Input>
                      </InputGroup>
                      <p className="error-message">{this.state.errors.password2}</p>
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
                          placeholder="Confirmez Mot de Passe"
                          type="password"
                          name="motDePasse2"
                          id="motDePasse2"
                          defaultValue={this.state.motDePasse2}
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
                        Créer Compte
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

                      {
                        this.state.error_password &&
                        <Alert color="danger">
                          Le mot de passe et le mot de passe de confirmation ne correspondent pas
                        </Alert>

                      }
                      <div className="pull-left">
                        <h6>
                          <Link
                            className="link"
                            to={`/login?redirect=${redirect}`}
                          >
                            Vous avez déjà un compte ?
                          </Link>
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

SignUp.propTypes = {
  register: PropTypes.func.isRequired,
  userInfo: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.string
}

const mapStateToProps = state => ({

  userInfo: state.userRegister.userInfo,
  loading: state.userRegister.loading,
  error: state.userRegister.error

})
export default connect(mapStateToProps, { register })(SignUp);
