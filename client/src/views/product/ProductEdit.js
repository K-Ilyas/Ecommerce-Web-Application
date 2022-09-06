import React, { Component } from 'react';
import $ from 'jquery';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import 'moment/locale/fr';
import { detailsProduct, updateProduct, resetUpdateProduct } from '../../redux/actions/productAction'

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

    CardBody,
    CardFooter,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
} from "reactstrap";

import Axios from 'axios';
import { FadeLoader } from 'react-spinners';
import Alert from 'reactstrap/lib/Alert';



class ProductEdit extends Component {
    constructor() {
        super();
        this.state = {
            modalEvaluation: false,
            modalLogin: false,
            errors: {},
            error_required: false,
            name: '',
            price: '',
            image: '',
            category: '',
            countInStock: '',
            brand: '',
            description: '',
            firstFocus: false,
            secondFocus: false,
            thirtFocus: false,
            fourtFocus: false,
            fifthFocus: false,
            sisqthFocus: false,
            seventhFocus: false,
            eightFocus: false,
            loadingUpload: false,
            errorUpload: '',

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
        this.props.detailsProduct(this.props.match.params.id);


    }

    uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('image', file);
        this.setState({ loadingUpload: true });
        try {
            const { data } = await Axios.post('/uploads/insert', bodyFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${this.props.userInfo.token}`,
                },
            });
            this.setState({ image: data });
            this.setState({ loadingUpload: false });
        } catch (error) {
            this.setState({ errorUpload: error.message });
            this.setState({ loadingUpload: false });
        }
    };




    deleteHandler = (e) => {
        // delete actio
    };
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }


    componentDidUpdate(prevProps) {

        const product = this.props.product;
        if (this.props.successUpdate) {
            this.props.resetUpdateProduct();
            this.props.history.push('/productlist');
        }
        if (product) {
            if (product !== prevProps.product) {

                this.setState({
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    category: product.category,
                    countInStock: product.countInStock,
                    brand: product.brand,
                    description: product.description
                })

            }
        }
        else {
            this.props.resetUpdateProduct();
            this.props.detailsProduct(this.props.match.params.id);
        }
    }

    createHandler = (e) => {


        e.preventDefault();
        const productId = this.props.match.params.id;
        this.props.updateProduct({
            id: productId,
            name: this.state.name,
            price: this.state.price,
            image: this.state.image,
            category: this.state.category,
            brand: this.state.brand,
            countInStock: this.state.countInStock,
            description: this.state.description
        });

    };




    render() {



        const product = this.props.product;
        const productId = this.props.match.params.id;


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
                                    <div className='row justify-content-center' >
                                        <div className='container-left' style={{ padding: '0', marginBottom: '0' }}>
                                            <div className="title-logo">

                                                <h2>Modifier le Produit  {productId}</h2>

                                            </div>
                                        </div>
                                    </div>
                                    <div className='row justify-content-center'>
                                        <div className='container-left'>
                                            <Form className="form"
                                            >

                                                {this.props.loadingUpdate && <FadeLoader
                                                    color={"#2ca8ff"}
                                                    margin="2"
                                                    height="25"
                                                    width="4"
                                                    loading={true}
                                                />}
                                                {this.props.errorUpdate && <Alert color="danger">
                                                    {this.props.errorUpdate}
                                                </Alert>}


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
                                                                <i className="fa fa-star-o"></i>
                                                            </InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input
                                                            placeholder="Enter Nom d'utilisateur..."
                                                            type="text"
                                                            id="name"
                                                            value={product.name}
                                                            name="name"
                                                            onFocus={() => this.setState({ firstFocus: true })}
                                                            onBlur={() => this.setState({ firstFocus: false })}
                                                            onChange={this.onChange}
                                                        ></Input>
                                                    </InputGroup>

                                                    <label htmlFor="price">Prix</label>

                                                    <InputGroup
                                                        className={
                                                            " input-lg" +
                                                            (this.state.secondFocus ? " input-group-focus" : "")
                                                        }
                                                    >
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText>
                                                                <i className="fa fa-star-o"></i>
                                                            </InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input
                                                            placeholder=" Enter Prix ..."
                                                            type="text"
                                                            value={product.price}
                                                            name="price"
                                                            id="price"
                                                            onFocus={() => this.setState({ secondFocus: true })}
                                                            onBlur={() => this.setState({ secondFocus: false })}
                                                            onChange={this.onChange}
                                                        ></Input>
                                                    </InputGroup>

                                                    <label htmlFor="image">Image</label>

                                                    <InputGroup
                                                        className={
                                                            " input-lg" +
                                                            (this.state.thirtFocus ? " input-group-focus" : "")
                                                        }
                                                    >
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText>
                                                                <i className="fa fa-star-o"></i>
                                                            </InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input
                                                            placeholder=" Enter Image ..."
                                                            type="text"
                                                            name="image"
                                                            id="image"
                                                            value={product.image}
                                                            onFocus={() => this.setState({ thirtFocus: true })}
                                                            onBlur={() => this.setState({ thirtFocus: false })}
                                                            onChange={this.onChange}
                                                        ></Input>
                                                    </InputGroup>


                                                    <label htmlFor="imageFile">Image File</label>

                                                    <InputGroup
                                                        className={
                                                            " input-lg" +
                                                            (this.state.eightFocus ? " input-group-focus" : "")
                                                        }
                                                    >

                                                        <Input
                                                            placeholder=" Enter Image ..."
                                                            type="file"
                                                            name="imageFile"
                                                            id="imageFile"

                                                            onFocus={() => this.setState({ eightFocus: true })}
                                                            onBlur={() => this.setState({ eightFocus: false })}
                                                            onChange={(e) => this.uploadFileHandler(e)}
                                                        ></Input>
                                                    </InputGroup>

                                                    <label htmlFor="category">Category</label>

                                                    <InputGroup
                                                        className={
                                                            " input-lg" +
                                                            (this.state.fourtFocus ? " input-group-focus" : "")
                                                        }
                                                    >
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText>
                                                                <i className="fa fa-star-o"></i>
                                                            </InputGroupText>
                                                        </InputGroupAddon>


                                                        <Input type="select"
                                                            placeholder="Enter Category ..."
                                                            name="category"
                                                            id="category"
                                                            value={product.category}
                                                            onFocus={() => this.setState({ fourtFocus: true })}
                                                            onBlur={() => this.setState({ fourtFocus: false })}
                                                            onChange={this.onChange}
                                                        >
                                                            {product.categories.map((x) => (
                                                                <option key={x.id} value={x.id}>
                                                                    {x.name}
                                                                </option>
                                                            ))}
                                                        </Input>
                                                    </InputGroup>



                                                    <label htmlFor="brand">Marque</label>

                                                    <InputGroup
                                                        className={
                                                            " input-lg" +
                                                            (this.state.fifthFocus ? " input-group-focus" : "")
                                                        }
                                                    >
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText>
                                                                <i className="fa fa-star-o"></i>
                                                            </InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input
                                                            placeholder="Enter Marque ..."
                                                            type="text"
                                                            name="brand"
                                                            id="brand"
                                                            value={product.brand}
                                                            onFocus={() => this.setState({ fifthFocus: true })}
                                                            onBlur={() => this.setState({ fifthFocus: false })}
                                                            onChange={this.onChange}
                                                        ></Input>
                                                    </InputGroup>

                                                    <label htmlFor="countInStock">Compter En Stock</label>

                                                    <InputGroup
                                                        className={
                                                            " input-lg" +
                                                            (this.state.sisqthFocus ? " input-group-focus" : "")
                                                        }
                                                    >
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText>
                                                                <i className="fa fa-star-o"></i>
                                                            </InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input
                                                            placeholder="Enter countInStock ..."
                                                            type="text"
                                                            name="countInStock"
                                                            id="countInStock"
                                                            value={product.countInStock}
                                                            onFocus={() => this.setState({ sisqthFocus: true })}
                                                            onBlur={() => this.setState({ sisqthFocus: false })}
                                                            onChange={this.onChange}
                                                        ></Input>
                                                    </InputGroup>

                                                    <label htmlFor="description">Description</label>

                                                    <InputGroup
                                                        className={
                                                            " input-lg" +
                                                            (this.state.seventhFocus ? " input-group-focus" : "")
                                                        }
                                                    >

                                                        <Input
                                                            placeholder="Enter countInStock ..."
                                                            type="textarea"
                                                            name="description"
                                                            id="description"
                                                            value={product.description}
                                                            onFocus={() => this.setState({ seventhFocus: true })}
                                                            onBlur={() => this.setState({ seventhFocus: false })}
                                                            onChange={this.onChange}
                                                        ></Input>
                                                    </InputGroup>

                                                </CardBody>
                                                {/* {this.state.error_required &&
                                                    <Alert color="danger">
                                                        Password et Confirm Password doit etre identique
                                            </Alert>
                                                } */}
                                                <CardFooter className="text-center" style={{ backgroundColor: 'white' }}>
                                                    <Button
                                                        block
                                                        className="btn-round"
                                                        onClick={(e) => this.createHandler(e)}
                                                        size="lg"
                                                        color="primary"
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
ProductEdit.propTypes = {
    detailsProduct: PropTypes.func.isRequired,
    updateProduct: PropTypes.func.isRequired,
    products: PropTypes.array,
    loading: PropTypes.bool,
    error: PropTypes.string,
    loadingUpdate: PropTypes.bool,
    errorUpdate: PropTypes.string,
    successUpdate: PropTypes.bool,
    userInfo: PropTypes.object
}


const mapStateToProps = state => ({
    product: state.product.product,
    loading: state.product.loading,
    error: state.product.error,
    loadingUpdate: state.productUpdate.loading,
    errorUpdate: state.productUpdate.error,
    successUpdate: state.productUpdate.success,
    userInfo: state.userSignin.userInfo,
});



export default connect(mapStateToProps, { detailsProduct, updateProduct, resetUpdateProduct })(ProductEdit);