import React from 'react'
import Product from '../components/Product'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render, fireEvent } from '@testing-library/react'

describe('ProductTest', () => {
  const history = createMemoryHistory()
  const baseProduct = {
    title: 'title',
    description: '',
    sold: false,
    img: '',
    price: '22.22',
    id: 1,
    liked: false,
    seller: '',
    slug: '',
  }

  const { asFragment, queryByText } = render(
    <Router history={history}>
      <Product {...baseProduct} />
    </Router>
  )

  test('it renders', () => {
    expect(queryByText('title')).toBeInTheDocument()
    expect(queryByText('£22.22')).toBeInTheDocument()

    expect(queryByText('SOLD')).toBe(null)
    expect(asFragment()).toMatchSnapshot()
  })

  test('like product', () => {
    const { getByTestId, getByRole } = render(
      <Router history={history}>
        <Product {...baseProduct} />
      </Router>
    )
    expect(getByTestId('unliked.svg')).toBeInTheDocument()

    fireEvent.click(getByRole('button'))

    expect(getByTestId(/liked.svg/)).toBeInTheDocument()
  })

  test('sold product', () => {
    const soldProduct = { ...baseProduct, sold: true }
    const { queryByText } = render(
      <Router history={history}>
        <Product {...soldProduct} />
      </Router>
    )

    expect(queryByText('SOLD')).toBeInTheDocument()
  })
})
