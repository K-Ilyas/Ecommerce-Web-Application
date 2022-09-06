import React, { Component } from 'react';
import $ from 'jquery';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import 'moment/locale/fr';
import { listOrders, deleteOrder, resetDeletedOrder } from '../../redux/actions/orderAction'

// core components
import LandingPageHeader from "components/Headers/SmallHeader.js";
import DefaultFooter from "components/Footers/DefaultFooter";


import {
    Button,
    Modal,
} from "reactstrap";

import './../../assets/css/pagesStyle/homePage/home.css';
import './../../assets/css/pagesStyle/info/schoolInfo.css';

// reactstrap components



import { FadeLoader } from 'react-spinners';
import Alert from 'reactstrap/lib/Alert';


class OrderList extends Component {
    constructor() {
        super();
        this.state = {
            modalEvaluation: false,
            modalLogin: false,
            errors: {},
            error_required: false,
            sdkReady: false,
            modalLive: false,
            order: ''
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
        this.props.listOrders();
    }


    saveHandler = (order) => {
        // delete action
        this.setState({ modalLive: true });
        this.setState({ order: order });

    };

    deleteHandler = async () => {
        // delete action
        this.props.deleteOrder(this.state.order.id);
        this.setState({
            modalLive: false,
            order: null
        });

    };

    componentWillUnmount() {
        this.props.resetDeletedOrder();
    }


    componentDidUpdate(prevProps) {
        if (this.props.successDelete !== prevProps.successDelete) {
            this.props.resetDeletedOrder();
            this.props.listOrders();
        }
    }




    render() {


        const orders = this.props.orders;


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
                            onClick={() => { this.setState({ modalLive: false }); this.setState({ order: '' }); }}
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
                            onClick={() => { this.setState({ modalLive: false });; this.setState({ order: '' }); }}
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
                                        <div className='container-left' style={{ padding: '0', marginBottom: '0', width: "1800px" }}>
                                            <div className="title-logo">

                                                <h2>Orders</h2>


                                                {
                                                    this.props.loadingDelete && <FadeLoader
                                                        color={"#2ca8ff"}
                                                        margin="2"
                                                        height="25"
                                                        width="4"
                                                        loading={true}
                                                    />
                                                }
                                                {this.props.errorDelete && <Alert color="danger">{this.props.errorDelete}</Alert>}


                                            </div>
                                        </div>
                                    </div>

                                    <div className='row justify-content-center'>
                                        <div className='container-left' style={{ width: "1800px" }}>


                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>USER</th>
                                                        <th>DATE</th>
                                                        <th>TOTAL</th>
                                                        <th>PAYÉ</th>
                                                        <th>LIVRÉ</th>
                                                        <th>ACTIONS</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {orders.map((order) => (
                                                        <tr key={order.id}>
                                                            <td>{order.id}</td>
                                                            <td>{order.user.name}</td>
                                                            <td>{order.createdAt}</td>
                                                            <td>{parseFloat(order.totalPrice).toFixed(2)} MAD</td>
                                                            <td>{order.isPaid ? order.paidAt : 'No'}</td>
                                                            <td>
                                                                {order.isDelivered
                                                                    ? order.deliveredAt
                                                                    : 'No'}
                                                            </td>
                                                            <td>
                                                                <Button
                                                                    type="button"
                                                                    className="small"
                                                                    onClick={() => {
                                                                        this.props.history.push(`/order/${order.id}`);
                                                                    }}
                                                                >
                                                                    Détails
                                                                </Button>
                                                                <Button
                                                                    type="button"
                                                                    className="small"
                                                                    onClick={() => this.saveHandler(order)}
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
OrderList.propTypes = {
    listOrders: PropTypes.func.isRequired,
    deleteOrder: PropTypes.func.isRequired,
    resetDeletedOrder: PropTypes.func.isRequired,
    orders: PropTypes.array,
    loading: PropTypes.bool,
    error: PropTypes.string,
    loadingDelete: PropTypes.bool,
    errorDelete: PropTypes.string,
    successDelete: PropTypes.bool
}


const mapStateToProps = state => ({
    orders: state.orderList.orders,
    loading: state.orderList.loading,
    error: state.orderList.error,
    loadingDelete: state.orderDelete.loading,
    errorDelete: state.orderDelete.error,
    successDelete: state.orderDelete.success
});



export default connect(mapStateToProps, { listOrders, deleteOrder, resetDeletedOrder })(OrderList);