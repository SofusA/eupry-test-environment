import React from "react"
import Layout from "../components/layout"
import { navigate } from "gatsby"
import { Card, Row, Col, Button, Breadcrumb } from "react-bootstrap"
import axios from 'axios';
import '../styles/cardStyles.css'

import { url } from "../../static/url.js"

export default class Index extends React.Component {

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
      navigate("/login/")
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
        navigate("/login/")
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
          <Button variant="light" type="submit" onClick={() => { navigate("/profile?loc=" + this.state.loc + "&pro=" + profile.id) }} className="p-4 shadow-sm buttonCard">
            {profile.name}
          </Button>
        </Col>
      );
    }
    return (
      <Layout>
        {/*<Button onClick={this.handleClick}>Log</Button>*/}
        <Breadcrumb>
          <Breadcrumb.Item onClick={() => { navigate("/") }}> Locations </Breadcrumb.Item>
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
      </Layout>
    )
  }
}
