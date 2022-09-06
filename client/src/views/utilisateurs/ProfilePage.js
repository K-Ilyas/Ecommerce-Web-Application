import React, { Component } from 'react';
import $ from 'jquery';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import 'moment/locale/fr';
import { detailsUser, updateUserProfile, resetUserProfile } from '../../redux/actions/authActions'

// core components
import LandingPageHeader from "components/Headers/SmallHeader.js";
import DefaultFooter from "components/Footers/DefaultFooter";



import './../../assets/css/pagesStyle/homePage/home.css';
import './../../assets/css/pagesStyle/info/schoolInfo.css';

// reactstrap components
import {

  CardBody,
  CardFooter,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
} from "reactstrap";

import { FadeLoader } from 'react-spinners';
import Alert from 'reactstrap/lib/Alert';
import Button from 'reactstrap/lib/Button';




class ProfilePage extends Component {
  constructor() {
    super();
    this.state = {
      modalEvaluation: false,
      modalLogin: false,
      errors: {},
      firstFocus: false,
      secondFocus: false,
      thirtFocus: false,
      fourtFocus: false,
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      error_required: false,
    };
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

    document.body.classList.add("SchoolInfo");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    this.props.resetUserProfile();
    this.props.detailsUser(this.props.userInfo.id);


  }



  componentDidUpdate(prevProps) {
    // if (this.props.user !== previousProps.user) {
    //   this.props.resetUserProfile();
    //   this.props.detailsUser(this.props.userInfo.id);
    // }
    // else {
    //   this.setState({ name: this.props.user.name });
    //   this.setState({ email: this.props.user.email });
    // }
    if (this.props.user) {
      if (this.props.user !== prevProps.user) {
        this.setState({ name: this.props.user.name });
        this.setState({ email: this.props.user.email });
      }
    }
  }


  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  submitHandler = (e) => {
    const user = this.props.userInfo;
    // delete action
    e.preventDefault();
    if (this.state.password !== this.state.confirmPassword) {
      this.setState({ error_required: true });
    } else {
      this.props.updateUserProfile({ userId: user.id, name: this.state.name, email: this.state.email, password: this.state.password });
      this.setState({ password: "", confirmPassword: "" });
    }

  };




  render() {



    const user = this.props.user;

    console.log(user);
    return (
      <>
        <LandingPageHeader />
        <div className="main" >
          <div className='row mainContainer' >
            {this.props.loading ? (
              <FadeLoader
                color={"#2ca8ff"}
                margin="2"
                height="25"
                width="4"
                loading={true}
              />) : this.props.error ? (
                <Alert color="danger">
                  {this.props.error}
                </Alert>) : (


              <React.Fragment>
                <div className='col col-LR-width' >


                  <div className='row justify-content-center'>
                    <div className='container-left' >
                      <Form className="form"
                      >
                        <h2 style={{ fontSize: '22px', textDecoration: 'underline' }}>Profil de l'utilisateur</h2>
                        {this.props.loadingUpdate && <FadeLoader
                          color={"#2ca8ff"}
                          margin="2"
                          height="25"
                          width="4"
                          loading={true}
                        />}
                        {this.props.errorUpdate && (
                          <Alert color="danger">
                            {this.props.errorUpdate}</Alert>
                        )}
                        {this.props.successUpdate && (
                          <Alert color="success">
                            Profile Updated Successfully
                          </Alert>
                        )}

                        <CardBody>
                          <label htmlFor="name">Name</label>

                          <InputGroup
                            className={
                              " input-lg" +
                              (this.state.firstFocus ? " input-group-focus" : "")
                            }
                          >
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="fa fa-user"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Enter Nom d'utilisateur..."
                              type="text"
                              id="name"
                              value={user.name}
                              name="name"
                              onFocus={() => this.setState({ firstFocus: true })}
                              onBlur={() => this.setState({ firstFocus: false })}
                              onChange={this.onChange}
                            ></Input>
                          </InputGroup>

                          <label htmlFor="email">E-mail</label>

                          <InputGroup
                            className={
                              " input-lg" +
                              (this.state.secondFocus ? " input-group-focus" : "")
                            }
                          >
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="fa fa-envelope"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder=" Enter E-mail ..."
                              type="text"
                              value={user.email}
                              name="email"
                              id="email"
                              onFocus={() => this.setState({ secondFocus: true })}
                              onBlur={() => this.setState({ secondFocus: false })}
                              onChange={this.onChange}
                            ></Input>
                          </InputGroup>

                          <label htmlFor="password">Password</label>

                          <InputGroup
                            className={
                              " input-lg" +
                              (this.state.thirtFocus ? " input-group-focus" : "")
                            }
                          >
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="fa fa-key"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder=" Enter Password ..."
                              type="password"
                              name="password"
                              id="password"
                              value={this.state.password}
                              onFocus={() => this.setState({ thirtFocus: true })}
                              onBlur={() => this.setState({ thirtFocus: false })}
                              onChange={this.onChange}
                            ></Input>
                          </InputGroup>

                          <label htmlFor="confirmPassword">Confirm Password</label>

                          <InputGroup
                            className={
                              " input-lg" +
                              (this.state.fourtFocus ? " input-group-focus" : "")
                            }
                          >
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="fa fa-check"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Enter Confirm Password ..."
                              type="password"
                              name="confirmPassword"
                              id="confirmPassword"
                              value={this.state.confirmPassword}
                              onFocus={() => this.setState({ fourtFocus: true })}
                              onBlur={() => this.setState({ fourtFocus: false })}
                              onChange={this.onChange}
                            ></Input>
                          </InputGroup>

                        </CardBody>
                        {this.state.error_required &&
                          <Alert color="danger">
                            Password et Confirm Password doit etre identique
                          </Alert>
                        }
                        <CardFooter className="text-center" style={{ backgroundColor: 'white' }}>
                          <Button
                            block
                            className="btn-round"
                            color="primary"
                            href="#pablo"
                            onClick={this.submitHandler}
                            size="lg"
                          >
                            Mettre à jour
                          </Button>
                        </CardFooter>
                      </Form>

                    </div>
                  </div>
                </div>
              </React.Fragment>
            )}


          </div>
        </div >
        <DefaultFooter />
      </>
    );
  }
}
ProfilePage.propTypes = {
  updateUserProfile: PropTypes.func.isRequired,
  detailsUser: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string,
  userInfo: PropTypes.object,
  successUpdate: PropTypes.bool,
  errorUpdate: PropTypes.string,
  loadingUpdate: PropTypes.bool

}


const mapStateToProps = state => ({
  loading: state.userDetails.loading,
  error: state.userDetails.error,
  user: state.userDetails.user,
  userInfo: state.userSignin.userInfo,
  successUpdate: state.userUpdateProfile.success,
  errorUpdate: state.userUpdateProfile.update,
  loadingUpdate: state.userUpdateProfile.loading,
})



export default connect(mapStateToProps, { detailsUser, updateUserProfile, resetUserProfile })(ProfilePage);