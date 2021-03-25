import React, { Component } from 'react'
import { Card, Button } from 'react-bootstrap'
import moment from 'moment'

import {
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Scatter,
    ScatterChart,
    Tooltip,
    XAxis,
    YAxis,
    Line,
    LineChart
  } from 'recharts'

export default class LineGraph extends Component {

    handleClick = () => {
        console.log(this.props.data.graph.data)
    }

    render() {
        return (
            <div>
                <Button onClick={this.handleClick}>Log</Button>
                <ResponsiveContainer width = '100%' height = {300} >
                    <LineChart data={this.props.data.graph.data}>
                        {/* <CartesianGrid strokeDasharray="3 3" /> */}
                        <XAxis 
                            dataKey="time"
                            domain = {['auto', 'auto']}
                            name = 'Time'
                            tickFormatter = {(unixTime) => moment(unixTime).format('HH:mm Do')}
                            type = 'number'
                        />
                        
                        <YAxis yAxisId="temp" />
                        {/* <YAxis yAxisId="humid" orientation="right" /> */}

                        <Tooltip labelFormatter = {(unixTime) => moment(unixTime).format('HH:mm Do')} />
                        <Legend />

                        <Line yAxisId="temp" type="monotone" dataKey="Daniel temperature" stroke="#8884d8" />
                        <Line yAxisId="temp" type="monotone" dataKey="Peter temperature" stroke="#8884d8" />
                    </LineChart>
                </ResponsiveContainer>

            </div>
        )
    }
}
