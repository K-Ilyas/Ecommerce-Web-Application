import React, { Component } from 'react';
import $ from 'jquery';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import 'moment/locale/fr';
import { listOrderMine } from '../../redux/actions/orderAction'

// core components
import LandingPageHeader from "components/Headers/SmallHeader.js";
import DefaultFooter from "components/Footers/DefaultFooter";


import {
    Button,

} from "reactstrap";

import './../../assets/css/pagesStyle/homePage/home.css';
import './../../assets/css/pagesStyle/info/schoolInfo.css';

// reactstrap components


import { FadeLoader } from 'react-spinners';
import Alert from 'reactstrap/lib/Alert';



class OrderHistory extends Component {
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

        this.props.listOrderMine();



    }


    componentDidUpdate(props) {


    }



    checkoutHandler = (e) => {
        // delete action
        e.preventDefault();


    };



    render() {


        const orders = this.props.orders;


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
                                        <div className='container-left' style={{ padding: '0', marginBottom: '0', width: "1500px" }}>
                                            <div className="title-logo">
                                                <h2>Ordre History</h2>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='row justify-content-center'>
                                        <div className='container-left' style={{ width: "1500px" }}>


                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>ID</th>
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
OrderHistory.propTypes = {
    listOrderMine: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    error: PropTypes.string,
    order: PropTypes.object,

}


const mapStateToProps = state => ({
    loading: state.orderMineList.loading,
    error: state.orderMineList.error,
    orders: state.orderMineList.orders
})



export default connect(mapStateToProps, { listOrderMine })(OrderHistory);