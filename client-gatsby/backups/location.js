import axios from 'axios';
import { navigate } from "gatsby";
import React from "react";
import { Card, Row, Button } from "react-bootstrap";
import DatepickerComponent from "../components/datepicker";
import Layout from "../components/layout";
import LineGraph from "../components/LineChart";
import moment from 'moment';

import { url } from "../../static/url.js"

export default class Location extends React.Component {
    state = {
        profiles: [],
        time: {
            start: moment().hours(0).minutes(0).seconds(0),
            end: moment().add(1, "days").hours(0).minutes(0).seconds(0)
        }
    }

    handleClick = () => {
        console.log(this.state)
    }


    componentDidMount() {
        if (typeof window !== `undefined` && localStorage.getItem('ID')) {
            this.setState({
                ID: localStorage.getItem('ID'),
            }, () => {
                this.getProfiles();
                this.getDetectDoor();
            })
        } else (
            navigate("/login/")
        )
    }

    getDetectDoor = () => {
        if (typeof window !== `undefined`) {

            let loc = window.location.href;
            loc = loc.split("?")[1]

            let URL = url;
            URL = URL + "/api/loc/" + loc + "/detectdoor" +
                "?start=" + this.state.time.start +
                "&end=" + this.state.time.end +
                "&id=" + this.state.ID;

            axios.get(URL)
                .then(res => {
                    console.log("Door Detection Recieved");

                    for (let i in res.data) {
                        let newDoors = []; //Door opening readings to be pushed
                        
                        try {
                            for (let reading of res.data[i].dooropen) {
                                newDoors.push({x:reading, y:0})
                            }
                        } catch (e) {
                        }

                        let cache = this.state;
                        
                        if (newDoors.length > 0) {
                            cache.profiles[i].data.datasets.push({
                                data: newDoors,
                                label: "Door Opening",
                                fill: false,
                                borderColor: '#2ec29d',
                                borderWidth: 0,
                                pointRadius: 5,
                                hoverRadius: 1,
                                lineTension: 1,
                                pointHitRadius: 20,
                            })
                        }

                        this.setState(cache)
                    }
                })
                .catch(error => {
                    console.log(error)
                    navigate("/login/")
                })
        }

    }


    getProfiles() {
        if (typeof window !== `undefined`) {

            let loc = window.location.href;
            loc = loc.split("?")[1]

            let URL = url;
            URL = URL + "/api/loc/" + loc +
                "?start=" + this.state.time.start +
                "&end=" + this.state.time.end +
                "&id=" + this.state.ID;

            axios.get(URL)
                .then(res => {

                    for (let i in res.data) {
                        //Parse "contents" of profiles
                        try {
                            res.data[i].contents = JSON.parse(res.data[i].contents)
                        } catch (e) {
                            //console.log("Content parse failed")
                        }

                        let newDatasets = [];

                        // // Push measurements
                        newDatasets.push({
                            data: res.data[i].data.graph,
                            label: res.data[i].name,
                            fill: false,
                            borderColor: '#2ec29d',
                            pointRadius: 0,
                            hoverRadius: 0,
                            lineTension: 1,
                            pointHitRadius: 20,
                        })

                        // // Push alarms
                        if (res.data[i].data.alarm.length > 0) {

                            for (let j in res.data[i].data.alarm) {
                                console.log({
                                    type: res.data[i].data.alarm[j].type,
                                    value: res.data[i].data.alarm[j].value,
                                    time: res.data[i].data.alarm[j].value_time * 1000,
                                })

                                newDatasets.push({
                                    label: 'Alarm ' + res.data[i].data.alarm[j].type + j,
                                    data: [{ t: res.data[i].data.alarm[j].value_time * 1000, y: res.data[i].data.alarm[j].value }],
                                    borderWidth: 5,
                                    borderColor: "#ff0000",
                                    //backgroundColor: '#007bff',
                                    fill: false,
                                    pointRadius: 2,
                                    // hoverRadius: 0,
                                })
                            }
                        }

                        // Push alarm configurations
                        for (let j in res.data[i].data.config) {
                            if (res.data[i].data.config[j].configuration.crit_high !== 999) {
                                if (res.data[i].data.config[j].time_disabled === 0) {
                                    res.data[i].data.config[j].time_disabled = Math.floor(this.state.time.end / 1000);
                                }

                                // Add critical high
                                newDatasets.push({
                                    label: 'Critical High' + j,
                                    data: [{ t: res.data[i].data.config[j].time_added * 1000, y: res.data[i].data.config[j].configuration.crit_high }, { t: res.data[i].data.config[j].time_disabled * 1000, y: res.data[i].data.config[j].configuration.crit_high }],
                                    borderWidth: 1,
                                    borderDash: [2, 2],
                                    borderColor: "#ff0000",
                                    //backgroundColor: '#007bff',
                                    fill: false,
                                    pointRadius: 0,
                                    hoverRadius: 0,
                                })
                                // Add high
                                if (res.data[i].data.config[j].configuration.crit_high !== 999) {
                                    if (res.data[i].data.config[j].time_disabled === 0) {
                                        res.data[i].data.config[j].time_disabled = Math.floor(this.state.time.end / 1000);
                                    }

                                    newDatasets.push({
                                        label: 'High' + j,
                                        data: [{ t: res.data[i].data.config[j].time_added * 1000, y: res.data[i].data.config[j].configuration.high }, { t: res.data[i].data.config[j].time_disabled * 1000, y: res.data[i].data.config[j].configuration.high }],
                                        borderWidth: 1,
                                        borderDash: [5, 20],
                                        borderColor: "#ff0000",
                                        fill: false,
                                        pointRadius: 0,
                                        hoverRadius: 0,
                                    })
                                }
                                // Add low
                                if (res.data[i].data.config[j].configuration.crit_high !== 999) {
                                    if (res.data[i].data.config[j].time_disabled === 0) {
                                        res.data[i].data.config[j].time_disabled = Math.floor(this.state.time.end / 1000);
                                    }

                                    newDatasets.push({
                                        label: 'Low' + j,
                                        data: [{ t: res.data[i].data.config[j].time_added * 1000, y: res.data[i].data.config[j].configuration.low }, { t: res.data[i].data.config[j].time_disabled * 1000, y: res.data[i].data.config[j].configuration.low }],
                                        borderWidth: 1,
                                        borderDash: [5, 20],
                                        borderColor: "#0000ff",
                                        //backgroundColor: '#007bff',
                                        fill: false,
                                        pointRadius: 0,
                                        hoverRadius: 0,

                                    })
                                }
                                // Add critical low
                                if (res.data[i].data.config[j].configuration.crit_high !== 999) {
                                    if (res.data[i].data.config[j].time_disabled === 0) {
                                        res.data[i].data.config[j].time_disabled = Math.floor(this.state.time.end / 1000);
                                    }

                                    newDatasets.push({
                                        label: 'Critical Low' + j,
                                        data: [{ t: res.data[i].data.config[j].time_added * 1000, y: res.data[i].data.config[j].configuration.crit_low }, { t: res.data[i].data.config[j].time_disabled * 1000, y: res.data[i].data.config[j].configuration.crit_low }],
                                        borderWidth: 1,
                                        borderDash: [2, 2],
                                        borderColor: "#0000ff",
                                        //backgroundColor: '#007bff',
                                        fill: false,
                                        pointRadius: 0,
                                        hoverRadius: 0,

                                    })
                                }
                            }
                        }
                        //console.log(newDatasets)
                        res.data[i].data.datasets = newDatasets;
                    }

                    this.setState({
                        profiles: res.data
                    }, () => {
                        // console.log(this.state.profiles[0])
                    })
                })
                .catch(error => {
                    console.log(error)
                    navigate("/login/")
                })
        }

    }

    dateHandler = (end, start) => {
        this.setState({
            time: {
                start: start,
                end: end
            }
        }, () => {
            this.getProfiles();
            this.getDetectDoor();
        })
    }

    render() {
        const profiles = this.state.profiles;
        const chartRender = [];
        for (var profile of profiles) {
            chartRender.push(
                <LineGraph key={profile.id} data={profile} time={this.state.time} />
            );
        }

        return (
            <Layout>
                {/* <Button onClick={this.handleClick}>Log</Button> */}
                <div className={this.state.ID ? "d-none " : "d-inline"}>
                    <Row className="justify-content-md-center">
                        <Card className="text-center" style={{ width: '18rem' }}>
                            <Card.Header>Not logged in</Card.Header>
                        </Card>
                    </Row>
                </div>
                <div className={this.state.ID ? "d-inline " : "d-none"}>
                    <div>
                        <DatepickerComponent handler={this.dateHandler} time={this.state.time} />
                        {chartRender}
                    </div>
                </div>
            </Layout>
        )
    }
}