import React, { useContext } from 'react'
import styled from 'styled-components'
import { Link, useParams } from 'react-router-dom'
import { ProductsContext } from '../ProductsContext'

const ProductViewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  img {
    max-width: 100%;
    width: 400px;
    margin: 1rem 0;
  }
`
const ProductDetails = styled.div`
  text-align: left;
  width: 70%;
  margin: 0 auto;
`

const ProductView = () => {
  const { products } = useContext(ProductsContext)
  const { id } = useParams()

  const product = id
    ? products.find(product => product.id === parseInt(id))
    : null

  if (!product) {
    return (
      <>
        <h3>There doensn't seem to be a product</h3>
        <Link to="/">Back to product list</Link>
      </>
    )
  }

  const { img, description, seller, price, sold, title, size } = product

  return (
    <div className="flex-column">
      <Link to="/">Back to product list</Link>
      <ProductViewWrapper>
        <img src={img} alt={title} />
        <ProductDetails>
          <h2>{title}</h2>
          <p className="description">{description}</p>
          <p>{size}</p>
          <h3>{seller}</h3>
          <p>{price}</p>
          {sold && <p>SOLD</p>}
        </ProductDetails>
      </ProductViewWrapper>
    </div>
  )
}

export default ProductView
