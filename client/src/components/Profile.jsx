import React from "react";
import { url } from "../static/url.js"

import moment from 'moment';
import axios from 'axios';
import { withRouter } from 'react-router';

import { Breadcrumb, Col, Row, Container } from "react-bootstrap"
// eslint-disable-next-line
import { Button } from "react-bootstrap"

import DatepickerComponent from "../components/datepicker";
import Linechart from "../components/linechart";
import SettingsButton from "../components/settingsButton"
import AlarmConfig from "../components/alarmConfig"


class App extends React.Component {
    state = {
        time: {
            start: moment().hours(0).minutes(0).seconds(0),
            end: moment().hours(0).minutes(0).seconds(0).add(24, 'hours')
        },
        updater: 0
    }

    handleClick = () => {
        console.log(this.state)
    }

    componentDidMount() {
        if (typeof window !== `undefined` && localStorage.getItem('ID')) {
            this.setState({
                ID: localStorage.getItem('ID'),
            }, () => {
                this.getData();

            })
        } else (
            this.props.history.push("/login/")
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

        const retrieveUrls = {
            locName: url + "/api/forward?api=loc/" + loc + "&id=" + this.state.ID,
            proName: url + "/api/forward?api=loc/" + loc + "/pro/" + pro + "&id=" + this.state.ID,
            alert: url + "/api/forward?api=loc/" + loc + "/pro/" + pro + "/alert?start=" + this.state.time.start.unix() + "&end=" + this.state.time.end.unix() + "&id=" + this.state.ID,
            config: url + "/api/forward?api=loc/" + loc + "/pro/" + pro + "/config?start=" + this.state.time.start.unix() + "&end=" + this.state.time.end.unix() + "&id=" + this.state.ID,
            status: url + "/api/forward?api=loc/" + loc + "/pro/" + pro + "/status?start=" + this.state.time.start.unix() + "&end=" + this.state.time.end.unix() + "&id=" + this.state.ID,
            button: url + "/api/forward?api=loc/" + loc + "/pro/" + pro + "/button?start=" + this.state.time.start.unix() + "&end=" + this.state.time.end.unix() + "&id=" + this.state.ID,
            mgraph: url + "/api/forward?api=loc/" + loc + "/pro/" + pro + "/mgraph?res=30&start=" + this.state.time.start.unix() + "&end=" + this.state.time.end.unix() + "&id=" + this.state.ID,
        }

        for (const key in retrieveUrls) {
            axios.get(retrieveUrls[key])
                .then(res => {
                    const data = res.data;
                    this.setState({
                        [key]: data
                    }, () => {
                        if (key === "status") { 
                            this.nextUpload(data)
                            for (let shadow of data) {
                                shadow.type = "normal" //set all as normal by default should be a back-end thing but you know ;) 
                            }
                         }
                    });

                })
                .catch(error => {
                    console.log(error)
                    this.props.history.push("/login/")
                });
        }

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

    settingsHandler = (shadow_id, settings) => {
        let status = this.state.status;
        let types = Object.keys(settings);
        let type = "normal";

        for (let thisType of types) {
            if (settings[thisType]) {
                type = thisType
            }
        }
        

        for (let i in status) {
            if (status[i].shadow_id === shadow_id) {
                status[i].type = type
            }
        }

        this.setState({
            status: status,
            updater: this.state.updater+1
        })
    }

    nextUpload = (data) => {
        let nextupload = Infinity;

        for (const device of data) {
            if (device.next_update < nextupload) {
                nextupload = device.next_update;
            }
        }

        this.setState({
            nextupload: moment.unix(nextupload).fromNow()
        })

    }

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <Breadcrumb>
                            <Breadcrumb.Item onClick={() => { this.props.history.push("/") }}> Locations </Breadcrumb.Item>
                            {this.state.locName ? <Breadcrumb.Item onClick={() => { this.props.history.push("/location?" + this.state.loc) }}> {this.state.locName.name} </Breadcrumb.Item> : null}
                            {this.state.proName ? <Breadcrumb.Item active> {this.state.proName.name} </Breadcrumb.Item> : null}
                        </Breadcrumb>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <DatepickerComponent handler={this.dateHandler} time={this.state.time} />
                        <small className="float-sm-right">
                            Next upload {this.state.nextupload}  or <b>on alarm</b>

                            {this.state.loc && this.state.pro && this.state.status ? <SettingsButton loc={this.state.loc} pro={this.state.pro} status={this.state.status} handler={this.settingsHandler} /> : null}
                            {this.state.status ? <AlarmConfig id={this.state.ID} loc={this.state.loc} pro={this.state.pro} updater = {this.state.updater} status={this.state.status} /> : null}

                        </small>
                    </Col>
                </Row>

                {this.state.mgraph ? <Linechart mgraph={this.state.mgraph} status={this.state.status} time={this.state.time} updater = {this.state.updater} /> : null}

                {/* <Button onClick={this.handleClick}>Profile.jsx state</Button> */}
            </Container>
        );
    }
}

const AppWithRouter = withRouter(App);
export default AppWithRouter;