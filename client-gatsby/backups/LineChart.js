import React, { Component } from 'react'
import { Line } from 'react-chartjs-2';
import { Card, Button } from 'react-bootstrap'
import moment from 'moment'

import { Download } from 'react-feather';
import { CSVLink } from "react-csv";

const options = {
    
    animation: false,
    legend: {
        display: false
    },
    scales: {
        xAxes: [{
            type: 'time',
            time: {
                // round: 'hour',                                                                                                                                                                            
                tooltipFormat: 'YYYY-MM-DD HH:mm',
                displayFormats: {
                    second: 'HH:mm:ss',
                    minute: 'HH:mm',
                    hour: 'HH',
                    day: 'MMM D'
                }
            },
            display: true,
            scaleLabel: {
                display: false,
                labelString: 'Date'
            }
        }],
        yAxes: [{
            display: true,
            scaleLabel: {
                display: false,
                labelString: 'PA'
            },
            ticks: {
                min: undefined,
                max: undefined,
                callback: function (value, index, values) {
                    return value + " " + "°C";
                }
            }
        }]
    },
}

export default class LineGraph extends Component {
    constructor(props){
        super(props);
        this.state = {
            csvDatus:"",
            hover: false,
        }
    }
    
    componentDidMount() {
        this.updateUnits();

    }

    componentDidUpdate() {
        this.updateUnits();
    }

    updateUnits = () => {
        const unit = this.props.data.contents.unit;
        let lineChart = this.reference.chartInstance;

        lineChart.options.scales.yAxes[0].ticks.min = this.props.data.contents.min;
        lineChart.options.scales.yAxes[0].ticks.max = this.props.data.contents.max;

        if (unit) {
            lineChart.options.scales.yAxes[0].ticks.callback =
                function (value, index, values) {
                    return value + " " + unit;
                }
        }

        lineChart.options.scales.xAxes[0].ticks.min = this.props.time.start;
        lineChart.options.scales.xAxes[0].ticks.max = this.props.time.end;

        lineChart.update();
    }

    handleClick = () => {
        console.log(this.props.data.data.datasets)
    }

    render() {
        return (
            <div>
                {/* <Button onClick={this.handleClick}>Log</Button> */}
                <Card className="mb-3">
                    <Card.Header>{this.props.data.name}</Card.Header>
                    <div className="p-5">
                        <Line ref={(reference) => this.reference = reference} data={this.props.data.data} options={options} height={75} />
                    </div>
                </Card>
            </div>
        )
    }
}
