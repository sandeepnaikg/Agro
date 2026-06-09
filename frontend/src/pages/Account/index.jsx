import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, MapPin, Package, Compass, Plus, Trash2, Edit2, Calendar, ChevronRight, CheckCircle2, Clock, Truck, ShieldAlert, Mail } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useOrders } from '../../context/OrderContext';
import ThemedButton from '../../components/common/ThemedButton';

const Account = () => {
  const { currentUser, updateProfile, addAddress, updateAddress, removeAddress } = useAuth();
  const { orders } = useOrders();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState('orders'); // profile, addresses, orders, tracking
  const [selectedTrackingOrderId, setSelectedTrackingOrderId] = useState('');
  
  // Handle tab routing from location state
  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
      if (location.state?.highlightOrderId) {
        setSelectedTrackingOrderId(location.state.highlightOrderId);
      }
    }
  }, [location]);

  // Profile forms
  const [profileForm, setProfileForm] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    defaultPaymentPref: currentUser?.defaultPaymentPref || 'UPI',
    orderUpdates: currentUser?.notificationPrefs?.orderUpdates ?? true,
    promoOffers: currentUser?.notificationPrefs?.promoOffers ?? false,
    farmersSourcing: currentUser?.notificationPrefs?.farmersSourcing ?? true
  });
  const [isSaved, setIsSaved] = useState(false);

  // Address forms
  const [showAddrForm, setShowAddrForm] = useState(false);
  const [editingAddrId, setEditingAddrId] = useState(null); // null if adding, address ID if editing
  const [newAddr, setNewAddr] = useState({
    title: '',
    street: '',
    city: '',
    state: 'Telangana',
    zip: '',
    country: 'India',
    isDefault: false
  });

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    updateProfile({
      name: profileForm.name,
      email: profileForm.email,
      phone: profileForm.phone,
      defaultPaymentPref: profileForm.defaultPaymentPref,
      notificationPrefs: {
        orderUpdates: profileForm.orderUpdates,
        promoOffers: profileForm.promoOffers,
        farmersSourcing: profileForm.farmersSourcing
      }
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleSaveAddressSubmit = (e) => {
    e.preventDefault();
    if (editingAddrId) {
      updateAddress(editingAddrId, newAddr);
    } else {
      addAddress(newAddr);
    }
    setShowAddrForm(false);
    setEditingAddrId(null);
    setNewAddr({
      title: '',
      street: '',
      city: '',
      state: 'Telangana',
      zip: '',
      country: 'India',
      isDefault: false
    });
  };

  const startEditAddress = (addr) => {
    setEditingAddrId(addr.id);
    setNewAddr({
      title: addr.title,
      street: addr.street,
      city: addr.city,
      state: addr.state,
      zip: addr.zip,
      country: addr.country,
      isDefault: addr.isDefault
    });
    setShowAddrForm(true);
  };

  const startAddAddress = () => {
    setEditingAddrId(null);
    setNewAddr({
      title: '',
      street: '',
      city: '',
      state: 'Telangana',
      zip: '',
      country: 'India',
      isDefault: false
    });
    setShowAddrForm(true);
  };

  const activeTrackingOrder = orders.find(o => o.id === (selectedTrackingOrderId || orders[0]?.id));

  const getStatusStepIndex = (status) => {
    const steps = ['Ordered', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered'];
    return steps.indexOf(status);
  };

  return (
    <div className="min-h-screen bg-surface page-offset-top pb-24 px-8 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 items-start">
        
        {/* Left Side Navigation Panel */}
        <aside className="bg-white rounded-[32px] p-6 shadow-ambient border border-stone-100 space-y-8">
          <div className="flex items-center gap-4 border-b border-stone-50 pb-6">
            <div className="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center font-bold text-lg shadow-md font-heading italic">
              {currentUser.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h3 className="text-base text-primary font-bold leading-tight mb-1">{currentUser.name}</h3>
              <span className="text-[10px] text-stone-400 font-bold label-tech uppercase tracking-wider">Premium Account</span>
            </div>
          </div>

          <div className="flex flex-col gap-2 font-bold text-xs label-tech">
            {[
              { id: 'orders', label: 'My Purchase History', icon: <Package size={16} /> },
              { id: 'tracking', label: 'Shipment Tracking', icon: <Compass size={16} /> },
              { id: 'addresses', label: 'Delivery Address Book', icon: <MapPin size={16} /> },
              { id: 'profile', label: 'Settings & Profile', icon: <User size={16} /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-left transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-primary text-white shadow-md'
                    : 'text-primary/60 hover:bg-primary/5 hover:text-primary'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* Right Side Main Work Panel */}
        <main className="bg-white rounded-[32px] p-8 md:p-10 shadow-ambient border border-stone-100 min-h-[500px]">
          
          <AnimatePresence mode="wait">
            
            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <motion.div
                key="orders"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="border-b border-stone-50 pb-6 mb-6">
                  <h2 className="text-2xl text-primary font-bold font-heading mb-1">Purchase History</h2>
                  <p className="text-stone-400 text-xs font-semibold">Your previous orders and upcycled product transactions</p>
                </div>

                {orders.length === 0 ? (
                  <div className="text-center py-20">
                    <Package size={48} className="text-stone-200 mx-auto mb-4" />
                    <p className="text-stone-500 font-bold mb-2">No orders placed yet.</p>
                    <p className="text-stone-400 text-sm">Start looking at our fresh crop powder lists.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orders.map((ord) => (
                      <div 
                        key={ord.id}
                        className="border border-stone-100 rounded-2xl p-6 hover:shadow-md transition-shadow flex flex-col justify-between gap-6 md:flex-row md:items-center"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <span className="font-heading text-lg font-bold text-primary">{ord.id}</span>
                            <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase label-tech ${
                              ord.status === 'Delivered'
                                ? 'bg-green-500/10 text-green-600'
                                : ord.status === 'Cancelled'
                                ? 'bg-red-500/10 text-red-600'
                                : 'bg-amber-500/10 text-amber-600 animate-pulse'
                            }`}>
                              {ord.status}
                            </span>
                          </div>
                          
                          <p className="text-stone-400 text-[11px] font-semibold flex items-center gap-1.5"><Calendar size={12} /> Ordered: {new Date(ord.date).toLocaleDateString('en-IN', { dateStyle: 'medium' })}</p>

                          <div className="text-xs space-y-1 font-semibold text-stone-500">
                            {ord.items.map(item => (
                              <span key={item.id} className="block">
                                {item.name} ({item.weight}g, {item.format}) × {item.quantity}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex md:flex-col items-start md:items-end justify-between md:justify-center gap-4">
                          <div className="text-left md:text-right">
                            <span className="text-stone-400 text-[9px] font-bold label-tech block">Total Paid</span>
                            <span className="text-lg font-bold text-primary">₹{ord.grandTotal.toLocaleString()}</span>
                          </div>

                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setSelectedTrackingOrderId(ord.id);
                                setActiveTab('tracking');
                              }}
                              className="text-primary font-bold text-xs label-tech border border-stone-200 px-4 py-2.5 rounded-xl hover:bg-stone-50 transition-all flex items-center gap-1 cursor-pointer"
                            >
                              Track Status <ChevronRight size={12} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Tracking Tab */}
            {activeTab === 'tracking' && (
              <motion.div
                key="tracking"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="border-b border-stone-50 pb-6 mb-6">
                  <h2 className="text-2xl text-primary font-bold font-heading mb-1">Live Shipment Tracking</h2>
                  <p className="text-stone-400 text-xs font-semibold">Monitor the transparent delivery steps of your organic extracts</p>
                </div>

                {orders.length === 0 ? (
                  <div className="text-center py-20">
                    <Compass size={48} className="text-stone-200 mx-auto mb-4" />
                    <p className="text-stone-500 font-bold mb-2">No active shipments.</p>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {/* Selector */}
                    <div className="max-w-xs space-y-2">
                      <label className="label-tech text-[10px] text-stone-400 block font-bold">Select Order</label>
                      <select
                        value={selectedTrackingOrderId || orders[0]?.id}
                        onChange={(e) => setSelectedTrackingOrderId(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none text-stone-700 cursor-pointer"
                      >
                        {orders.map(o => (
                          <option key={o.id} value={o.id}>{o.id} - ({o.items[0]?.name.substring(0, 15)}...)</option>
                        ))}
                      </select>
                    </div>

                    {activeTrackingOrder ? (
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pt-4">
                        {/* Status Timeline */}
                        <div className="md:col-span-8 space-y-8">
                          <h3 className="text-lg text-primary font-heading font-bold mb-6">Shipment Timeline</h3>

                          <div className="relative border-l-2 border-stone-100 pl-8 ml-4 space-y-10">
                            {[
                              { status: 'Ordered', icon: <Clock size={16} />, label: 'Order Registered' },
                              { status: 'Processing', icon: <Package size={16} />, label: 'Upcycle Processing at Farm Gate' },
                              { status: 'Shipped', icon: <Truck size={16} />, label: 'Dispatched via Green Transport' },
                              { status: 'Out for Delivery', icon: <MapPin size={16} />, label: 'Out for Local Delivery' },
                              { status: 'Delivered', icon: <CheckCircle2 size={16} />, label: 'Delivered & Certified' }
                            ].map((stepObj, idx) => {
                              const stepIndex = getStatusStepIndex(activeTrackingOrder.status);
                              const isCompleted = idx <= stepIndex;
                              const isCurrent = idx === stepIndex;

                              const logEntry = activeTrackingOrder.trackingLogs.find(l => l.status === stepObj.status);

                              return (
                                <div key={stepObj.status} className="relative group text-xs">
                                  <div className={`absolute left-[-42px] top-1.5 w-7 h-7 rounded-full flex items-center justify-center border transition-all ${
                                    isCompleted 
                                      ? 'bg-primary border-primary text-white shadow-md' 
                                      : 'bg-white border-stone-200 text-stone-300'
                                  } ${isCurrent ? 'ring-4 ring-primary/20 scale-110' : ''}`}>
                                    {stepObj.icon}
                                  </div>
                                  
                                  <div>
                                    <h4 className={`text-sm font-bold transition-colors ${isCompleted ? 'text-primary' : 'text-stone-400'}`}>
                                      {stepObj.label}
                                    </h4>
                                    {logEntry ? (
                                      <div className="space-y-1 mt-1.5">
                                        <p className="text-stone-600 leading-relaxed font-medium">{logEntry.note}</p>
                                        <span className="text-[10px] text-stone-400 font-semibold uppercase">{new Date(logEntry.time).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</span>
                                      </div>
                                    ) : (
                                      <p className="text-stone-300 mt-1 italic font-medium">Pending shipping progress</p>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Order Snapshot */}
                        <div className="md:col-span-4 bg-stone-50 border border-stone-100 rounded-2xl p-6 space-y-4 text-xs font-semibold">
                          <h4 className="text-primary font-bold font-heading text-sm mb-2 border-b border-stone-200/50 pb-2">Delivery Summary</h4>
                          <div className="space-y-1">
                            <span className="text-stone-400 text-[9px] label-tech block">Ship to</span>
                            <p className="text-stone-700 leading-normal">
                              {activeTrackingOrder.shippingAddress.street}, <br />
                              {activeTrackingOrder.shippingAddress.city} - {activeTrackingOrder.shippingAddress.zip}
                            </p>
                          </div>
                          <div className="space-y-1 pt-2">
                            <span className="text-stone-400 text-[9px] label-tech block">Estimated Date</span>
                            <p className="text-stone-700">Within 3-4 Working Days</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-stone-400">Please choose an order above to track details.</p>
                    )}
                  </div>
                )}
              </motion.div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <motion.div
                key="addresses"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center border-b border-stone-50 pb-6 mb-6">
                  <div>
                    <h2 className="text-2xl text-primary font-bold font-heading mb-1">Address Book</h2>
                    <p className="text-stone-400 text-xs font-semibold">Saved delivery locations for seamless order checkouts</p>
                  </div>
                  <button 
                    onClick={startAddAddress}
                    className="text-secondary font-bold text-xs label-tech flex items-center gap-2 border border-secondary/10 px-4 py-2 rounded-xl hover:bg-secondary/5 transition-all cursor-pointer"
                  >
                    <Plus size={14} /> Add Address
                  </button>
                </div>

                {/* Address creation/edit form */}
                {showAddrForm && (
                  <form onSubmit={handleSaveAddressSubmit} className="bg-stone-50 border border-stone-100 rounded-2xl p-6 space-y-4 max-w-lg mb-8">
                    <h3 className="font-heading text-lg font-bold text-primary mb-2">
                      {editingAddrId ? 'Modify Address Details' : 'New Address Details'}
                    </h3>
                    <div>
                      <label className="label-tech text-[10px] text-stone-400 font-bold block mb-1">Title (e.g. Home, Farm)</label>
                      <input 
                        required
                        type="text" 
                        placeholder="Home Address"
                        value={newAddr.title}
                        onChange={(e) => setNewAddr(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full bg-white border border-stone-100 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none text-stone-700"
                      />
                    </div>
                    <div>
                      <label className="label-tech text-[10px] text-stone-400 font-bold block mb-1">Street address</label>
                      <input 
                        required
                        type="text" 
                        placeholder="Flat 402, Green Meadows"
                        value={newAddr.street}
                        onChange={(e) => setNewAddr(prev => ({ ...prev, street: e.target.value }))}
                        className="w-full bg-white border border-stone-100 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none text-stone-700"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="label-tech text-[10px] text-stone-400 font-bold block mb-1">City</label>
                        <input 
                          required
                          type="text" 
                          placeholder="Hyderabad"
                          value={newAddr.city}
                          onChange={(e) => setNewAddr(prev => ({ ...prev, city: e.target.value }))}
                          className="w-full bg-white border border-stone-100 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none text-stone-700"
                        />
                      </div>
                      <div>
                        <label className="label-tech text-[10px] text-stone-400 font-bold block mb-1">Postal Zip Code</label>
                        <input 
                          required
                          type="text" 
                          placeholder="500032"
                          value={newAddr.zip}
                          onChange={(e) => setNewAddr(prev => ({ ...prev, zip: e.target.value }))}
                          className="w-full bg-white border border-stone-100 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none text-stone-700"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 py-2">
                      <input 
                        type="checkbox"
                        id="addrDefault"
                        checked={newAddr.isDefault}
                        onChange={(e) => setNewAddr(prev => ({ ...prev, isDefault: e.target.checked }))}
                        className="w-4 h-4 text-primary focus:ring-primary rounded cursor-pointer"
                      />
                      <label htmlFor="addrDefault" className="text-xs text-stone-500 font-semibold cursor-pointer">Set as default delivery address</label>
                    </div>
                    
                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => { setShowAddrForm(false); setEditingAddrId(null); }}
                        className="px-4 py-2 text-xs font-bold text-stone-400 hover:text-stone-700"
                      >
                        Cancel
                      </button>
                      <ThemedButton type="submit" className="px-6 py-2 text-xs font-bold uppercase">
                        {editingAddrId ? 'Update Address' : 'Save Address'}
                      </ThemedButton>
                    </div>
                  </form>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {currentUser.addresses.map((addr) => (
                    <div 
                      key={addr.id}
                      className="border border-stone-100 rounded-2xl p-6 bg-stone-50 flex flex-col justify-between relative group"
                    >
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-heading text-lg text-primary font-bold">{addr.title}</span>
                          {addr.isDefault && (
                            <span className="bg-primary/10 text-primary text-[9px] font-bold px-2 py-0.5 rounded uppercase label-tech">Default</span>
                          )}
                        </div>
                        <p className="text-stone-600 text-xs leading-relaxed font-medium">
                          {addr.street}, <br />
                          {addr.city}, {addr.state} - {addr.zip} <br />
                          {addr.country}
                        </p>
                      </div>

                      <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-stone-100/50">
                        {/* Edit Address trigger */}
                        <button
                          onClick={() => startEditAddress(addr)}
                          className="p-2 text-stone-400 hover:text-secondary hover:bg-stone-150 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 text-[10px] font-bold label-tech"
                        >
                          <Edit2 size={12} /> Edit
                        </button>
                        <button
                          onClick={() => removeAddress(addr.id)}
                          className="p-2 text-stone-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Profile & Settings Tab */}
            {activeTab === 'profile' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="border-b border-stone-50 pb-6 mb-6">
                  <h2 className="text-2xl text-primary font-bold font-heading mb-1">Personal Settings & Profile</h2>
                  <p className="text-stone-400 text-xs font-semibold">Update contact credentials and dynamic site preferences</p>
                </div>

                <form onSubmit={handleUpdateProfile} className="space-y-6 max-w-xl">
                  {/* General Info */}
                  <div className="space-y-4">
                    <h3 className="text-base text-primary font-bold font-heading border-b border-stone-50 pb-2">Profile Credentials</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="label-tech text-[10px] text-stone-400 font-bold block mb-1">Full Name</label>
                        <input 
                          required
                          type="text" 
                          value={profileForm.name}
                          onChange={(e) => setProfileForm(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none text-stone-700"
                        />
                      </div>
                      <div>
                        <label className="label-tech text-[10px] text-stone-400 font-bold block mb-1">Phone Number</label>
                        <input 
                          required
                          type="text" 
                          value={profileForm.phone}
                          onChange={(e) => setProfileForm(prev => ({ ...prev, phone: e.target.value }))}
                          className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none text-stone-700"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="label-tech text-[10px] text-stone-400 font-bold block mb-1">Email Address</label>
                      <input 
                        required
                        type="email" 
                        value={profileForm.email}
                        onChange={(e) => setProfileForm(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none text-stone-700"
                      />
                    </div>
                  </div>

                  {/* Sourcing preferences */}
                  <div className="space-y-4 pt-4 border-t border-stone-50">
                    <h3 className="text-base text-primary font-bold font-heading border-b border-stone-50 pb-2">Checkout Preferences</h3>
                    
                    <div className="max-w-xs">
                      <label className="label-tech text-[10px] text-stone-400 font-bold block mb-1">Preferred Payment Option</label>
                      <select 
                        value={profileForm.defaultPaymentPref}
                        onChange={(e) => setProfileForm(prev => ({ ...prev, defaultPaymentPref: e.target.value }))}
                        className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none text-stone-700 cursor-pointer"
                      >
                        <option value="UPI">UPI Payment Apps</option>
                        <option value="Card">Credit or Debit Card</option>
                        <option value="NetBanking">Net Banking Portal</option>
                        <option value="COD">Cash on Delivery (COD)</option>
                      </select>
                    </div>
                  </div>

                  {/* Notification Toggles */}
                  <div className="space-y-3 pt-4 border-t border-stone-50">
                    <h3 className="text-base text-primary font-bold font-heading border-b border-stone-50 pb-2">Communication Settings</h3>
                    
                    <label className="flex items-start gap-3 text-xs text-stone-500 font-semibold cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={profileForm.orderUpdates}
                        onChange={(e) => setProfileForm(prev => ({ ...prev, orderUpdates: e.target.checked }))}
                        className="w-4 h-4 text-primary focus:ring-primary rounded mt-0.5 cursor-pointer"
                      />
                      <div>
                        <span className="block font-bold text-stone-700">Order Updates</span>
                        <span className="text-[10px] text-stone-400 font-normal leading-normal">Receive transaction emails and tracking milestone logs.</span>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 text-xs text-stone-500 font-semibold cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={profileForm.promoOffers}
                        onChange={(e) => setProfileForm(prev => ({ ...prev, promoOffers: e.target.checked }))}
                        className="w-4 h-4 text-primary focus:ring-primary rounded mt-0.5 cursor-pointer"
                      />
                      <div>
                        <span className="block font-bold text-stone-700">Promotional Offers</span>
                        <span className="text-[10px] text-stone-400 font-normal leading-normal">Receive discount codes and harvest clearance campaign emails.</span>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 text-xs text-stone-500 font-semibold cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={profileForm.farmersSourcing}
                        onChange={(e) => setProfileForm(prev => ({ ...prev, farmersSourcing: e.target.checked }))}
                        className="w-4 h-4 text-primary focus:ring-primary rounded mt-0.5 cursor-pointer"
                      />
                      <div>
                        <span className="block font-bold text-stone-700">Farmer Sourcing Logs</span>
                        <span className="text-[10px] text-stone-400 font-normal leading-normal">Receive impact updates on which farm upcycled crop residue matches your purchase.</span>
                      </div>
                    </label>
                  </div>

                  {/* Submission */}
                  <div className="pt-6 border-t border-stone-50 flex items-center gap-4">
                    <ThemedButton type="submit" className="px-10 py-3.5 text-xs font-bold uppercase">
                      Save Profile & Settings
                    </ThemedButton>
                    
                    {isSaved && (
                      <span className="text-green-600 text-xs font-semibold flex items-center gap-1.5">
                        <CheckCircle2 size={16} /> Saved Successfully
                      </span>
                    )}
                  </div>
                </form>
              </motion.div>
            )}

          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default Account;
