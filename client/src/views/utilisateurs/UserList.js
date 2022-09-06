import React, { Component } from 'react';
import $ from 'jquery';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import 'moment/locale/fr';
import { listUsers, deleteUser, resetDeletedUser } from '../../redux/actions/authActions'

// core components
import LandingPageHeader from "components/Headers/SmallHeader.js";
import DefaultFooter from "components/Footers/DefaultFooter";


import {
    Button,
    Modal,
} from "reactstrap";

import './../../assets/css/pagesStyle/homePage/home.css';
import './../../assets/css/pagesStyle/info/schoolInfo.css';



import { FadeLoader } from 'react-spinners';
import Alert from 'reactstrap/lib/Alert';



class UserList extends Component {
    constructor() {
        super();
        this.state = {
            modalEvaluation: false,
            modalLogin: false,
            errors: {},
            error_required: false,
            modalLive: false,
            user: ''
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
        this.props.listUsers();

    }


    saveHandler = (user) => {
        // delete action

        this.setState({ modalLive: true });
        this.setState({ user: user });

    };

    deleteHandler = async () => {
        // delete action



        this.props.deleteUser(this.state.user.id);
        this.setState({
            modalLive: false,
            user: null
        });

    };

    componentDidUpdate(prevProps) {

        if (this.props.successDelete) {
            if (this.props.successDelete !== prevProps.successDelete) {
                this.props.resetDeletedUser();
                this.props.listUsers()
            }
        }
    }

    createHandler = () => {

    };



    render() {





        const users = this.props.users;


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
                                                    <h2>Utilisateurs</h2>
                                                </div>


                                                {this.props.loadingDelete && <FadeLoader
                                                    color={"#2ca8ff"}
                                                    margin="2"
                                                    height="25"
                                                    width="4"
                                                    loading={true}
                                                />}
                                                {this.props.errorDelete && <Alert color="danger">{this.props.errorDelete}</Alert>}


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
                                                        <th>EMAIL</th>
                                                        <th>IS SELLER</th>
                                                        <th>IS ADMIN</th>
                                                        <th>ACTIONS</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {users.map((user) => (
                                                        <tr key={user.id}>
                                                            <td>{user.id}</td>
                                                            <td>{user.name}</td>
                                                            <td>{user.email}</td>
                                                            <td>{user.isSeller ? 'YES' : ' NO'}</td>
                                                            <td>{user.isAdmin ? 'YES' : 'NO'}</td>
                                                            <td>
                                                                <Button
                                                                    type="button"
                                                                    className="small"
                                                                    onClick={() =>
                                                                        this.props.history.push(`/user/${user.id}/edit`)
                                                                    }
                                                                >
                                                                    Éditer
                                                                </Button>
                                                                <Button
                                                                    type="button"
                                                                    className="small"
                                                                    onClick={() => this.saveHandler(user)}
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
UserList.propTypes = {
    listUsers: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired,
    resetDeletedUser: PropTypes.func.isRequired,
    products: PropTypes.array,
    loading: PropTypes.bool,
    error: PropTypes.string
}

const mapStateToProps = state => ({
    users: state.userList.users,
    loading: state.userList.loading,
    error: state.userList.error,
    loadingDelete: state.userDelete.loading,
    errorDelete: state.userDelete.error,
    successDelete: state.userDelete.success
});

export default connect(mapStateToProps, { listUsers, deleteUser, resetDeletedUser })(UserList);