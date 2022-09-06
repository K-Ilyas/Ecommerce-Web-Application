import React, { Component } from 'react';
import $ from 'jquery';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import 'moment/locale/fr';
import { detailsUser, updateUser, resetUpdatedUser } from '../../redux/actions/authActions'

// core components
import LandingPageHeader from "components/Headers/SmallHeader.js";
import DefaultFooter from "components/Footers/DefaultFooter";



import './../../assets/css/pagesStyle/homePage/home.css';
import './../../assets/css/pagesStyle/info/schoolInfo.css';

// reactstrap components
import {
    FormGroup,
    CardBody,
    CardFooter,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
} from "reactstrap";

import { FadeLoader } from 'react-spinners';
import Alert from 'reactstrap/lib/Alert';
import Button from 'reactstrap/lib/Button';
import Label from 'reactstrap/lib/Label';




class UserEdit extends Component {
    constructor() {
        super();
        this.state = {
            modalEvaluation: false,
            modalLogin: false,
            errors: {},
            firstFocus: false,
            secondFocus: false,
            thirtFocus: false,
            fourtFocus: false,
            name: '',
            email: '',
            isAdmin: false,
            isSeller: false,
            error_required: false,
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
        this.props.resetUpdatedUser();
        this.props.detailsUser(this.props.match.params.id);
    }
    componentDidUpdate(prevProps) {
        const user = this.props.user;
        if (this.props.successUpdate) {
            this.props.resetUpdatedUser();
            this.props.history.push('/userlist');
        }
        if (user) {
            if (user !== prevProps.user) {

                this.setState({
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    isSeller: user.isSeller
                })

            }
        }
        else {
            this.props.resetUpdatedUser();
            this.props.detailsUser(this.props.match.params.id);
        }
    }


    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    submitHandler = (e) => {
        e.preventDefault();
        const user = this.props.user;
        this.props.updateUser({ id: user.id, name: this.state.name, email: this.state.email, isAdmin: this.state.isAdmin, isSeller: this.state.isSeller });
    };




    render() {



        const user = this.props.user;



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


                                    <div className='row justify-content-center'>
                                        <div className='container-left' >
                                            <Form className="form"
                                            >
                                                <h2 style={{ fontSize: '22px', textDecoration: 'underline' }}>Utilisateur {user.id}</h2>




                                                {this.props.loadingUpdate && <FadeLoader
                                                    color={"#2ca8ff"}
                                                    margin="2"
                                                    height="25"
                                                    width="4"
                                                    loading={true}
                                                />}
                                                {this.props.errorUpdate && (
                                                    <Alert color="danger">
                                                        {this.props.errorUpdate}</Alert>
                                                )}


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
                                                                <i className="fa fa-user"></i>
                                                            </InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input
                                                            placeholder="Enter Nom d'utilisateur..."
                                                            type="text"
                                                            id="name"
                                                            value={user.name}
                                                            name="name"
                                                            onFocus={() => this.setState({ firstFocus: true })}
                                                            onBlur={() => this.setState({ firstFocus: false })}
                                                            onChange={this.onChange}
                                                        ></Input>
                                                    </InputGroup>

                                                    <label htmlFor="email">E-mail</label>

                                                    <InputGroup
                                                        className={
                                                            " input-lg" +
                                                            (this.state.secondFocus ? " input-group-focus" : "")
                                                        }
                                                    >
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText>
                                                                <i className="fa fa-envelope"></i>
                                                            </InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input
                                                            placeholder=" Enter E-mail ..."
                                                            type="text"
                                                            value={user.email}
                                                            name="email"
                                                            id="email"
                                                            onFocus={() => this.setState({ secondFocus: true })}
                                                            onBlur={() => this.setState({ secondFocus: false })}
                                                            onChange={this.onChange}
                                                        ></Input>
                                                    </InputGroup>

                                                    <FormGroup check>
                                                        <Label check>
                                                            <Input
                                                                id="isSeller"
                                                                type="checkbox"
                                                                checked={this.state.isAdmin}
                                                                onChange={(e) => this.setState({ isAdmin: e.target.checked })}
                                                            ></Input>
                                                            isAdmin
                                                            <span className="form-check-sign">
                                                                <span className="check"></span>
                                                            </span>
                                                        </Label>
                                                    </FormGroup>


                                                    <FormGroup check>
                                                        <Label check>
                                                            <Input
                                                                id="isSeller"
                                                                type="checkbox"
                                                                checked={this.state.isSeller}
                                                                onChange={(e) => this.setState({ isSeller: e.target.checked })}
                                                            ></Input>
                                                            isSeller
                                                            <span className="form-check-sign">
                                                                <span className="check"></span>
                                                            </span>
                                                        </Label>
                                                    </FormGroup>


                                                </CardBody>

                                                <CardFooter className="text-center" style={{ backgroundColor: 'white' }}>
                                                    <Button
                                                        block
                                                        className="btn-round"
                                                        color="primary"
                                                        href="#pablo"
                                                        onClick={this.submitHandler}
                                                        size="lg"
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
UserEdit.propTypes = {
    updateUser: PropTypes.func.isRequired,
    detailsUser: PropTypes.func.isRequired,
    resetUpdatedUser: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    error: PropTypes.string,
    user: PropTypes.object,
    successUpdate: PropTypes.bool,
    errorUpdate: PropTypes.string,
    loadingUpdate: PropTypes.bool

}


const mapStateToProps = state => ({
    loading: state.userDetails.loading,
    error: state.userDetails.error,
    user: state.userDetails.user,
    successUpdate: state.userUpdate.success,
    errorUpdate: state.userUpdate.error,
    loadingUpdate: state.userUpdate.loading,
})



export default connect(mapStateToProps, { detailsUser, updateUser, resetUpdatedUser })(UserEdit);