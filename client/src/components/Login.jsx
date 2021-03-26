import React from "react";
import axios from 'axios';
import { withRouter } from 'react-router';

import { Form, Button, Card, Container, Row } from 'react-bootstrap'

import { url } from "../static/url.js"

class App extends React.Component {

    state = {
        email: "",
        password: "",
        login: false,
        id: 0,
    }

    handleInputChange = event => {
        const target = event.target
        const value = target.value
        const name = target.name
        this.setState({
            [name]: value,
        })
    }
    handleSubmit = event => {
        event.preventDefault()
        let URL = url;

        URL = URL + "/api/login?email=" + this.state.email + "&password=" + this.state.password;
        axios.get(URL)
        .then(res => {
            const data = res.data;
            this.setState({
                login: true,
                ID: data.id,
              })
              localStorage.setItem('ID', data.id);
              
              this.props.history.push('/');
        })
        .catch(error => {
            console.log(error)
            alert("Wrong login or password")
        })

        console.log("loginComp.js -> handleSubmit(): " + URL)
    }


    render() {
        return (
            <div>
                <Container>
                    <Row className=" mt-5 justify-content-md-center">
                        <Card className="text-left" style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>Login</Card.Title>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email" placeholder="Enter email" name="email" value={this.state.email} onChange={this.handleInputChange} />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleInputChange} />
                                    </Form.Group>
                                    <Button variant="primary" type="submit">
                                        Submit
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Row>
                </Container>
            </div>
        );
    }
}

const AppWithRouter = withRouter(App);
export default AppWithRouter;