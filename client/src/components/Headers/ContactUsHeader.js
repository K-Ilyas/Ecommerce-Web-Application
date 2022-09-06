import React from "react";
import {
  Container,
  Button
}
  from "reactstrap";
// reactstrap components

// core components

function ContactUsHeader() {
  let pageHeader = React.createRef();
  React.useEffect(() => {
    if (window.innerWidth > 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });

  return (
    <>
      <div className="page-header page-header-small contact-header-size">
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("assets/img/bg45.e6dcb669.jpg") + ")"
          }}
          ref={pageHeader}
        ></div>
        <div className="content-center">
          <Container>
            <h1 className="title">Contactez Nous</h1>
            <div className="text-center">
              <Button
                className="btn-icon btn-round"
                color="grey"
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                <i className="fab fa-facebook-square"></i>
              </Button>
              <Button
                className="btn-icon  btn-round"
                color="grey"
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                <i className="fab fa-twitter"></i>
              </Button>
              <Button
                className="btn-icon btn-round"
                color="grey"
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                <i className="fab fa-google-plus"></i>
              </Button>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
}

export default ContactUsHeader;
