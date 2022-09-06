import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { signout } from '../../redux/actions/authActions';




// reactstrap components
import {
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

// Style
import '../../assets/css/pagesStyle/homePage/navbar.css'

class IndexNavbar extends Component {
  constructor() {
    super();
    this.state = {
      navbarColor: "navbar-transparent",
      collapseOpen: false
    };
  }

  static propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  }

  componentDidMount() {
    window.addEventListener("scroll", this.updateNavbarColor);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.updateNavbarColor);
  }

  logout = (e) => {
    e.preventDefault();
    // Logout user
    this.props.signout();
    this.props.history.push('/home');
  }

  updateNavbarColor = () => {
    if (
      document.documentElement.scrollTop > 399 ||
      document.body.scrollTop > 399
    ) {
      this.setState({ navbarColor: "" });
    } else if (
      document.documentElement.scrollTop < 400 ||
      document.body.scrollTop < 400
    ) {
      this.setState({ navbarColor: "navbar-transparent" });
    }
  };

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
        <Navbar className={"fixed-top " + this.state.navbarColor} expand="lg" color="info">
          <Container>
            <div className="navbar-translate">
              <NavbarBrand
                href="/home"
                id="navbar-brand"
                style={{ fontSize: '1rem' }}
              >
                LOGO
              </NavbarBrand>
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
                {/* 
                <NavItem>
                  <NavLink
                    to="/actualité"
                    tag={Link}
                    style={{ fontSize: '0.7rem' }}
                  >
                    <i className="now-ui-icons education_hat"></i>
                    <p>Actualités</p>
                  </NavLink>
                </NavItem> */}

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
      </>
    );
  }
}

IndexNavbar.propTypes = {
  userInfo: PropTypes.object
}


const mapStateToProps = state => ({
  cart: state.cart,
  userInfo: state.userSignin,
})

export default withRouter(connect(mapStateToProps, { signout })(IndexNavbar));
