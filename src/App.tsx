import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ProductList from './components/ProductList'
import ProductView from './components/ProductView'

import { ProductsProvider } from './ProductsContext'

function App() {
  return (
    <ProductsProvider>
      <Router>
        <Layout>
          <Switch>
            <Route path="/product/:id">
              <ProductView />
            </Route>
            <Route path="/">
              <ProductList />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </ProductsProvider>
  )
}

export default App
