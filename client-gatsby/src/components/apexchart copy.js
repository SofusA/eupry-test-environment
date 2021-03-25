import React, { Component } from 'react';
import ComponentWithChart from './chartcomponent';
// import moment from 'moment';
import equal from 'fast-deep-equal';

import { Button } from "react-bootstrap"

export default class LineGraph extends Component {

    handleClick = () => {
        this.generateAxis(this.props.data.graph)
    }

    updateDoorOpenings = () => {
        let detections = [];
        for (const detection of this.props.data.door_opening) {
            let newDetection = {
                x: detection.time * 1000,
                strokeDashArray: 0,
                borderColor: '#FF4560',
                label: {
                    style: {
                        color: '#fff',
                        background: '#FF4560'
                    },
                    text: 'Door open'
                }
            }
            detections.push(newDetection);
        }

        this.setState({
            options: {
                ...this.state.options,
                annotations: {
                    xaxis: detections
                }
            }
        })
    }

    componentDidMount() {
        this.updateDoorOpenings();
        this.generateAxis(this.props.data.graph)
    }

    componentDidUpdate(prevProps) {
        if (!equal(this.props, prevProps)) {
            this.updateDoorOpenings();
            this.generateAxis(this.props.data.graph)
        }

    }

    generateAxis = (graphs) => {
        let newYaxis = [];
        let units = [];
        for (let graph of graphs) {
            newYaxis.push({
                seriesName: graph.source,
                labels: {
                    formatter: (value) => {
                        return value.toFixed(1) + graph.unit
                    }
                },
                ...(units.includes(graph.unit) && { show: false }),
                ...(graph.unit != '°C' && { opposite: true })
            })
            units.push(
                graph.unit
            )
        }
        this.setState({
            options: {
                ...this.state.options,
                yaxis: newYaxis
            }
        })

    }

    state = {
        options: {
            chart: {
                animations: {
                    enabled: false,
                    easing: 'easeinout',
                    speed: 800,
                    animateGradually: {
                        enabled: false,
                        delay: 150
                    },
                    dynamicAnimation: {
                        enabled: false,
                        speed: 350
                    },
                    initialAnimation: {
                        enabled: false
                    },
                },
                height: 380,
                width: "100%",
                toolbar: { show: false }
            },
            xaxis: {
                type: 'datetime',
                labels: {
                    datetimeUTC: false
                },
                tooltip: {
                    enabled: false
                }
            },
            stroke: {
                width: 3,
                curve: 'smooth',
            },
            legend: {
                show: false
            },
            tooltip: {
                x: {
                    format: 'dddd MMM dd HH:mm'
                },
                y: {
                    title: {
                        formatter: (seriesName, object) => this.props.data.graph[object.seriesIndex].device_name,
                    },
                }
            }
        }
    };

    render() {
        return (
            <div>
                {/* <Button onClick={this.handleClick}>Log state</Button> */}
                <ComponentWithChart options={this.state.options} series={this.props.data.graph} />
            </div>
        )
    }

}
