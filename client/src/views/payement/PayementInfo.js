import React, { Component } from 'react';
import $ from 'jquery';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import { savePaymentMethod } from '../../redux/actions/cartAction';

// core components
import LandingPageHeader from "components/Headers/SmallHeader.js";
import DefaultFooter from "components/Footers/DefaultFooter";

import {
    Button,
} from "reactstrap";

import './../../assets/css/pagesStyle/homePage/home.css';
import './../../assets/css/pagesStyle/info/schoolInfo.css';

// reactstrap components
import {
    FormGroup,
    Row,
    Col,

    CardBody,
    CardFooter,
    Form,
    Input,

} from "reactstrap";


import Alert from 'reactstrap/lib/Alert';
import CheckoutSteps from '../../components/steps/CheckoutSteps'
import Label from 'reactstrap/lib/Label';



class PayementInfo extends Component {
    constructor() {
        super();
        this.state = {
            modalEvaluation: false,
            modalLogin: false,
            paymentMethod: 'PayPal',
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

    }
    componentDidUpdate(props) {
        const { shippingAddress } = this.props.cart;

        if (!shippingAddress.address) {
            this.props.history.push('/shipping');
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    submitHandler = (e) => {
        // delete action
        e.preventDefault();

        if (this.state.paymentMethod !== '') {
            this.setState({ error_required: false });
            this.props.savePaymentMethod(this.state.paymentMethod)
            this.props.history.push('/placeorder');
        }
        else
            this.setState({ error_required: true });
    };



    render() {



        const { shippingAddress } = this.props.cart;

        if (!shippingAddress.address) {
            this.props.history.push('/shipping');
        }

        return (
            <>
                <LandingPageHeader />


                <div className="main">
                    <div className='row mainContainer'>

                        <div className='col col-LR-width'>
                            <div className='row justify-content-center'>
                                <div className='container-left' style={{ padding: '0', marginBottom: '0' }}>
                                    <div className="title-logo">
                                        <Row>
                                            <Col xs="12">

                                                <CheckoutSteps step1 step2 step3></CheckoutSteps>

                                            </Col>

                                        </Row>
                                    </div>
                                </div>
                            </div>

                            <div className='row justify-content-center'>
                                <div className='container-left'>

                                    <Form className="form"
                                    >
                                        <h2 style={{ fontSize: '22px', textDecoration: 'underline' }}>Payement Method</h2>

                                        <CardBody>

                                            <FormGroup check className="form-check-radio">

                                                <Label check>

                                                    <Input
                                                        type="radio"
                                                        id="paypal"
                                                        defaultValue="PayPal"
                                                        name="paymentMethod"
                                                        defaultChecked
                                                        onChange={(e) => this.setState({ paymentMethod: e.target.value })}
                                                    ></Input>
                                                    <span className="form-check-sign"></span>

                                                    <strong> PayPal</strong>
                                                </Label>
                                            </FormGroup>
                                            <FormGroup check className="form-check-radio">

                                                <Label check>

                                                    <Input
                                                        type="radio"
                                                        id="stripe"
                                                        defaultValue="Stripe"
                                                        name="paymentMethod"
                                                        onChange={(e) => this.setState({ paymentMethod: e.target.value })}
                                                    ></Input>
                                                    <span className="form-check-sign"></span>
                                                    <strong> Stripe</strong>
                                                </Label>
                                            </FormGroup>




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
                                                color="info"
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
PayementInfo.propTypes = {
    savePaymentMethod: PropTypes.func.isRequired,
    cart: PropTypes.array,
}


const mapStateToProps = state => ({
    cart: state.cart,
})



export default connect(mapStateToProps, { savePaymentMethod })(PayementInfo);