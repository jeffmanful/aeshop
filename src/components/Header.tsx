import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { ProductsContext, ReducerContext } from '../ProductsContext';

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  height: 80px;
`;
HeaderWrapper.displayName = 'Header';

const LikedProduct = styled.div`
  cursor: pointer;
  button {
    border: none;
    color: red;
    font-weight: bold;
    cursor: pointer;
  }
`;
LikedProduct.displayName = 'LikedProduct';

const Dropdown = styled.div<{ visible?: boolean }>`
  display: ${({ visible }) => visible ? 'flex' : 'none'};
  flex-direction: column;
  position: absolute;
  width: 250px;
  right: 0;
  background: white;
`;
Dropdown.displayName = 'Dropdown';

const DropdownItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
`;
DropdownItem.displayName = 'DropdownItem';

export const LikedProducts = () => {
  const [menuVisible, toggleMenu] = useState(false);
  const { products } = useContext(ProductsContext);
  const dispatch = useContext(ReducerContext);

  const likedProducts = products?.filter(product => product.liked);

  return (
    <LikedProduct onClick={() => toggleMenu(!menuVisible)}>
      <p>Liked: {likedProducts?.length || 0}</p>
      <Dropdown visible={menuVisible}>
        {likedProducts.map(({ title, id }) => (
          <DropdownItem>
            <p>{title}</p>
            <button onClick={() => dispatch({ type: 'TOGGLE_PRODUCT_LIKED', id  })}>
              Remove
              </button>
          </DropdownItem>
        ))}
      </Dropdown>
    </LikedProduct>
  )
}

export const Header = () => {
  return (
    <HeaderWrapper>
      <p>Menu</p>
      <h1>Aeshop</h1>
      <LikedProducts />
    </HeaderWrapper>
  )
}

export default Header;
