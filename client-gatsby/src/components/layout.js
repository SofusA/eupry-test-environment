import React from "react";
import { Link } from "gatsby";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/global.css'
import logo from '../../static/eupry_LOGO.svg'

import { ExternalLink } from 'react-feather';

import { Container, Nav, Navbar, Button } from 'react-bootstrap';


export default ({ children }) => (
	<div>
		<Navbar expand="lg" className="bg-light shadow-sm">
			<Container>
				<Nav className="mr-auto">
					<Nav >
						<Link to="/" style={{ textShadow: `none`, backgroundImage: `none` }}>
							<img src={logo} alt="" width="100px" />
						</Link>
					</Nav>
				</Nav>
				<Button href="https://eupry.com/logger" target="_blank" rel="noopener noreferrer"> Eupry Logger <ExternalLink size={16}/></Button>
			</Container>
		</Navbar>

		<Container className="mb-5">
			{children}
		</Container>
	</div >
)