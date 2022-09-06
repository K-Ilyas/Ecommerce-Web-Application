import React, { Component } from 'react';
import $ from 'jquery';

// core components
import ConatctUsHeader from "components/Headers/SmallHeader";
import DefaultFooter from "components/Footers/DefaultFooter";
import 'assets/css/pagesStyle/contact/contact.css';

import './../../assets/css/pagesStyle/homePage/home.css';
import './../../assets/css/pagesStyle/hollandTest/HollandTest.css';
import './../../assets/css/pagesStyle/profilePage/ProfilePage.css';





// reactstrap components


class AboutUs2 extends Component {
    constructor(props) {
        super(props);
        this.state = {


        }
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

        window.scrollTo(0, 0);
        document.body.classList.add("contact-page");
        document.body.classList.add("sidebar-collapse");
        document.documentElement.classList.remove("nav-open");
        return function cleanup() {
            document.body.classList.remove("contact-page");
            document.body.classList.remove("sidebar-collapse");
        };



    }
    componentWillUnmount() {
        document.body.classList.remove("sidebar-collapse");
    }

    componentWillReceiveProps(newProps) {

    }







    render() {
        return (
            <>
                <ConatctUsHeader type={this.props.match.params.type} type_search_id={this.props.match.params.id} />



                <div className='container' style={containerStyle}>


                    {/*EASLY DESCRIPTION */}


                    <div className="test-intro">
                        <h1><b>LOGO </b></h1>
                        <h3>Qui nous sommes ?</h3>

                        <p style={{ fontSize: "18px", fontWeight: "500", textAlign: 'justify' }}>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. In quibusdam dolore sunt sit repellendus assumenda vitae beatae officia ipsum iusto perferendis voluptatem corrupti ab dolor quaerat aut minima, aspernatur reprehenderit.
                        </p>

                    </div>


                    <div className="QuestionsContainer">
                        <p style={{ textDecoration: "overline", textAlign: "center" }}><b><b>GALERIE</b> </b></p>

                        <div className="row justify-content-center">
                            <div className="col col col-md col-md-4 col-6 galerie">
                                <a href={`/img/1.jpg`} target="_blank" rel="noopener noreferrer">  <img src={`/img/1.jpg`} alt=""></img></a>

                            </div>
                            <div className="col col col-md col-md-4 col-6 galerie">
                                <a href={`/img/2.png`} target="_blank" rel="noopener noreferrer">  <img src={`/img/2.png`} alt=""></img></a>

                            </div>
                            <div className="col col col-md col-md-4 col-6 galerie">
                                <a href={`/img/3.jpeg`} target="_blank" rel="noopener noreferrer">  <img src={`/img/3.jpeg`} alt=""></img></a>

                            </div>
                            <div className="col col col-md col-md-4 col-6 galerie">
                                <a href={`/img/4.jpeg`} target="_blank" rel="noopener noreferrer">  <img src={`/img/4.jpeg`} alt=""></img></a>

                            </div>
                            <div className="col col col-md col-md-4 col-6 galerie">
                                <a href={`/img/5.png`} target="_blank" rel="noopener noreferrer">  <img src={`/img/5.png`} alt=""></img></a>

                            </div>
                            <div className="col col col-md col-md-4 col-6 galerie">
                                <a href={`/img/6.png`} target="_blank" rel="noopener noreferrer">  <img src={`/img/6.png`} alt=""></img></a>

                            </div>

                            <div className="col col col-md col-md-4 col-6 galerie">
                                <a href={`/img/7.png`} target="_blank" rel="noopener noreferrer">  <img src={`/img/7.png`} alt=""></img></a>

                            </div>
                            <div className="col col col-md col-md-4 col-6 galerie">
                                <a href={`/img/8.png`} target="_blank" rel="noopener noreferrer">  <img src={`/img/8.png`} alt=""></img></a>

                            </div>
                            <div className="col col col-md col-md-4 col-6 galerie">
                                <a href={`/img/9.png`} target="_blank" rel="noopener noreferrer">  <img src={`/img/9.png`} alt=""></img></a>

                            </div>


                        </div>
                    </div>

                </div >
                <DefaultFooter />
            </>
        );
    }
}
const containerStyle = {
    marginTop: '70px',
    marginBottom: '100px',
    textAlign: 'left',
};

export default AboutUs2;