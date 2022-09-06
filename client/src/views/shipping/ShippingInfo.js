import React, { Component } from 'react';
import $ from 'jquery';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import 'moment/locale/fr';
import { saveShippingAddress } from '../../redux/actions/cartAction'

// core components
import LandingPageHeader from "components/Headers/SmallHeader.js";
import DefaultFooter from "components/Footers/DefaultFooter";

import {
    Button
} from "reactstrap";

import './../../assets/css/pagesStyle/homePage/home.css';
import './../../assets/css/pagesStyle/info/schoolInfo.css';

// reactstrap components
import {
    Row,
    Col,
    CardBody,
    CardFooter,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
} from "reactstrap";

import Alert from 'reactstrap/lib/Alert';
import CheckoutSteps from '../../components/steps/CheckoutSteps'



class ShippingInfo extends Component {
    constructor() {
        super();
        this.state = {
            modalEvaluation: false,
            modalLogin: false,
            firstFocus: false,
            secondFocus: false,
            thirtFocus: false,
            fourtFocus: false,
            fifthFocus: false,

            fullName: "",
            address: "",
            city: '',
            postalCode: '',
            country: '',
            errors: {},
            error_required: false
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

        const { shippingAddress } = this.props.cart;
        if (Object.keys(shippingAddress).length !== 0) {

            this.setState({
                fullName: shippingAddress.fullName, address: shippingAddress.address,
                city: shippingAddress.city, postalCode: shippingAddress.postalCode,
                country: shippingAddress.country
            })
        }
    }
    componentDidUpdate(props) {
        const { userInfo } = this.props.userInfo;

        if (!userInfo) {
            this.props.history.push('/login?redirect=shipping');

        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    submitHandler = (e) => {
        // delete action
        e.preventDefault();
        const shipping =
        {
            fullName: this.state.fullName,
            address: this.state.address,
            city: this.state.city,
            postalCode: this.state.postalCode,
            country: this.state.country
        };
        if (shipping.fullName !== '' && shipping.address !== '' && shipping.city !== '' && shipping.postalCode !== '' && shipping.country !== '') {
            this.setState({ error_required: false });
            this.props.saveShippingAddress(shipping);
            this.props.history.push('/payment');
        }
        else
            this.setState({ error_required: true });
    };



    render() {



        const { userInfo } = this.props.userInfo;

        if (!userInfo) {
            this.props.history.push('/login?redirect=shipping');

        }

        return (
            <>
                <LandingPageHeader />


                <div className="main">
                    <div className='row mainContainer' style={{}}>

                        <div className='col col-LR-width' >
                            <div className='row justify-content-center'>
                                <div className='container-left' style={{ padding: '0', marginBottom: '0' }}>
                                    <div className="title-logo">
                                        <Row>
                                            <Col xs="12">

                                                <CheckoutSteps step1 step2></CheckoutSteps>

                                            </Col>

                                        </Row>
                                    </div>
                                </div>
                            </div>

                            <div className='row justify-content-center'>
                                <div className='container-left' >

                                    <Form className="form"
                                    >
                                        <h2 style={{ fontSize: '22px', textDecoration: 'underline' }}>Shipping</h2>

                                        <CardBody>
                                            <p className="error-message">{this.state.errors.fullName}</p>
                                            <label htmlFor="fullName">Nom d'utilisateur</label>

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
                                                    placeholder="Nom d'utilisateur..."
                                                    type="text"
                                                    id="fullName"
                                                    value={this.state.fullName}
                                                    name="fullName"
                                                    onFocus={() => this.setState({ firstFocus: true })}
                                                    onBlur={() => this.setState({ firstFocus: false })}
                                                    onChange={this.onChange}
                                                ></Input>
                                            </InputGroup>
                                            <p className="error-message">{this.state.errors.address}</p>
                                            <label htmlFor="address">Address</label>

                                            <InputGroup
                                                className={
                                                    " input-lg" +
                                                    (this.state.secondFocus ? " input-group-focus" : "")
                                                }
                                            >
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="fa fa-address-card"></i>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    placeholder="Address ..."
                                                    type="text"
                                                    value={this.state.address}
                                                    name="address"
                                                    id="address"
                                                    onFocus={() => this.setState({ secondFocus: true })}
                                                    onBlur={() => this.setState({ secondFocus: false })}
                                                    onChange={this.onChange}
                                                ></Input>
                                            </InputGroup>

                                            <p className="error-message">{this.state.errors.city}</p>
                                            <label htmlFor="city">Ville</label>

                                            <InputGroup
                                                className={
                                                    " input-lg" +
                                                    (this.state.thirtFocus ? " input-group-focus" : "")
                                                }
                                            >
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="fa fa-city"></i>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    placeholder="Ville ..."
                                                    type="text"
                                                    value={this.state.city}
                                                    name="city"
                                                    id="city"
                                                    onFocus={() => this.setState({ thirtFocus: true })}
                                                    onBlur={() => this.setState({ thirtFocus: false })}
                                                    onChange={this.onChange}
                                                ></Input>
                                            </InputGroup>

                                            <p className="error-message">{this.state.errors.postalCode}</p>
                                            <label htmlFor="postalCode">Code Postal</label>

                                            <InputGroup
                                                className={
                                                    " input-lg" +
                                                    (this.state.fourtFocus ? " input-group-focus" : "")
                                                }
                                            >
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="fa fa-code"></i>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    placeholder="Code postal ..."
                                                    type="text"
                                                    value={this.state.postalCode}
                                                    name="postalCode"
                                                    id="postalCode"
                                                    onFocus={() => this.setState({ fourtFocus: true })}
                                                    onBlur={() => this.setState({ fourtFocus: false })}
                                                    onChange={this.onChange}
                                                ></Input>
                                            </InputGroup>



                                            <p className="error-message">{this.state.errors.country}</p>
                                            <label htmlFor="country">Payee</label>

                                            <InputGroup
                                                className={
                                                    " input-lg" +
                                                    (this.state.fifth ? " input-group-focus" : "")
                                                }
                                            >
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="fa fa-map-pin"></i>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    placeholder="Paye ..."
                                                    type="text"
                                                    value={this.state.country}
                                                    name="country"
                                                    id="country"
                                                    onFocus={() => this.setState({ fifth: true })}
                                                    onBlur={() => this.setState({ fifth: false })}
                                                    onChange={this.onChange}
                                                ></Input>
                                            </InputGroup>


                                        </CardBody>
                                        {this.state.error_required &&
                                            <Alert color="danger">
                                                Vous devez remplir tout les chapms
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
                                                Continue
                                            </Button>

                                        </CardFooter>
                                    </Form>


                                </div>



                            </div>

                        </div>


                    </div>
                </div >
                <DefaultFooter />
            </>
        );
    }
}
ShippingInfo.propTypes = {
    saveShippingAddress: PropTypes.func.isRequired,
    cart: PropTypes.array,
    userInfo: PropTypes.object
}


const mapStateToProps = state => ({
    cart: state.cart,
    userInfo: state.userSignin,


})



export default connect(mapStateToProps, { saveShippingAddress })(ShippingInfo);