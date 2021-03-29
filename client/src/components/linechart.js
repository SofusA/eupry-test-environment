import React from "react";
import Chart from "react-apexcharts";

import equal from 'fast-deep-equal';
import { Row, Col, Card } from "react-bootstrap"
import { Button } from "react-bootstrap"


class App extends React.Component {
    handleClick = () => {
        console.log(this.state)
    }

    componentDidMount() {
        if (this.props.mgraph.status !== "ok") {
            this.generateAxis(this.props.mgraph)
        }
    }

    componentDidUpdate(prevProps) {
        if (!equal(this.props, prevProps)) {
            this.generateAxis(this.props.mgraph)
        }

    }

    generateAxis = (data) => {
        // push series
        let series = [];

        for (const [key, device] of Object.entries(data.devices)) {

            let temperature = [];
            let probe = [];
            let humidity = [];

            // push temp
            for (const [j, temp] of device.v.entries()) {
                if (temp) { temperature.push({ x: data.time[j] * 1000, y: temp }) }
            }
            if (temperature.length > 0) {
                series.push(
                    {
                        device_name: device.name,
                        device_id: device.device_id,
                        shadow_id: parseInt(key),
                        min: device.min_v,
                        max: device.max_v,
                        mean: device.mean_v,
                        source: "temperature",
                        data: temperature
                    }
                )
            }

            // push probe
            for (const [j, ext] of device.p.entries()) {
                if (ext) { probe.push({ x: data.time[j] * 1000, y: ext }) }
            }
            if (probe.length > 0) {
                series.push(
                    {
                        device_name: device.name,
                        device_id: device.device_id,
                        shadow_id: parseInt(key),
                        min: device.min_p,
                        max: device.max_p,
                        mean: device.mean_p,
                        source: "external",
                        data: probe
                    }
                )
            }

            // push humidity
            for (const [j, humid] of device.h.entries()) {
                if (humid) { humidity.push({ x: data.time[j] * 1000, y: humid }) }
            }
            if (humidity.length > 0) {
                series.push(
                    {
                        device_name: device.name,
                        device_id: device.device_id,
                        shadow_id: parseInt(key),
                        min: device.min_h,
                        max: device.max_h,
                        mean: device.mean_h,
                        source: "humidity",
                        data: humidity
                    }
                )
            }
        }

        // now sort based on settings
        let sortedSeries = { normal: [], CO2: [], diffPressure: [], humidity: [] };
        if (this.props.status) {
            for (const shadow of this.props.status) {
                if (shadow.type === "normal") {
                    for (const serie of series) {
                        if (shadow.shadow_id === serie.shadow_id) {
                            if (serie.source === "temperature") {
                                sortedSeries.normal.push(serie)
                            }
                            if (serie.source === "external") {
                                sortedSeries.normal.push(serie)
                            }
                            if (serie.source === "humidity") {
                                sortedSeries.humidity.push(serie)
                            }
                        }
                    }
                }
                if (shadow.type === "CO2") {
                    for (const serie of series) {
                        if (shadow.shadow_id === serie.shadow_id) {
                            if (serie.source === "temperature") {
                                sortedSeries.normal.push(serie)
                            }
                            if (serie.source === "external") {
                                sortedSeries.CO2.push(serie)
                            }
                            if (serie.source === "humidity") {
                                sortedSeries.humidity.push(serie)
                            }
                        }
                    }
                }
                if (shadow.type === "diffPressure") {
                    for (const serie of series) {
                        if (shadow.shadow_id === serie.shadow_id) {
                            sortedSeries.diffPressure.push(serie)
                        }
                    }
                }
            }
        }

        this.setState({
            series: series,
            sortedSeries: sortedSeries
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
                            formatter: (seriesName, object) => this.state.series[object.seriesIndex].device_name,
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
            <Row>
                {/* <Button onClick={this.handleClick}>this.state :) </Button> */}

                <Col lg={12}>
                    <Card className="mb-3">
                        <Card.Header>Temperature </Card.Header>
                        <Card.Body>

                            {this.state.sortedSeries ? <Chart options={this.state.normal.options} series={this.state.sortedSeries.normal} height={200} /> : null}
                        </Card.Body>

                    </Card>
                </Col>


                <Col lg={12}>
                    <Card className="mb-3">
                        <Card.Header>CO2 </Card.Header>
                        <Card.Body>
                            {this.state.sortedSeries ? <Chart options={this.state.normal.options} series={this.state.sortedSeries.CO2} height={200} /> : null}
                        </Card.Body>

                    </Card>
                </Col>
                <Col lg={12}>
                    <Card className="mb-3">
                        <Card.Header>Humidity </Card.Header>
                        <Card.Body>
                            {this.state.sortedSeries ? <Chart options={this.state.normal.options} series={this.state.sortedSeries.humidity} height={200} /> : null}
                        </Card.Body>

                    </Card>
                </Col>

            </Row >
        );
    }
}

export default App;
