import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, User, Menu, X, ChevronDown, Search, ArrowRight,
  Sparkles, Building, ChefHat, BookOpen, HelpCircle, Truck, Users
} from 'lucide-react';
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
  const [scrolled, setScrolled] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const currentPath = location.pathname;

  useEffect(() => {
    setMobileMenuOpen(false);
    setMoreOpen(false);
    setSearchActive(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchVal.trim()) {
      navigate('/products', { state: { query: searchVal } });
      setSearchActive(false);
      setSearchVal('');
    }
  };

  const mainLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop Products', path: '/products' },
    { name: 'Our Farmers', path: '/farmers' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const moreLinks = [
    { name: 'Subscribe', path: '/subscription', desc: 'Monthly subscription & save 20%', icon: Sparkles },
    { name: 'B2B Sourcing', path: '/b2b', desc: 'Custom specs & wholesale quotes', icon: Building },
    { name: 'Recipes', path: '/recipes', desc: 'Cook with organic powders', icon: ChefHat },
    { name: 'Blog & Science', path: '/blog', desc: 'Wellness SCM research updates', icon: BookOpen },
    { name: 'FAQ Support', path: '/faq', desc: 'Shipping & quality questions', icon: HelpCircle },
    { name: 'Track Order', path: '/track-order', desc: 'Realtime dispatch transit logs', icon: Truck },
  ];

  const isActive = (path) => currentPath === path;

  return (
    <header 
      className={`fixed inset-x-0 z-50 glass-navbar transition-all duration-300 ${
        scrolled 
          ? 'top-0 h-[58px] bg-white/88 shadow-md border-b border-stone-200/50' 
          : 'top-9 h-[68px] bg-white/72 shadow-ambient border-b border-stone-200/30'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-full flex items-center justify-between gap-4">
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

        {/* Sliding active pill indicator links */}
        <nav className="hidden lg:flex items-center gap-1.5 absolute left-1/2 -translate-x-1/2">
          {mainLinks.map((link) => {
            const isLinkActive = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className="relative px-3.5 py-2 text-[10px] font-bold label-tech transition-colors duration-300 cursor-pointer"
              >
                {isLinkActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 bg-primary/5 rounded-full z-0"
                    transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                  />
                )}
                <span className={`relative z-10 ${isLinkActive ? 'text-primary' : 'text-primary/55 hover:text-primary'}`}>
                  {link.name.toUpperCase()}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5">
          <div className="hidden lg:flex items-center gap-1 mr-1">
            <div className="relative" onMouseEnter={() => setMoreOpen(true)} onMouseLeave={() => setMoreOpen(false)}>
              <button className="px-3 py-2 text-[10px] font-bold label-tech text-primary/55 hover:text-primary flex items-center gap-0.5 transition-colors cursor-pointer">
                MORE <ChevronDown size={11} className={`transition-transform duration-300 ${moreOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {moreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute right-0 top-full mt-2 w-[440px] bg-white rounded-[24px] shadow-card-hover border border-stone-100 p-4 z-50 grid grid-cols-2 gap-3"
                  >
                    {moreLinks.map((link) => {
                      const LinkIcon = link.icon;
                      return (
                        <Link
                          key={link.path}
                          to={link.path}
                          className="flex items-start gap-3 p-3 rounded-2xl hover:bg-primary/5 transition-all group cursor-pointer"
                        >
                          <div className="p-2 bg-primary/5 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
                            <LinkIcon size={14} />
                          </div>
                          <div className="space-y-0.5 text-left">
                            <span className="block text-[9px] font-bold label-tech text-primary uppercase leading-none group-hover:text-secondary transition-colors">
                              {link.name}
                            </span>
                            <span className="block text-[8px] text-stone-400 font-semibold leading-tight">
                              {link.desc}
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Interactive Search Slide-Out */}
          <div className="flex items-center">
            <AnimatePresence>
              {searchActive && (
                <motion.form
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 180, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  onSubmit={handleSearchSubmit}
                  className="relative overflow-hidden mr-1 flex items-center"
                >
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchVal}
                    onChange={(e) => setSearchVal(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-150 rounded-xl px-3.5 py-1.5 text-[10px] text-stone-700 focus:ring-1 focus:ring-primary/20 focus:outline-none placeholder:text-stone-300 font-semibold"
                    autoFocus
                  />
                </motion.form>
              )}
            </AnimatePresence>

            <button
              onClick={() => {
                if (searchActive && searchVal.trim()) {
                  navigate(`/products`, { state: { query: searchVal } });
                  setSearchActive(false);
                  setSearchVal('');
                } else {
                  setSearchActive(!searchActive);
                }
              }}
              className={`p-2 rounded-lg transition-all cursor-pointer ${searchActive ? 'text-secondary bg-secondary/5' : 'text-primary/55 hover:text-primary hover:bg-primary/5'}`}
              title="Search products"
            >
              {searchActive ? <ArrowRight size={19} /> : <Search size={19} />}
            </button>
          </div>

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
            className="lg:hidden p-2 text-primary hover:bg-primary/5 rounded-lg cursor-pointer"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu with micro icons */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-stone-100 bg-white overflow-hidden"
          >
            <div className="px-4 py-3 space-y-1 max-h-[70vh] overflow-y-auto">
              {mainLinks.map((link) => (
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
              <div className="border-t border-stone-100 my-2 pt-2">
                <span className="px-4 text-[9px] font-bold text-stone-400 label-tech block uppercase mb-1">More Options</span>
                {moreLinks.map((link) => {
                  const LinkIcon = link.icon;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-bold label-tech ${
                        isActive(link.path) ? 'bg-primary/5 text-primary' : 'text-primary/70'
                      }`}
                    >
                      <LinkIcon size={14} className="text-secondary" />
                      {link.name.toUpperCase()}
                    </Link>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
