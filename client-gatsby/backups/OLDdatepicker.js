import React, { Component } from 'react'
import { Card, Container, Row } from 'react-bootstrap'
import moment from 'moment'

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';


export default class DatepickerComponent extends Component {

    state = {
        startDate: moment().subtract(1, "day"),
        endDate: moment(),
    }

    handleClick = () => {
        this.props.handler(this.state.startDate, this.state.endDate);
    }

    componentDidMount() {
        this.props.handler(this.state.startDate, this.state.endDate);
    }

    handleDateChange = event => {
        this.setState({
            startDate: event.startDate,
            endDate: event.endDate,
        })
        this.props.handler(event.startDate, event.endDate);
        
    }

    render() {
        return (
            <div>
                <Container>
                    <Row className="mb-3">
                        <Card>
                            <Card.Header>Time interval</Card.Header>
                            <Card.Body>
                                {/* <button onClick={this.handleClick}>Knap</button> */}
                                <DateRangePicker
                                    startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                                    startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                                    endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                                    endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                                    //onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                                    onDatesChange={this.handleDateChange}
                                    focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                                    onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                                    displayFormat="DD MMM YYYY"
                                    isOutsideRange={function noRefCheck(){}}
                                />
                                {/* <Button className="ml-3" onClick={this.handleClick}>Submit</Button> */}
                            </Card.Body>
                        </Card>
                    </Row>
                </Container>
            </div>
        )
    }
}