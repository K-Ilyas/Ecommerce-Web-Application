/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";

// core components

function DefaultFooter() {
  return (
    <>
      <footer className="footer footer-default" style={{ marginTop: '40px', backgroundColor: "#f6f6f6", borderTop: "solid 1px #e2e2e2" }}>
        <Container>
          {/* <!-- Footer Links --> */}
          <div className="text-center text-md-left">

            {/* <!-- Footer links --> */}
            <div className="row text-center text-md-left mt-3 pb-3">

              {/* <!-- Grid column --> */}
              <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold">LOGO </h6>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure, obcaecati. Mollitia id nesciunt totam nulla saepe nostrum dolor.</p>
              </div>
              {/* <!-- Grid column --> */}

              <hr className="w-100 clearfix d-md-none" />

              {/* <!-- Grid column --> */}

              {/* <!-- Grid column --> */}

              <hr className="w-100 clearfix d-md-none" />

              {/* <!-- Grid column --> */}


              {/* <!-- Grid column --> */}
              <hr className="w-100 clearfix d-md-none" />

              {/* <!-- Grid column --> */}
              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold">Contact</h6>
                <p>
                  <i className="fas fa-home mr-3"></i> Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                <p>
                  <i className="fas fa-envelope mr-3"></i>company@company.com</p>
                <p>
                  <i className="fas fa-phone-alt mr-3"></i>+212 xx-xxx-xxx</p>
                <p>
                  <i className="fas fa-print mr-3"></i>+212 xx-xxx-xxx</p>
              </div>
              {/* <!-- Grid column --> */}

            </div>
            {/* <!-- Footer links --> */}

            <hr />
          </div>


          <nav>
            <ul>
              <li>
                <a
                  href="/home"
                >
                  LOGO
                </a>
              </li>
              <li>
                <a
                  href="/about"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
          <div className="copyright" id="copyright">
            © {new Date().getFullYear()} ,
            <a
              href="/home"
            >
              LOGO .
            </a>
          </div>
        </Container>
      </footer>
    </>
  );
}

export default DefaultFooter;
