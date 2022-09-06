import React, { Component } from 'react';
import $ from 'jquery';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import 'moment/locale/fr';
import { createOrder, resetOrder } from '../../redux/actions/orderAction'

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
    Row,
    Col,
} from "reactstrap";

import { FadeLoader } from 'react-spinners';
import Alert from 'reactstrap/lib/Alert';
import { Link } from 'react-router-dom';
import CheckoutSteps from '../../components/steps/CheckoutSteps'



class PlaceOrderInfo extends Component {
    constructor() {
        super();
        this.state = {
            modalEvaluation: false,
            modalLogin: false,
            paymentMethod: '',
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
        const cart = this.props.cart;
        if (!cart.paymentMethod) {
            this.props.history.push('/payment');
        }

        if (this.props.success) {
            this.props.history.push(`/order/${this.props.order.id}`);
            this.props.resetOrder();
        }

    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    checkoutHandler = (e) => {
        // delete action
        e.preventDefault();
        const cart = this.props.cart;
        this.props.createOrder({ ...cart, orderItems: cart.cartItems });

    };



    render() {



        const toPrice = (num) => Number(num.toFixed(2));

        const cart = this.props.cart;

        cart.itemsPrice = toPrice(
            cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
        );
        cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
        cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
        cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

        if (!cart.paymentMethod) {
            this.props.history.push('/payment');
        }

        if (this.props.success) {
            this.props.history.push(`/order/${this.props.order.id}`);
            this.props.resetOrder();
        }
        return (
            <>
                <LandingPageHeader />


                <div className="main">
                    <div className='row mainContainer'>

                        <div className='col col-LR-width'>
                            <div className='row justify-content-end'>
                                <div className='container-left' style={{ padding: '0', marginBottom: '0' }}>
                                    <div className="title-logo">
                                        <Row>
                                            <Col xs="12">

                                                <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>

                                            </Col>

                                        </Row>
                                    </div>
                                </div>
                            </div>

                            <div className='row justify-content-end'>
                                <div className='container-left'>


                                    <div className="formation-intro" style={{ paddingTop: '0', paddingRight: '0', marginBottom: '20px' }}>
                                        <h2 style={{ fontSize: '22px', textDecoration: 'underline' }}>Shipping</h2>



                                        <table>
                                            <tr>
                                                <td><strong>Address</strong></td>
                                                <td><b><strong>:</strong></b></td>
                                                <td>{cart.shippingAddress.address},{' '}
                                                    {cart.shippingAddress.city},{' '}
                                                    {cart.shippingAddress.postalCode},{' '}
                                                    ,{cart.shippingAddress.country}
                                                    .</td>
                                            </tr>

                                        </table>
                                    </div>

                                    <div className="formation-intro" style={{ paddingTop: '0', paddingRight: '0', marginBottom: "20px" }}>
                                        <h2 style={{ fontSize: '22px', textDecoration: 'underline' }}>Payment</h2>


                                        <table>
                                            <tr>
                                                <td><strong>Method</strong></td>
                                                <td><b><strong>:</strong></b></td>
                                                <td>{cart.paymentMethod}
                                                    .</td>
                                            </tr>

                                        </table>
                                    </div>


                                    <div className="formation-intro" style={{ paddingTop: '0', paddingRight: '0', marginBottom: "20px" }}>
                                        <h2 style={{ fontSize: '22px', textDecoration: 'underline' }}>Items commandés</h2>


                                        {cart.cartItems.map((item) => (
                                            <Row key={item.product}>
                                                <Col xs="2">
                                                    <img
                                                        style={{ width: '30px' }}
                                                        src={item.image}
                                                        alt={item.name}
                                                    ></img>

                                                </Col>
                                                <Col xs="4">
                                                    <Link to={`/info/product/${item.product}`}>{item.name}</Link>

                                                </Col>


                                                <Col xs="4">
                                                    <p>{item.qty} x {item.price} MAD= {item.qty * item.price} MAD</p>
                                                </Col>



                                            </Row>
                                        ))}


                                    </div>
                                    {this.props.loading &&
                                        <FadeLoader
                                            color={"#2ca8ff"}
                                            margin="2"
                                            height="25"
                                            width="4"
                                            loading={true}
                                        />}
                                    {this.props.error &&
                                        <Alert color="danger">
                                            {this.props.error}
                                        </Alert>}
                                </div>
                            </div>
                        </div>
                        <div className='col col-LR-width'>
                            <div className='row'>
                                <div className='col col-xl col-lg col-md-6 col-12 container-right'>
                                    <div className=" rightContainer-BasicStyle" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                        <h2>order summary</h2>
                                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                                            <div>Items</div>
                                            <div>{cart.itemsPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} MAD</div>
                                        </div>

                                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                                            <div>Shipping</div>
                                            <div>{cart.shippingPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} MAD</div>
                                        </div>

                                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                                            <div>Tax</div>
                                            <div>{cart.taxPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} MAD</div>
                                        </div>

                                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                                            <div>
                                                <strong> Order Total</strong>
                                            </div>
                                            <div>
                                                <strong>{cart.totalPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} MAD</strong>
                                            </div>
                                        </div>


                                        <Button color="primary" type="submit" onClick={this.checkoutHandler} disabled={this.props.cart.length === 0}
                                        >
                                            Passer la commande
                                        </Button>
                                    </div>
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
PlaceOrderInfo.propTypes = {
    createOrder: PropTypes.func.isRequired,
    resetOrder: PropTypes.func.isRequired,
    cart: PropTypes.array,
    loading: PropTypes.bool,
    success: PropTypes.bool,
    error: PropTypes.string,
    order: PropTypes.object
}


const mapStateToProps = state => ({
    cart: state.cart,
    loading: state.orderCreate.loading,
    success: state.orderCreate.success,
    error: state.orderCreate.error,
    order: state.orderCreate.order
})



export default connect(mapStateToProps, { createOrder, resetOrder })(PlaceOrderInfo);