import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { reducer, initialState } from '../ProductsContext'
import { ProductActionTypes, ProductsState } from '../types'
import '@testing-library/jest-dom/extend-expect'
import { state } from './ProductList.test'
import { ProductsProvider } from '../ProductsContext'
import ProductList from '../components/ProductList'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'

let container: any = null

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container)
  container.remove()
  container = null
})

describe('ProductsProvider', () => {
  test('ProductsProvider fetch renders prodcutList', async () => {
    const history = createMemoryHistory()
    jest.spyOn<any, any>(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(state.products),
      })
    )

    await act(async () => {
      render(
        <Router history={history}>
          <ProductsProvider>
            <ProductList />
          </ProductsProvider>
        </Router>,
        container
      )
    })

    expect(container.querySelector('.product-count').textContent).toBe(
      '3 styles'
    )
  })
})

describe('reducer', () => {
  test('returns passed products when there is no action type', () => {
    const action: ProductActionTypes = {
      type: 'TOGGLE_PRODUCT_LIKED',
      id: 1,
    }
    expect(reducer(initialState, action)).toEqual(initialState)
  })

  test('sets the product as liked', () => {
    const state: ProductsState = {
      products: [
        {
          id: 1,
          liked: false,
          price: '',
          description: '',
          title: '',
          img: '',
          sold: false,
          seller: '',
          slug: '',
        },
      ],
    }
    const action: ProductActionTypes = {
      type: 'TOGGLE_PRODUCT_LIKED',
      id: 1,
    }

    expect(state.products[0].liked).toEqual(false)

    const reducedState = reducer(state, action)
    const { products } = reducedState

    expect(products[0].liked).toEqual(true)
  })

  test('adds products to the store', () => {
    const action: ProductActionTypes = {
      type: 'ADD_PRODUCTS',
      payload: [],
    }

    const intialReducedState = reducer(initialState, action)
    expect(intialReducedState.products.length).toEqual(0)

    const actionWithPayload: ProductActionTypes = {
      type: 'ADD_PRODUCTS',
      payload: [
        {
          id: 1,
          liked: false,
          price: '',
          description: '',
          title: '',
          img: '',
          sold: false,
          seller: '',
          slug: '',
        },
        {
          id: 2,
          liked: false,
          price: '',
          description: '',
          title: '',
          img: '',
          sold: false,
          seller: '',
          slug: '',
        },
      ],
    }

    const reducedState = reducer(initialState, actionWithPayload)
    expect(reducedState.products.length).toEqual(2)
  })
})
