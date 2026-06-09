import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Truck, CreditCard, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useOrders } from '../../context/OrderContext';
import ThemedButton from '../../components/common/ThemedButton';

const Checkout = () => {
  const { cart, subtotal, gst, shipping, grandTotal, clearCart } = useCart();
  const { currentUser } = useAuth();
  const { addOrder } = useOrders();
  
  const navigate = useNavigate();
  const location = useLocation();

  const couponApplied = location.state?.couponApplied || '';
  const couponDiscount = location.state?.couponDiscount || 0;
  const finalTotal = Math.max(0, grandTotal - couponDiscount);

  // Form states
  const [selectedAddrId, setSelectedAddrId] = useState(currentUser.addresses[0]?.id || '');
  const [deliverySlot, setDeliverySlot] = useState('Morning'); // Morning, Afternoon, Evening
  const [paymentMethod, setPaymentMethod] = useState('UPI'); // UPI, Card, NetBanking, COD
  const [pincode, setPincode] = useState('500032');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsProcessing(true);
    
    // Simulate payment authorization
    setTimeout(() => {
      const selectedAddr = currentUser.addresses.find(a => a.id === selectedAddrId) || currentUser.addresses[0];
      const newOrderId = addOrder({
        items: cart,
        subtotal,
        gst,
        shipping,
        grandTotal: finalTotal,
        shippingAddress: {
          street: selectedAddr?.street || 'Default Street',
          city: selectedAddr?.city || 'Hyderabad',
          zip: selectedAddr?.zip || pincode
        }
      });

      setIsProcessing(false);
      setIsDone(true);
      clearCart();

      // Redirect to Account / Tracking tab after success
      setTimeout(() => {
        navigate('/account', { state: { activeTab: 'tracking', highlightOrderId: newOrderId } });
      }, 2500);
    }, 2000);
  };

  if (isDone) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center px-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-[32px] p-12 max-w-md w-full shadow-ambient border border-stone-100 text-center space-y-6"
        >
          <div className="w-20 h-20 bg-green-500/10 text-green-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 size={48} />
          </div>
          <div>
            <h2 className="text-2xl text-primary font-bold font-heading mb-2">Order Confirmed!</h2>
            <p className="text-stone-500 text-xs font-semibold">Your direct farmer-sourced shipment has been registered. Redirecting to live tracking timeline...</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface page-offset-top pb-24 px-8 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/cart')} 
            className="p-2 hover:bg-white rounded-xl border border-transparent hover:border-stone-150 text-stone-500 transition-all cursor-pointer"
          >
            <ArrowLeft size={18} />
          </button>
          <h1 className="tracking-tighter mb-0 mt-0">Secure Checkout</h1>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white rounded-[32px] p-12 text-center border border-stone-100 max-w-md mx-auto space-y-4">
            <p className="text-stone-400 font-medium">Your basket is empty. Please add crops to proceed.</p>
            <ThemedButton onClick={() => navigate('/products')} className="px-6 py-2.5 text-xs font-bold">Go To Shop</ThemedButton>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Options Form */}
            <form onSubmit={handlePlaceOrder} className="lg:col-span-8 bg-white rounded-[32px] p-8 md:p-10 shadow-ambient border border-stone-100 space-y-8">
              
              {/* Delivery Address */}
              <div className="space-y-4">
                <h3 className="text-lg text-primary font-heading font-bold border-b border-stone-50 pb-2">1. Delivery Destination</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentUser.addresses.map(addr => (
                    <label 
                      key={addr.id}
                      className={`rounded-2xl p-5 border cursor-pointer transition-all flex items-start gap-4 ${
                        selectedAddrId === addr.id 
                          ? 'border-primary bg-primary/5 ring-1 ring-primary/10' 
                          : 'border-stone-150 hover:bg-stone-50'
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="checkoutAddress"
                        checked={selectedAddrId === addr.id}
                        onChange={() => setSelectedAddrId(addr.id)}
                        className="w-4 h-4 text-primary focus:ring-primary rounded-full mt-1 cursor-pointer"
                      />
                      <div className="text-xs font-semibold">
                        <span className="block font-heading text-sm font-bold text-primary mb-1">{addr.title}</span>
                        <span className="text-stone-600 leading-normal block">{addr.street}, {addr.city} - {addr.zip}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Delivery Time Slots */}
              <div className="space-y-4">
                <h3 className="text-lg text-primary font-heading font-bold border-b border-stone-50 pb-2">2. Delivery Window</h3>
                <div className="grid grid-cols-3 gap-4 text-xs font-bold font-heading">
                  {[
                    { id: 'Morning', label: 'Morning Slot', desc: '8 AM - 12 PM' },
                    { id: 'Afternoon', label: 'Afternoon Slot', desc: '12 PM - 4 PM' },
                    { id: 'Evening', label: 'Evening Slot', desc: '4 PM - 8 PM' }
                  ].map(slot => (
                    <button
                      key={slot.id}
                      type="button"
                      onClick={() => setDeliverySlot(slot.id)}
                      className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                        deliverySlot === slot.id
                          ? 'border-primary bg-primary/5 ring-1 ring-primary/10'
                          : 'border-stone-150 hover:bg-stone-50 bg-white text-stone-600'
                      }`}
                    >
                      <span className="block text-primary text-xs font-bold mb-0.5">{slot.label}</span>
                      <span className="block text-[10px] text-stone-400 font-semibold">{slot.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-4">
                <h3 className="text-lg text-primary font-heading font-bold border-b border-stone-50 pb-2">3. Payment Methods</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-bold label-tech text-stone-600">
                  {[
                    { id: 'UPI', label: 'UPI / Google Pay' },
                    { id: 'Card', label: 'Debit/Credit Cards' },
                    { id: 'NetBanking', label: 'Net Banking' },
                    { id: 'COD', label: 'Cash on Delivery' }
                  ].map(method => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setPaymentMethod(method.id)}
                      className={`p-4 rounded-xl border text-center transition-all cursor-pointer font-semibold ${
                        paymentMethod === method.id
                          ? 'bg-primary text-white border-primary shadow-md'
                          : 'bg-white text-stone-600 border-stone-150 hover:bg-stone-50'
                      }`}
                    >
                      <CreditCard size={14} className="mx-auto mb-1.5" />
                      <span>{method.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Secure terms footer */}
              <div className="pt-4 flex items-center gap-3 border-t border-stone-50">
                <ShieldCheck size={20} className="text-primary" />
                <span className="text-[10px] text-stone-400 font-semibold leading-normal">
                  Your transaction is fully encrypted via PCI-DSS standards. Product logistics trackable in real-time from farm collection points.
                </span>
              </div>
            </form>

            {/* Right Summary Panel */}
            <div className="lg:col-span-4 bg-white rounded-[32px] p-8 shadow-ambient border border-stone-100 space-y-6">
              <h3 className="text-xl text-primary font-bold font-heading border-b border-stone-50 pb-4 mb-2">Checkout Details</h3>
              
              <div className="space-y-3 divide-y divide-stone-50 text-xs font-semibold text-stone-600">
                {cart.map(item => (
                  <div key={item.id} className="pt-3 flex justify-between items-center first:pt-0 first:border-0">
                    <div className="max-w-[150px]">
                      <span className="text-primary font-bold block truncate">{item.name}</span>
                      <span className="text-[9px] text-stone-400 font-bold label-tech">{item.format} | {item.weight}g × {item.quantity}</span>
                    </div>
                    <span className="text-stone-700">₹{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-4 border-t border-stone-100 text-xs font-medium">
                <div className="flex justify-between items-center text-stone-500">
                  <span>Subtotal</span>
                  <span className="text-stone-700 font-semibold">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-stone-500">
                  <span>GST Tax (5%)</span>
                  <span className="text-stone-700 font-semibold">₹{gst.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-stone-500">
                  <span>Green Shipping</span>
                  <span className="text-stone-700 font-semibold">
                    {shipping === 0 ? <span className="text-green-600 font-bold uppercase tracking-wider text-[10px]">Free</span> : `₹${shipping}`}
                  </span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between items-center text-green-600 bg-green-500/10 p-2 rounded-lg font-bold">
                    <span>Coupon ({couponApplied})</span>
                    <span>- ₹{couponDiscount.toLocaleString()}</span>
                  </div>
                )}
                <div className="border-t border-stone-100 pt-4 flex justify-between items-end">
                  <span className="text-base text-stone-600 font-bold font-heading">Total Amount</span>
                  <span className="text-2xl font-bold text-primary tracking-tight">₹{finalTotal.toLocaleString()}</span>
                </div>
              </div>

              <button
                type="submit"
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="w-full"
              >
                <ThemedButton 
                  className="w-full py-4 text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>Authorizing Sourcing Payment...</>
                  ) : (
                    <>
                      Confirm Sourced Order <ArrowRight size={14} />
                    </>
                  )}
                </ThemedButton>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default Checkout;
