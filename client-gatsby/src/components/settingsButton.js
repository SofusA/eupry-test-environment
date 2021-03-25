import React, { Component } from 'react'
import { Button, Popover, OverlayTrigger, Form, Table } from "react-bootstrap"
import { Settings } from 'react-feather';
import axios from 'axios';
import equal from 'fast-deep-equal';

import { url } from "../../static/url.js"

export default class SettingsButton extends Component {

    state = {
        settings: {
            doorDetection: false
        }
    }

    componentDidMount() {
        this.loadSettings()
    }

    loadSettings = () => {
        let URL = url;
        URL = URL + "/api/setout" +
            "?loc=" + this.props.loc +
            "&pro=" + this.props.pro;


        //checking backend if settings
        axios.get(URL)
            .then(res => {
                let parseData = {};
                if (typeof res.data.data !== "undefined") {
                    parseData = res.data.data;
                    parseData = JSON.parse(parseData.replaceAll("/", "\""));
                } else {
                    parseData = {settings: {dataloggers: {}}};
                    for (const datalogger of this.props.dataloggers) {
                        parseData.settings.dataloggers[datalogger.device_id] = {normal: true, CO2: false, diffPressure: false}
                        // console.log(datalogger);
                    }
                }
                // console.log(parseData)
                this.setState({
                    settings: parseData.settings
                }, () => {

                    // if no settings, set all to normal
                    if (!this.state.settings.dataloggers) {
                        let dataloggers = {};
                        for (let datalogger of this.props.dataloggers) {
                            dataloggers[datalogger.device_id] = { normal: true, CO2: false, diffPressure: false }
                        }
                        this.setState(prevState => ({
                            ...prevState,
                            settings: {
                                ...prevState.settings,
                                dataloggers: dataloggers
                            }
                        })
                        )
                    }

                    // Report back to parrent :) 
                    // console.log(this.state.settings)
                    this.props.handler(this.state.settings);

                });
            })
            .catch(error => {
                console.log(error)
            });

        console.log("settingsButton.js -> loadSettings(): " + URL)


    }

    componentDidUpdate(prevProps) {
        if (!equal(this.props, prevProps)) {
            this.loadSettings()
        }

    }


    handleUnitCheckboxes = (id, type) => {
        const newCheckState = !this.state.settings.dataloggers[id][type];
        const stateChange = this.state;
        this.props.handler(stateChange.settings);

        let types = ["normal", "CO2", "diffPressure"];

        if (newCheckState === true) {
            for (let crawlType of types) {
                if (crawlType !== type) {
                    stateChange.settings.dataloggers[id][crawlType] = false;
                }
            }
        } else {
            stateChange.settings.dataloggers[id].normal = true;
        }

        if (type === "normal" && newCheckState === false) {
            // Do nothhing :) 
        } else {
            stateChange.settings.dataloggers[id][type] = newCheckState;

            let URL = url;
            URL = URL + "/api/setin" +
                "?loc=" + this.props.loc +
                "&pro=" + this.props.pro +
                "&data=" + JSON.stringify(stateChange);

            axios.get(URL)
                .then(res => {
                    this.setState(prevState => ({
                        ...prevState,
                        settings: {
                            ...prevState.settings,
                            dataloggers: stateChange.settings.dataloggers
                        }
                    })
                    )
                })
                .catch(error => {
                    console.log(error)
                });

            console.log("settingsButton.js -> handleUnitCheckboxes(): " + URL)
        }


    }

    handleSettings = (type) => {
        const newCheckState = !this.state.settings[type];
        const stateChange = this.state;
        stateChange.settings[type] = newCheckState;
        this.props.handler(stateChange.settings);

        let URL = url;
        URL = URL + "/api/setin" +
            "?loc=" + this.props.loc +
            "&pro=" + this.props.pro +
            "&data=" + JSON.stringify(stateChange);

        axios.get(URL)
            .then(res => {
                this.setState({
                    settings: stateChange.settings
                });
            })
            .catch(error => {
                console.log(error)
            });

        console.log("settingsButton.js -> handleSettings(): " + URL)


    }

    handleClick = () => {
        console.log(this.state)
    }

    collectDataloggers = () => {
        if (this.state.settings.dataloggers) {
            return this.props.dataloggers.map((datalogger, index) => {
                // console.log(datalogger.device_id)
                return (
                    <tr key={"settingsButton" + datalogger.device_id}>
                        <td>
                            {datalogger.device_name}
                        </td>
                        <td>
                            <input type='checkbox' checked={this.state.settings.dataloggers[datalogger.device_id].normal} id={datalogger.device_name + "_normal"} onChange={event => this.handleUnitCheckboxes(datalogger.device_id, "normal")} />
                        </td>
                        <td>
                            <input type='checkbox' checked={this.state.settings.dataloggers[datalogger.device_id].CO2} id={datalogger.device_name + "_CO2"} onChange={event => this.handleUnitCheckboxes(datalogger.device_id, "CO2")} />
                        </td>
                        <td>
                            <input type='checkbox' checked={this.state.settings.dataloggers[datalogger.device_id].diffPressure} id={datalogger.device_name + "_diffPressure"} onChange={event => this.handleUnitCheckboxes(datalogger.device_id, "diffPressure")} />
                        </td>
                    </tr>
                )
            })
        }
    }


    render() {
        const popover = (
            <Popover id="popover-basic">
                <Popover.Title as="h3">Settings</Popover.Title>
                <Popover.Content >
                    <Table striped className="text-center">
                        <tbody key={"settingsButton" + this.props.pro}>
                            <tr>
                                <td>
                                    Door detection
                            </td>
                                <td>
                                    <input type='checkbox' checked={this.state.settings.doorDetection} id={"doorDetection"} onChange={event => this.handleSettings("doorDetection")} />
                                </td>
                            </tr>

                        </tbody>
                    </Table>

                    <Table striped className="text-center">
                        <thead>
                            <tr>
                                <th>Logger</th>
                                <th>Normal</th>
                                <th>CO2</th>
                                <th>Differential Pressure</th>
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

                {/* <Button onClick={this.handleClick}>get table</Button> */}

                <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
                    <Button variant="link"><Settings size={18} /></Button>
                </OverlayTrigger>



                {/* {this.state.detection} */}

            </span>
        )
    }
}