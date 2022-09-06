import React, { Component } from 'react';
import $ from 'jquery';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import 'moment/locale/fr';
import { addToCart, removeFromCart } from '../../redux/actions/cartAction'

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
    Input,
    Row,
    Col
} from "reactstrap";


import Alert from 'reactstrap/lib/Alert';
import { Link } from 'react-router-dom';
import UncontrolledTooltip from 'reactstrap/lib/UncontrolledTooltip';



class CartInfo extends Component {
    constructor() {
        super();
        this.state = {
            modalEvaluation: false,
            modalLogin: false,

        };
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool
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

        const productId = this.props.match.params.id;
        const qty = this.props.location.search
            ? Number(this.props.location.search.split('=')[1])
            : 1;

        this.props.addToCart(productId, qty);


    }
    componentDidUpdate(props) {


    }



    removeFromCartHandler = (id) => {
        // delete action
        this.props.removeFromCart(id);
    };

    checkoutHandler = (e) => {
        this.props.history.push('/login?redirect=shipping');
    };

    render() {


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
                                            <Col xs="8">
                                                <h2 style={{ fontSize: '22px', textDecoration: 'underline' }}>Panier</h2>
                                                {/*<h6 style={{ marginTop: "6px" }}><a className="link-grey-small" href={"/info/etablissement/" + this.state.Etablissement.etab_id}>{this.state.Etablissement.nom}</a></h6>
                                          */} </Col>

                                        </Row>
                                    </div>
                                </div>
                            </div>

                            <div className='row justify-content-end'>
                                <div className='container-left'>
                                    {this.props.cart.length === 0 ? (

                                        <Alert color="info" isOpen={this.state.visible}>
                                            <div className="container">
                                                <div className="alert-icon">
                                                </div>
                                                Le panier est vide. <strong><Link to="/">Faire du shopping</Link></strong>
                                                <button
                                                    type="button"
                                                    className="close"
                                                    aria-label="Close"
                                                    onClick={this.onDismiss}
                                                >
                                                    <span aria-hidden="true">
                                                        <i className="now-ui-icons ui-1_simple-remove"></i>
                                                    </span>
                                                </button>
                                            </div>
                                        </Alert>) : (


                                        <div className="formation-intro" style={{ paddingRight: '0' }}>

                                            {
                                                this.props.cart.map((item) => (
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

                                                        <Col xs="2">

                                                            <FormGroup>
                                                                <Input type="select"
                                                                    value={item.qty}
                                                                    onChange={(e) => this.props.addToCart(item.product, Number(e.target.value))}
                                                                >
                                                                    {[...Array(item.countInStock).keys()].map((x) => (
                                                                        <option key={x + 1} value={x + 1}>
                                                                            {x + 1}
                                                                        </option>
                                                                    ))}
                                                                </Input>

                                                            </FormGroup>

                                                        </Col>

                                                        <Col xs="2">
                                                            <p> <strong>{item.price.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} MAD</strong></p>
                                                        </Col>

                                                        <Col xs="2">

                                                            <Button color="primary" id={`button_${item.product}`} style={{ margin: "0px", height: "20px", width: "20px", display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                                                onClick={() => this.removeFromCartHandler(item.product)}
                                                            >
                                                                <i className="now-ui-icons ui-1_simple-remove" style={{ color: "white" }}></i>

                                                            </Button>
                                                            <UncontrolledTooltip placement="bottom" target={`button_${item.product}`} delay={0}>
                                                                Supprimer
                                                            </UncontrolledTooltip>


                                                        </Col>


                                                    </Row>
                                                ))
                                            }
                                        </div>

                                    )} </div>



                            </div>

                        </div>




                        <div className='col col-LR-width'>
                            <div className='row'>
                                <div className='col col-xl col-lg col-md-6 col-12 container-right'>
                                    <div className=" rightContainer-BasicStyle" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

                                        <h6 style={{ textAlign: 'center' }}>
                                            Total ({this.props.cart.reduce((a, c) => a + c.qty, 0)} éléments) :
                                            {this.props.cart.reduce((a, c) => a + c.price * c.qty, 0)} MAD
                                        </h6>

                                        <Button color="primary" type="submit" onClick={this.checkoutHandler} disabled={this.props.cart.length === 0}
                                        >
                                            Passer à la caisse
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
CartInfo.propTypes = {
    addToCart: PropTypes.func.isRequired,
    removeFromCart: PropTypes.func.isRequired,
    cart: PropTypes.array
}


const mapStateToProps = state => ({
    cart: state.cart.cartItems
})



export default connect(mapStateToProps, { addToCart, removeFromCart })(CartInfo);