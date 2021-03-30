import React, { Component } from 'react'
import { Button, Popover, OverlayTrigger, Table } from "react-bootstrap"
import { Bell } from 'react-feather';
// eslint-disable-next-line
import axios from 'axios';
import qs from 'qs'

import equal from 'fast-deep-equal/es6/react';
// eslint-disable-next-line
import { url } from "../static/url.js"

export default class alarmConfig extends Component {

    state = {
    }

    componentDidMount() {
        this.loadSettings()
    }

    loadSettings = () => {
        for (const shadow of this.props.status) {
            let config = shadow.configuration;
            config.shadow_id = shadow.shadow_id;
            config.type = shadow.type;
            config.device_name = shadow.device_name;
            this.setState({
                [shadow.shadow_id]: config
            })
        }
    }

    componentDidUpdate(prevProps) {
        if (!equal(this.props, prevProps)) {
            this.loadSettings()
        }
    }

    setSettings = () => {
        Object.values(this.state).forEach(shadow => {
            let postUrl = url + "/api/setconfig/" +
                this.props.loc +
                "/" + this.props.pro +
                "/" + shadow.shadow_id +
                "/" + this.props.id 
           
            console.log(postUrl)

            axios({
                method: 'get',
                url: 'postUrl',
                data: qs.stringify({ "l": -0.2, "h": 1.8, "L": -0.3, "H": 2, "sl": 30, "sh": 70, "sL": 28, "sH": 72 }),
                headers: {
                    'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            })

        });
    }


    handleChange = (event) => {
        const shadow = event.target.attributes.shadow.value;
        const value = event.target.value;
        // const unit = event.target.attributes.alarmunit.value;
        const type = event.target.attributes.alarmtype.value;

        this.setState({
            [shadow]: {
                ...this.state[shadow],
                [type]: value
            }
        })
    }



    handleClick = () => {
        console.log(this.state)
    }


    render() {
        const shadows = this.state;
        const alarmRender = {
            temp: [],
            hum: [],
            CO2: []
        };

        Object.values(shadows).forEach(shadow => {
            if (shadow.type === "normal" || shadow.type === "humidity") {
                alarmRender.temp.push(
                    <tr key={"alarmconfigTemp" + shadow.shadow_id}>
                        <td>{shadow.device_name}</td>
                        <td><input shadow={shadow.shadow_id} alarmunit="temp" alarmtype="crit_high" onChange={this.handleChange} className="alarmInput" type="text" value={this.state[shadow.shadow_id].crit_high} /></td>
                        <td><input shadow={shadow.shadow_id} alarmunit="temp" alarmtype="high" onChange={this.handleChange} className="alarmInput" type="text" value={this.state[shadow.shadow_id].high} /></td>
                        <td><input shadow={shadow.shadow_id} alarmunit="temp" alarmtype="crit_low" onChange={this.handleChange} className="alarmInput" type="text" value={this.state[shadow.shadow_id].crit_low} /></td>
                        <td><input shadow={shadow.shadow_id} alarmunit="temp" alarmtype="low" onChange={this.handleChange} className="alarmInput" type="text" value={this.state[shadow.shadow_id].low} /></td>
                    </tr>
                );
            }
            if (shadow.type === "humidity" || shadow.type === "CO2") {
                alarmRender.hum.push(
                    <tr key={"alarmconfigHum" + shadow.shadow_id}>
                        <td>{shadow.device_name}</td>
                        <td><input shadow={shadow.shadow_id} alarmunit="hum" alarmtype="humid_crit_high" onChange={this.handleChange} className="alarmInput" type="text" value={this.state[shadow.shadow_id].humid_crit_high} /></td>
                        <td><input shadow={shadow.shadow_id} alarmunit="hum" alarmtype="humid_high" onChange={this.handleChange} className="alarmInput" type="text" value={this.state[shadow.shadow_id].humid_high} /></td>
                        <td><input shadow={shadow.shadow_id} alarmunit="hum" alarmtype="humid_crit_low" onChange={this.handleChange} className="alarmInput" type="text" value={this.state[shadow.shadow_id].humid_crit_low} /></td>
                        <td><input shadow={shadow.shadow_id} alarmunit="hum" alarmtype="humid_low" onChange={this.handleChange} className="alarmInput" type="text" value={this.state[shadow.shadow_id].humid_low} /></td>
                    </tr>
                );
            }
            if (shadow.type === "CO2") {
                alarmRender.CO2.push(
                    <tr key={"alarmconfigCO2" + shadow.shadow_id}>
                        <td>{shadow.device_name}</td>
                        <td><input shadow={shadow.shadow_id} alarmunit="CO2" alarmtype="crit_high" onChange={this.handleChange} className="alarmInput" type="text" value={this.state[shadow.shadow_id].crit_high} /></td>
                        <td><input shadow={shadow.shadow_id} alarmunit="CO2" alarmtype="high" onChange={this.handleChange} className="alarmInput" type="text" value={this.state[shadow.shadow_id].high} /></td>
                        <td><input shadow={shadow.shadow_id} alarmunit="CO2" alarmtype="crit_low" onChange={this.handleChange} className="alarmInput" type="text" value={this.state[shadow.shadow_id].crit_low} /></td>
                        <td><input shadow={shadow.shadow_id} alarmunit="CO2" alarmtype="low" onChange={this.handleChange} className="alarmInput" type="text" value={this.state[shadow.shadow_id].low} /></td>
                    </tr>
                );
            }
        });


        const popover = (
            <Popover id="popover-basic" width={400}>
                <Popover.Title as="h3">Alarm configuration</Popover.Title>
                <Popover.Content>
                    <Table striped className="text-center">
                        <thead>
                            <tr>
                                <th colSpan="5">Temperatur</th>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Critical High</td>
                                <td>High</td>
                                <td>Critical Low</td>
                                <td>Low</td>
                            </tr>
                        </thead>
                        <tbody>
                            {alarmRender.temp}
                        </tbody>

                        <thead>
                            <tr>
                                <th colSpan="5">Humidity</th>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Critical High</td>
                                <td>High</td>
                                <td>Critical Low</td>
                                <td>Low</td>
                            </tr>
                        </thead>
                        <tbody>
                            {alarmRender.hum}
                        </tbody>
                        <thead>
                            <tr>
                                <th colSpan="5">CO2</th>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Critical High</td>
                                <td>High</td>
                                <td>Critical Low</td>
                                <td>Low</td>
                            </tr>
                        </thead>
                        <tbody>
                            {alarmRender.CO2}
                        </tbody>
                    </Table>
                    <Button onClick={this.setSettings}>Submit</Button>
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