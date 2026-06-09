import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Heart, ShoppingBag, MapPin, Calendar, ShieldCheck, Leaf, Info, HelpCircle, ArrowLeft, Plus, Minus, ArrowRight, Award } from 'lucide-react';
import { useProducts } from '../../context/ProductContext';
import { useCart } from '../../context/CartContext';
import { useFarmers } from '../../context/FarmerContext';
import { getProductImage } from '../../utils/productImages';
import ThemedButton from '../../components/common/ThemedButton';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { getProductById } = useProducts();
  const { addToCart, toggleWishlist, wishlistHas } = useCart();
  const { farmers } = useFarmers();

  const product = getProductById(id);

  // States
  const [format, setFormat] = useState("Powder"); // Powder, Dried
  const [weight, setWeight] = useState(100); // 100g, 200g, 500g, 1000g
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const [activeTab, setActiveTab] = useState('specs'); // specs, uses, processing
  const [pincode, setPincode] = useState('');
  const [deliveryMessage, setDeliveryMessage] = useState('');

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center page-offset-top px-8">
        <div className="text-center space-y-6 max-w-md">
          <Info size={48} className="text-secondary mx-auto" />
          <h2 className="text-2xl text-primary font-bold">Product Not Found</h2>
          <p className="text-stone-500 font-semibold">The product crop you are looking for does not exist in our active registry.</p>
          <Link to="/products">
            <ThemedButton className="px-8 py-3 uppercase">Back to Catalog</ThemedButton>
          </Link>
        </div>
      </div>
    );
  }

  const hasWishlist = wishlistHas(product.id);
  const farmer = farmers.find(f => f.id === product.farmerId);

  // Price calculations
  const getPriceValue = (priceStr) => {
    if (typeof priceStr === 'number') return priceStr;
    if (!priceStr) return 0;
    return parseInt(priceStr.replace(/[^\d]/g, ''), 10) || 0;
  };

  const basePrice = getPriceValue(product.price);
  const adjustedPrice = format === 'Dried' ? basePrice * 0.9 : basePrice;
  const unitPrice = (adjustedPrice / 1000) * weight;
  
  const displayPriceFormatted = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(unitPrice);

  const totalCostFormatted = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(unitPrice * qty);

  const handleAddToCart = () => {
    addToCart(product, format, weight, qty);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, format, weight, qty);
    navigate('/cart');
  };

  const handlePincodeCheck = () => {
    const code = pincode.trim();
    if (!/^\d{6}$/.test(code)) {
      setDeliveryMessage('Please enter a valid 6-digit pincode.');
      return;
    }

    const serviceablePrefixes = ['50', '51', '52', '53', '56'];
    const prefix = code.slice(0, 2);

    if (!serviceablePrefixes.includes(prefix)) {
      setDeliveryMessage('Delivery currently unavailable for this location. Contact support for B2B dispatch options.');
      return;
    }

    const etaDays = prefix === '50' ? '2-3' : '3-5';
    setDeliveryMessage(`Delivery available. Estimated dispatch + delivery: ${etaDays} business days.`);
  };

  return (
    <div className="min-h-screen bg-surface page-offset-top pb-24 px-8 md:px-16 lg:px-24 relative z-0 overflow-hidden">
      {/* Ambient background blur blobs */}
      <div className="absolute top-[15%] left-[-10%] w-[380px] h-[380px] rounded-full bg-primary-light/5 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-[20%] right-[-10%] w-[450px] h-[450px] rounded-full bg-secondary/5 blur-[130px] pointer-events-none -z-10" />
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-stone-500 font-bold text-[10px] label-tech mb-8 tracking-widest uppercase">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight size={10} className="text-stone-300" />
          <Link to="/products" className="hover:text-primary transition-colors">Products</Link>
          <ChevronRight size={10} className="text-stone-300" />
          <span className="text-primary">{product.name}</span>
        </div>

        {/* Main Details Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start bg-white rounded-[40px] p-6 md:p-12 shadow-ambient border border-stone-100 mb-16">
          
          {/* Left: Image Container */}
          <div className="lg:col-span-5 relative w-full aspect-square rounded-[32px] bg-parchment overflow-hidden flex items-center justify-center p-6 border border-stone-100 group">
            <img 
              src={getProductImage(product.id)} 
              alt={product.name} 
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" 
            />
            {product.isHighImpact && (
              <span className="absolute bottom-6 left-6 bg-secondary text-white text-[9px] font-bold label-tech px-3.5 py-1.5 rounded-full shadow-sm">
                HIGH IMPACT CROP
              </span>
            )}
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`absolute top-6 right-6 p-3 rounded-full border transition-all cursor-pointer ${
                hasWishlist
                  ? 'bg-red-500/10 border-red-500/20 text-red-500 shadow-sm'
                  : 'bg-white border-stone-150 text-stone-400 hover:text-red-400 shadow-sm'
              }`}
            >
              <Heart size={20} className={hasWishlist ? 'fill-red-500' : ''} />
            </button>
          </div>

          {/* Right: Options & Ordering */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Header & Badges */}
            <div className="space-y-2 border-b border-stone-50 pb-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[9px] bg-primary/5 text-primary px-3 py-1 rounded-full uppercase label-tech font-bold tracking-wider">
                  {product.category}
                </span>
                <span className="text-[9px] bg-secondary/5 text-secondary px-3 py-1 rounded-full uppercase label-tech font-bold tracking-wider">
                  {product.phase}
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-heading text-primary font-bold tracking-tighter mb-0 mt-2">{product.name}</h1>
              
              <div className="flex flex-wrap items-center gap-6 pt-3 text-xs text-stone-500 font-semibold">
                <div className="flex items-center gap-1">
                  <ShieldCheck size={16} className="text-secondary" />
                  <span>Lab Tested Quality</span>
                </div>
                <div className="flex items-center gap-1">
                  <Leaf size={16} className="text-secondary" />
                  <span>100% Organic Origin</span>
                </div>
              </div>
            </div>

            {/* Sourcing Transparency Section */}
            {farmer && (
              <div className="bg-stone-50 border border-stone-100 rounded-3xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary text-white font-heading font-bold italic rounded-2xl flex items-center justify-center text-sm shadow-sm">
                    {farmer.avatar}
                  </div>
                  <div>
                    <span className="text-[9px] text-stone-400 font-bold label-tech uppercase tracking-wider block">Sourced Farmer</span>
                    <button 
                      onClick={() => navigate('/farmers', { state: { highlightFarmerId: farmer.id } })}
                      className="text-base text-primary font-heading font-bold hover:underline cursor-pointer text-left leading-tight"
                    >
                      {farmer.name}
                    </button>
                    <span className="text-[10px] text-stone-400 font-semibold block">{farmer.location}</span>
                  </div>
                </div>
                <div className="bg-green-500/10 text-green-600 px-3 py-1 rounded-full text-[9px] font-bold label-tech tracking-wider uppercase shrink-0">
                  Direct Sourced
                </div>
              </div>
            )}

            {/* Description */}
            <p className="text-stone-600 text-sm leading-relaxed font-medium">
              {product.description}
            </p>

            {/* Select Options Panel */}
            <div className="space-y-6 pt-4 border-t border-stone-50">
              
              {/* Form Selector (Powder vs Dried) */}
              <div className="space-y-2">
                <label className="label-tech text-[10px] text-stone-400 font-bold block uppercase tracking-wider">Select Form</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'Powder', label: 'Powder Form', desc: 'Micro-pulverized extract' },
                    { id: 'Dried', label: 'Dried Form', desc: 'Stabilized whole pieces (-10% price)' }
                  ].map(item => (
                    <button
                      key={item.id}
                      onClick={() => setFormat(item.id)}
                      className={`flex-1 text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                        format === item.id
                          ? 'border-primary bg-primary/5 ring-1 ring-primary/20 shadow-sm'
                          : 'border-stone-150 bg-white hover:bg-stone-50'
                      }`}
                    >
                      <span className="block text-xs font-bold text-primary mb-0.5">{item.label}</span>
                      <span className="block text-[10px] text-stone-400 leading-normal font-semibold">{item.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Weight Selector */}
              <div className="space-y-2">
                <label className="label-tech text-[10px] text-stone-400 font-bold block uppercase tracking-wider">Select Weight / Quantity Pack</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-semibold">
                  {[
                    { value: 100, label: '100 g' },
                    { value: 200, label: '200 g' },
                    { value: 500, label: '500 g' },
                    { value: 1000, label: '1 kg' }
                  ].map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => setWeight(opt.value)}
                      className={`py-3 rounded-xl border text-xs text-center transition-all cursor-pointer ${
                        weight === opt.value
                          ? 'bg-primary text-white border-primary shadow-md font-bold'
                          : 'bg-white text-stone-600 border-stone-150 hover:bg-stone-50'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price & Quantity Selector */}
              <div className="bg-stone-50 border border-stone-100 rounded-3xl p-6 flex items-center justify-between gap-6 flex-wrap">
                <div>
                  <span className="text-[10px] text-stone-400 font-bold label-tech block uppercase tracking-wider mb-1">Variant Price</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-primary tracking-tight">{displayPriceFormatted}</span>
                    <span className="text-stone-400 text-[10px] font-bold uppercase label-tech">/ {weight >= 1000 ? '1kg' : `${weight}g`}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div>
                    <span className="text-[10px] text-stone-400 font-bold label-tech block uppercase tracking-wider mb-1 text-right">Quantity</span>
                    <div className="flex items-center bg-white border border-stone-150 rounded-xl p-1 shrink-0">
                      <button 
                        onClick={() => setQty(Math.max(1, qty - 1))}
                        className="p-1.5 hover:bg-stone-50 rounded-lg text-stone-500 hover:text-secondary cursor-pointer transition-all"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-8 text-center text-sm font-bold text-stone-700">{qty}</span>
                      <button 
                        onClick={() => setQty(qty + 1)}
                        className="p-1.5 hover:bg-stone-50 rounded-lg text-stone-500 hover:text-primary cursor-pointer transition-all"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <ThemedButton
                onClick={handleAddToCart}
                className={`py-4 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 rounded-2xl shadow-lg transition-all ${
                  justAdded ? 'bg-green-600 text-white hover:bg-green-600' : ''
                }`}
              >
                {justAdded ? (
                  <>Added to Basket! 🎉</>
                ) : (
                  <>
                    <ShoppingBag size={14} /> Add to Basket
                  </>
                )}
              </ThemedButton>

              <button
                onClick={handleBuyNow}
                className="bg-secondary hover:bg-secondary-container text-white py-4 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                Buy Now <ArrowRight size={14} />
              </button>
            </div>

            <div className="pt-2 text-center">
              <button 
                onClick={() => navigate('/contact')}
                className="text-[10px] text-stone-400 hover:text-secondary font-bold label-tech tracking-wider uppercase transition-colors"
              >
                Need custom mesh sizes? Submit Bulk Sourcing inquiry
              </button>
            </div>

            <div className="bg-stone-50 border border-stone-100 rounded-2xl p-4">
              <label className="label-tech text-[10px] text-stone-400 font-bold block uppercase tracking-wider mb-2">
                Check Delivery by Pincode
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                  placeholder="Enter 6-digit pincode"
                  className="flex-1 bg-white border border-stone-150 rounded-xl px-4 py-3 text-sm font-semibold text-stone-700 focus:outline-none focus:ring-2 focus:ring-primary/10"
                />
                <button
                  onClick={handlePincodeCheck}
                  className="bg-primary text-white px-5 py-3 rounded-xl text-xs font-bold uppercase label-tech tracking-wider hover:bg-primary/90 transition-colors cursor-pointer"
                >
                  Check ETA
                </button>
              </div>
              {deliveryMessage && (
                <p className="text-xs font-semibold text-stone-600 mt-3">{deliveryMessage}</p>
              )}
            </div>
          </div>
        </div>

        {/* Collapsible Tabs for Specification Data */}
        <div className="bg-white rounded-[32px] p-8 shadow-ambient border border-stone-100">
          <div className="flex border-b border-stone-100 pb-4 mb-6 text-xs font-bold label-tech overflow-x-auto scrollbar-hide">
            {[
              { id: 'specs', label: 'Technical Data' },
              { id: 'uses', label: 'Uses & Benefits' },
              { id: 'processing', label: 'Sourcing & Processing' }
            ].map(tab => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-6 py-2 transition-all uppercase cursor-pointer whitespace-nowrap ${
                    isSelected ? 'text-primary font-bold' : 'text-stone-400 hover:text-primary'
                  }`}
                >
                  {tab.label}
                  {isSelected && (
                    <motion.span
                      layoutId="activeDetailsTab"
                      className="absolute bottom-0 left-6 right-6 h-0.5 bg-secondary rounded-full"
                      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-xs font-semibold text-stone-500 leading-relaxed space-y-6"
            >
              {activeTab === 'specs' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-base text-primary font-heading font-bold mb-2">Molecular Specifications</h3>
                    <div className="space-y-2.5">
                      <div className="flex justify-between border-b border-stone-50 pb-2">
                        <span className="text-stone-400">Availability Cycle</span>
                        <span className="text-stone-700">{product.availabilityNote || 'Year-round'}</span>
                      </div>
                      <div className="flex justify-between border-b border-stone-50 pb-2">
                        <span className="text-stone-400">Processing Node</span>
                        <span className="text-stone-700">{product.phase}</span>
                      </div>
                      <div className="flex justify-between border-b border-stone-50 pb-2">
                        <span className="text-stone-400">Processing Standard</span>
                        <span className="text-stone-700">Dehydration stabilization</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-400">Residual Moisture</span>
                        <span className="text-stone-700">&lt; 5.0%</span>
                      </div>
                      <div className="flex justify-between border-t border-stone-50 pt-2">
                        <span className="text-stone-400">Shelf Life</span>
                        <span className="text-stone-700">9-12 months (airtight)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-400">Storage</span>
                        <span className="text-stone-700">Cool, dry place away from direct sunlight</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-base text-primary font-heading font-bold mb-2">Inventory Ledger</h3>
                    <div className="space-y-2.5">
                      <div className="flex justify-between border-b border-stone-50 pb-2">
                        <span className="text-stone-400">Direct Sourced Inventory</span>
                        <span className="text-stone-700">{product.stockQty} kg Available</span>
                      </div>
                      <div className="flex justify-between border-b border-stone-50 pb-2">
                        <span className="text-stone-400">Stabilization Speed</span>
                        <span className="text-stone-700">Within 4 hours of harvest</span>
                      </div>
                      <div className="flex justify-between border-b border-stone-50 pb-2">
                        <span className="text-stone-400">Processing Location</span>
                        <span className="text-stone-700">Telangana, India</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-400">Direct-to-grower margins</span>
                        <span className="text-secondary font-bold">+40% vs local mandis</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'uses' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100 space-y-2">
                    <span className="text-[10px] text-stone-400 font-bold label-tech uppercase tracking-wider block">Recommended Uses</span>
                    <p className="text-stone-600 text-sm">{product.uses}</p>
                  </div>
                  <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100 space-y-2">
                    <span className="text-[10px] text-stone-400 font-bold label-tech uppercase tracking-wider block">Nutritional Benefits</span>
                    <p className="text-stone-600 text-sm">{product.benefits}</p>
                  </div>
                </div>
              )}

              {activeTab === 'processing' && (
                <div className="space-y-4 max-w-3xl">
                  <h3 className="text-base text-primary font-heading font-bold mb-2">Sourcing & Processing Protocol</h3>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-secondary/5 text-secondary rounded-full flex items-center justify-center shrink-0">
                      <ShieldCheck size={16} />
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-700 text-sm mb-1">Decentralized Dehydration</h4>
                      <p className="text-xs text-stone-500">"{product.processingNote}"</p>
                    </div>
                  </div>
                  {farmer && (
                    <div className="flex items-start gap-4 pt-2">
                      <div className="w-8 h-8 bg-secondary/5 text-secondary rounded-full flex items-center justify-center shrink-0">
                        <MapPin size={16} />
                      </div>
                      <div>
                        <h4 className="font-bold text-stone-700 text-sm mb-1">Farmer Sourcing Narrative</h4>
                        <p className="text-xs text-stone-500 leading-relaxed">"{farmer.sourcingInfo}"</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
