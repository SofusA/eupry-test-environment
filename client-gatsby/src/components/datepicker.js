import React, { Component, forwardRef } from 'react'
import { Row, Button} from 'react-bootstrap'
import moment from 'moment'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


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

    handleChange = event => {
        let dayshift = moment(event).diff(this.props.time.start, 'days');
        this.changeDate(dayshift, 'days')
    }

    render() {
        const ref = React.createRef()
        const CustomDateInput = forwardRef(({ onClick, value }, ref) => (
            <Button variant="link" onClick={onClick} value={value} onChange={onClick} ref={ref} className="text-dark">
                {this.props.time.start.format('dddd')} <br />
                {this.props.time.start.format('MMMM DD YYYY')}
            </Button>
        //   <input onClick={onClick} value={value} onChange={onClick} ref={ref} />
        ))

        return (
            <div>
                    {/* <Button onClick={this.handleClick}>this.state :) </Button> */}
                    <Row className="mb-3 justify-content-md-center">
                        
                            <Button onClick={() => this.changeDate(-1, "days")} className="text-dark" variant="link" >ᐸ</Button>
                            {/* <span className="mx-3">
                                {this.props.time.start.format('dddd')} <br />
                                {this.props.time.start.format('MMMM DD YYYY')}
                            </span> */}
                            <DatePicker
                                selected={this.props.time.start.valueOf()}
                                onChange={this.handleChange}
                                customInput={<CustomDateInput ref={ref} />}
                                filterDate = {(date) => {
                                    return moment() > date;
                                  }}
                            />

                            <Button onClick={() => this.changeDate(1, "days")} className={!this.props.time.start.isSame(moment(), 'day') ? "text-dark" : "invisible"} variant="link" >ᐳ</Button>
                    </Row>
            </div>
        )
    }
}