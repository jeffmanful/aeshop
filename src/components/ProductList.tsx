import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import Box from './Box'
import Product from './Product'
import { ProductsContext } from '../ProductsContext'
import { ProductEntity, Products } from '../types'

const ProductListWrapper = styled.div`
  width: 95vw;
`

const ButtonFilter = styled.button`
  border-radius: 2px;
  color: black;
  border: 1px solid black;
  font-size: 1em;
  cursor: pointer;
  padding: 0.4rem 1rem;
  margin: 1rem;
  transition: 0.3s all;

  &:hover {
    color: white;
    background: black;
  }
`
ButtonFilter.displayName = 'ButtonFilter'

function filterBy(products: Array<ProductEntity>, type: string) {
  switch (type) {
    case 'HIDE_SOLD_ITEMS':
      return products.filter((product: ProductEntity) => !product.sold)
    case 'ALL':
    default:
      return products
  }
}

const ProductList = () => {
  const { products } = useContext(ProductsContext)
  const [filteredProducts, setFilteredProducts] = useState<Products>([])
  const [currentFilter, setCurrentFilter] = useState('ALL')

  useEffect(() => {
    setFilteredProducts(filterBy(products, currentFilter))
  }, [products, currentFilter])

  const productCount = filteredProducts?.length

  return (
    <ProductListWrapper data-testid="product-list">
      <div className="row">
        <p className="product-count">{productCount} styles</p>
        {currentFilter === 'ALL' ? (
          <ButtonFilter
            data-testid="hide-sold-items"
            onClick={() => setCurrentFilter('HIDE_SOLD_ITEMS')}
          >
            Hide sold items
          </ButtonFilter>
        ) : (
          <ButtonFilter
            data-testid="show-all-items"
            onClick={() => setCurrentFilter('ALL')}
          >
            Show all items
          </ButtonFilter>
        )}
      </div>

      <Box>
        {filteredProducts?.map((product: ProductEntity) => (
          <Product {...product} key={product.id} />
        ))}
      </Box>
    </ProductListWrapper>
  )
}
export default ProductList
