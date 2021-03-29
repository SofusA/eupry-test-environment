import React, { Component } from 'react'
import { Button, Popover, OverlayTrigger, Table } from "react-bootstrap"
import { Bell } from 'react-feather';
import axios from 'axios';
import equal from 'fast-deep-equal';

import { url } from "../static/url.js"

export default class alarmConfig extends Component {

    state = {
        shadows: {}
    }

    componentDidMount() {
        this.loadSettings()
    }

    setSettings = (shadow) => {
        let checks = { normal: true, CO2: false, diffPressure: false };
        this.setState({
            shadows: {
                ...this.state.shadows,
                [shadow]: checks
            }
        })
    }

    loadSettings = () => {
        for (const shadow of this.props.status) {
            let getUrl = url + "/api/getsettings?loc=" + this.props.loc + "&pro= " + this.props.pro + "&shadow=" + shadow.shadow_id
            axios.get(getUrl)
                .then(res => {
                    if (res.data.length === 0) {
                        this.setSettings(shadow.shadow_id)
                    } else {
                        const parsedData = JSON.parse(res.data.replaceAll("/", "\""))
                        // this.props.handler(shadow.shadow_id, parsedData);
                        this.setState({
                            shadows: {
                                ...this.state.shadows,
                                [shadow.shadow_id]: parsedData
                            }
                        })
                    }
                })
                .catch(error => {
                    console.log(error)
                });
        }



    }

    componentDidUpdate(prevProps) {
        if (!equal(this.props, prevProps)) {
            this.loadSettings()
        }

    }

    handleUnitCheckboxes = (shadow_id, type) => {
        const newCheckState = !this.state.shadows[shadow_id][type];
        const stateChange = this.state.shadows[shadow_id];

        stateChange[type] = newCheckState;

        let types = Object.keys(stateChange);
        if (newCheckState === true) {
            for (let crawlType of types) {
                if (crawlType !== type) {
                    stateChange[crawlType] = false;
                }
            }
        } else {
            stateChange.normal = true;
        }

        if (type === "normal" && newCheckState === false) {
            // Do nothhing :) 
        } else {
            let getUrl = url + "/api/setin" +
                "?loc=" + this.props.loc +
                "&pro=" + this.props.pro +
                "&shadow=" + shadow_id +
                "&data=" + JSON.stringify(stateChange);

            axios.get(getUrl)
                .then(res => {
                    // this.props.handler(shadow_id, stateChange);
                    this.setState({
                        shadows: {
                            ...this.state.shadows,
                            [shadow_id]: stateChange
                        }
                    })
                })
                .catch(error => {
                    console.log(error)
                });
        }
    }

    handleClick = () => {
        console.log(this.state)
    }

    collectDataloggers = () => {
        if (this.state.shadows) {
            return this.props.status.map((datalogger, index) => {
                return (
                    <tr key={"alarmconfig" + datalogger.shadow_id}>
                        <td>{datalogger.device_name}</td>
                        {!this.state.shadows[datalogger.shadow_id] ? null : <td><input type='checkbox' checked={this.state.shadows[datalogger.shadow_id].normal} id={datalogger.device_name + "_normal"} onChange={event => this.handleUnitCheckboxes(datalogger.shadow_id, "normal")} /></td>}
                        {!this.state.shadows[datalogger.shadow_id] ? null : <td><input type='checkbox' checked={this.state.shadows[datalogger.shadow_id].CO2} id={datalogger.device_name + "_CO2"} onChange={event => this.handleUnitCheckboxes(datalogger.shadow_id, "CO2")} /></td>}
                        {!this.state.shadows[datalogger.shadow_id] ? null : <td><input type='checkbox' checked={this.state.shadows[datalogger.shadow_id].diffPressure} id={datalogger.device_name + "_diffPressure"} onChange={event => this.handleUnitCheckboxes(datalogger.shadow_id, "diffPressure")} /></td>}
                    </tr>
                )
            })
        }

    }


    render() {
        const popover = (
            <Popover id="popover-basic" width={400}>
                <Popover.Title as="h3">Alarm configuration</Popover.Title>
                <Popover.Content>
                    <Table striped className="text-center">
                        <thead>
                            <tr>
                                <th> </th>
                                <th>Greyzone duration</th>
                                <th colspan="4">Temperatur</th>
                                <th colspan="4">Humidity</th>
                                <th colspan="4">CO2</th>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td>Critical High</td>
                                <td>High</td>
                                <td>Critical Low</td>
                                <td>Low</td>
                                <td>Critical High</td>
                                <td>High</td>
                                <td>Critical Low</td>
                                <td>Low</td>
                                <td>Critical High</td>
                                <td>High</td>
                                <td>Critical Low</td>
                                <td>Low</td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.collectDataloggers()}
                        </tbody>
                    </Table>
                </Popover.Content>
            </Popover>
        );

        return (
            <span>

                {/* <Button onClick={this.handleClick}>Settings state</Button> */}

                <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
                    <Button variant="link"><Bell size={18} /></Button>
                </OverlayTrigger>
            </span>
        )
    }
}