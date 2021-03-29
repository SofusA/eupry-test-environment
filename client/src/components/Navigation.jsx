import React from "react";
import { Link, withRouter } from "react-router-dom";

import logo from '../static/eupry_LOGO.svg'

import { ExternalLink } from 'react-feather';
import { Nav, Navbar, Button } from 'react-bootstrap';

function Navigation(props) {
  return (
    <div>
      
        <Navbar expand="lg" className="bg-light px-5 shadow-sm">

          <Nav className="mr-auto">
            <Nav >
              <Link to="/" style={{ textShadow: `none`, backgroundImage: `none` }}>
                <img src={logo} alt="" width="100px" />
              </Link>
            </Nav>
          </Nav>
          <Button href="https://eupry.com/logger" target="_blank" rel="noopener noreferrer"> Eupry Logger <ExternalLink size={16} /></Button>

        </Navbar>
      

    </div>
  );
}

export default withRouter(Navigation);
