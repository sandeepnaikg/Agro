import { useState, useEffect, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, ChevronRight, Info, Leaf, Database, Heart, ShoppingBag, Eye, HelpCircle, MapPin, Plus, Minus, ArrowRight, Users, Award } from 'lucide-react';
import { useProducts } from '../../context/ProductContext';
import { useCart } from '../../context/CartContext';
import { useFarmers } from '../../context/FarmerContext';
import { getProductImage } from '../../utils/productImages';
import ThemedButton from '../../components/common/ThemedButton';
import { useNavigate, useLocation } from 'react-router-dom';

const categories = [
  "All Products",
  "Vegetable Powders",
  "Fruit Powders",
  "Leaf & Soft Dry",
  "Seed Products",
  "Dehydrated",
  "Oil Extraction",
  "Biomass & Waste",
  "B2B / Industrial",
];

const Products = () => {
  const { products } = useProducts();
  const { addToCart, toggleWishlist, wishlistHas } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const [activeCategory, setActiveCategory] = useState("All Products");
  const [searchQuery, setSearchQuery] = useState(location.state?.query || "");
  const [sortBy, setSortBy] = useState("alphabetical"); // alphabetical, price-low, price-high
  const [showSpecsId, setShowSpecsId] = useState(null);
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    if (location.state?.query !== undefined) {
      setSearchQuery(location.state.query);
      // Clean up state to prevent persistent searches on navigation reloading
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  useEffect(() => {
    setVisibleCount(8);
  }, [activeCategory, searchQuery]);

  const getPriceValue = (priceStr) => {
    if (typeof priceStr === 'number') return priceStr;
    if (!priceStr) return 0;
    return parseInt(priceStr.replace(/[^\d]/g, ''), 10) || 0;
  };

  const calculateDisplayPrice = (basePriceStr, weightGrams, format) => {
    const basePrice = getPriceValue(basePriceStr);
    // Dried forms are 10% cheaper to process than powder
    const adjustedBase = format === 'Dried' ? basePrice * 0.9 : basePrice;
    const calculated = (adjustedBase / 1000) * weightGrams;
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(calculated);
  };

  const categoryMatch = (p) => {
    if (activeCategory === "All Products") return true;
    if (activeCategory === "Dehydrated") return p.category === "Leaf & Soft Dry" || p.id.includes('flakes');
    if (activeCategory === "B2B / Industrial") return p.category === "Biomass & Waste" || p.category === "Oil Extraction" || p.category === "Seed Products";
    return p.category === activeCategory;
  };

  const filteredProducts = (Array.isArray(products) ? products : [])
    .filter(p => {
      if (!p) return false;
      const matchesCategory = categoryMatch(p);
      const searchTerms = searchQuery.toLowerCase();
      const nameMatch = p.name ? p.name.toLowerCase().includes(searchTerms) : false;
      const descMatch = p.description ? p.description.toLowerCase().includes(searchTerms) : false;
      const catMatch = p.category ? p.category.toLowerCase().includes(searchTerms) : false;
      return matchesCategory && (nameMatch || descMatch || catMatch);
    })
    .sort((a, b) => {
      if (sortBy === "alphabetical") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "price-low") {
        return getPriceValue(a.price) - getPriceValue(b.price);
      } else if (sortBy === "price-high") {
        return getPriceValue(b.price) - getPriceValue(a.price);
      }
      return 0;
    });

  return (
    <div className="flex flex-col min-h-screen bg-surface page-offset-top relative z-0 overflow-hidden">
      {/* Ambient background blur blobs */}
      <div className="absolute top-[10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-primary-light/5 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-[50%] right-[-10%] w-[500px] h-[500px] rounded-full bg-secondary/5 blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-[10%] left-[20%] w-[450px] h-[450px] rounded-full bg-primary-light/5 blur-[120px] pointer-events-none -z-10" />
      {/* Header & Filter Section */}
      <section className="px-8 md:px-16 lg:px-24 pt-16 pb-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12 mb-12">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="label-tech text-secondary font-bold tracking-[0.2em] mb-4 block"
            >
              Central Marketplace
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 tracking-tighter"
            >
              Shop Eco Products
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-stone-600 font-medium text-base leading-relaxed"
            >
              Farm to Future. Pure. Natural. Powerful. Browse dried & powder forms — sourced from 12,000+ verified farmers with full traceability.
            </motion.p>
          </div>

          {/* Sourcing stats panel */}
          <div className="grid grid-cols-2 gap-4 w-full lg:max-w-md shrink-0">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-100 flex items-center gap-3">
              <div className="p-2 bg-primary/5 rounded-xl text-primary shrink-0">
                <Leaf size={16} className="text-secondary" />
              </div>
              <div>
                <span className="text-base font-heading font-bold text-primary block leading-tight">100%</span>
                <span className="text-[8px] text-stone-400 font-bold label-tech uppercase tracking-wider block">Organic Certified</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-100 flex items-center gap-3">
              <div className="p-2 bg-primary/5 rounded-xl text-primary shrink-0">
                <Database size={16} className="text-secondary" />
              </div>
              <div>
                <span className="text-base font-heading font-bold text-primary block leading-tight">Traceable</span>
                <span className="text-[8px] text-stone-400 font-bold label-tech uppercase tracking-wider block">Origin Logs</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-100 flex items-center gap-3">
              <div className="p-2 bg-primary/5 rounded-xl text-primary shrink-0">
                <Users size={16} className="text-secondary" />
              </div>
              <div>
                <span className="text-base font-heading font-bold text-primary block leading-tight">12,000+</span>
                <span className="text-[8px] text-stone-400 font-bold label-tech uppercase tracking-wider block">Farmers Network</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-100 flex items-center gap-3">
              <div className="p-2 bg-primary/5 rounded-xl text-primary shrink-0">
                <Award size={16} className="text-secondary" />
              </div>
              <div>
                <span className="text-base font-heading font-bold text-primary block leading-tight">Zero Waste</span>
                <span className="text-[8px] text-stone-400 font-bold label-tech uppercase tracking-wider block">Stabilisation</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="bg-white rounded-[24px] p-6 shadow-ambient border border-stone-100 flex flex-col md:flex-row gap-6 justify-between items-center mb-10">
          {/* Search Bar */}
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30" size={18} />
            <input 
              type="text" 
              placeholder="Search products, crop origins, uses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-50 border border-stone-100 rounded-xl px-12 py-3 focus:outline-none focus:ring-2 focus:ring-primary/10 placeholder:text-primary/30 font-medium text-sm text-stone-700"
            />
          </div>

          {/* Sorting */}
          <div className="flex flex-wrap gap-4 items-center w-full md:w-auto justify-end">
            <div className="relative group/sort">
              <button className="flex items-center gap-2 text-primary/60 font-bold label-tech text-[10px] bg-stone-50 px-4 py-2.5 rounded-xl border border-stone-100 hover:text-primary transition-colors">
                <ChevronDown size={12} /> SORT BY {sortBy.replace('-', ' ').toUpperCase()}
              </button>
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-stone-100 py-2 opacity-0 invisible group-hover/sort:opacity-100 group-hover/sort:visible transition-all z-50">
                {[
                  { label: "Alphabetical", value: "alphabetical" },
                  { label: "Price: Low to High", value: "price-low" },
                  { label: "Price: High to Low", value: "price-high" }
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setSortBy(opt.value)}
                    className={`w-full text-left px-6 py-2.5 text-xs font-bold hover:bg-primary/5 transition-colors ${sortBy === opt.value ? 'text-secondary' : 'text-primary/60'}`}
                  >
                    {opt.label.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Categories Tabs */}
        <div className="flex flex-wrap gap-3 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="relative px-6 py-2.5 rounded-full text-xs font-bold tracking-wide transition-colors duration-300 cursor-pointer shrink-0"
              >
                {isSelected && (
                  <motion.span
                    layoutId="activeProductsCategory"
                    className="absolute inset-0 bg-primary rounded-full shadow-lg z-0"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 ${isSelected ? 'text-white' : 'text-primary/60 hover:text-primary'}`}>
                  {cat}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Products Grid */}
      <section className="section-bg-stone section-padding px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-[32px] border border-stone-100">
              <p className="text-stone-400 font-bold mb-2">No products found matching your criteria.</p>
              <p className="text-stone-300 text-xs">Try selecting a different category or search term.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <AnimatePresence mode="popLayout">
                  {filteredProducts.slice(0, visibleCount).map((p) => (
                    <ProductCard 
                      key={p.id} 
                      p={p} 
                      calculatePrice={calculateDisplayPrice} 
                      toggleWishlist={toggleWishlist}
                      wishlistHas={wishlistHas}
                      navigate={navigate}
                    />
                  ))}
                </AnimatePresence>
              </div>

              {visibleCount < filteredProducts.length && (
                <div className="flex justify-center mt-16">
                  <button
                    onClick={() => setVisibleCount(prev => prev + 8)}
                    className="btn-terracotta px-8 py-4 font-bold flex items-center gap-2 shadow-lg text-sm rounded-xl cursor-pointer"
                  >
                    View More Products <ChevronDown size={16} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Industrial Sourcing Banner */}
      <section className="bg-primary text-white py-16 px-8 md:px-16 lg:px-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
          <div className="space-y-4">
            <span className="label-tech text-secondary-container font-bold">Industrial B2B Portal</span>
            <h2 className="text-white text-3xl font-heading mb-0 font-bold">Need Custom Specifications or Bulk Quantities?</h2>
            <p className="text-white/70 max-w-xl text-sm leading-relaxed font-medium">
              We process tailored mesh sizes, customized moisture percentages, and provide organic laboratory certification reports for food industries and export clients.
            </p>
          </div>
          <button 
            onClick={() => navigate('/b2b')}
            className="btn-terracotta px-8 py-4 font-bold flex items-center gap-2 shrink-0 shadow-lg text-sm rounded-xl cursor-pointer"
          >
            Visit B2B Portal <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </div>
  );
};

const ProductCard = forwardRef(({ p, calculatePrice, toggleWishlist, wishlistHas, navigate }, ref) => {
  const { farmers } = useFarmers();
  const hasWishlist = wishlistHas(p.id);
  const farmer = farmers.find(f => f.id === p.farmerId);

  return (
    <motion.div 
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      onClick={() => navigate(`/products/${p.id}`)}
      className="product-card group flex flex-col justify-between relative cursor-pointer"
    >
      <div>
        {/* Wishlist toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(p.id);
          }}
          className={`absolute top-5 right-5 p-2 rounded-full border transition-all z-10 cursor-pointer ${
            hasWishlist
              ? 'bg-red-500/10 border-red-500/20 text-red-500'
              : 'bg-stone-50 border-stone-100 text-stone-300 hover:text-red-400'
          }`}
        >
          <Heart size={14} className={hasWishlist ? 'fill-red-500' : ''} />
        </button>

        {/* Thumbnail */}
        <div className="product-img-wrap mb-4 relative shrink-0">
          <img 
            src={getProductImage(p.id)} 
            alt={p.name} 
            className="product-img" 
          />
          {p.isHighImpact && (
            <span className="absolute bottom-3 left-3 bg-secondary text-white text-[7px] font-bold label-tech px-2 py-0.5 rounded-full shadow-sm">
              HIGH IMPACT
            </span>
          )}
        </div>

        {/* Info */}
        <div className="space-y-2">
          <div className="flex justify-between items-start gap-2">
            <h3 className="text-base text-primary font-heading font-bold mb-0 leading-tight line-clamp-1">{p.name}</h3>
            <span className="text-[8px] bg-primary/5 text-primary px-1.5 py-0.5 rounded-full uppercase label-tech font-bold tracking-wider shrink-0 mt-0.5">
              {p.phase}
            </span>
          </div>

          <p className="text-stone-500 text-[11px] leading-relaxed line-clamp-2">
            {p.description}
          </p>

          {/* Sourcing Transparency link directly to farmer profile */}
          {farmer && (
            <div className="flex items-center gap-1 text-[10px] font-semibold text-secondary">
              <MapPin size={10} className="shrink-0" />
              <span>Sourced from: </span>
              <button 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  navigate('/farmers', { state: { highlightFarmerId: farmer.id } }); 
                }}
                className="underline hover:text-secondary-container font-bold cursor-pointer transition-colors"
              >
                {farmer.name}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer Row: shows base price and "Configure" */}
      <div className="flex justify-between items-center gap-4 pt-3 mt-4 border-t border-stone-50">
        <div className="space-y-0.5">
          <span className="text-[8px] text-stone-400 label-tech font-bold block">FROM (100g)</span>
          <span className="text-base font-bold text-primary tracking-tight">
            {calculatePrice(p.price, 100, "Powder")}
          </span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/products/${p.id}`);
          }}
          className="bg-primary/5 hover:bg-primary/10 text-primary text-[10px] font-bold px-3 py-2 rounded-xl flex items-center gap-1 cursor-pointer transition-colors border border-primary/5 label-tech"
        >
          Configure <ChevronRight size={12} />
        </button>
      </div>
    </motion.div>
  );
});

ProductCard.displayName = 'ProductCard';

export default Products;
