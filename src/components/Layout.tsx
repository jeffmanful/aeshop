import React from 'react';
import styled from 'styled-components';
import Header from './Header';

const ContentBox = styled.div`
  padding: 1rem;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 1200px;
`;
ContentBox.displayName = 'ContentBox';

const Layout: React.FC = ({ children }): JSX.Element => {
  return (
    <>
      <Header />
      <ContentBox>
        {children}
      </ContentBox>
    </>
  )
}

export default Layout;
