import { combineReducers } from 'redux';
import productReducer from './productReducer';
import { productDetailsReducer, productCreateReducer, productUpdateReducer, productDeleteReducer,productReviewCreateReducer } from './productReducer'
import cartReducer from './cartReducer'
import userSigninReducer from './authReducer'
import { userRegisterReducer, userDetailsReducer, userUpdateProfileReducer,userListReducer,userDeleteReducer,userUpdateReducer } from './authReducer';
import {
    orderCreateReducer, orderDetailsReducer, orderPayReducer, orderMineListReducer, orderListReducer, orderDeleteReducer ,
    orderDeliverReducer
} from './orderReducer';


export default combineReducers({
    userSignin: userSigninReducer,
    products: productReducer,
    product: productDetailsReducer,
    cart: cartReducer,
    userRegister: userRegisterReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderMineList: orderMineListReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productDelete: productDeleteReducer,
    orderList: orderListReducer,
    orderDelete: orderDeleteReducer,
    orderDeliver: orderDeliverReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    productReviewCreate: productReviewCreateReducer,





});