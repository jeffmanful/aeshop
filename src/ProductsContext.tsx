import React, { createContext, useEffect, useReducer, Dispatch } from 'react'
import { ProductsState, Products, ProductActionTypes } from './types'

const API_URL = ' https://5c78274f6810ec00148d0ff1.mockapi.io/api/v1/products'

export const initialState = {
  products: [],
}

export const ProductsContext = createContext<ProductsState>(initialState)
export const ReducerContext = createContext<Dispatch<ProductActionTypes>>(
  x => x
)

export const toggleLiked = (products: Products, id: number): Products =>
  products.map(product => (product.id !== id ? product : { ...product, liked: !product.liked }))

export function reducer(store: ProductsState, action: ProductActionTypes) {
  const { products } = store

  switch (action.type) {
    case 'TOGGLE_PRODUCT_LIKED':
      const { id } = action
      return { products: id ? toggleLiked(products, id) : [] }
    case 'ADD_PRODUCTS':
      const { payload } = action
      return { products: payload }
    default:
      return { products }
  }
}

export const ProductsProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(result => {
        dispatch({
          type: 'ADD_PRODUCTS',
          payload: result,
        })
      })
      .catch(err => console.log('something went wrong', err))
  }, [])

  return (
    <ProductsContext.Provider value={state}>
      <ReducerContext.Provider value={dispatch}>
        {children}
      </ReducerContext.Provider>
    </ProductsContext.Provider>
  )
}
