import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Autosuggest from 'react-autosuggest';


import './../../assets/css/pagesStyle/hollandTest/SmallHeader.css'

// reactstrap components
import { Row, Col } from "reactstrap";

// core components
import FixedNavbar from "components/Navbars/FixedNavbar.js";


class LandingPageHeader extends Component {
    constructor() {
        super();
        this.state = {

        };
    }


    componentDidMount() {
        let type = this.props.type;
        let type_search_id = this.props.type_search_id
        if (type === "text") {
            this.setState({
                titre: type_search_id,
                description: "Voici les résultats pour votre recherche sur \"" + type_search_id + "\""
            });
        }

    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.updateScroll);
    }


    componentWillReceiveProps(newProps) {

    }


    render() {

        return (
            <>
                <FixedNavbar />

                <div className="page-header page-header-small-search">
                    <div
                        className="page-header-image"
                        style={{
                            backgroundImage: "url(" + require("assets/img/categorie_bg/bg_" + ((this.props.type === "categorie") ? this.props.type_search_id : "header1") + ".jpg") + ")",
                            opacity: "0.89"
                        }}
                        ref={this.pageHeader}
                    ></div>
                    <div className="container small-header">
                        <div className="small-header-form">
                            {/* start search section */}
                            <div>
                                <h1>{this.state.titre}</h1>
                                <p>{this.state.description}</p>
                            </div>
                            <Row>
                                <Col lg='12' sm='12'>
                                    <form method="post">
                                        <Row>
                                            <Col sm='12' md='9' lg='8'>
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
                                                            placeholder: 'École, Formation...',
                                                            value: this.state.value,
                                                            onChange: this.onChange
                                                        }}
                                                    />
                                                </div>
                                            </Col>
                                            <Col sm='12' md='3' lg='2'>
                                                <button type="submit" className="btn btn-primary btn-block text-white btn-search btn-search-small-header" onClick={this.search}>RECHERCHE</button>
                                            </Col>
                                        </Row>
                                    </form>
                                </Col>
                            </Row>
                            {/* end search section */}

                        </div>
                    </div>
                </div>

                <div className="page-header page-header-small clear-filter " filter-color="blue">
                    <div className="page-header-image page-header-image-small"></div>
                    <div className="container small-header">
                        <div className="small-header-form">
                            {/* start search section */}
                            <Row>

                            </Row>
                            {/* end search section */}

                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default withRouter(LandingPageHeader);
