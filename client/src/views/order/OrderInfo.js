import React, { Component } from 'react';
import $ from 'jquery';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import 'moment/locale/fr';
import { detailsOrder, orderPayRest, payOrder, deliverOrder, resetDeliverOrder } from '../../redux/actions/orderAction'

// core components
import LandingPageHeader from "components/Headers/SmallHeader.js";
import DefaultFooter from "components/Footers/DefaultFooter";
import { PayPalButton } from 'react-paypal-button-v2';


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

import Badge from 'reactstrap/lib/Badge';
import Axios from 'axios';
import { FadeLoader } from 'react-spinners';
import Alert from 'reactstrap/lib/Alert';
import { Link } from 'react-router-dom';



class orderInfo extends Component {
    constructor() {
        super();
        this.state = {
            modalEvaluation: false,
            modalLogin: false,
            errors: {},
            error_required: false,
            sdkReady: false
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
        const order = this.props.order;
        if (!order || this.props.successPay || this.props.successDeliver || (order && (parseInt(order.id) !== parseInt(this.props.match.params.id)))) {
            this.props.orderPayRest();
            this.props.resetDeliverOrder();
            this.props.detailsOrder(this.props.match.params.id);

        } else {
            if (!order.isPaid) {

                if (!window.paypal) {
                    this.addPayPalScript();
                } else {
                    this.changeSkyReady();
                }
            }

        }



    }

    addPayPalScript = async () => {
        const { data } = await Axios.get('/config/paypal');
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
        script.async = true;
        script.onload = () => {
            this.setState({ sdkReady: true });
        };
        script.oncancel = () => {
            this.setState({ sdkReady: true });
        };

        document.body.appendChild(script);
    };

    changeSkyReady = async () => {
        this.setState({ sdkReady: true });
    }

    componentDidUpdate(prevProps) {
        const order = this.props.order;
        if (!order || this.props.successPay !== prevProps.successPay || this.props.successDeliver !== prevProps.successDeliver || (order && (parseInt(order.id) !== parseInt(this.props.match.params.id)))) {
            this.props.orderPayRest();
            this.props.resetDeliverOrder();
            this.props.detailsOrder(this.props.match.params.id);
        } else {
            if (!order.isPaid) {
                if (order !== prevProps.order) {
                    if (!window.paypal) {
                        this.addPayPalScript();
                    } else {
                        this.changeSkyReady();
                    }
                }
            }
        }

    }
    componentWillUnmount() {
        this.props.orderPayRest();
    }
    successPaymentHnadler = (paymentResult) => {
        // TODO: dispatch pay order
        const order = this.props.order;
        this.props.payOrder(order, paymentResult);
        this.props.orderPayRest();
    };
    checkoutHandler = (e) => {
        // delete action
        e.preventDefault();
    };

    deliverHandler = async () => {
        const order = this.props.order;
        this.props.deliverOrder(order.id);

    }


    render() {

        const order = this.props.order;
        return (
            <>
                <LandingPageHeader />
                <div className="main">
                    <div className='row mainContainer'>
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
                                <div className='col col-LR-width'>
                                    <div className='row justify-content-end'>
                                        <div className='container-left' style={{ padding: '0', marginBottom: '0' }}>
                                            <div className="title-logo">
                                                <h2>Ordre {order.id} </h2>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='row justify-content-end'>
                                        <div className='container-left'>


                                            <div className="formation-intro" style={{ paddingTop: '0', paddingRight: '0', marginBottom: '20px' }}>
                                                <h2 style={{ fontSize: '22px', textDecoration: 'underline' }}>Shipping</h2>



                                                <table>
                                                    <tbod>
                                                        <tr>
                                                            <td><strong>Address</strong></td>
                                                            <td><b><strong>:</strong></b></td>
                                                            <td>{order.shippingAddress.address},{' '}
                                                                {order.shippingAddress.city},{' '}
                                                                {order.shippingAddress.postalCode},{' '}
                                                                {order.shippingAddress.country}
                                                                .</td>
                                                        </tr>
                                                        <tr>
                                                            <td><strong>Livré </strong></td>
                                                            <td><b><strong>:</strong></b></td>
                                                            <td>
                                                                {order.isDelivered ? (
                                                                    <Badge color="success">
                                                                        Livré à
                                                                        {order.deliveredAt}
                                                                    </Badge>


                                                                ) : (
                                                                    <Badge color="danger">Non livrés
                                                                    </Badge>
                                                                )}
                                                                .</td>
                                                        </tr>

                                                    </tbod>
                                                </table>

                                            </div>

                                            <div className="formation-intro" style={{ paddingTop: '0', paddingRight: '0', marginBottom: "20px" }}>
                                                <h2 style={{ fontSize: '22px', textDecoration: 'underline' }}>Payment</h2>


                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td><strong>Method</strong></td>
                                                            <td><b><strong>:</strong></b></td>
                                                            <td>{order.paymentMethod}
                                                                .</td>
                                                        </tr>
                                                        <tr>
                                                            <td><strong>Payé</strong></td>
                                                            <td><b><strong>:</strong></b></td>
                                                            <td>  {order.isPaid ? (
                                                                <Badge color="success">
                                                                    Payé à
                                                                    {order.paidAt}
                                                                </Badge>) : (
                                                                <Badge color="danger">
                                                                    Impayé</Badge>
                                                            )}
                                                                .</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="formation-intro" style={{ paddingTop: '0', paddingRight: '0', marginBottom: "20px" }}>
                                                <h2 style={{ fontSize: '22px', textDecoration: 'underline' }}>Items commandés</h2>
                                                {order.orderItems.map((item) => (
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
                                                        <Col xs="6">
                                                            <p>{item.qty} x {item.price.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} MAD= {(parseFloat(item.qty * item.price).toFixed(2) + '').replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
                                                            } MAD.</p>
                                                        </Col>
                                                    </Row>
                                                ))}


                                            </div>

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
                                                    <div>{parseFloat(order.itemsPrice).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} MAD</div>
                                                </div>

                                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                    <div>Shipping</div>
                                                    <div>{parseFloat(order.shippingPrice).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} MAD</div>
                                                </div>

                                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                    <div>Tax</div>
                                                    <div>{parseFloat(order.taxPrice).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} MAD</div>
                                                </div>

                                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                    <div>
                                                        <strong> Order Total</strong>
                                                    </div>
                                                    <div>
                                                        <strong>{parseFloat(order.totalPrice).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} MAD</strong>
                                                    </div>
                                                </div>

                                                <div>

                                                    {(this.props.userInfo.isAdmin && order.isPaid && !order.isDelivered) ? (
                                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                            {this.props.loadingDeliver && (<FadeLoader
                                                                color={"#2ca8ff"}
                                                                margin="2"
                                                                height="25"
                                                                width="4"
                                                                loading={true}
                                                            />)
                                                            }
                                                            {
                                                                this.props.errorDeliver && (
                                                                    <Alert color="danger">
                                                                        {this.props.errorDeliver}
                                                                    </Alert>
                                                                )}
                                                            <Button
                                                                type="button"
                                                                className="primary block"
                                                                onClick={this.deliverHandler}
                                                                color="primary"
                                                                style={{ width: "100%" }}
                                                            >
                                                                Livrer la Commande
                                                            </Button>
                                                        </div>) : null
                                                    }
                                                </div>



                                                {!order.isPaid && (
                                                    <div style={{ marginTop: '20px' }}>





                                                        {!this.state.sdkReady ? (
                                                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                                <FadeLoader
                                                                    color={"#2ca8ff"}
                                                                    margin="2"
                                                                    height="18"
                                                                    width="4"
                                                                    loading={true}
                                                                /></div>) : (<>

                                                                    {this.props.errorPay && (
                                                                        <Alert color="danger">
                                                                            {this.props.errorPay}
                                                                        </Alert>)}
                                                                    {this.props.loadingPay && <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                                        <FadeLoader
                                                                            color={"#2ca8ff"}
                                                                            margin="2"
                                                                            height="18"
                                                                            width="4"
                                                                            loading={true}
                                                                        /></div>}

                                                                    <PayPalButton
                                                                        amount={parseFloat(order.totalPrice).toFixed(2)}
                                                                        onSuccess={this.successPaymentHnadler}
                                                                    ></PayPalButton>
                                                                </>)}
                                                    </div>
                                                )}

                                            </div>
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
orderInfo.propTypes = {
    detailsOrder: PropTypes.func.isRequired,
    orderPayRest: PropTypes.func.isRequired,
    payOrder: PropTypes.func.isRequired,
    deliverOrder: PropTypes.func.isRequired,
    resetDeliverOrder: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    error: PropTypes.string,
    order: PropTypes.object,
    loadingPay: PropTypes.bool,
    errorPay: PropTypes.string,
    successPay: PropTypes.object,
    userInfo: PropTypes.object,
    loadingDeliver: PropTypes.bool,
    errorDeliver: PropTypes.bool,
    successDeliver: PropTypes.bool,
}
const mapStateToProps = state => ({
    loading: state.orderDetails.loading,
    error: state.orderDetails.error,
    order: state.orderDetails.order,
    loadingPay: state.orderPay.loading,
    errorPay: state.orderPay.error,
    successPay: state.orderPay.success,
    userInfo: state.userSignin.userInfo,
    loadingDeliver: state.orderDeliver.loading,
    errorDeliver: state.orderDeliver.error,
    successDeliver: state.orderDeliver.success
})

export default connect(mapStateToProps, { detailsOrder, orderPayRest, payOrder, deliverOrder, resetDeliverOrder })(orderInfo);