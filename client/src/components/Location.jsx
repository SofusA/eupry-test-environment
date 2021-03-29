import React from "react";
import { withRouter } from 'react-router';

import axios from 'axios';
import { Card, Row, Col, Button, Breadcrumb, Container } from "react-bootstrap"

import { url } from "../static/url.js"

class App extends React.Component {

  state = {
    ID: null,
    data: []
  }

  componentDidMount() {
    if (typeof window !== `undefined` && localStorage.getItem('ID')) {
      this.setState({
        ID: localStorage.getItem('ID'),
      }, () => {
        this.getData()
      });
    } else (
      this.props.history.push("/login/")
    );
  }

  getData = () => {
    let loc = window.location.href;
    loc = loc.split("?")[1];
    this.setState({
      loc: loc
    });

    let URL = url;
    let profileURL = URL + "/api/forward?api=loc/" + loc + "/pro&id=" + this.state.ID;
    let locationURL = URL + "/api/forward?api=loc/" + loc + "&id=" + this.state.ID;

    axios.get(profileURL)
      .then(res => {
        this.setState({
          data: res.data
        });
      })
      .catch(error => {
        this.props.history.push("/login/")
      }
      );
    console.log("location.js -> getData(): " + profileURL)

    axios.get(locationURL)
      .then(res => {
        this.setState({
          locName: res.data.name
        })
      })
      .catch(error => {
        console.log(error)
      });
    console.log("location.js -> getData(): " + locationURL)
  }

  handleClick = () => {
    console.log(this.state)
  }

  render() {
    const profiles = this.state.data;
    const profileRender = [];
    for (let profile of profiles) {
      profileRender.push(
        <Col className="col-auto mb-3" key={"profileRender" + profile.id}>
          <Button variant="light" type="submit" onClick={() => { this.props.history.push("/profile?loc=" + this.state.loc + "&pro=" + profile.id) }} className="p-4 shadow-sm buttonCard">
            {profile.name}
          </Button>
        </Col>
      );
    }
    return (
      <Container>
        <Breadcrumb>
          <Breadcrumb.Item onClick={() => { this.props.history.push("/") }}> Locations </Breadcrumb.Item>
          <Breadcrumb.Item active> {this.state.locName} </Breadcrumb.Item>
        </Breadcrumb>

        <div className={this.state.ID ? "d-none " : "d-inline"}>
          <Row className="justify-content-md-center">
            <Card className="text-center" style={{ width: '18rem' }}>
              <Card.Header>Not logged in</Card.Header>
            </Card>
          </Row>
        </div>
        <div className={this.state.ID ? "d-inline " : "d-none"}>
          <div>
            <Row className="justify-content-md-center">
              <Row className="justify-content-md-left">{profileRender}</Row>
            </Row>
          </div>
        </div>
      </Container>
    )
  }
}

const AppWithRouter = withRouter(App);
export default AppWithRouter;