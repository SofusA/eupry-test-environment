import React from "react";
import { url } from "../static/url.js"

import moment from 'moment';
import axios from 'axios';
import { withRouter } from 'react-router';

import { Breadcrumb, Col, Row } from "react-bootstrap"
import { Button } from "react-bootstrap"

import DatepickerComponent from "../components/datepicker";

class App extends React.Component {
    state = {
        time: {
            start: moment().hours(0).minutes(0).seconds(0),
            end: moment().hours(0).minutes(0).seconds(0).add(24, 'hours')
        },
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
            alert: url + "/api/forward?api=loc/" + loc + "/pro/" + pro  + "/alert?start=" + this.state.time.start.unix() + "&end=" + this.state.time.end.unix() + "&id=" + this.state.ID,
            config: url + "/api/forward?api=loc/" + loc + "/pro/" + pro  + "/config?start=" + this.state.time.start.unix() + "&end=" + this.state.time.end.unix() + "&id=" + this.state.ID,
            status: url + "/api/forward?api=loc/" + loc + "/pro/" + pro  + "/status?start=" + this.state.time.start.unix() + "&end=" + this.state.time.end.unix() + "&id=" + this.state.ID,
            button: url + "/api/forward?api=loc/" + loc + "/pro/" + pro  + "/button?start=" + this.state.time.start.unix() + "&end=" + this.state.time.end.unix() + "&id=" + this.state.ID,
            mgraph: url + "/api/forward?api=loc/" + loc + "/pro/" + pro  + "/mgraph?start=" + this.state.time.start.unix() + "&end=" + this.state.time.end.unix() + "&id=" + this.state.ID,
        }

        for (const key in retrieveUrls) {
            axios.get(retrieveUrls[key])
                .then(res => {
                    const data = res.data;
                    this.setState({
                        [key]: data
                    })
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

    // nextUpload = () => {
    //     let nextupload = Infinity;

    //     for (const device of this.state.data.status) {
    //         if (device.next_update < nextupload) {
    //             nextupload = device.next_update;
    //         }
    //     }

    //     this.setState({
    //         nextupload: moment.unix(nextupload).fromNow()
    //     })

    // }

    render() {
        return (
            <div>
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

                            {/* {this.state.loc && this.state.pro && this.state.data ? <SettingsButton loc={this.state.loc} pro={this.state.pro} dataloggers={this.state.data.status} handler={this.settingsHandler} /> : null} */}

                        </small>
                    </Col>
                </Row>

                <Button onClick={this.handleClick}>this.state :) </Button>
            </div>
        );
    }
}

const AppWithRouter = withRouter(App);
export default AppWithRouter;