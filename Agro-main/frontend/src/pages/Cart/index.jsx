import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, ShoppingBag, Plus, Minus, ArrowRight, Heart, ShieldCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useProducts } from '../../context/ProductContext';
import { getProductImage } from '../../utils/productImages';
import ThemedButton from '../../components/common/ThemedButton';

const Cart = () => {
  const { 
    cart, 
    addToCart,
    updateCartQty, 
    updateCartItemVariant,
    removeFromCart, 
    clearCart, 
    subtotal, 
    shipping, 
    gst, 
    grandTotal, 
    wishlist, 
    toggleWishlist 
  } = useCart();

  const { products } = useProducts();
  const navigate = useNavigate();

  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [couponApplied, setCouponApplied] = useState('');

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    const code = couponCode.trim().toUpperCase();

    if (code === 'AVASAN10' || code === 'AVSAN10') {
      setCouponDiscount(Math.round(subtotal * 0.10));
      setCouponApplied('AVASAN10');
      setCouponCode('');
    } else if (code === 'GREENEARTH') {
      setCouponDiscount(Math.round(subtotal * 0.15));
      setCouponApplied('GREENEARTH');
      setCouponCode('');
    } else if (code === '') {
      setCouponError('Please enter a coupon code.');
    } else {
      setCouponError('Invalid coupon code. Try AVASAN10 or GREENEARTH.');
    }
  };

  const handleRemoveCoupon = () => {
    setCouponDiscount(0);
    setCouponApplied('');
  };

  const finalGrandTotal = Math.max(0, grandTotal - couponDiscount);
  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="min-h-screen bg-surface page-offset-top pb-24 px-8 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <h1 className="mb-12 tracking-tighter">Your Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="bg-white rounded-[32px] p-16 text-center shadow-ambient border border-stone-100 max-w-2xl mx-auto space-y-6">
            <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto text-primary">
              <ShoppingBag size={36} />
            </div>
            <h2 className="text-2xl text-primary font-bold">Your cart is empty</h2>
            <p className="text-stone-500 font-medium max-w-sm mx-auto">
              Sustainably sourced agricultural extracts are just a click away. Support local growers and start adding eco products now.
            </p>
            <Link to="/products" className="inline-block">
              <ThemedButton className="px-10 py-4 font-bold flex items-center gap-3">
                Explore Shop <ArrowRight size={18} />
              </ThemedButton>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Cart Items List */}
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-white rounded-[32px] p-6 md:p-8 shadow-ambient border border-stone-100">
                <div className="flex justify-between items-center border-b border-stone-50 pb-6 mb-6">
                  <span className="font-bold text-primary font-heading text-lg">Cart Items ({cart.length})</span>
                  <button 
                    onClick={clearCart} 
                    className="text-stone-400 hover:text-secondary font-bold text-xs label-tech flex items-center gap-2 cursor-pointer"
                  >
                    <Trash2 size={14} /> Clear Cart
                  </button>
                </div>

                <div className="divide-y divide-stone-100">
                  <AnimatePresence>
                    {cart.map((item) => (
                      <motion.div 
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, height: 0 }}
                        className="py-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6"
                      >
                        <div className="flex items-center gap-6">
                          {/* Image */}
                          <div className="w-20 h-20 bg-stone-50 rounded-2xl overflow-hidden flex items-center justify-center p-3 border border-stone-100 shrink-0">
                            <img 
                              src={getProductImage(item.productId)} 
                              alt={item.name} 
                              className="w-full h-full object-contain"
                            />
                          </div>

                          {/* Info */}
                          <div className="space-y-1.5">
                            <Link to="/products" className="text-primary font-heading text-lg font-bold hover:text-secondary transition-colors">
                              {item.name}
                            </Link>
                            
                            {/* Interactive Form & Weight Selection directly inside cart table */}
                            <div className="flex flex-wrap items-center gap-3">
                              {/* Format Switcher */}
                              <select 
                                value={item.format}
                                onChange={(e) => updateCartItemVariant(item.id, e.target.value, item.weight)}
                                className="bg-stone-50 border border-stone-150 rounded-lg px-2.5 py-1 text-[10px] font-bold label-tech text-primary cursor-pointer focus:outline-none"
                              >
                                <option value="Powder">Powder Form</option>
                                <option value="Dried">Dried Form</option>
                              </select>

                              {/* Weight Selector */}
                              <select
                                value={item.weight}
                                onChange={(e) => updateCartItemVariant(item.id, item.format, parseInt(e.target.value, 10))}
                                className="bg-stone-50 border border-stone-150 rounded-lg px-2.5 py-1 text-[10px] font-bold label-tech text-secondary cursor-pointer focus:outline-none"
                              >
                                <option value={100}>100g</option>
                                <option value={200}>200g</option>
                                <option value={500}>500g</option>
                                <option value={1000}>1kg</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        {/* Controls & Price */}
                        <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-8">
                          {/* Qty Controls */}
                          <div className="flex items-center bg-stone-50 rounded-xl p-1 border border-stone-100">
                            <button 
                              onClick={() => updateCartQty(item.id, item.quantity - 1)}
                              className="p-2 hover:bg-white rounded-lg text-stone-500 hover:text-secondary transition-all cursor-pointer"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-8 text-center text-sm font-bold text-stone-700">{item.quantity}</span>
                            <button 
                              onClick={() => updateCartQty(item.id, item.quantity + 1)}
                              className="p-2 hover:bg-white rounded-lg text-stone-500 hover:text-primary transition-all cursor-pointer"
                            >
                              <Plus size={14} />
                            </button>
                          </div>

                          {/* Total Cost */}
                          <div className="text-right min-w-[100px]">
                            <span className="text-lg font-bold text-primary block">
                              ₹{(item.price * item.quantity).toLocaleString()}
                            </span>
                            <span className="text-stone-400 text-xs font-medium">
                              ₹{item.price.toLocaleString()} each
                            </span>
                          </div>

                          {/* Delete */}
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="p-2.5 text-stone-300 hover:text-secondary hover:bg-secondary/5 rounded-xl transition-all cursor-pointer"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-4 space-y-6">
              {/* Checkout Card */}
              <div className="bg-white rounded-[32px] p-8 shadow-ambient border border-stone-100 space-y-6">
                <h3 className="text-xl text-primary font-bold font-heading border-b border-stone-50 pb-4 mb-2">Order Summary</h3>

                <div className="space-y-4 text-sm font-medium">
                  <div className="flex justify-between items-center text-stone-500">
                    <span>Subtotal</span>
                    <span className="text-stone-700">₹{subtotal.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-stone-500">
                    <span>GST (5%)</span>
                    <span className="text-stone-700">₹{gst.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between items-center text-stone-500">
                    <span>Delivery Charge</span>
                    <span className="text-stone-700">
                      {shipping === 0 ? <span className="text-green-600 font-bold uppercase tracking-wider text-xs bg-green-500/10 px-2 py-0.5 rounded">Free</span> : `₹${shipping}`}
                    </span>
                  </div>

                  {couponDiscount > 0 && (
                    <div className="flex justify-between items-center text-green-600 bg-green-500/10 p-2 rounded-lg text-xs">
                      <div className="flex items-center gap-1.5">
                        <span>Coupon ({couponApplied})</span>
                        <button onClick={handleRemoveCoupon} className="font-bold text-[10px] underline hover:text-red-500 cursor-pointer">REMOVE</button>
                      </div>
                      <span className="font-bold">- ₹{couponDiscount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="border-t border-stone-100 pt-4 flex justify-between items-end">
                    <span className="text-base text-stone-600 font-bold">Total Cost</span>
                    <span className="text-2xl font-bold text-primary tracking-tight">
                      ₹{finalGrandTotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Promo Code Input */}
                <form onSubmit={handleApplyCoupon} className="space-y-2 pt-2 border-t border-stone-50">
                  <label className="label-tech text-[10px] text-stone-400 block font-bold">Promotional Coupon</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="e.g. AVASAN10"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-grow bg-stone-50 border border-stone-100 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-secondary/35 text-stone-700 font-bold uppercase placeholder:text-stone-300"
                    />
                    <button 
                      type="submit"
                      className="btn-terracotta px-4 py-2.5 rounded-xl text-xs font-bold cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && <p className="text-red-500 text-[10px] font-semibold">{couponError}</p>}
                  {!couponApplied && (
                    <p className="text-stone-400 text-[10px] leading-tight">
                      Tip: Use <span className="font-bold text-stone-500">AVASAN10</span> for 10% or <span className="font-bold text-stone-500">GREENEARTH</span> for 15% discount.
                    </p>
                  )}
                </form>

                <button 
                  onClick={() => navigate('/checkout', { state: { couponApplied, couponDiscount } })}
                  className="w-full"
                >
                  <ThemedButton className="w-full py-4 text-base font-bold flex items-center justify-center gap-3">
                    Proceed to Checkout <ArrowRight size={18} />
                  </ThemedButton>
                </button>

                <div className="flex items-center gap-3 text-xs bg-stone-50 p-4 rounded-2xl border border-stone-100">
                  <ShieldCheck size={20} className="text-primary shrink-0" />
                  <span className="text-stone-500 leading-normal font-medium">
                    Secure checkout with support for UPI, Credit/Debit cards, Net Banking, and Cash on Delivery.
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Wishlist Subsection */}
        {wishlistProducts.length > 0 && (
          <section className="mt-20 border-t border-stone-100 pt-16">
            <h2 className="text-2xl font-heading font-bold text-primary mb-8">From Your Wishlist</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {wishlistProducts.map(p => (
                <div key={p.id} className="bg-white rounded-2xl p-6 shadow-ambient border border-stone-100 flex flex-col justify-between">
                  <div>
                    <div className="w-full aspect-square bg-stone-50 rounded-xl p-4 flex items-center justify-center mb-4 border border-stone-50">
                      <img src={getProductImage(p.id)} alt={p.name} className="w-full h-full object-contain" />
                    </div>
                    <h3 className="text-base text-primary font-bold mb-1 leading-tight">{p.name}</h3>
                    <p className="text-stone-400 text-xs font-semibold uppercase tracking-wider label-tech mb-3">{p.category}</p>
                    <span className="text-sm font-bold text-stone-700">{p.price}</span>
                  </div>
                  <div className="flex gap-2 mt-4 pt-4 border-t border-stone-50">
                    <button
                      onClick={() => {
                        addToCart(p, 'Powder', 100, 1);
                      }}
                      className="btn-terracotta text-xs font-bold py-2 px-3 rounded-lg flex-grow flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <ShoppingBag size={12} /> Add to Cart
                    </button>
                    <button
                      onClick={() => toggleWishlist(p.id)}
                      className="p-2 bg-stone-50 hover:bg-red-50 text-stone-300 hover:text-red-500 rounded-lg transition-all border border-stone-100 cursor-pointer"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Cart;
