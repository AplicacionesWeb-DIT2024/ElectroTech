import { Products } from './components/Products.jsx'
import { Header } from './components/Header.jsx'
import { Footer } from './components/Footer.jsx'
import { IS_DEVELOPMENT } from './config.js'
import { useFilters } from './hooks/useFilters.js'
import { Cart } from './components/Cart.jsx'
import { CartProvider } from './context/cart.jsx'
import { useState, useEffect } from 'react'

function App () {
  const { filterProducts } = useFilters()

  const [productos, setProductos] = useState([])

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/productos')
    .then(res => res.json())
    .then(data => setProductos(data))
  },[])

  console.log(productos)

  const filteredProducts = filterProducts(productos)

  console.log(filteredProducts)

  return (
    <CartProvider>
      <Header />
      <Cart />
      <Products products={filteredProducts} />
    </CartProvider>
  )
}

export default App