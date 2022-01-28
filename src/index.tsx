// External imports
import { StrictMode } from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

// Local imports
import App from './App'
import reducer from './state'

// Assets
import './index.css'

const store = configureStore({ reducer })

render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </StrictMode>,
  document.getElementById('app')
)
