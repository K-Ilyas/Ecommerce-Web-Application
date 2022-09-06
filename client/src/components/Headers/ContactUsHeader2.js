import React, { Component } from "react";
import { withRouter } from "react-router-dom";


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

    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.updateScroll);
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
                                <h1 style={{ fontSize: "80px", letterSpacing: "2px", fontWeight: '700' }}>Nous Contacter</h1>
                                <p style={{ fontSize: "27px", maxWidth: "800px", lineHeight: "34px", textShadow: " 0 0 1px #fff" }}><b>Ici</b>, vous pouvez contactez-nous et notre équipe d'<b style={{ fontSize: "28px" }}>assistance</b> d'experts répondra à toutes vos questions.<br /></p>
                            </div>
                            <Row>
                                <Col lg='12' sm='12'>
                                    <form method="post">

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
