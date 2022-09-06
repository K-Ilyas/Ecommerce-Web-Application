import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { connect } from 'react-redux';


// styles for this kit
import "assets/css/bootstrap.min.css";
import "assets/scss/now-ui-kit.scss";

// pages for this kit
import Home from "views/Home.js";
import LoginPage from "views/utilisateurs/LoginPage.js";
import RecoverPWD from "views/utilisateurs/RecoverPWD.js";
import AboutUs from "views/contact/AboutUs2.js";
import SignUp from 'views/utilisateurs/SignUp.js';
import ContactUs2 from 'views/contact/ContactUs2.js';
import ProductInfo from "views/product/ProductInfo";
import CartInfo from "views/cart/CartInfo";
import ShippingInfo from "views/shipping/ShippingInfo"
import PayementInfo from "views/payement/PayementInfo";
import PlaceOrderInfo from "views/placeorder/PlaceOrderInfo"
import OrderInfo from "views/order/OrderInfo"
import OrderHistory from "views/order/OrderHistory"
import ProfilePage from "views/utilisateurs/ProfilePage"
import PrivateRoute from "./components/Route/PrivateRoute"
import AdminRoute from "./components/Route/AdminRoute"
import ProductList from "views/product/ProductList";
import ProductEdit from "views/product/ProductEdit";
import OrderList from "views/order/OrderList";
import UserList from "views/utilisateurs/UserList";
import UserEdit from "views/utilisateurs/UserEdit";
import SearchInfo from "views/search/SearchInfo";



class App extends Component {

    constructor() {
        super();
        this.state = {
        }
    }

    static propTypes = {
    }

    componentDidMount() {
    }

    render() {

        return (
            < BrowserRouter >
                <Switch>
                    <Switch>
                        <Route path="/home" render={props => <Home {...props} />} />
                        <Route path="/about" render={props => <AboutUs {...props} />} />
                        <Route path="/login" render={props => <LoginPage {...props} />} />
                        <Route path="/signup" render={props => <SignUp {...props} />} />
                        <Route path="/search/:name?" render={props => <SearchInfo {...props} />} />
                        <Route path="/recover_password/:id" render={props => <RecoverPWD {...props} />} />
                        <AdminRoute path="/userlist" component={UserList}></AdminRoute>
                        <Route path="/shipping" render={props => <ShippingInfo {...props} />} />
                        <PrivateRoute path="/profile" component={ProfilePage}  ></PrivateRoute>
                        <AdminRoute path="/productlist" component={ProductList}></AdminRoute>
                        <AdminRoute path="/orderlist" component={OrderList}></AdminRoute>
                        <AdminRoute path="/user/:id/edit" component={UserEdit}></AdminRoute>
                        <Route path="/product/:id/edit" render={props => <ProductEdit {...props} />} />
                        <Route path="/payment" render={props => <PayementInfo {...props} />} />
                        <Route path="/placeorder" render={props => <PlaceOrderInfo {...props} />} />
                        <Route path="/order/:id" render={props => <OrderInfo {...props} />} />
                        <Route path="/orderhistory" render={props => <OrderHistory {...props} />} />
                        <Route path="/info/product/:id" render={props => <ProductInfo {...props} />} />
                        <Route path="/cart/:id?" render={props => <CartInfo {...props} />}></Route>
                        <Route path="/contact" render={props => <ContactUs2 {...props} />} />
                        <Redirect to="/home" />
                        <Redirect from="/" to="/home" />
                    </Switch>
                </Switch>
            </BrowserRouter>
        )

    }
}

const mapStateToProps = state => ({
})

export default connect(mapStateToProps, {})(App);
