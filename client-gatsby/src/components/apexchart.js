import React, { Component } from 'react';
import ComponentWithChart from './chartcomponent';
// import moment from 'moment';
import equal from 'fast-deep-equal';
// import download from '/static/logomark.png'

import { Button, Row, Col, Card } from "react-bootstrap"

export default class LineGraph extends Component {

    handleClick = () => {
        console.log(this.props)
        console.log(this.state)
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
            normal: {
                ...this.state.normal,
                options: {
                    ...this.state.normal.options,
                    annotations: {
                        ...this.state.normal.options.annotations,
                        xaxis: detections
                    }
                }
            }
        })
    }

    componentDidMount() {
        
        this.generateAxis(this.props.graph.normal)
        setTimeout(() => {this.updateDoorOpenings(); }, 2000);
    }

    componentDidUpdate(prevProps) {
        if (!equal(this.props, prevProps)) {
            this.generateAxis(this.props.graph.normal)
            setTimeout(() => {this.updateDoorOpenings(); }, 2000);
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
                        return parseFloat(value.toFixed(1)) + graph.unit
                    }
                },
                ...(units.includes(graph.unit) && { show: false }),
                ...(graph.unit !== '°C' && { opposite: true })
            })
            units.push(
                graph.unit
            )

            if (graph.unit === '%') {
                this.setState({
                    humidity: true
                })
            }
        }
        this.setState({
            normal: {
                ...this.state.normal,
                options: {
                    ...this.state.normal.options,
                    yaxis: newYaxis
                }
            }
        })
    }

    state = {
        normal: {
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
                    toolbar: { 
                        show: true,
                        tools: {
                            selection: false,
                            zoom: false,
                            pan: false,
                            zoomin: false,
                            zoomout: false,
                            reset: false,
                        }
                     }
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
                            formatter: (seriesName, object) => this.props.graph.normal[object.seriesIndex].device_name,
                        },
                    }
                }
            }
       },
       CO2: {
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
                toolbar: { 
                    show: true,
                    tools: {
                        selection: false,
                        zoom: false,
                        pan: false,
                        zoomin: false,
                        zoomout: false,
                        reset: false,
                    }
                 }
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
            yaxis: {
                labels: {
                    formatter: (value) => {
                        return parseFloat(value.toFixed(1)) + " %"
                    }
                },
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
                        formatter: (seriesName, object) => this.props.graph.CO2[object.seriesIndex].device_name,
                    },
                }
            }
        }
       },
       diffPressure: {
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
                toolbar: { 
                    show: true,
                    tools: {
                        selection: false,
                        zoom: false,
                        pan: false,
                        zoomin: false,
                        zoomout: false,
                        reset: false,
                    }
                 }
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
            yaxis: {
                labels: {
                    formatter: (value) => {
                        return parseFloat(value.toFixed(1)) + " Pa"
                    }
                },
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
       }
    };

    render() {
        return (
            <div>
                {/* <Button onClick={this.handleClick}>Log state</Button> */}
                

                <Row className={this.props.graph.normal.length > 0 ? "d-block " : "d-none"}>
                    <Col>
                        <Card className="mb-3 w-100">
                            <Card.Header>Temperature {this.state.humidity ? <span>and humidity</span> : null } </Card.Header>
                            <Card.Body>

                            {this.props.graph.normal.length > 0 ? <ComponentWithChart options={this.state.normal.options} series={this.props.graph.normal} /> : null}

                            </Card.Body>

                        </Card>
                    </Col>
                </Row>

                <Row className={this.props.graph.CO2 ? "d-block " : "d-none"}>
                    <Col>
                        <Card className="mb-3 w-100">
                            <Card.Header>
                                CO2
                                
                            </Card.Header>
                            <Card.Body>
                            {this.props.graph.CO2 ? <ComponentWithChart options={this.state.CO2.options} series={this.props.graph.CO2} /> : null}
                            </Card.Body>

                        </Card>
                    </Col>
                </Row>

                <Row className={this.props.graph.diffPressure ? "d-block " : "d-none"}>
                    <Col>
                        <Card className="mb-3 w-100">
                            <Card.Header>
                                Differential Pressure
                                
                            </Card.Header>
                            <Card.Body>
                            {this.props.graph.diffPressure ? <ComponentWithChart options={this.state.diffPressure.options} series={this.props.graph.diffPressure} /> : null}
                            </Card.Body>

                        </Card>
                    </Col>
                </Row>

                
            </div>
        )
    }

}
