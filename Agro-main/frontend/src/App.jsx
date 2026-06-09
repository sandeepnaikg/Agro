import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Providers
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import { FarmerProvider } from './context/FarmerContext';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import { ToastProvider } from './context/ToastContext';

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

// Common Transition Wrapper
import PageTransition from './components/common/PageTransition';
import ScrollToTop from './components/common/ScrollToTop';

function AppContent() {
  const location = useLocation();
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-surface selection:bg-secondary/10 selection:text-secondary">
      <TopUtilityBar />
      <Navbar />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/products" element={<PageTransition><Products /></PageTransition>} />
            <Route path="/products/:id" element={<PageTransition><ProductDetails /></PageTransition>} />
            <Route path="/farmers" element={<PageTransition><Farmers /></PageTransition>} />
            <Route path="/farmers/:id" element={<PageTransition><FarmerProfile /></PageTransition>} />
            <Route path="/subscription" element={<PageTransition><Subscription /></PageTransition>} />
            <Route path="/b2b" element={<PageTransition><B2B /></PageTransition>} />
            <Route path="/recipes" element={<PageTransition><Recipes /></PageTransition>} />
            <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
            <Route path="/about" element={<PageTransition><About /></PageTransition>} />
            <Route path="/faq" element={<PageTransition><FAQ /></PageTransition>} />
            <Route path="/track-order" element={<PageTransition><TrackOrder /></PageTransition>} />
            <Route path="/cart" element={<PageTransition><Cart /></PageTransition>} />
            <Route path="/checkout" element={<PageTransition><Checkout /></PageTransition>} />
            <Route path="/account" element={<PageTransition><Account /></PageTransition>} />
            <Route path="/admin" element={<PageTransition><Admin /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
            {/* Fallback */}
            <Route path="*" element={<PageTransition><Home /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Expandable Support Desk Widget */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-none">
        <AnimatePresence>
          {chatOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="w-72 bg-white rounded-[24px] shadow-2xl border border-stone-100 overflow-hidden flex flex-col text-left text-xs pointer-events-auto"
            >
              {/* Widget Header */}
              <div className="bg-primary p-4 text-white flex items-center gap-3 relative">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center font-heading font-extrabold text-sm italic border border-white/10 shrink-0">
                  AC
                </div>
                <div>
                  <span className="font-heading font-bold text-sm block">Avasan Sourcing Desk</span>
                  <span className="text-[9px] text-green-300 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping" /> Online • Usually replies instantly
                  </span>
                </div>
              </div>

              {/* Widget Body */}
              <div className="p-4 space-y-3 bg-stone-50/50">
                <p className="text-stone-600 leading-normal font-semibold">
                  Hello! How can we assist you today? Ask us about custom mesh configurations, wholesale pricing sheets, or direct Telangana farm traces.
                </p>
                <a
                  href="https://wa.me/919008812345?text=Hi%20Avasan%20Chakra%2520team%2C%20I%20need%20help%20with%2520a%2520product%2520or%2520bulk%2520order."
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setChatOpen(false)}
                  className="btn-terracotta w-full py-2.5 rounded-xl font-bold label-tech text-[10px] uppercase text-center flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <svg viewBox="0 0 32 32" width="12" height="12" fill="currentColor">
                    <path d="M19.11 17.27c-.28-.14-1.65-.81-1.9-.9-.26-.1-.44-.14-.63.14-.19.28-.72.9-.89 1.09-.16.19-.33.21-.61.07-.28-.14-1.18-.43-2.24-1.38-.82-.73-1.37-1.63-1.53-1.9-.16-.28-.02-.43.12-.57.13-.13.28-.33.42-.49.14-.16.19-.28.28-.47.1-.19.05-.35-.02-.49-.07-.14-.63-1.52-.86-2.09-.22-.53-.44-.46-.63-.47h-.53c-.19 0-.49.07-.74.35-.26.28-.98.96-.98 2.33 0 1.37 1 2.7 1.14 2.88.14.19 1.96 3 4.75 4.2.66.29 1.18.47 1.58.6.66.21 1.26.18 1.73.11.53-.08 1.65-.67 1.88-1.32.23-.65.23-1.21.16-1.33-.07-.12-.26-.19-.54-.33z" />
                    <path d="M27.2 4.8A15.77 15.77 0 0 0 16 0C7.16 0 0 7.16 0 16c0 2.82.74 5.58 2.14 8L0 32l8.2-2.13A15.92 15.92 0 0 0 16 32c8.84 0 16-7.16 16-16 0-4.27-1.66-8.27-4.8-11.2zM16 29.3c-2.43 0-4.8-.65-6.88-1.88l-.49-.29-4.87 1.26 1.3-4.75-.32-.49A13.18 13.18 0 0 1 2.7 16C2.7 8.67 8.67 2.7 16 2.7c3.55 0 6.88 1.38 9.38 3.88A13.18 13.18 0 0 1 29.3 16c0 7.33-5.97 13.3-13.3 13.3z" />
                  </svg>
                  Start WhatsApp Chat
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setChatOpen(!chatOpen)}
          aria-label="Chat on WhatsApp"
          className={`w-14 h-14 rounded-full shadow-xl border-4 border-white flex items-center justify-center transition-all duration-300 pointer-events-auto ${
            chatOpen ? 'bg-stone-500 hover:bg-stone-600 rotate-90 text-white' : 'bg-[#25D366] text-white hover:scale-105'
          }`}
        >
          {chatOpen ? (
            <span className="font-heading font-bold text-xl leading-none">×</span>
          ) : (
            <svg viewBox="0 0 32 32" width="24" height="24" fill="currentColor" aria-hidden="true">
              <path d="M19.11 17.27c-.28-.14-1.65-.81-1.9-.9-.26-.1-.44-.14-.63.14-.19.28-.72.9-.89 1.09-.16.19-.33.21-.61.07-.28-.14-1.18-.43-2.24-1.38-.82-.73-1.37-1.63-1.53-1.9-.16-.28-.02-.43.12-.57.13-.13.28-.33.42-.49.14-.16.19-.28.28-.47.1-.19.05-.35-.02-.49-.07-.14-.63-1.52-.86-2.09-.22-.53-.44-.46-.63-.47h-.53c-.19 0-.49.07-.74.35-.26.28-.98.96-.98 2.33 0 1.37 1 2.7 1.14 2.88.14.19 1.96 3 4.75 4.2.66.29 1.18.47 1.58.6.66.21 1.26.18 1.73.11.53-.08 1.65-.67 1.88-1.32.23-.65.23-1.21.16-1.33-.07-.12-.26-.19-.54-.33z" />
              <path d="M27.2 4.8A15.77 15.77 0 0 0 16 0C7.16 0 0 7.16 0 16c0 2.82.74 5.58 2.14 8L0 32l8.2-2.13A15.92 15.92 0 0 0 16 32c8.84 0 16-7.16 16-16 0-4.27-1.66-8.27-4.8-11.2zM16 29.3c-2.43 0-4.8-.65-6.88-1.88l-.49-.29-4.87 1.26 1.3-4.75-.32-.49A13.18 13.18 0 0 1 2.7 16C2.7 8.67 8.67 2.7 16 2.7c3.55 0 6.88 1.38 9.38 3.88A13.18 13.18 0 0 1 29.3 16c0 7.33-5.97 13.3-13.3 13.3z" />
            </svg>
          )}
        </button>
      </div>
      <ScrollToTop />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <ToastProvider>
        <AuthProvider>
          <FarmerProvider>
            <ProductProvider>
              <CartProvider>
                <OrderProvider>
                  <AppContent />
                </OrderProvider>
              </CartProvider>
            </ProductProvider>
          </FarmerProvider>
        </AuthProvider>
      </ToastProvider>
    </Router>
  );
}

export default App;
