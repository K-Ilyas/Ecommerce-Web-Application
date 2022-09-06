import React, { Component } from 'react';
import $ from 'jquery';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import 'moment/locale/fr';
import { listProducts, createProduct, resetCreateProduct, deleteProduct, resetDeleteProduct } from '../../redux/actions/productAction'

// core components
import LandingPageHeader from "components/Headers/SmallHeader.js";
import DefaultFooter from "components/Footers/DefaultFooter";


import {
    Button,
    Modal
} from "reactstrap";

import './../../assets/css/pagesStyle/homePage/home.css';
import './../../assets/css/pagesStyle/info/schoolInfo.css';



import { FadeLoader } from 'react-spinners';
import Alert from 'reactstrap/lib/Alert';



class ProductList extends Component {
    constructor() {
        super();
        this.state = {
            modalEvaluation: false,
            modalLogin: false,
            errors: {},
            error_required: false,
            sdkReady: false,
            modalLive: false,
            product: ''
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

        this.props.listProducts();



    }


    saveHandler = (product) => {
        // delete action

        this.setState({ modalLive: true });
        this.setState({ product: product });

    };

    deleteHandler = async () => {
        // delete action
        this.props.deleteProduct(this.state.product.id);
        this.setState({
            modalLive: false,
            product: null
        });

    };

    componentDidUpdate(prevProps) {

        if (this.props.successCreate) {
            if (this.props.successCreate !== prevProps.successCreate) {
                this.props.resetCreateProduct();
                this.props.history.push(`/product/${this.props.createdProduct.id}/edit`);
            }
        }
        if (this.props.successDelete) {
            if (this.props.successDelete !== prevProps.successDelete) {
                this.props.resetDeleteProduct();
                this.props.listProducts();
            }
        }
    }

    createHandler = () => {

        this.props.createProduct();
    };



    render() {



        const products = this.props.products;


        return (
            <>

                <Modal isOpen={this.state.modalLive}>
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLiveLabel">
                            Confirmation
                        </h5>
                        <button
                            aria-label="Close"
                            className="close"
                            type="button"
                            onClick={() => { this.setState({ modalLive: false }); this.setState({ product: '' }); }}
                        >
                            <span aria-hidden={true}>×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>Êtes-vous sûr de vouloir supprimer?</p>
                    </div>
                    <div className="modal-footer">
                        <Button
                            color="secondary"
                            type="button"
                            onClick={() => { this.setState({ modalLive: false });; this.setState({ product: '' }); }}
                        >
                            Fermer
                        </Button>
                        <Button
                            color="info"
                            type="button"
                            onClick={() => this.deleteHandler()}
                        >
                            Sauvegarder les modifications
                        </Button>
                    </div>
                </Modal>
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
                                    <div className='row justify-content-center' >
                                        <div className='container-left' style={{ padding: '0', marginBottom: '0', width: "1500px" }}>
                                            <div className="title-logo">

                                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                    <h2>Produits</h2>
                                                    <Button
                                                        type="button"
                                                        className="small"
                                                        color="info"
                                                        onClick={() => this.createHandler()}
                                                    >
                                                        Créer un produit

                                                    </Button>
                                                </div>

                                                {this.props.loadingDelete && <FadeLoader
                                                    color={"#2ca8ff"}
                                                    margin="2"
                                                    height="25"
                                                    width="4"
                                                    loading={true}
                                                />}
                                                {this.props.errorDelete && <Alert color="danger">{this.props.errorDelete}</Alert>}
                                                {this.props.loadingCreate && <FadeLoader
                                                    color={"#2ca8ff"}
                                                    margin="2"
                                                    height="25"
                                                    width="4"
                                                    loading={true}
                                                />}
                                                {this.props.errorCreate && <Alert color="danger">{this.props.errorCreate}</Alert>}

                                            </div>
                                        </div>
                                    </div>

                                    <div className='row justify-content-center'>
                                        <div className='container-left' style={{ width: "1500px" }}>


                                            <table className="table">
                                                <thead>
                                                    <tr>

                                                        <th>ID</th>
                                                        <th>NAME</th>
                                                        <th>PRIX</th>
                                                        <th>CATEGORY</th>
                                                        <th>MARQUE</th>
                                                        <th>ACTIONS</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {products.map((product) => (
                                                        <tr key={product.id}>
                                                            <td>{product.id}</td>
                                                            <td>{product.name}</td>
                                                            <td>{parseFloat(product.price).toFixed(2)} MAD</td>
                                                            <td>{product.category}</td>
                                                            <td>{product.brand}</td>
                                                            <td>
                                                                <Button
                                                                    type="button"
                                                                    className="small"
                                                                    onClick={() =>
                                                                        this.props.history.push(`/product/${product.id}/edit`)
                                                                    }
                                                                >
                                                                    Éditer
                                                                </Button>
                                                                <Button
                                                                    type="button"
                                                                    className="small"
                                                                    onClick={() => this.saveHandler(product)}
                                                                >
                                                                    Supprimer
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>



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
ProductList.propTypes = {
    listProducts: PropTypes.func.isRequired,
    createProduct: PropTypes.func.isRequired,
    deleteProduct: PropTypes.func.isRequired,
    resetDeleteProduct: PropTypes.func.isRequired,
    products: PropTypes.array,
    loading: PropTypes.bool,
    error: PropTypes.string,
    loadingCreate: PropTypes.bool,
    errorCreate: PropTypes.string,
    successCreate: PropTypes.bool,
    createdProduct: PropTypes.object,
    loadingDelete: PropTypes.bool,
    errorDelete: PropTypes.string,
    successDelete: PropTypes.bool,
}


const mapStateToProps = state => ({
    products: state.products.products,
    loading: state.products.loading,
    error: state.products.error,
    loadingCreate: state.productCreate.loading,
    errorCreate: state.productCreate.error,
    successCreate: state.productCreate.success,
    createdProduct: state.productCreate.product,
    loadingDelete: state.productDelete.loading,
    errorDelete: state.productDelete.error,
    successDelete: state.productDelete.success,
})



export default connect(mapStateToProps, { listProducts, createProduct, resetCreateProduct, deleteProduct, resetDeleteProduct })(ProductList);