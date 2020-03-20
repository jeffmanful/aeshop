import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { ProductEntity } from '../types'
import { ReducerContext } from '../ProductsContext'
import likedIcon from '../liked.svg'
import unlikedIcon from '../unliked.svg'

const ProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  padding: 1rem;
  transition: 0.4s all;

  p {
    font-weight: bold;
    margin: 5px;
  }

  img {
    cursor: pointer;
  }
`
ProductWrapper.displayName = 'Product'

const ProductImage = styled.img`
  max-width: 100%;
  cursor: pointer;
  transition: 0.3s all;

  &:hover {
    transform: translateY(-2px);
  }
`
ProductImage.displayName = 'ProductImage'

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`
ProductDetails.displayName = 'ProductDetails'

const Price = styled.p`
  font-size: 20px;
`
Price.displayName = 'Price'

const Sold = styled.p`
  color: red;
`
Sold.displayName = 'Sold'

const Product: React.FC<ProductEntity> = ({
  title,
  description,
  sold,
  img,
  price,
  id,
  liked,
  size,
  brand
}): JSX.Element => {
  const dispatch = useContext(ReducerContext)
  const history = useHistory()

  const formattedPrice = `£${price}`
  const currentIcon = liked ? likedIcon : unlikedIcon
  return (
    <ProductWrapper data-testid="product">
      <ProductImage
        src={img}
        alt={description}
        onClick={() => history.push(`/product/${id}`)}
      />
      <div
        className="row"
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <ProductDetails>
          <p>{title}</p>
          <p>{size}</p>
          <p>{brand}</p>
          {sold ? <Sold>SOLD</Sold> : <Price>{formattedPrice}</Price>}
        </ProductDetails>
        <img
          data-testid={currentIcon}
          role="button"
          src={currentIcon}
          alt="like icon"
          onClick={() => dispatch({ type: 'TOGGLE_PRODUCT_LIKED', id })}
        />
      </div>
    </ProductWrapper>
  )
}

export default Product
