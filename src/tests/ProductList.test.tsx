import React from 'react'
import ProductList from '../components/ProductList'
import { ProductsContext } from '../ProductsContext'
import { ProductsState } from '../types'
import { render, fireEvent } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'

export const state: ProductsState = {
  products: [
    {
      id: 1,
      title: 'test',
      description: 'test',
      img: 'test',
      price: '',
      sold: false,
      liked: false,
      seller: '',
      slug: '',
    },
    {
      id: 2,
      title: 'test',
      description: 'test',
      img: 'test',
      price: '',
      sold: true,
      liked: false,
      seller: '',
      slug: '',
    },
    {
      id: 3,
      title: 'test',
      description: 'test',
      img: 'test',
      price: '',
      sold: true,
      liked: false,
      seller: '',
      slug: '',
    },
  ],
}

const emptyState = {
  products: [],
}

const history = createMemoryHistory()

const withRouter = (state: ProductsState) =>
  render(
    <Router history={history}>
      <ProductsContext.Provider value={state}>
        <ProductList />
      </ProductsContext.Provider>
    </Router>
  )

test('ProductList renders', () => {
  const { asFragment } = withRouter(emptyState)

  expect(asFragment()).toMatchSnapshot()
})

test('ProductList renders ProductList', () => {
  const { getByTestId } = render(
    <ProductsContext.Provider value={emptyState}>
      <ProductList />
    </ProductsContext.Provider>
  )
  expect(getByTestId('product-list')).toBeTruthy()
})

test('ProductList renders product', () => {
  const { getAllByTestId } = withRouter(state)

  expect(getAllByTestId('product')).toHaveLength(3)
})

test('Product list shows all products', () => {
  const { getAllByTestId } = withRouter(state)

  expect(getAllByTestId('product')).toHaveLength(3)
})

test('Product list hides sold products', () => {
  const { getByTestId, getAllByTestId } = withRouter(state)

  expect(getAllByTestId('product')).toHaveLength(3)

  fireEvent.click(getByTestId('hide-sold-items'))

  expect(getAllByTestId('product')).toHaveLength(1)
})
