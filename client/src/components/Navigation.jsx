import React from "react";
import { Link, withRouter } from "react-router-dom";

import logo from '../static/eupry_LOGO.svg'

import { ExternalLink } from 'react-feather';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';

function Navigation(props) {
  return (
    <div className="navigation">
      <Navbar expand="lg" className="bg-light shadow-sm">
        <Container>
          <Nav className="mr-auto">
            <Nav >
              <Link to="/" style={{ textShadow: `none`, backgroundImage: `none` }}>
                <img src={logo} alt="" width="100px" />
              </Link>
            </Nav>
          </Nav>
          <Button href="https://eupry.com/logger" target="_blank" rel="noopener noreferrer"> Eupry Logger <ExternalLink size={16} /></Button>
        </Container>
      </Navbar>

    </div>
  );
}

export default withRouter(Navigation);
