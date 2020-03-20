import React, { useContext } from 'react'
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom'
import { ProductsContext } from '../ProductsContext'

const ProductViewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  img {
    max-width: 100%;
    width: 400px;
  }

  .description {
    width: 80%;
  }
`;

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

  const { img, description, seller, price, sold, title } = product
  return (
    <div className="flex-column">
      <Link to="/">Back to product list</Link>
      <ProductViewWrapper>
        <img src={img} alt={title} />
        <div>
          <h2>{title}</h2>
          <p className="description">{description}</p>
          <h3>{seller}</h3>
          <p>{price}</p>
          {sold && <p>SOLD</p>}
        </div>
      </ProductViewWrapper>
    </div>
  )
}

export default ProductView
