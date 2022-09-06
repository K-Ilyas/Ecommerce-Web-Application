import React, { Component } from "react";
import './../assets/css/pagesStyle/homePage/home.css';
import $ from 'jquery';
import { listProducts } from '../redux/actions/productAction';
import PropTypes from 'prop-types';

// reactstrap components
import {
  Modal,
  ModalBody,
  Pagination,
  PaginationItem,
  PaginationLink
} from "reactstrap";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import IndexHeader from "components/Headers/IndexHeader.js";
import DefaultFooter from "components/Footers/DefaultFooter";
import Product from "components/products/Product"
import { FadeLoader } from "react-spinners";
import Alert from "reactstrap/lib/Alert";
import { connect } from "react-redux";
import Row from "reactstrap/lib/Row";
import Col from "reactstrap/lib/Col";



// sections for this page


class Home extends Component {

  constructor() {
    super();
    this.state = {
      emailNewsLetter: "",
      modalSuccess: false,
      modalFail: false,
      lengthList: 0,
      startPage: 0,
      endPage: 0,
      currentPage: 0,
      pagesCount: 1,
    }
    this.pageSize = 6;
  }

  componentDidMount() {
    document.body.classList.add("index-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;

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

    // Change color on hover
    $(document).ready(function () {
      $("#tanger").hover(function () {
        $("#Tanger-Tetouan-AlHoceima").toggleClass("hoverRegion");
      });
      $("#rabat").hover(function () {
        $("#Rabat-Sale-Kenitra").toggleClass("hoverRegion");
      });
      $("#fes").hover(function () {
        $("#Fes-Meknes").toggleClass("hoverRegion");
      });
      $("#casablanca").hover(function () {
        $("#Casablanca-Settat").toggleClass("hoverRegion");
      });
      $("#souss").hover(function () {
        $("#Souss-Massa").toggleClass("hoverRegion");
      });
      $("#oriental").hover(function () {
        $("#LOriental").toggleClass("hoverRegion");
      });
      $("#benimellal").hover(function () {
        $("#BeniMellal-Khenifra").toggleClass("hoverRegion");
      });
      $("#marrakesh").hover(function () {
        $("#Marrakesh-Safi").toggleClass("hoverRegion");
      });
      $("#dakhla").hover(function () {
        $("#Dakhla-OuedEdDahab").toggleClass("hoverRegion");
      });
      $("#guelmim").hover(function () {
        $("#Guelmim-OuedNoun").toggleClass("hoverRegion");
      });
      $("#laayoune").hover(function () {
        $("#Laayoune-SakiaElHamra").toggleClass("hoverRegion");
      });
      $("#draa").hover(function () {
        $("#Draa-Tafilalet").toggleClass("hoverRegion");
      });
    });
    this.props.listProducts();


  }

  componentWillUnmount() {
    document.body.classList.remove("index-page");
    document.body.classList.remove("sidebar-collapse");
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

  clickNewsLater = () => {
    if (this.state.emailNewsLetter.length !== 0) {
      fetch('/Email/NewsLetter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: this.state.emailNewsLetter })
      })
        .then(res => res.json())
        .then(res => {
          if (res.msg === "success") {
            this.setState({ emailNewsLetter: "", modalSuccess: true });
          } else {
            this.setState({ emailNewsLetter: "", modalFail: true });
          }
        })
    }
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
        <Modal
          modalClassName="modal-mini modal-success"
          toggle={() => this.setState({ modalSuccess: false })}
          isOpen={this.state.modalSuccess}
          style={{
            position: 'relative',
            top: '50%',
            transform: 'translateY(-50%)'
          }}
        >
          <div className="modal-header justify-content-center">
            <button
              className="close"
              type="button"
              onClick={() => this.setState({ modalSuccess: false })}
              style={{ zIndex: "100" }}
            >
              <i className="now-ui-icons ui-1_simple-remove"></i>
            </button>
          </div>
          <ModalBody style={{ marginTop: "25px" }}>
            <p>Vous êtes inscrit à la NewsLetter !</p>
          </ModalBody>
        </Modal>
        <Modal
          modalClassName="modal-mini modal-warning"
          toggle={() => this.setState({ modalFail: false })}
          isOpen={this.state.modalFail}
          style={{
            position: 'relative',
            top: '50%',
            transform: 'translateY(-50%)'
          }}
        >
          <div className="modal-header justify-content-center">
            <button
              className="close"
              type="button"
              onClick={() => this.setState({ modalFail: false })}
              style={{ zIndex: "100" }}
            >
              <i className="now-ui-icons ui-1_simple-remove"></i>
            </button>
          </div>
          <ModalBody style={{ marginTop: "25px" }}>
            <h6 style={{ textAlign: "center" }}>Problème</h6>
            <p>Vous n'étes pas inscrit à la NewsLetter !</p>
          </ModalBody>
        </Modal>
        <IndexNavbar />
        <div className="wrapper">
          <IndexHeader />
          <div className="main">
            <div className='row mainContainer'>
              <div className='col col-LR-width'>
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
                              <p className="card-discription">Aucun prduit n'est pas disponible actulemet</p>
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
          </div>
        </div >
        <DefaultFooter />
      </>
    );
  }
}

Home.propTypes = {
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


export default connect(mapStateToprops, { listProducts })(Home)