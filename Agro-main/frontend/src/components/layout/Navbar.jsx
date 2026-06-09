import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, User, Menu, X, ChevronDown, Search } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import logoImg from '../../assets/logo.jpg';

const Navbar = () => {
  const { cart } = useCart();
  const { currentUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const currentPath = location.pathname;

  useEffect(() => {
    setMobileMenuOpen(false);
    setMoreOpen(false);
  }, [location.pathname]);

  const mainLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop Products', path: '/products' },
    { name: 'Our Farmers', path: '/farmers' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const moreLinks = [
    { name: 'Subscribe', path: '/subscription' },
    { name: 'B2B', path: '/b2b' },
    { name: 'Recipes', path: '/recipes' },
    { name: 'Blog', path: '/blog' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Track Order', path: '/track-order' },
  ];

  const isActive = (path) => currentPath === path;

  return (
    <header className="fixed top-9 inset-x-0 z-50 bg-white border-b border-stone-200/80 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-[68px] flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <img
            src={logoImg}
            alt="Avasan Chakra"
            className="w-10 h-10 rounded-lg object-cover border border-stone-200"
          />
          <div className="hidden sm:flex flex-col">
            <span className="font-heading font-extrabold text-sm text-primary leading-none">Avasan Chakra</span>
            <span className="text-[7px] text-stone-500 font-bold tracking-widest mt-0.5 uppercase label-tech">
              Kernin Eco Solutions
            </span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          {mainLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-2 text-[10px] font-bold label-tech transition-colors relative ${
                isActive(link.path)
                  ? 'text-primary'
                  : 'text-primary/55 hover:text-primary'
              }`}
            >
              {link.name.toUpperCase()}
              {isActive(link.path) && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-3 right-3 h-0.5 bg-secondary rounded-full"
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-0.5">
          <div className="hidden lg:flex items-center gap-0.5 mr-1">
            <div className="relative" onMouseEnter={() => setMoreOpen(true)} onMouseLeave={() => setMoreOpen(false)}>
              <button className="px-2 py-2 text-[10px] font-bold label-tech text-primary/50 hover:text-primary flex items-center gap-0.5 transition-colors">
                MORE <ChevronDown size={11} />
              </button>
              <AnimatePresence>
                {moreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    className="absolute right-0 top-full mt-1 w-40 bg-white rounded-xl shadow-card-hover border border-stone-100 py-1.5 z-50"
                  >
                    {moreLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        className="block px-4 py-2 text-[10px] font-bold label-tech text-primary/65 hover:bg-primary/5 hover:text-primary"
                      >
                        {link.name.toUpperCase()}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <button
            onClick={() => navigate('/products')}
            className="p-2 text-primary/55 hover:text-primary rounded-lg hover:bg-primary/5 transition-all"
            title="Search products"
          >
            <Search size={19} />
          </button>
          <Link
            to="/account"
            className="hidden md:flex p-2 text-primary/55 hover:text-primary rounded-lg hover:bg-primary/5 transition-all"
            title="My Account"
          >
            <User size={19} />
          </Link>
          <Link
            to="/cart"
            className="p-2 text-primary/55 hover:text-primary rounded-lg hover:bg-primary/5 transition-all relative"
            title="Cart"
          >
            <ShoppingBag size={19} />
            {totalCartItems > 0 && (
              <span className="absolute top-0.5 right-0.5 bg-secondary text-white font-bold text-[7px] w-3.5 h-3.5 rounded-full flex items-center justify-center">
                {totalCartItems}
              </span>
            )}
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-primary hover:bg-primary/5 rounded-lg"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-stone-100 bg-white overflow-hidden"
          >
            <div className="px-4 py-3 space-y-1">
              {[...mainLinks, ...moreLinks].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-2.5 rounded-lg text-xs font-bold label-tech ${
                    isActive(link.path) ? 'bg-primary/5 text-primary' : 'text-primary/70'
                  }`}
                >
                  {link.name.toUpperCase()}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
