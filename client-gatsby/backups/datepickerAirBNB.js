import React, { Component } from 'react'
import { Card, Container, Row, Button, Col} from 'react-bootstrap'
import moment from 'moment'

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from 'react-dates';


export default class DatepickerComponent extends Component {
    state = {
        focused: null,
    }

    handleClick = () => {
        console.log(this.props)
        console.log(this.state)
    }

    changeDate = (amount, unit) => {
        this.props.handler(this.props.time.end.add(amount, unit), this.props.time.start.add(amount, unit))
    }

    handleDateChange = event => {
        let dayshift = event.diff(this.props.time.start, 'days');
        this.changeDate(dayshift, 'days')
    }

    render() {
        return (
            <div>
                    <Button onClick={this.handleClick}>this.state :) </Button>
                    <Row className="mb-3 justify-content-md-center">
                        
                            <Button onClick={() => this.changeDate(-1, "days")}>Previous day</Button>
                            <span className="mx-3">
                                {this.props.time.end.format('dddd')} <br />
                                {this.props.time.end.format('MMMM DD YYYY')}
                            </span>
                            <Button onClick={() => this.changeDate(1, "days")}>Next day</Button>

                            <SingleDatePicker
                            // showClearDate={true}
                            inputIconPosition="after"
                            small={true}
                            block={false}
                            numberOfMonths={1}
                            date={this.props.time.start}
                            onDateChange={date => this.handleDateChange(date)}
                            focused={this.state.focused}
                            isOutsideRange={() => false}
                            onFocusChange={({ focused }) =>
                                this.setState({ focused })
                            }
                            hideKeyboardShortcutsPanel={true}
                            displayFormat="DD/MM/YYYY"
                            />
                        
                    </Row>
            </div>
        )
    }
}