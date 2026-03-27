import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import "aos/dist/aos.css";
import AOS from 'aos';
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { Online } from 'react-detect-offline';
import { AuthProvider } from './context/AuthContext.jsx';
import { CartProvider } from './context/CartContext.jsx';

AOS.init();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Online> */}
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    {/* </Online> */}
  </StrictMode>
);