import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Providers
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import { FarmerProvider } from './context/FarmerContext';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';

// Layouts
import TopUtilityBar from './components/layout/TopUtilityBar';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Pages
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Farmers from './pages/Farmers';
import FarmerProfile from './pages/Farmers/FarmerProfile';
import Subscription from './pages/Subscription';
import B2B from './pages/B2B';
import Recipes from './pages/Recipes';
import Blog from './pages/Blog';
import About from './pages/About';
import FAQ from './pages/FAQ';
import TrackOrder from './pages/TrackOrder';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Account from './pages/Account';
import Admin from './pages/Admin';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <AuthProvider>
        <FarmerProvider>
          <ProductProvider>
            <CartProvider>
              <OrderProvider>
                <div className="flex flex-col min-h-screen bg-surface selection:bg-secondary/10 selection:text-secondary">
                  <TopUtilityBar />
                  <Navbar />
                  <main className="flex-grow">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/products" element={<Products />} />
                      <Route path="/products/:id" element={<ProductDetails />} />
                      <Route path="/farmers" element={<Farmers />} />
                      <Route path="/farmers/:id" element={<FarmerProfile />} />
                      <Route path="/subscription" element={<Subscription />} />
                      <Route path="/b2b" element={<B2B />} />
                      <Route path="/recipes" element={<Recipes />} />
                      <Route path="/blog" element={<Blog />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/faq" element={<FAQ />} />
                      <Route path="/track-order" element={<TrackOrder />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route path="/checkout" element={<Checkout />} />
                      <Route path="/account" element={<Account />} />
                      <Route path="/admin" element={<Admin />} />
                      <Route path="/contact" element={<Contact />} />
                      {/* Fallback */}
                      <Route path="*" element={<Home />} />
                    </Routes>
                  </main>
                  <a
                    href="https://wa.me/919008812345?text=Hi%20Avasan%20Chakra%20team%2C%20I%20need%20help%20with%20a%20product%20or%20bulk%20order."
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Chat on WhatsApp"
                    className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl border-4 border-white flex items-center justify-center hover:scale-105 transition-transform"
                  >
                    <svg viewBox="0 0 32 32" width="24" height="24" fill="currentColor" aria-hidden="true">
                      <path d="M19.11 17.27c-.28-.14-1.65-.81-1.9-.9-.26-.1-.44-.14-.63.14-.19.28-.72.9-.89 1.09-.16.19-.33.21-.61.07-.28-.14-1.18-.43-2.24-1.38-.82-.73-1.37-1.63-1.53-1.9-.16-.28-.02-.43.12-.57.13-.13.28-.33.42-.49.14-.16.19-.28.28-.47.1-.19.05-.35-.02-.49-.07-.14-.63-1.52-.86-2.09-.22-.53-.44-.46-.63-.47h-.53c-.19 0-.49.07-.74.35-.26.28-.98.96-.98 2.33 0 1.37 1 2.7 1.14 2.88.14.19 1.96 3 4.75 4.2.66.29 1.18.47 1.58.6.66.21 1.26.18 1.73.11.53-.08 1.65-.67 1.88-1.32.23-.65.23-1.21.16-1.33-.07-.12-.26-.19-.54-.33z" />
                      <path d="M27.2 4.8A15.77 15.77 0 0 0 16 0C7.16 0 0 7.16 0 16c0 2.82.74 5.58 2.14 8L0 32l8.2-2.13A15.92 15.92 0 0 0 16 32c8.84 0 16-7.16 16-16 0-4.27-1.66-8.27-4.8-11.2zM16 29.3c-2.43 0-4.8-.65-6.88-1.88l-.49-.29-4.87 1.26 1.3-4.75-.32-.49A13.18 13.18 0 0 1 2.7 16C2.7 8.67 8.67 2.7 16 2.7c3.55 0 6.88 1.38 9.38 3.88A13.18 13.18 0 0 1 29.3 16c0 7.33-5.97 13.3-13.3 13.3z" />
                    </svg>
                  </a>
                  <Footer />
                </div>
              </OrderProvider>
            </CartProvider>
          </ProductProvider>
        </FarmerProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
