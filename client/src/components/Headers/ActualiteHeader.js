import React, { Component } from "react";
import Select from 'react-select';
import { withRouter } from "react-router-dom";
import Autosuggest from 'react-autosuggest';


import './../../assets/css/pagesStyle/hollandTest/SmallHeader.css'

// reactstrap components
import { Row, Col } from "reactstrap";

// core components
import FixedNavbar from "components/Navbars/FixedNavbar.js";


class ActualiteHeader extends Component {
    constructor() {
        super();
        this.state = {
            formations: [],
            domaines: [],
            keywords: [],
            regions: [],
            value: '',
            suggestions: [],
            searchSuggestions: []
        };
    }


    componentDidMount() {

        // Get formations
        fetch('/info/typeFormation')
            .then(res => res.json())
            .then(res => {
                let types = [];
                for (let i = 0; i < res.length; i++) {
                    types.push({ value: res[i].type_formation_ID, label: res[i].type_formation });
                }
                this.setState({ formations: types });
            });

        // Get domaines
        fetch('/info/domaineFormation')
            .then(res => res.json())
            .then(res => {
                let domaines = [];
                for (let i = 0; i < res.length; i++) {
                    domaines.push({ value: res[i].domaine_etudes_ID, label: res[i].domaine_etudes });
                }
                this.setState({ domaines: domaines });
            });

        // Get mot clés
        fetch('/info/keywords')
            .then(res => res.json())
            .then(res => {
                const keywordsSort = res.sort((a, b) => (a.nombre_recherche < b.nombre_recherche) ? 1 : -1);
                this.setState({ keywords: keywordsSort });
            });

        // Get regions
        fetch('/info/regions')
            .then(res => res.json())
            .then(res => {
                let regions = [];
                for (let i = 0; i < res.length; i++) {
                    regions.push({ value: res[i].region_id, label: res[i].region_FR });
                }
                this.setState({ regions: regions });
            });

        // get Search suggestions
        fetch('/info/Etablissements')
            .then(res => res.json())
            .then(res => {
                // Établissements
                let Etablissements = [];
                for (let i = 0; i < res.length; i++) {
                    Etablissements.push(
                        {
                            id: res[i].etab_id,
                            name: res[i].nom,
                            searchType: "Établissements"
                        }
                    );
                }
                let searchSuggestions = [];
                searchSuggestions.push({
                    title: "Établissements",
                    searchSuggestions: Etablissements
                });
                // Categories
                let Categories = [];
                for (let i = 0; i < this.state.domaines.length; i++) {
                    Categories.push(
                        {
                            id: this.state.domaines[i].value,
                            name: this.state.domaines[i].label,
                            searchType: "Catégories"
                        }
                    );
                }
                searchSuggestions.push({
                    title: "Catégories",
                    searchSuggestions: Categories
                });
                // Régions
                let regions = [];
                for (let i = 0; i < this.state.regions.length; i++) {
                    regions.push(
                        {
                            id: this.state.regions[i].value,
                            name: this.state.regions[i].label,
                            searchType: "Régions"
                        }
                    );
                }
                searchSuggestions.push({
                    title: "Régions",
                    searchSuggestions: regions
                });

                this.setState({ searchSuggestions: searchSuggestions });
            });
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.updateScroll);
    }

    onSelectChange = (value, action) => {
        this.setState({ [action.name]: value.value });
        if (action.name === "CategValue") {
            this.props.history.push("/search/categorie/" + value.value);
        } else if (action.name === "TypeFormationValue") {
            this.props.history.push("/search/typeFormation/" + value.value);
        } else if (action.name === "RegionValue") {
            this.props.history.push("/search/region/" + value.value);
        }
    }

    // search Suggestions


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
        this.setState({ value: "" });
        if (suggestion.searchType === "Catégories") {
            this.props.history.push("/search/categorie/" + suggestion.id);
        } else if (suggestion.searchType === "Établissements") {
            this.props.history.push('/info/etablissement/' + suggestion.id);
        } else if (suggestion.searchType === "Régions") {
            this.props.history.push("/search/region/" + suggestion.id);
        }
    }

    search = (e) => {
        e.preventDefault();
        this.setState({ value: "" });

        const inputValue = this.state.value.trim().toLowerCase();
        const inputLength = inputValue.length;
        if (inputLength !== 0) {
            let result = (this.state.searchSuggestions
                .map(section => {
                    return {
                        title: section.title,
                        searchSuggestions: section.searchSuggestions.filter(suggest => suggest.name.toLowerCase().slice(0, inputLength) === inputValue)
                    };
                })
                .filter(section => section.searchSuggestions.length > 0));
            if (result.length !== 0) {
                result = (result[0].searchSuggestions[0]);
                if (result.searchType === "Catégories") {
                    this.props.history.push("/search/categorie/" + result.id);
                } else if (result.searchType === "Établissements") {
                    this.props.history.push('/info/etablissement/' + result.id);
                } else if (result.searchType === "Régions") {
                    this.props.history.push("/search/region/" + result.id);
                }
            } else {
                this.props.history.push("/search/text/" + inputValue);
            }
        }
    }

    render() {

        return (
            <>
                <FixedNavbar />

                <div className="page-header page-header-small-search">
                    <div
                        className="page-header-image"
                        style={{
                            backgroundImage: "url(" + require("assets/img/actualité.jpg") + ")",
                            opacity: "0.88"
                        }}
                        ref={this.pageHeader}
                    ></div>
                    <div className="container small-header">
                        <div className="small-header-form">
                            {/* start search section */}
                            <div>
                                <h1 style={{ fontSize: "80px", letterSpacing: "2px", fontWeight: '700' }}>Actualité</h1>
                                <p style={{ fontSize: "27px", maxWidth: "800px", lineHeight: "34px", textShadow: " 0 0 1px #fff" }}><b>Ici</b>, vous trouverez toutes l'<b style={{ fontSize: "28px" }}>Actualités</b> liées aux écoles, programmes d'étude et bourses.<br />Tous les <b style={{ fontSize: "28px" }}>Événements</b> à venir et plus encore!</p>
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
                                <Col lg='12' sm='12'>
                                    <form method="post">
                                        <Row>
                                            <p style={{ marginTop: "14px", marginLeft: "15px", marginRight: "15px", fontWeight: "600", fontSize: "16px", textAlign: "left" }}>
                                                <i className="fas fa-sliders-h" style={{ paddingRight: "3px" }}></i> Nouvelle Recherche
                                            </p>
                                            <Col sm='12' md='4' lg='2'>
                                                <Select

                                                    className="react-select-header-small"
                                                    classNamePrefix="react-select"
                                                    placeholder="Catégorie"
                                                    maxMenuHeight={150}
                                                    name="CategValue"
                                                    value={this.state.domaines.filter(domaine => domaine.value === this.state.CategValue)}
                                                    onChange={this.onSelectChange}

                                                    options={this.state.domaines}
                                                />
                                            </Col>
                                            <Col sm='12' md='4' lg='2'>
                                                <Select

                                                    className="react-select-header-small"
                                                    classNamePrefix="react-select"
                                                    placeholder="Type de formation"
                                                    maxMenuHeight={150}
                                                    name="TypeFormationValue"
                                                    value={this.state.formations.filter(formation => formation.value === this.state.TypeFormationValue)}
                                                    onChange={this.onSelectChange}

                                                    options={this.state.formations}
                                                />
                                            </Col>
                                            <Col sm='12' md='4' lg='2'>
                                                <Select

                                                    className="react-select-header-small"
                                                    classNamePrefix="react-select"
                                                    placeholder="Région"
                                                    maxMenuHeight={150}
                                                    name="RegionValue"
                                                    value={this.state.regions.filter(region => region.value === this.state.RegionValue)}
                                                    onChange={this.onSelectChange}

                                                    options={this.state.regions}
                                                />
                                            </Col>
                                        </Row>
                                    </form>
                                </Col>
                            </Row>
                            {/* end search section */}

                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default withRouter(ActualiteHeader);
