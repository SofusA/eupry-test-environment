import React from "react"
import Layout from "../components/layout";
import axios from 'axios';
import { navigate } from "gatsby";
import moment from 'moment';
import LineGraph from "../components/apexchart";
import DatepickerComponent from "../components/datepicker";

import SettingsButton from "../components/settingsButton"

import { url } from "../../static/url.js"
import { Button } from "react-bootstrap"

import { Card, Breadcrumb, Col, Row, Table } from "react-bootstrap"

export default class Profile extends React.Component {
    state = {
        time: {
            start: moment().hours(0).minutes(0).seconds(0),
            end: moment().hours(0).minutes(0).seconds(0).add(24, 'hours')
        },
    }

    settingsHandler = (settings) => {
        console.log("settingHandler")
        this.setState({
            settings: settings
        }, () => {

            // List types of sensors
            let sensorTypes = ["normal"];
            for (const [datalogger, value] of Object.entries(settings.dataloggers)) {
                for (const [sensor, sensorvalue] of Object.entries(value)) {
                    // push if not exist in sensor types
                    if (sensorvalue && sensorTypes.indexOf(sensor) === -1) sensorTypes.push(sensor);
                }
            }

            // make list to object :P
            let typeGraph = {};
            for (const type of sensorTypes) {
                typeGraph[type] = [];
            }



            // sort graphs
            for (const graph of this.state.data.graph) {
                for (const [sensor, sensorvalue] of Object.entries(settings.dataloggers[graph.device_id])) {
                    if (sensorvalue) {
                        if (sensor === 'diffPressure') { //special case for differential pressure, because that replaces internal temperature. Remove if Noam changes this!
                            typeGraph[sensor].push(graph)
                        } else if (sensor === "normal" || graph.source === "temperature" || graph.source === "humidity") {
                            typeGraph.normal.push(graph)
                        } else {
                            typeGraph[sensor].push(graph)
                        }
                    }
                }
            }

            this.setState({
                graph: typeGraph
            })
        })

    }

    dateHandler = (end, start) => {
        this.setState({
            time: {
                start: start,
                end: end
            }
        }, () => {
            this.getData();
        })
    }

    componentDidMount() {
        if (typeof window !== `undefined` && localStorage.getItem('ID')) {
            this.setState({
                ID: localStorage.getItem('ID'),
            }, () => {
                this.getData();
            })
        } else (
            navigate("/login/")
        )
    }

    getData = () => {
        let query = window.location.href;
        query = query.split("?")[1];
        let loc = query.split("&")[0].split("=")[1];
        let pro = query.split("&")[1].split("=")[1];

        this.setState({
            loc: loc,
            pro: pro
        });

        let URL = url;
        let profileInfoURL = URL + "/api/loc/" + loc +
            "/pro/" + pro +
            "?start=" + this.state.time.start.unix() +
            "&end=" + this.state.time.end.unix() +
            "&id=" + this.state.ID;

        let profileURL = URL + "/api/forward?api=loc/" + loc + "/pro/" + pro + "&id=" + this.state.ID;
        let locationURL = URL + "/api/forward?api=loc/" + loc + "&id=" + this.state.ID;

        axios.get(profileInfoURL)
            .then(res => {
                this.setState({
                    data: res.data
                }, () => {
                    this.nextUpload();
                });
            })
            .catch(error => {
                navigate("/login/")
            });
        console.log("profil.js -> getData(): " + profileInfoURL)

        axios.get(locationURL)
            .then(res => {
                this.setState({
                    locName: res.data.name
                })
            })
            .catch(error => {
                console.log(error)
                navigate("/login/")
            });
        console.log("profil.js -> getData(): " + locationURL)

        axios.get(profileURL)
            .then(res => {
                this.setState({
                    proName: res.data.name
                })
            })
            .catch(error => {
                console.log(error)
                navigate("/login/")
            });
        console.log("profil.js -> getData(): " + profileURL)
    }

    handleClick = () => {
        console.log(this.state)
    }

    nextUpload = () => {
        let nextupload = Infinity;

        for (const device of this.state.data.status) {
            if (device.next_update < nextupload) {
                nextupload = device.next_update;
            }
        }

        this.setState({
            nextupload: moment.unix(nextupload).fromNow()
        })

    }

    renderButtonData = () => {
        if (this.state.data && this.state.data.button) {

            // Crazy time sorting stuff
            this.state.data.button.sort(function (a, b) {
                return a.time > b.time;
            });

            return this.state.data.button.map((button, index) => {
                const { device_id, humid, name, probe, shadow_id, temp, time, value } = button
                return (
                    <tr key={"buttonPush" + device_id + time}>
                        <td>{name}</td>
                        <td>{moment.unix(time).format("HH:mm")}</td>
                        <td>{temp}</td>
                        <td>{probe}</td>
                        <td>{humid}</td>
                    </tr>
                )
            })
        } else {
            return
        }
    }

    renderBatteryData = () => {
        if (this.state.data && this.state.data.status) {
            return this.state.data.status.map((device, index) => {
                return (
                    <tr key={"battery" + device.device_id}>
                        <td>{device.device_name}</td>
                        <td>{device.battery}</td>
                    </tr>
                )
            })
        } else {
            return
        }
    }

    render() {

        return (
            <Layout>

                {/* <Row>
                    <Button onClick={this.handleClick}>this.state :) </Button>
                </Row> */}

                <Row>
                    <Col>
                        <Breadcrumb>
                            <Breadcrumb.Item onClick={() => { navigate("/") }}> Locations </Breadcrumb.Item>
                            <Breadcrumb.Item onClick={() => { navigate("/location?" + this.state.loc) }}> {this.state.locName} </Breadcrumb.Item>
                            <Breadcrumb.Item active> {this.state.proName} </Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <DatepickerComponent handler={this.dateHandler} time={this.state.time} />
                        <small className="float-sm-right">
                            Next upload {this.state.nextupload}  or <b>on alarm</b>

                            {this.state.loc && this.state.pro && this.state.data ? <SettingsButton loc={this.state.loc} pro={this.state.pro} dataloggers={this.state.data.status} handler={this.settingsHandler} /> : null}

                        </small>
                    </Col>
                </Row>



                {this.state.graph ? <LineGraph graph={this.state.graph} data={this.state.data} time={this.state.time} /> : null}


                <Row>
                    {/* <Col>
                        <Card className="w-100">
                            <Card.Header>
                                Dataloggers
                        </Card.Header>
                            <Card.Body>
                                <Table striped>
                                    <thead>
                                        <tr>
                                            <th>Logger</th>
                                            <th>Battery</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderBatteryData()}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col> */}
                    <Col >
                        <Card className="w-100">
                            <Card.Header>
                                Button pushes
                        </Card.Header>
                            <Card.Body>
                                {this.state.data && this.state.data.button.length > 0 ? <Table striped>
                                    <thead>
                                        <tr>
                                            <th>Logger</th>
                                            <th>Time</th>
                                            <th>Temperature</th>
                                            <th>Probe</th>
                                            <th>Humidity</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderButtonData()}
                                    </tbody> 

                                </Table> : <p className="text-center">No button pushes</p> }
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Layout>
        )
    }
}
