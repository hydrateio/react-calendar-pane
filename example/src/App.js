import React, { Component } from 'react'
import Calendar from 'react-calendar-pane'
import moment from 'moment'
import momentFr from 'moment/locale/fr' // eslint-disable-line

const customDayRenderer = ({ handleClick, date }) => { // eslint-disable-line
  return (
    <a
      className='Day-inner'
      href={'#' + date.format('YYYY-MM-DD')}
      onClick={() => handleClick(date)}
    >
      {date.format('D')}
    </a>
  )
}

export default class Example extends Component {
  onSelect(date, previousDate, currentMonth) {
    if (moment(date).isSame(previousDate)) {
      console.info('onSelect: false', date)
      return false
    } else if (currentMonth.isSame(date, 'month')) {
      console.info('onSelect: true', date)
      return true
    } else {
      console.info('onSelect: none', date)
    }
  }

  render() {
    let dayClasses = function(date) {
      let day = date.isoWeekday()
      if (day === 6 || day === 7) {
        return ['weekend']
      }
      return []
    }
    return (
      <div>
        <p>Calendar with weekend</p>
        <Calendar onSelect={this.onSelect} dayClasses={dayClasses} />
        <p>Calendar without nav</p>
        <Calendar
          onSelect={this.onSelect}
          dayClasses={dayClasses}
          useNav={false}
        />
        <p>French calendar</p>
        <Calendar
          onSelect={this.onSelect}
          dayClasses={dayClasses}
          locale='fr'
          startOfWeekIndex={1}
        />
        <p>Calendar with custom day renderer</p>
        <Calendar onSelect={this.onSelect} dayRenderer={customDayRenderer} />
        <p>Calendar prevents future date selection</p>
        <Calendar onSelect={this.onSelect} preventFutureDates />
      </div>
    )
  }
}
