import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import Autosuggest from 'react-autosuggest';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { signout } from '../../redux/actions/authActions';
import $ from 'jquery';


import './../../assets/css/pagesStyle/hollandTest/SmallHeader.css'
import '../../assets/css/pagesStyle/homePage/navbar.css'


// reactstrap components
import {
    Row,
    Col,
    Collapse,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    NavbarBrand,
    Navbar,
    NavItem,
    NavLink,
    Nav,
    Container
} from "reactstrap";

// core components


class LandingPageHeader extends Component {
    constructor() {
        super();
        this.state = {
            navbarColor: "",
            collapseOpen: false,
            value: '',
            suggestions: [],
            searchSuggestions: []
        };
    }



    componentDidMount() {
        window.addEventListener("scroll", this.updateNavbarColor);
        let Products = [];
        fetch('/pro/products')
            .then(res => res.json())
            .then(res => {
                // Établissements
                for (let i = 0; i < res.length; i++) {
                    Products.push(
                        {
                            id: res[i].id,
                            name: res[i].name,
                            searchType: "Produits"
                        }
                    );
                }

            });
        let searchSuggestions = [];
        searchSuggestions.push({
            title: "Produits",
            searchSuggestions: Products
        });

        let Categories = [];

        fetch('/categories')
            .then(res => res.json())
            .then(res => {
                // Établissements
                for (let i = 0; i < res.length; i++) {
                    Categories.push(
                        {
                            id: res[i].id,
                            name: res[i].name,
                            searchType: "Categories"
                        }
                    );
                }

            });
        searchSuggestions.push({
            title: "Categories",
            searchSuggestions: Categories
        });
        this.setState({ searchSuggestions: searchSuggestions });



    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.updateScroll);
        window.removeEventListener("scroll", this.updateNavbarColor);
    }


    logout = (e) => {
        e.preventDefault();
        // Logout user
        this.props.signout();
        this.props.history.push('/home');
    }


    getSuggestions = value => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0 ? [] : this.state.searchSuggestions
            .map(section => {
                return {
                    title: section.title,
                    searchSuggestions: section.searchSuggestions.filter(suggest => suggest.name.toLowerCase().slice(0, inputLength) === inputValue)
                };
            })
            .filter(section => section.searchSuggestions.length > 0);
    };

    getSuggestionValue = suggestion => suggestion.name;

    renderSuggestion = suggestion => (
        <div>
            {suggestion.name}
        </div>
    );

    getSectionSuggestions = (section) => {
        return section.searchSuggestions;
    }

    renderSectionTitle = (section) => {
        return <strong>{section.title}</strong>;
    }

    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
    };

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    onSuggestionSelected = (event, { suggestion, suggestionValue, index, method }) => {
        event.preventDefault();
        if (suggestion.searchType === "Produits")
            this.props.history.push(`/search/name?productId=${suggestion.id}`);
        else if (suggestion.searchType === "Categories")
            this.props.history.push(`/search/name?category=${suggestion.id}`);
        window.location.reload(false);
    }


    search = (e) => {

        e.preventDefault();
        const inputValue = this.state.value.trim().toLowerCase();
        const inputLength = inputValue.length;
        if (inputLength !== 0) {
            let result = (this.state.searchSuggestions
                .map(section => {
                    return {
                        title: section.title,
                        searchSuggestions: section.searchSuggestions.filter(suggest => suggest.name.toLowerCase() === inputValue)
                    };
                })
                .filter(section => section.searchSuggestions.length > 0));
            if (result.length !== 0) {
                result = (result[0].searchSuggestions[0]);

                if (result.searchType === "Produits")
                    this.props.history.push(`/search/name?productId=${result.id}`);
                else if (result.searchType === "Categories")
                    this.props.history.push(`/search/name?category=${result.id}`);

                window.location.reload(false)
            }
            else {
                this.props.history.push(`/search/${inputValue}`);
                window.location.reload(false)
            }
        }
    }



    render() {
        const { cartItems } = this.props.cart;
        const { userInfo } = this.props.userInfo;

        return (
            <>
                {this.state.collapseOpen ? (
                    <div
                        id="bodyClick"
                        onClick={() => {
                            document.documentElement.classList.toggle("nav-open");
                            this.setState({ collapseOpen: false });
                        }}
                    />
                ) : null}
                <div className="add-margin"></div>
                <Navbar className={this.state.navbarColor} style={{ marginBottom: '0' }} expand="lg" color="info">
                    <Container>
                        <div className="navbar-translate">
                            <NavbarBrand
                                href="/home"
                                id="navbar-brand"
                                style={{ fontSize: '1rem' }}
                            >
                                LOGO
                            </NavbarBrand>
                            <div className="search-navbar"><button onClick={() => { $(".page-header-small-hide").toggle() }} ><i className="now-ui-icons ui-1_zoom-bold"></i></button></div>
                            <button
                                className="navbar-toggler navbar-toggler"
                                onClick={() => {
                                    document.documentElement.classList.toggle("nav-open");
                                    this.setState({ collapseOpen: !this.state.collapseOpen });
                                }}
                                aria-expanded={this.state.collapseOpen}
                                type="button"
                            >
                                <span className="navbar-toggler-bar top-bar"></span>
                                <span className="navbar-toggler-bar middle-bar"></span>
                                <span className="navbar-toggler-bar bottom-bar"></span>
                            </button>
                        </div>

                        <Collapse
                            className="justify-content-end"
                            isOpen={this.state.collapseOpen}
                            navbar
                        >
                            <Nav navbar>


                                <NavItem>
                                    <NavLink
                                        to="/cart"
                                        tag={Link}
                                        style={{ fontSize: '0.7rem' }}
                                    >


                                        <i className="now-ui-icons shopping_cart-simple"></i>
                                        <p >  Cart
                                            {cartItems.length > 0 && (
                                                <React.Fragment> <span className="badge badge-danger">{cartItems.length}</span></React.Fragment>
                                            )}
                                        </p>
                                    </NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink
                                        to="/about"
                                        tag={Link}
                                        style={{ fontSize: '0.7rem' }}
                                    >
                                        <p>About Us</p>
                                    </NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink
                                        to="/contact"
                                        tag={Link}
                                        style={{ fontSize: '0.7rem' }}
                                    >
                                        <p>Contact</p>
                                    </NavLink>
                                </NavItem>

                                {(!userInfo) ?
                                    <NavItem>
                                        <NavLink
                                            href="/login"
                                            style={{ fontSize: '0.7rem', backgroundColor: "#2CA8FF", borderRadius: "5px" }}
                                        >
                                            <p>login</p>
                                        </NavLink>
                                    </NavItem>
                                    :
                                    <UncontrolledDropdown nav>
                                        <DropdownToggle
                                            caret
                                            color="default"
                                            href="#pablo"
                                            nav
                                            onClick={e => e.preventDefault()}
                                            style={{ fontSize: '0.7rem' }}
                                        >
                                            <p> {userInfo ? userInfo.name : ''} </p>
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem
                                                style={{ fontSize: '0.7rem' }}
                                                to="/profile"
                                                tag={Link}>
                                                <i className="now-ui-icons users_single-02 mr-1"></i>
                                                Profile
                                            </DropdownItem>
                                            <DropdownItem
                                                style={{ fontSize: '0.7rem' }}
                                                to="/orderhistory"
                                                tag={Link}>
                                                <i className="now-ui-icons shopping_bag-16"></i>
                                                Order History
                                            </DropdownItem>
                                            <DropdownItem
                                                style={{ fontSize: '0.7rem' }}
                                                href=""
                                                onClick={this.logout}
                                            >
                                                <i className="now-ui-icons media-1_button-power mr-1"></i>
                                                LOGOUT
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                }

                                {userInfo && userInfo.isAdmin ?

                                    <UncontrolledDropdown nav>
                                        <DropdownToggle
                                            caret
                                            color="default"
                                            href="#pablo"
                                            nav
                                            onClick={e => e.preventDefault()}
                                            style={{ fontSize: '0.7rem' }}
                                        >
                                            <p> Admin </p>
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem
                                                style={{ fontSize: '0.7rem' }}
                                                to="/dashboard"
                                                tag={Link}>
                                                <i className="now-ui-icons ui-1_settings-gear-63"></i>
                                                Dashboard
                                            </DropdownItem>
                                            <DropdownItem
                                                style={{ fontSize: '0.7rem' }}
                                                to="/productlist"
                                                tag={Link}>
                                                <i className="now-ui-icons shopping_box"></i>
                                                Products
                                            </DropdownItem>

                                            <DropdownItem
                                                style={{ fontSize: '0.7rem' }}
                                                to="/orderlist"
                                                tag={Link}>
                                                <i className="now-ui-icons shopping_bag-16"></i>
                                                Orders
                                            </DropdownItem>
                                            <DropdownItem
                                                style={{ fontSize: '0.7rem' }}
                                                to="/userlist"
                                                tag={Link}>
                                                <i className="now-ui-icons users_circle-08 mr-1"></i>
                                                Users
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                    : null
                                }

                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>

                <div className="page-header page-header-small clear-filter " filter-color="blue">
                    <div className="page-header-image page-header-image-small"></div>
                    <div className="container small-header">
                        <div className="small-header-form">
                            {/* start search section */}
                            <Row>
                                <Col lg='12' sm='12'>
                                    <form className="search-form">
                                        <Row>



                                            <Col sm='12' md='12' lg='8'>
                                                <div className="textSearch-container remove-col-margin">
                                                    <i className="fas fa-search search-logo" style={{ color: 'rgb(150, 150, 150)' }}></i>
                                                    <Autosuggest
                                                        suggestions={this.state.suggestions}
                                                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                                        getSuggestionValue={this.getSuggestionValue}
                                                        multiSection={true}
                                                        renderSuggestion={this.renderSuggestion}
                                                        getSectionSuggestions={this.getSectionSuggestions}
                                                        renderSectionTitle={this.renderSectionTitle}
                                                        onSuggestionSelected={this.onSuggestionSelected}
                                                        inputProps={{
                                                            placeholder: 'Produits , Categories, ...',
                                                            value: this.state.value,
                                                            onChange: this.onChange
                                                        }}
                                                    />

                                                </div>
                                            </Col>
                                            <Col sm='12' md='3' lg='4'>
                                                <button type="submit" className="btn btn-primary btn-block text-white btn-search" onClick={(e) => this.search(e)}>RECHERCHE</button>
                                            </Col>

                                        </Row>

                                    </form>
                                </Col>
                            </Row>

                        </div>
                    </div>
                </div>
            </>
        );
    }
}

LandingPageHeader.propTypes = {
    userInfo: PropTypes.object
}

const mapStateToProps = state => ({
    userInfo: state.userSignin,
    cart: state.cart

})

export default withRouter(connect(mapStateToProps, { signout })(LandingPageHeader));