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
      })
    } else (
      navigate("/login/")
    )
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
        navigate("/login/")
      })
    console.log("index.js -> getData(): " + URL)
  }

  render() {
    const locations = this.state.data;
    const locationRender = [];
    for (let location of locations) {
      locationRender.push(
        <Col className="col-auto mb-3" key={"locationRender" + location.id}>
          <Button variant="light" type="submit" onClick={() => { navigate("/location?" + location.id) }} className="p-4 shadow-sm buttonCard">
            {location.name}
          </Button>
        </Col>
      );
    }
    //const { data } = this.state;
    return (
      <Layout>
        {/* <Button onClick={this.handleClick}>Log</Button> */}
        <Breadcrumb>
          <Breadcrumb.Item active>Locations </Breadcrumb.Item>
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
              <Row className="justify-content-md-left">{locationRender}</Row>
            </Row>
          </div>
        </div>
      </Layout>
    )
  }
}
