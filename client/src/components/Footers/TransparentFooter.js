/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";

function TransparentFooter() {
  return (
    <footer className="footer">
      <Container>
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
  );
}

export default TransparentFooter;
