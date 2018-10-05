import React from 'react'
import { render, cleanup } from 'react-testing-library'
import 'jest-dom/extend-expect'
import moment from 'moment'

import Calendar from './'

afterEach(cleanup)

describe('Calendar', () => {
  it('is truthy', () => {
    expect(Calendar).toBeTruthy()
  })

  it('prevents selection of future dates', () => {
    const { getByText } = render(<Calendar onSelect={() => {}} preventFutureDates />)

    // next day should be disabled
    const date = moment()
    const nextDay = date.add(1, 'days')
    const nextNextDay = nextDay.add(1, 'days')

    expect(getByText(nextDay.format('D'))).toHaveAttribute('disabled')
    expect(getByText(nextNextDay.format('D'))).toHaveAttribute('disabled')

    // next month arrow should be disabled
    expect(getByText('»')).toHaveAttribute('disabled')
  })
})
