import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Calendar, ShieldCheck, Gift, Check, ShoppingBag, Plus, Minus, ArrowRight, Trash2 } from 'lucide-react';
import { useProducts } from '../../context/ProductContext';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { getProductImage } from '../../utils/productImages';
import ThemedButton from '../../components/common/ThemedButton';

const Subscription = () => {
  const { showToast } = useToast();
  const { products } = useProducts();
  const { addToCart } = useCart();

  const [selectedTier, setSelectedTier] = useState('family'); // starter, family, wellness-pro
  const [frequency, setFrequency] = useState('Monthly'); // Weekly, Bi-weekly, Monthly
  const [boxItems, setBoxItems] = useState([]); // [{ product, quantity }]
  const [addedMessage, setAddedMessage] = useState(false);

  const tiers = {
    starter: {
      id: 'starter',
      name: 'Starter Box',
      price: 299,
      discount: 0.05,
      limit: 3,
      sizeLabel: '100g pack sizes',
      benefits: ['Up to 3 products/month', '5% discount', 'Monthly recipe booklet', 'Skip or pause anytime']
    },
    family: {
      id: 'family',
      name: 'Family Box',
      price: 699,
      discount: 0.12,
      limit: 8,
      sizeLabel: '250g pack sizes',
      benefits: ['Up to 8 products/month', '12% discount', 'Free delivery always', 'Smart Swap flexibility', 'Monthly recipe booklet']
    },
    'wellness-pro': {
      id: 'wellness-pro',
      name: 'Wellness Pro',
      price: 1299,
      discount: 0.20,
      limit: 12,
      sizeLabel: '500g pack sizes',
      benefits: ['Up to 12 products/month', '20% discount', 'Free express delivery', 'Nutritionist support access', 'Monthly recipe booklet + free sample']
    }
  };

  const currentTier = tiers[selectedTier];

  const handleAddToBox = (product) => {
    const totalCount = boxItems.reduce((sum, item) => sum + item.quantity, 0);
    if (totalCount >= currentTier.limit) {
      showToast(`Your ${currentTier.name} is full! Remove items or upgrade to a higher tier.`, 'error');
      return;
    }

    const existingIndex = boxItems.findIndex(item => item.product.id === product.id);
    if (existingIndex > -1) {
      const newItems = [...boxItems];
      newItems[existingIndex].quantity += 1;
      setBoxItems(newItems);
    } else {
      setBoxItems([...boxItems, { product, quantity: 1 }]);
    }
  };

  const handleRemoveFromBox = (productId) => {
    setBoxItems(boxItems.filter(item => item.product.id !== productId));
  };

  const handleUpdateBoxQty = (productId, delta) => {
    const existing = boxItems.find(item => item.product.id === productId);
    if (!existing) return;

    const totalCount = boxItems.reduce((sum, item) => sum + item.quantity, 0);
    if (delta > 0 && totalCount >= currentTier.limit) {
      showToast(`Your ${currentTier.name} is full!`, 'error');
      return;
    }

    const newQty = existing.quantity + delta;
    if (newQty <= 0) {
      handleRemoveFromBox(productId);
    } else {
      setBoxItems(boxItems.map(item => 
        item.product.id === productId ? { ...item, quantity: newQty } : item
      ));
    }
  };

  // Calculate prices
  const totalBoxItemsCount = boxItems.reduce((sum, item) => sum + item.quantity, 0);
  
  // Helper to extract numeric value from product price
  const getPriceVal = (priceStr) => {
    if (typeof priceStr === 'number') return priceStr;
    if (!priceStr) return 0;
    return parseInt(priceStr.replace(/[^\d]/g, ''), 10) || 0;
  };

  // Calculate box retail value based on contents
  const boxRetailValue = boxItems.reduce((sum, item) => {
    const itemWeightGrams = selectedTier === 'starter' ? 100 : (selectedTier === 'family' ? 250 : 500);
    const itemBaseVal = getPriceVal(item.product.price);
    const itemCost = Math.round((itemBaseVal / 1000) * itemWeightGrams);
    return sum + (itemCost * item.quantity);
  }, 0);

  const discountedPrice = Math.round(boxRetailValue * (1 - currentTier.discount));
  const monthlySavings = Math.max(0, boxRetailValue - discountedPrice);

  const handleSubscribe = () => {
    if (boxItems.length === 0) {
      showToast('Please add at least one product to your box before subscribing.', 'error');
      return;
    }

    // Mock direct injection into standard cart context
    const mockSubscriptionProduct = {
      id: `subscription-${currentTier.id}`,
      name: `Avasan ${currentTier.name} Plan`,
      price: discountedPrice || currentTier.price
    };

    addToCart(mockSubscriptionProduct, `${frequency} SCM Sourcing`, 1, 1);
    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 3000);
  };

  return (
    <div className="min-h-screen bg-surface page-offset-top pb-24 px-8 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header Banner */}
        <section className="text-center max-w-3xl mx-auto space-y-4">
          <span className="label-tech text-secondary font-bold tracking-[0.2em] uppercase">Never Run Out</span>
          <h1 className="tracking-tighter">Subscribe & Save up to 20%</h1>
          <p className="text-stone-600 font-medium text-sm leading-relaxed">
            Choose a recurring plan, build your custom monthly box with premium stabilized powders and dehydrated ingredients, and get direct deliveries straight from our farm loops. Swap, pause, or skip anytime.
          </p>
        </section>

        {/* Plan Tiers Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Object.values(tiers).map((tier) => {
            const isSelected = selectedTier === tier.id;
            return (
              <div 
                key={tier.id}
                onClick={() => {
                  setSelectedTier(tier.id);
                  setBoxItems([]); // Reset items when swapping plans
                }}
                className={`rounded-[32px] p-8 bg-white border transition-all duration-300 flex flex-col justify-between cursor-pointer relative ${
                  isSelected 
                    ? 'border-secondary ring-2 ring-secondary/20 shadow-xl scale-102' 
                    : 'border-stone-100 hover:shadow-md'
                }`}
              >
                {tier.id === 'family' && (
                  <span className="absolute top-4 right-4 bg-secondary text-white text-[8px] font-bold label-tech px-3 py-1 rounded-full uppercase shadow-sm">
                    Most Popular
                  </span>
                )}
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl text-primary font-heading font-bold mb-1">{tier.name}</h3>
                    <span className="text-stone-400 text-xs font-semibold uppercase tracking-wider label-tech block mb-3">{tier.sizeLabel}</span>
                    <div className="flex items-baseline gap-1 pt-2">
                      <span className="text-4xl font-extrabold text-primary">₹{tier.price}</span>
                      <span className="text-stone-400 text-xs font-bold uppercase label-tech">/ month base</span>
                    </div>
                  </div>

                  <ul className="space-y-3 text-xs font-semibold text-stone-500 pt-4 border-t border-stone-50">
                    {tier.benefits.map((b, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check size={14} className="text-secondary shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4">
                  <button 
                    className={`w-full py-3.5 rounded-xl font-bold label-tech text-xs transition-all uppercase ${
                      isSelected 
                        ? 'bg-primary text-white shadow-md' 
                        : 'bg-stone-50 text-stone-600 border border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    {isSelected ? 'PLAN SELECTED' : 'CHOOSE PLAN'}
                  </button>
                </div>
              </div>
            );
          })}
        </section>

        {/* Box Builder Title */}
        <section className="pt-8 border-t border-stone-100">
          <div className="text-center space-y-2 mb-8">
            <span className="label-tech text-secondary font-bold">Interactive Box Customizer</span>
            <h2 className="text-primary font-heading font-bold mt-2">Build Your Custom {currentTier.name}</h2>
            <div className="w-16 h-1 bg-secondary mx-auto mt-4 rounded-full" />
          </div>
        </section>

        {/* Interactive Box Builder Interface */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Product List */}
          <div className="lg:col-span-8 bg-white rounded-[32px] p-6 shadow-ambient border border-stone-100 space-y-6">
            <div className="flex justify-between items-center border-b border-stone-50 pb-4">
              <h3 className="text-lg text-primary font-bold font-heading mb-0">Select Sourced Products</h3>
              <span className="text-xs text-stone-400 font-semibold">Eligible items: {currentTier.sizeLabel}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-2 scrollbar-hide">
              {products.map((p) => {
                const count = boxItems.find(item => item.product.id === p.id)?.quantity || 0;
                
                return (
                  <div key={p.id} className="border border-stone-50 rounded-2xl p-4 bg-stone-50/50 flex gap-4 items-center justify-between hover:border-stone-200 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 bg-white rounded-xl overflow-hidden flex items-center justify-center p-2 border border-stone-100 shrink-0">
                        <img src={getProductImage(p.id)} alt={p.name} className="w-full h-full object-contain" />
                      </div>
                      <div>
                        <h4 className="font-heading font-bold text-xs text-primary mb-0.5">{p.name}</h4>
                        <span className="text-[9px] text-stone-400 font-bold uppercase label-tech block">{p.category}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {count > 0 ? (
                        <div className="flex items-center bg-white border border-stone-150 rounded-xl p-0.5">
                          <button 
                            onClick={() => handleUpdateBoxQty(p.id, -1)}
                            className="p-1 hover:bg-stone-50 rounded text-stone-500 cursor-pointer"
                          >
                            <Minus size={10} />
                          </button>
                          <span className="w-6 text-center text-[11px] font-bold text-stone-700">{count}</span>
                          <button 
                            onClick={() => handleUpdateBoxQty(p.id, 1)}
                            className="p-1 hover:bg-stone-50 rounded text-stone-500 cursor-pointer"
                          >
                            <Plus size={10} />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleAddToBox(p)}
                          className="bg-primary/5 hover:bg-primary/10 text-primary text-[10px] font-bold px-3 py-1.5 rounded-lg border border-primary/5 cursor-pointer label-tech"
                        >
                          Add to Box
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Box Summary */}
          <div className="lg:col-span-4 bg-white rounded-[32px] p-6 shadow-ambient border border-stone-100 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg text-primary font-bold font-heading border-b border-stone-50 pb-4 mb-2">Box Contents</h3>
              
              {/* Delivery Frequency Selector */}
              <div className="space-y-2">
                <label className="label-tech text-[9px] text-stone-400 font-bold block uppercase tracking-wider">Delivery Cycle</label>
                <div className="grid grid-cols-3 gap-2 text-[10px] font-bold font-heading">
                  {['Weekly', 'Bi-weekly', 'Monthly'].map(f => (
                    <button
                      key={f}
                      onClick={() => setFrequency(f)}
                      className={`py-2 rounded-lg border text-center transition-all cursor-pointer ${
                        frequency === f
                          ? 'bg-primary text-white border-primary shadow-sm'
                          : 'bg-stone-50 text-stone-600 border-stone-150 hover:bg-stone-100'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Items in Box list */}
              <div className="space-y-3 divide-y divide-stone-50 pt-2 text-xs font-semibold text-stone-600">
                {boxItems.map(({ product, quantity }) => (
                  <div key={product.id} className="pt-3 flex justify-between items-center first:pt-0 first:border-0">
                    <div className="max-w-[150px]">
                      <span className="text-primary font-bold block truncate">{product.name}</span>
                      <span className="text-[9px] text-stone-400 font-bold label-tech">Qty: {quantity}</span>
                    </div>
                    <button 
                      onClick={() => handleRemoveFromBox(product.id)}
                      className="text-stone-300 hover:text-red-500 cursor-pointer"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}

                {boxItems.length === 0 && (
                  <div className="text-center py-12 text-stone-400 font-medium italic">
                    Your box is empty. Choose products from the catalog list to fill.
                  </div>
                )}
              </div>
            </div>

            {/* Calculations & Cart Actions */}
            <div className="space-y-4 pt-4 border-t border-stone-100">
              <div className="flex justify-between items-center text-xs font-bold text-stone-400 label-tech">
                <span>Box Capacity</span>
                <span className="text-stone-700">{totalBoxItemsCount} / {currentTier.limit} items</span>
              </div>
              
              <div className="space-y-2 text-xs font-medium border-t border-stone-50 pt-3">
                <div className="flex justify-between items-center text-stone-500">
                  <span>Box Retail Value</span>
                  <span className="text-stone-700">₹{boxRetailValue}</span>
                </div>
                <div className="flex justify-between items-center text-green-600 bg-green-500/10 p-2 rounded-lg font-bold">
                  <span>Subscription Savings</span>
                  <span>- ₹{monthlySavings} ({Math.round(currentTier.discount * 100)}%)</span>
                </div>
                <div className="flex justify-between items-end border-t border-stone-50 pt-3">
                  <span className="text-base text-stone-600 font-bold">Monthly Plan Cost</span>
                  <span className="text-2xl font-bold text-primary tracking-tight">₹{discountedPrice || currentTier.price}</span>
                </div>
              </div>

              <button
                onClick={handleSubscribe}
                disabled={boxItems.length === 0}
                className="w-full"
              >
                <ThemedButton 
                  className={`w-full py-4 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 ${
                    addedMessage ? 'bg-green-600 text-white hover:bg-green-600' : ''
                  }`}
                  disabled={boxItems.length === 0}
                >
                  {addedMessage ? (
                    <>Added Box to Cart! 📦</>
                  ) : (
                    <>
                      Subscribe to Custom Box <ArrowRight size={14} />
                    </>
                  )}
                </ThemedButton>
              </button>
            </div>

          </div>

        </section>

      </div>
    </div>
  );
};

export default Subscription;
