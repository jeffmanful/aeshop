import React from 'react'
import Layout from '../components/Layout'
import { render } from '@testing-library/react'

test('It renders', () => {
  const { asFragment, queryByText } = render(
    <Layout>Body</Layout>
  )

  expect(asFragment()).toMatchSnapshot()
  expect(queryByText('Body')).toBeInTheDocument()
  expect(queryByText('Aeshop')).toBeInTheDocument()
})
