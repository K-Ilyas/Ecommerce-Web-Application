import React, { Component } from 'react';
import $ from 'jquery';
import StarRatings from 'react-star-ratings';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import 'moment/locale/fr';
import { detailsProduct, createReview, resetCreatedReview } from '../../redux/actions/productAction'

// core components
import LandingPageHeader from "components/Headers/SmallHeader.js";
import DefaultFooter from "components/Footers/DefaultFooter";

import {
    Button,
    Modal,
    ModalBody
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

import Badge from 'reactstrap/lib/Badge';
import { FadeLoader } from 'react-spinners';
import Alert from 'reactstrap/lib/Alert';
import Label from 'reactstrap/lib/Label';



class ProductInfo extends Component {
    constructor() {
        super();
        this.state = {
            modalEvaluation: false,
            modalLogin: false,
            products: [],
            loading: false,
            error: false,
            error_modal: false,
            qty: 1,
            noteAvis: 0,
            descriptionAvis: "",
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
        this.props.detailsProduct(this.props.match.params.id);

    }
    componentWillUnmount() {

    }

    componentDidUpdate(newProps) {

        if (this.props.successReviewCreate !== newProps.successReviewCreate) {
            this.setState({ descriptionAvis: '', noteAvis: 0 });
            this.props.resetCreatedReview();
            this.props.detailsProduct(this.props.match.params.id);
        }

    }

    clickEvaluation = () => {
        const userInfo = this.props.userInfo;
        if (userInfo) {
            this.setState({ modalEvaluation: true });
        } else {
            this.setState({ modalLogin: true });
        }
    }

    onSelectChange = (value, action) => {
        this.setState({ [action.name]: value.value });
    }
    onSelectChange = (value, action) => {
        this.setState({ [action.name]: value.value });
    }
    changeRating = (newRating, name) => {
        this.setState({
            noteAvis: newRating
        });
    }

    soumettreAvis = (e) => {
        e.preventDefault();
        const productId = this.props.product.id;
        if (this.state.descriptionAvis && this.state.noteAvis) {
            this.props.createReview(productId, { rating: this.state.noteAvis, comment: this.state.descriptionAvis, name: this.props.userInfo.name })
            this.setState({ modalEvaluation: false });
        } else {
            this.setState({ error_modal: true });
        }
    }

    onChangeInput = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    addToCartHandler = (e) => {
        let productId = this.props.match.params.id;
        this.props.history.push(`/cart/${productId}?qty=${this.state.qty}`);
    }
    toogleEvaluationList = () => {
        $(".evaluationsList .evaluationsList-child:nth-child(n+3)").toggle();
        $(".listAvis-toggle-btn").text() === "Voir tous les avis" ? $(".listAvis-toggle-btn").text("Voir mois d'avis") : $(".listAvis-toggle-btn").text("Voir tous les avis");
    }

    render() {

        return (
            <>
                <LandingPageHeader />

                {this.props.product ?
                    (
                        <React.Fragment>
                            <Modal
                                // toggle={() => this.setState({ modalLogin: false })}
                                isOpen={this.state.modalLogin}
                                style={{
                                    position: 'relative',
                                    top: '50%',
                                    transform: 'translateY(-50%)'
                                }}
                            >
                                <div className="modal-header justify-content-center">
                                    <button
                                        className="close"
                                        type="button"
                                        onClick={() => this.setState({ modalLogin: false })}
                                        style={{ zIndex: "100" }}
                                    >
                                        <i className="now-ui-icons ui-1_simple-remove"></i>
                                    </button>
                                </div>
                                <ModalBody className="modal-body-evaluation" >
                                    <h2>Écrivez votre Avis</h2>
                                    <hr />
                                    <p>Vous devez vous connecter a votre compte pour pourvoir évaluer ce produit !</p>
                                </ModalBody>
                                <div className="modal-footer-evaluation" style={{ paddingTop: 0 }}>
                                    <Button className="btn-neutral" color="info" type="button" onClick={() => { this.props.history.push("/login") }}>
                                        Se connecter
                                    </Button>
                                    <Button
                                        className="btn-neutral"
                                        color="info"
                                        type="button"
                                        onClick={() => { this.props.history.push("/signup") }}
                                    >
                                        Créer compte
                                    </Button>
                                </div>
                            </Modal>

                        </React.Fragment>
                    ) : null}


                {
                    this.props.userInfo && this.props.product ? (
                        <Modal
                            // toggle={() => this.setState({ modalEvaluation: false })}
                            isOpen={this.state.modalEvaluation}
                            style={{
                                position: 'relative',
                                top: '50%',
                                transform: 'translateY(-50%)'
                            }}
                        >
                            <div className="modal-header justify-content-center">
                                <button
                                    className="close"
                                    type="button"
                                    onClick={() => this.setState({ modalEvaluation: false, noteAvis: 0, descriptionAvis: "" })}
                                    style={{ zIndex: "100" }}
                                >
                                    <i className="now-ui-icons ui-1_simple-remove"></i>
                                </button>
                            </div>
                            <ModalBody className="modal-body-evaluation">
                                <h2>Écrivez votre Avis</h2>
                                <hr />
                                <div className="title-logo" style={{ padding: 0 }}>
                                    <Row>
                                        <Col xs="7">
                                            <h2 style={{ fontSize: '22px', color: 'black', textDecoration: 'underline' }}>{this.props.product.name}</h2>
                                        </Col>
                                        <Col xs='5' style={{ display: 'flex', alignItems: 'center' }}>
                                            <img
                                                style={{ width: '100%' }}
                                                alt="logo"
                                                src={this.props.product.image}
                                            />

                                        </Col>
                                    </Row>
                                </div>

                                <label>Notez le produit</label><br />
                                <StarRatings
                                    rating={this.state.noteAvis}
                                    starDimension="32px"
                                    starSpacing="2px"
                                    changeRating={this.changeRating}
                                    starRatedColor="gold"
                                    starHoverColor="gold"
                                />
                                <br />
                                <label>Commentaire</label><br />
                                <textarea width="100%" rows="4" maxlength="2000" name="descriptionAvis" onChange={this.onChangeInput} style={{ width: "100%" }}></textarea>
                            </ModalBody>
                            <div className="modal-footer-evaluation">
                                <Button
                                    className="btn-soumettre"
                                    type="button"
                                    onClick={this.soumettreAvis}
                                >
                                    Soumettre
                                </Button>
                            </div>
                        </Modal>) : null
                }
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

                            <div className='col col-LR-width'>
                                <div className='row justify-content-end'>
                                    <div className='container-left' style={{ padding: '0', marginBottom: '0' }}>
                                        <div className="title-logo">
                                            <Row>
                                                <Col xs="8">
                                                    <h2 style={{ fontSize: '22px', textDecoration: 'underline' }}>{this.props.product.name}</h2>
                                                    {/*<h6 style={{ marginTop: "6px" }}><a className="link-grey-small" href={"/info/etablissement/" + this.state.Etablissement.etab_id}>{this.state.Etablissement.nom}</a></h6>
                                               */} </Col>
                                                <Col xs='4' style={{ display: 'flex', alignItems: 'center' }}>
                                                    <img
                                                        style={{ width: '100%' }}
                                                        alt="logo"
                                                        src={this.props.product.image}
                                                    />
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                </div>
                                <div className='row justify-content-end'>
                                    <div className='container-left'>
                                        <div className="formation-intro" style={{ paddingTop: '0', paddingRight: '0' }}>
                                            <div className="formation-title-favori" >
                                                <h2 style={{ fontSize: "16px", paddingTop: '20px' }}>Aperçu du produit</h2>
                                            </div>
                                            <table>
                                                <tr>
                                                    <td>Name</td>
                                                    <td><b>:</b></td>
                                                    <td>{this.props.product.name} .</td>
                                                </tr>
                                                <tr>
                                                    <td>Prix</td>
                                                    <td><b>:</b></td>
                                                    <td> <strong>{this.props.product.price.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} MAD .</strong></td>
                                                </tr>
                                                <tr>
                                                    <td>Description</td>
                                                    <td><b>:</b></td>
                                                    <td>{this.props.product.description} .</td>
                                                </tr>
                                                <tr>
                                                    <td>Images</td>
                                                    <td><b>:</b></td>
                                                    <td>  <img
                                                        style={{ width: '20px' }}
                                                        alt="logo"
                                                        src={this.props.product.image}
                                                    /></td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div className='row justify-content-end' id="listDesAvis">
                                    <div className='container-left'>
                                        <h2><span>Avis des Clients</span></h2>


                                        {this.props.loadingReviewCreate && (
                                            <FadeLoader
                                                color={"#2ca8ff"}
                                                margin="2"
                                                height="15"
                                                width="4"
                                                loading={true} />)
                                        } {this.props.errorReviewCreate && (
                                            <Alert color="danger">
                                                {this.props.errorReviewCreate}
                                            </Alert>)}
                                        <h4 style={{ fontSize: "20px", marginBottom: "0", fontWeight: "600" }}>Note moyenne {this.props.product.rating}</h4>
                                        <p style={{ fontSize: "12px", fontWeight: "500", paddingBottom: '15px' }}>Basé sur {this.props.product.numReviews} avis</p>

                                        {this.props.product.reviews === 0
                                            ?
                                            <p>Aucun Avis, soyez le premier à évaluer cet établissement !</p>
                                            :
                                            <>
                                                <div className="evaluationsList" style={{ marginBottom: "30px" }}>
                                                    {this.props.product.reviews.map(evaluation =>
                                                        <div className="evaluationsList-child">
                                                            <p style={{ fontSize: "18px", fontWeight: "600", marginTop: "10px", marginBottom: '0' }}><i className="fas fa-terminal" style={{ paddingRight: "10px" }}></i>{evaluation.name}</p>
                                                            <div className="listAvis">
                                                                <div className="list-card-header">

                                                                    <div className="votes">
                                                                        <StarRatings
                                                                            rating={parseFloat(evaluation.rating)}
                                                                            starDimension="23px"
                                                                            starSpacing="1px"
                                                                            starRatedColor="gold"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <p>{evaluation.comment}</p>
                                                            </div>
                                                            <div style={{ textAlign: "right" }}>
                                                                <small style={{ fontSize: "11px", color: "rgb(100,100,100)" }}>{evaluation.createdAt}</small>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                                <button className="buttonLink listAvis-toggle-btn" onClick={this.toogleEvaluationList}>Voir tous les avis</button>
                                            </>
                                        }
                                        <div style={{ textAlign: "right" }}><button className="buttonStyle" onClick={this.clickEvaluation}>Écrire un avis</button></div>
                                    </div>
                                </div>
                            </div>


                        )
                        }


                        <div className='col col-LR-width'>
                            <div className='row'>
                                {/* Cart order */}
                                {this.props.product ?
                                    <React.Fragment>
                                        <div className='col col-xl col-lg col-md-6 col-12 container-right'>
                                            <div className="newsLetter rightContainer-BasicStyle">
                                                <h2>Vendeur</h2>
                                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                    <div>Prix :</div>
                                                    <div>{this.props.product.price} MAD</div>
                                                </div>
                                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                    <div>status : </div>
                                                    {this.props.product.countInStock > 0 ? <Badge color="success">InStock</Badge> : <Badge color="warning">N'est pas disponible</Badge>}
                                                </div>
                                                <div>
                                                    <FormGroup className="row" style={{ display: "flex", justifyContent: "space-between" }}>
                                                        <Col > <Label htmlFor="qte" > Qte : </Label></Col>
                                                        <Col sm="8">
                                                            <Input
                                                                className="form-control-plaintext"
                                                                id="qte" type="select" value={this.state.qty}
                                                                onChange={(e) => this.setState({ qty: e.target.value })} >
                                                                {[...Array(this.props.product.countInStock).keys()].map(
                                                                    (x) => (
                                                                        <option key={x + 1} value={x + 1}>
                                                                            {x + 1}
                                                                        </option>
                                                                    )
                                                                )}
                                                            </Input>
                                                        </Col>

                                                    </FormGroup>
                                                </div>
                                                <Button color="primary" type="submit" onClick={this.addToCartHandler} disabled={this.props.product.countInStock === 0}>
                                                    Ajouter a la carte
                                                </Button>
                                            </div>
                                        </div>




                                    </React.Fragment>

                                    : null
                                }
                                {/* school review */}
                                {this.props.product ?
                                    <div className='col col col-xl col-lg col-md-6 col-12 container-right'>
                                        <div className="CarrerTest rightContainer-BasicStyle">
                                            <h2 style={{ fontSize: "19px", marginTop: '0', paddingTop: "0" }}>Évaluation</h2>
                                            <div className="review-box">
                                                <p>Évaluation génerale du Produit</p>
                                                <StarRatings
                                                    rating={this.props.product.rating ? parseFloat(this.props.product.rating) : 0}
                                                    starDimension="24px"
                                                    starSpacing="1px"
                                                    starRatedColor="gold"
                                                />
                                                <br />
                                                <span>Basé sur {this.props.product.numReviews} avis</span>
                                                <a href="#listDesAvis">Voir tous les avis sur la Formation</a>
                                            </div>
                                            <button className="avisBtn" style={{ padding: "8px" }} onClick={this.clickEvaluation}>Écrire un avis</button>
                                        </div>
                                    </div>
                                    : null}

                            </div>
                        </div>

                    </div>
                </div >
                <DefaultFooter />
            </>
        );
    }
}


ProductInfo.propTypes = {
    detailsProduct: PropTypes.func.isRequired,
    resetCreatedReview: PropTypes.func.isRequired,
    createReview: PropTypes.func.isRequired,
    product: PropTypes.object,
    loading: PropTypes.bool,
    error: PropTypes.string,
    userInfo: PropTypes.object,
}


const mapStateToProps = state => ({
    product: state.product.product,
    loading: state.product.loading,
    error: state.product.error,
    userInfo: state.userSignin.userInfo,
    loadingReviewCreate: state.productReviewCreate.loading,
    errorReviewCreate: state.productReviewCreate.error,
    successReviewCreate: state.productReviewCreate.success
})

export default connect(mapStateToProps, { detailsProduct, createReview, resetCreatedReview })(ProductInfo);