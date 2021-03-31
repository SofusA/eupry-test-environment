import React from "react";
import axios from 'axios';
import { withRouter } from 'react-router';

import { Row, Col, Button, Breadcrumb, Container } from "react-bootstrap"

import { url } from "../static/url.js"

class App extends React.Component {

  handleClick = () => {
    console.log(this.state)
  }

  state = {
    ID: null,
    data: []
  }

  componentDidMount() {
    if (typeof window !== `undefined` && localStorage.getItem('ID')) {
      this.setState({
        ID: localStorage.getItem('ID'),
      }, () => {
        this.getData();
      });
    } else (
      this.props.history.push('/login')
    );
  }

  getData = () => {

    let URL = url;
    URL = URL + "/api/forward?api=loc&id=" + this.state.ID;
    axios.get(URL)
      .then(res => {
        this.setState({
          data: res.data
        })
      })
      .catch(error => {
        console.log("Error")
        this.props.history.push("/login/")
      })
  }

  render() {
    const locations = this.state.data;
    const locationRender = [];
    for (let location of locations) {
      locationRender.push(
        <Col className="col-auto mb-3" key={"locationRender" + location.id}>
          <Button variant="light" type="submit" onClick={() => { this.props.history.push("/location?" + location.id) }} className="p-4 shadow-sm buttonCard">
            {location.name}
          </Button>
        </Col>
      );
    }
    return (
      <Container>
          <Breadcrumb>
            <Breadcrumb.Item active>Locations </Breadcrumb.Item>
          </Breadcrumb>

          <Row className="justify-content-md-center">
            <Row className="justify-content-md-left">{locationRender}</Row>
          </Row>
      </Container>
    )
  }
}

const AppWithRouter = withRouter(App);
export default AppWithRouter;