import React, { Component } from "react";
import { listProducts } from '../../redux/actions/productAction';
import PropTypes from 'prop-types';

// reactstrap components
import {
    Pagination,
    PaginationItem,
    PaginationLink
} from "reactstrap";

// core components
import DefaultFooter from "components/Footers/DefaultFooter";
import Product from "components/products/Product"
import { FadeLoader } from "react-spinners";
import Alert from "reactstrap/lib/Alert";
import { connect } from "react-redux";
import Row from "reactstrap/lib/Row";
import Col from "reactstrap/lib/Col";
import SmallHeader from "components/Headers/SmallHeader";



// sections for this page


class SearchInfo extends Component {

    constructor() {
        super();
        this.state = {

            lengthList: 0,
            startPage: 0,
            endPage: 0,
            currentPage: 0,
            pagesCount: 1,
        }
        this.pageSize = 6;
    }

    componentDidMount() {


        // Change bootsrap class on window resize



        const name = this.props.location.search.split('=')[0];
        const value = this.props.location.search.split('=')[1];
        const product = this.props.match.params.name;
        if (name === '?productId')
            this.props.listProducts('', value, '');
        else if (name === '?category')
            this.props.listProducts('', '', value);
        else
            this.props.listProducts(product);


    }
    componentWillUnmount() {
    }



    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    handleClick = (e, index) => {
        e.preventDefault();
        this.setState({
            currentPage: index,
            startPage: (index * this.pageSize) + 1,
            endPage: ((index + 1) * this.pageSize)
        });
    }


    componentDidUpdate(prevProps) {
        if (this.props.products) {
            if (this.props.products !== prevProps.products) {
                this.setState({ lengthList: this.props.products.length });
                this.setState({ pagesCount: Math.ceil(this.props.products.length / this.pageSize) });
                this.setState({ startPage: (this.state.currentPage * this.pageSize) + 1 })
                this.setState({ endPage: ((this.state.currentPage + 1) * this.pageSize) })
            }
        }
    }


    render() {
        return (
            <>
                <SmallHeader />
                <div className="main">
                    <div className='row mainContainer' >
                        <div className='col col-LR-width' style={{ width: "1000px" }}>
                            <div className="row justify-content-center" style={{ width: "1000px" }}>
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
                                        </Alert>) :
                                    this.props.products.length === 0 ?
                                        <div className='row justify-content-end'>
                                            <div className='container-left schoolList'>
                                                <Row>
                                                    <Col>
                                                        <p className="card-discription">Aucun produit ne correspond a votre rechreche</p>
                                                    </Col>
                                                </Row>

                                            </div>
                                        </div> :


                                        this.props.products.slice(this.state.currentPage * this.pageSize, (this.state.currentPage + 1) * this.pageSize).map((product) => (

                                            <Product key={product.id} product={product} >

                                            </Product>
                                        ))

                                }

                            </div>

                            <div className='row justify-content-center' style={{ marginTop: "30px", marginBottom: "60px" }}>
                                <div>
                                    <p style={{ fontSize: "13px" }}>Affichage de {this.state.startPage}-{this.state.endPage} sur {this.state.lengthList} resultats</p>
                                    <Pagination>
                                        <PaginationItem disabled={this.state.currentPage <= 0}>
                                            <PaginationLink
                                                aria-label="Previous"
                                                onClick={e => this.handleClick(e, this.state.currentPage - 1)}
                                            >
                                                <span aria-hidden={true}>
                                                    <i
                                                        aria-hidden={true}
                                                        className="fa fa-angle-double-left"
                                                    ></i>
                                                </span>
                                            </PaginationLink>
                                        </PaginationItem>

                                        {[...Array(this.state.pagesCount)].map((page, i) =>
                                            <PaginationItem active={i === this.state.currentPage} key={i}>
                                                <PaginationLink
                                                    onClick={e => this.handleClick(e, i)}
                                                >
                                                    {i + 1}
                                                </PaginationLink>
                                            </PaginationItem>
                                        )}

                                        <PaginationItem disabled={this.state.currentPage >= this.state.pagesCount - 1}>
                                            <PaginationLink
                                                aria-label="Next"
                                                onClick={e => this.handleClick(e, this.state.currentPage + 1)}
                                            >
                                                <span aria-hidden={true}>
                                                    <i
                                                        aria-hidden={true}
                                                        className="fa fa-angle-double-right"
                                                    ></i>
                                                </span>
                                            </PaginationLink>
                                        </PaginationItem>
                                    </Pagination>
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

SearchInfo.propTypes = {
    listProducts: PropTypes.func.isRequired,
    products: PropTypes.array,
    loading: PropTypes.bool,
    error: PropTypes.string
}

const mapStateToprops = state => ({
    products: state.products.products,
    loading: state.products.loading,
    error: state.products.error

})


export default connect(mapStateToprops, { listProducts })(SearchInfo)