/*eslint-disable*/
import React, { Component } from "react";
import './../../assets/css/pagesStyle/homePage/header.css';
import Select from 'react-select';
import { withRouter } from "react-router-dom";
import Autosuggest from 'react-autosuggest';

// reactstrap components
import {
  Container,
  Row,
  Col
} from "reactstrap";
// core components


class IndexHeader extends Component {

  constructor() {
    super();
    this.state = {
      value: '',
      suggestions: [],
      searchSuggestions: []

    };
    this.pageHeader = React.createRef();
  }


  componentDidMount() {
    if (window.innerWidth > 991) {
      window.addEventListener("scroll", this.updateScroll);
    }
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
  }

  updateScroll = () => {
    let windowScrollTop = window.pageYOffset / 3;
    this.pageHeader.current.style.transform =
      "translate3d(0," + windowScrollTop + "px,0)";
  };


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

      }
      else
        this.props.history.push(`/search/${inputValue}`);
    }
  }






  render() {
    return (
      <>
        <div className="page-header clear-filter" filter-color="blue">
          <div
            className="page-header-image"
            style={{
              backgroundImage: "url(" + require("assets/img/ecommerce.jpg") + ")"
            }}
            ref={this.pageHeader}
          ></div>
          <Container>
            <div className="content-center brand">
              <h1 className="h1-seo" style={{ marginBottom: '0.5rem', fontSize: "5rem" }}>LOGO</h1>
              <h3 style={{ color: 'rgb(200, 238, 255)' }}>Assistance Et Services Informatiques.</h3>
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
              {/* end search section */}

            </div>

          </Container>
        </div>
      </>
    );
  }
}

export default withRouter(IndexHeader);
