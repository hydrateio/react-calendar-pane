import React from 'react'
import { render, cleanup, fireEvent } from 'react-testing-library'
import 'jest-dom/extend-expect'
import moment from 'moment'

import Calendar from './'

afterEach(cleanup)

describe('Calendar', () => {
  it('is truthy', () => {
    expect(Calendar).toBeTruthy()
  })

  it('prevents selection of future dates', () => {
    const { getByText } = render(
      <Calendar onSelect={() => true} preventFutureDates />
    )

    const date = moment()
    const today = getByText(date.format('D'))
    const tomorrow = getByText(
      date
        .clone()
        .add(1, 'days')
        .format('D')
    )
    const yesterday = getByText(
      date
        .clone()
        .subtract(1, 'days')
        .format('D')
    )

    // tomorrow should be disabled
    expect(tomorrow).toBeDisabled()

    // next month arrow should be disabled
    expect(getByText('»')).toBeDisabled()

    // change the date back a day and confirm today is enabled
    fireEvent.click(yesterday)

    expect(today).not.toBeDisabled()
  })
})
