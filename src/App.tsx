import { Routes, Route } from 'react-router-dom'

// Component imports
// import Header from './components/Header'
// import Footer from './components/Footer'

// Route imports
import HomePage from './routes/Home'
import ProductsPage from './routes/Products'

export default function App() {
  return (
    <div className="container">
      {/* <Header /> */}
      <Routes>
        <Route path='/'         element={ <HomePage /> } />
        <Route path='/products' element={ <ProductsPage /> } />
      </Routes>
      {/* <Footer /> */}
    </div>
  )
}