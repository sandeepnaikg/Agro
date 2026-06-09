import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, Package, Users, Compass, Plus, Trash2, Edit, CheckCircle, Ship, AlertCircle, ShoppingCart, TrendingUp, Sparkles, Inbox, Lock } from 'lucide-react';
import { useProducts } from '../../context/ProductContext';
import { useFarmers } from '../../context/FarmerContext';
import { useOrders } from '../../context/OrderContext';
import ThemedButton from '../../components/common/ThemedButton';

const Admin = () => {
  const { products, addProduct, updateProduct, deleteProduct, refreshProducts } = useProducts();
  const { farmers, addFarmer, deleteFarmer, totalFarmersCount } = useFarmers();
  const { orders, bulkInquiries, updateOrderStatus, refreshAdminData } = useOrders();

  const [adminKey, setAdminKey] = useState(sessionStorage.getItem('avasan_admin_key') || '');
  const [isAuthenticated, setIsAuthenticated] = useState(!!sessionStorage.getItem('avasan_admin_key'));
  const [passphraseInput, setPassphraseInput] = useState('');
  const [authError, setAuthError] = useState('');

  const [activeSubTab, setActiveSubTab] = useState('analytics'); // analytics, inventory, orders, farmers, inquiries

  useEffect(() => {
    if (isAuthenticated) {
      refreshProducts();
      refreshAdminData();
    }
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!passphraseInput) return;
    
    // Save to session storage and state
    sessionStorage.setItem('avasan_admin_key', passphraseInput);
    setAdminKey(passphraseInput);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('avasan_admin_key');
    setAdminKey('');
    setIsAuthenticated(false);
    setPassphraseInput('');
  };


  // --- INVENTORY STATES ---
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [newProdData, setNewProdData] = useState({
    name: '',
    price: '₹500 / kg',
    category: 'Vegetable Powders',
    description: '',
    processingNote: '',
    isNowProcessing: true,
    isYearRound: false,
    isHighImpact: false
  });

  // --- FARMER STATES ---
  const [showAddFarmerForm, setShowAddFarmerForm] = useState(false);
  const [newFarmerData, setNewFarmerData] = useState({
    name: '',
    location: '',
    productSupplied: 'Moringa Leaves',
    quantityDetails: '1 Ton / Season',
    sourcingInfo: ''
  });

  // --- EDIT PRODUCT INLINE ---
  const [editingProdId, setEditingProdId] = useState(null);
  const [editPrice, setEditPrice] = useState('');

  // Calculations for Analytics
  const totalSalesVal = orders.filter(o => o.status !== 'Cancelled').reduce((sum, o) => sum + o.grandTotal, 0);
  const totalWeightUpcycled = 48.5 + (orders.length * 0.05); // Simulated tons of crop waste saved

  const handleAddProductSubmit = (e) => {
    e.preventDefault();
    if (!newProdData.name) return;
    addProduct(newProdData);
    setShowAddProductForm(false);
    setNewProdData({
      name: '',
      price: '₹500 / kg',
      category: 'Vegetable Powders',
      description: '',
      processingNote: '',
      isNowProcessing: true,
      isYearRound: false,
      isHighImpact: false
    });
  };

  const handleAddFarmerSubmit = (e) => {
    e.preventDefault();
    if (!newFarmerData.name) return;
    addFarmer(newFarmerData);
    setShowAddFarmerForm(false);
    setNewFarmerData({
      name: '',
      location: '',
      productSupplied: 'Moringa Leaves',
      quantityDetails: '1 Ton / Season',
      sourcingInfo: ''
    });
  };

  const startEditProduct = (prod) => {
    setEditingProdId(prod.id);
    setEditPrice(prod.price);
  };

  const saveProductPrice = (id) => {
    updateProduct(id, { price: editPrice });
    setEditingProdId(null);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-surface page-offset-top pb-24 px-8 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[32px] p-10 max-w-md w-full shadow-ambient border border-stone-100 text-center space-y-6"
        >
          <div className="w-16 h-16 bg-primary/5 text-primary rounded-2xl flex items-center justify-center mx-auto">
            <Lock size={32} />
          </div>
          <div>
            <h2 className="text-xl font-heading font-bold text-primary mb-2">Admin Authentication</h2>
            <p className="text-stone-400 text-xs font-semibold">Enter your secure Administrator secret passphrase to view real-time operations.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="label-tech text-[10px] text-stone-400 block font-bold mb-1">Passphrase</label>
              <input 
                required
                type="password" 
                placeholder="••••••••••••••"
                value={passphraseInput}
                onChange={(e) => setPassphraseInput(e.target.value)}
                className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none text-stone-700"
              />
            </div>
            <ThemedButton type="submit" className="w-full py-3 text-xs font-bold uppercase tracking-wider">Access Control Center</ThemedButton>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface page-offset-top pb-24 px-8 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-stone-100 pb-8 gap-4">
          <div>
            <span className="bg-secondary text-white label-tech px-4 py-1 rounded-full text-[9px] font-bold tracking-widest uppercase">Admin Workspace</span>
            <div className="flex items-center gap-4 mt-3">
              <h1 className="tracking-tighter mb-0 mt-0">Control Center</h1>
              <button 
                onClick={handleLogout}
                className="text-[10px] font-bold text-red-500 uppercase label-tech hover:underline cursor-pointer bg-transparent border-0 outline-none"
              >
                Log Out
              </button>
            </div>
          </div>
          
          <div className="flex flex-wrap md:flex-row bg-white p-1 rounded-xl shadow-sm border border-stone-100 text-xs font-bold label-tech gap-1 w-full md:w-auto justify-center md:justify-start">
            {[
              { id: 'analytics', label: 'Overview', icon: <BarChart3 size={14} /> },
              { id: 'inventory', label: 'Inventory', icon: <Package size={14} /> },
              { id: 'orders', label: 'Orders', icon: <ShoppingCart size={14} /> },
              { id: 'farmers', label: 'Farmers', icon: <Users size={14} /> },
              { id: 'inquiries', label: 'Inquiries', icon: <Inbox size={14} /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all cursor-pointer ${
                  activeSubTab === tab.id
                    ? 'bg-primary text-white shadow-md'
                    : 'text-primary/60 hover:text-primary hover:bg-stone-50'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Panels */}
        <AnimatePresence mode="wait">
          
          {/* Analytics Overview Tab */}
          {activeSubTab === 'analytics' && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-10"
            >
              {/* Widgets Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <AnalyticsCard title="Gross Sales" value={`₹${totalSalesVal.toLocaleString()}`} icon={<TrendingUp size={24} />} trend="+14% this month" />
                <AnalyticsCard title="Shipments Handled" value={orders.length} icon={<ShoppingCart size={24} />} trend="100% dispatch success" />
                <AnalyticsCard title="Crop Upcycled" value={`${totalWeightUpcycled.toFixed(1)} Tons`} icon={<Sparkles size={24} />} trend="Surplus waste saved" />
                <AnalyticsCard title="Grower Ecosystem" value={`${totalFarmersCount}+`} icon={<Users size={24} />} trend="Direct partnerships" />
              </div>

              {/* Layout splits */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Popular products list */}
                <div className="bg-white rounded-[32px] p-8 shadow-ambient border border-stone-100">
                  <h3 className="text-lg text-primary font-bold font-heading mb-6 border-b border-stone-50 pb-4">Consistent Staples Performance</h3>
                  <div className="space-y-4">
                    {products.slice(0, 5).map((prod, idx) => (
                      <div key={prod.id} className="flex justify-between items-center py-2 border-b border-stone-50 last:border-0 text-xs font-semibold">
                        <div className="flex items-center gap-4">
                          <span className="text-stone-300 font-heading text-lg font-bold">0{idx + 1}</span>
                          <div>
                            <span className="text-stone-700 font-bold block">{prod.name}</span>
                            <span className="text-stone-400 text-[10px] uppercase label-tech">{prod.category}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-stone-700 block">{prod.price}</span>
                          <span className="text-green-600 text-[10px] label-tech font-bold uppercase">Active Processing</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sourcing compliance metrics */}
                <div className="bg-[#23422A] text-white rounded-[32px] p-8 shadow-ambient relative overflow-hidden flex flex-col justify-between min-h-[300px]">
                  <div className="absolute -right-20 -top-20 w-60 h-60 bg-white/5 rounded-full blur-2xl" />
                  <div className="z-10 space-y-4">
                    <span className="label-tech text-secondary-container font-bold text-[10px]">Eco Impact Summary</span>
                    <h3 className="text-white text-3xl font-heading tracking-tight leading-tight">Circular Waste upcycling footprint</h3>
                    <p className="text-white/70 text-sm leading-relaxed max-w-sm">
                      Each processing cycle converts farm residue into shelf-stable powders. The network currently averts crop stubble burning across 15 agricultural villages.
                    </p>
                  </div>

                  <div className="z-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-6 mt-6 text-center">
                    <div>
                      <span className="text-xl font-heading font-bold text-white block">98%</span>
                      <span className="text-white/40 text-[9px] label-tech uppercase font-bold">Nutrient Ret.</span>
                    </div>
                    <div>
                      <span className="text-xl font-heading font-bold text-white block">4 Hours</span>
                      <span className="text-white/40 text-[9px] label-tech uppercase font-bold">Stabilisation</span>
                    </div>
                    <div>
                      <span className="text-xl font-heading font-bold text-white block">Zero</span>
                      <span className="text-white/40 text-[9px] label-tech uppercase font-bold">Waste Water</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Inventory Manager Tab */}
          {activeSubTab === 'inventory' && (
            <motion.div
              key="inventory"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl text-primary font-bold font-heading mb-1">E-Commerce Product Inventory</h2>
                  <p className="text-stone-400 text-xs font-semibold">Add crops or update pricing and catalog tags</p>
                </div>
                <button
                  onClick={() => setShowAddProductForm(!showAddProductForm)}
                  className="text-secondary font-bold text-xs label-tech flex items-center gap-2 border border-secondary/10 px-4 py-2 rounded-xl hover:bg-secondary/5 transition-all"
                >
                  <Plus size={14} /> Add Product
                </button>
              </div>

              {/* Add Product Form */}
              {showAddProductForm && (
                <form onSubmit={handleAddProductSubmit} className="bg-white border border-stone-100 rounded-3xl p-8 shadow-ambient space-y-6 max-w-2xl">
                  <h3 className="font-heading text-lg font-bold text-primary mb-4">Register New Eco Product</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="label-tech text-[10px] text-stone-400 block font-bold mb-1">Product Name</label>
                      <input 
                        required
                        type="text" 
                        placeholder="Moringa Seed Powder"
                        value={newProdData.name}
                        onChange={(e) => setNewProdData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none text-stone-700"
                      />
                    </div>
                    <div>
                      <label className="label-tech text-[10px] text-stone-400 block font-bold mb-1">Base Price String</label>
                      <input 
                        required
                        type="text" 
                        placeholder="₹550 / kg"
                        value={newProdData.price}
                        onChange={(e) => setNewProdData(prev => ({ ...prev, price: e.target.value }))}
                        className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none text-stone-700"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="label-tech text-[10px] text-stone-400 block font-bold mb-1">Category</label>
                      <select
                        value={newProdData.category}
                        onChange={(e) => setNewProdData(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none text-stone-700 cursor-pointer"
                      >
                        <option value="Leaf & Soft Dry">Leaf & Soft Dry</option>
                        <option value="Seed Products">Seed Products</option>
                        <option value="Vegetable Powders">Vegetable Powders</option>
                        <option value="Fruit Powders">Fruit Powders</option>
                        <option value="Oil Extraction">Oil Extraction</option>
                        <option value="Biomass & Waste">Biomass & Waste</option>
                      </select>
                    </div>

                    <div className="flex gap-4 items-center h-full pt-4">
                      <label className="flex items-center gap-1.5 text-xs text-stone-500 font-semibold cursor-pointer">
                        <input 
                          type="checkbox"
                          checked={newProdData.isNowProcessing}
                          onChange={(e) => setNewProdData(prev => ({ ...prev, isNowProcessing: e.target.checked }))}
                          className="w-4 h-4 text-primary focus:ring-primary rounded"
                        />
                        Active Processing
                      </label>
                      <label className="flex items-center gap-1.5 text-xs text-stone-500 font-semibold cursor-pointer">
                        <input 
                          type="checkbox"
                          checked={newProdData.isHighImpact}
                          onChange={(e) => setNewProdData(prev => ({ ...prev, isHighImpact: e.target.checked }))}
                          className="w-4 h-4 text-primary focus:ring-primary rounded"
                        />
                        High Impact
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="label-tech text-[10px] text-stone-400 block font-bold mb-1">Description</label>
                    <textarea 
                      required
                      rows={3}
                      placeholder="Product upcycling details..."
                      value={newProdData.description}
                      onChange={(e) => setNewProdData(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none text-stone-700 resize-none"
                    />
                  </div>

                  <div>
                    <label className="label-tech text-[10px] text-stone-400 block font-bold mb-1">Processing Notes</label>
                    <input 
                      type="text" 
                      placeholder="Tray dry at 45°C, micro-pulverize..."
                      value={newProdData.processingNote}
                      onChange={(e) => setNewProdData(prev => ({ ...prev, processingNote: e.target.value }))}
                      className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none text-stone-700"
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <button type="button" onClick={() => setShowAddProductForm(false)} className="px-4 py-2 text-xs font-bold text-stone-400 hover:text-stone-700">Cancel</button>
                    <ThemedButton type="submit" className="px-6 py-2 text-xs font-bold uppercase">Save Product</ThemedButton>
                  </div>
                </form>
              )}

              {/* Table */}
              <div className="bg-white rounded-[32px] p-6 shadow-ambient border border-stone-100 overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs font-semibold text-stone-600 min-w-[700px]">
                  <thead>
                    <tr className="border-b border-stone-50 text-[10px] label-tech text-stone-400 font-bold uppercase tracking-wider">
                      <th className="py-4">Product</th>
                      <th className="py-4">Category</th>
                      <th className="py-4">Price</th>
                      <th className="py-4">Status</th>
                      <th className="py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-50">
                    {products.map(prod => (
                      <tr key={prod.id} className="hover:bg-stone-50/30 transition-colors">
                        <td className="py-4 font-heading text-sm font-bold text-primary">{prod.name}</td>
                        <td className="py-4">{prod.category}</td>
                        <td className="py-4">
                          {editingProdId === prod.id ? (
                            <div className="flex items-center gap-2">
                              <input 
                                type="text"
                                value={editPrice}
                                onChange={(e) => setEditPrice(e.target.value)}
                                className="bg-stone-50 border border-stone-200 rounded px-2 py-1 text-xs font-bold w-24 text-stone-700"
                              />
                              <button onClick={() => saveProductPrice(prod.id)} className="p-1 text-green-600 hover:bg-green-50 rounded"><CheckCircle size={14} /></button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <span>{prod.price}</span>
                              <button onClick={() => startEditProduct(prod)} className="p-1 text-stone-300 hover:text-secondary rounded"><Edit size={12} /></button>
                            </div>
                          )}
                        </td>
                        <td className="py-4">
                          <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold ${
                            prod.isNowProcessing ? 'bg-green-500/10 text-green-600' : 'bg-stone-100 text-stone-400'
                          }`}>
                            {prod.isNowProcessing ? 'PROCESSING' : 'PAUSED'}
                          </span>
                        </td>
                        <td className="py-4 text-right">
                          <button
                            onClick={() => deleteProduct(prod.id)}
                            className="p-2 text-stone-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Orders Dispatch Tab */}
          {activeSubTab === 'orders' && (
            <motion.div
              key="orders"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="border-b border-stone-50 pb-4">
                <h2 className="text-xl text-primary font-bold font-heading mb-1">Customer Order Dispatch Manager</h2>
                <p className="text-stone-400 text-xs font-semibold">Change shipment milestones and track transparency logs</p>
              </div>

              <div className="space-y-6">
                {orders.map(ord => (
                  <div key={ord.id} className="bg-white rounded-2xl p-6 shadow-ambient border border-stone-100 flex flex-col md:flex-row justify-between gap-6 md:items-center text-xs">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="font-heading text-base font-bold text-primary">{ord.id}</span>
                        <span className="text-stone-400 font-semibold">{new Date(ord.date).toLocaleDateString()}</span>
                      </div>
                      <div className="text-stone-500 font-semibold">
                        {ord.items.map(item => (
                          <span key={item.id} className="block">{item.name} ({item.weight}g) × {item.quantity}</span>
                        ))}
                      </div>
                      <div className="text-[10px] text-stone-400 leading-relaxed font-medium">
                        Deliver to: <span className="text-stone-600 font-semibold">{ord.shippingAddress.street}, {ord.shippingAddress.city}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      <div>
                        <span className="text-stone-400 text-[9px] label-tech block">Status</span>
                        <select
                          value={ord.status}
                          onChange={(e) => updateOrderStatus(ord.id, e.target.value)}
                          className="bg-stone-50 border border-stone-200 rounded-lg px-3 py-1.5 font-bold text-stone-700 cursor-pointer"
                        >
                          <option value="Ordered">Ordered</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                      <div className="text-right">
                        <span className="text-stone-400 text-[9px] label-tech block">Total</span>
                        <span className="text-sm font-bold text-primary">₹{ord.grandTotal.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}

                {orders.length === 0 && (
                  <div className="text-center py-20 bg-white border border-stone-100 rounded-2xl">
                    <p className="text-stone-400 font-bold">No customer orders placed yet.</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Farmer Directory Tab */}
          {activeSubTab === 'farmers' && (
            <motion.div
              key="farmers"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl text-primary font-bold font-heading mb-1">Farmer Network Registry</h2>
                  <p className="text-stone-400 text-xs font-semibold">Register farmers or log localized sourcing volumes</p>
                </div>
                <button
                  onClick={() => setShowAddFarmerForm(!showAddFarmerForm)}
                  className="text-secondary font-bold text-xs label-tech flex items-center gap-2 border border-secondary/10 px-4 py-2 rounded-xl hover:bg-secondary/5 transition-all"
                >
                  <Plus size={14} /> Register Farmer
                </button>
              </div>

              {/* Add Farmer Form */}
              {showAddFarmerForm && (
                <form onSubmit={handleAddFarmerSubmit} className="bg-white border border-stone-100 rounded-3xl p-8 shadow-ambient space-y-6 max-w-2xl">
                  <h3 className="font-heading text-lg font-bold text-primary mb-4">Add Verified Grower</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="label-tech text-[10px] text-stone-400 block font-bold mb-1">Farmer Name</label>
                      <input 
                        required
                        type="text" 
                        placeholder="Rangaiah K."
                        value={newFarmerData.name}
                        onChange={(e) => setNewFarmerData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none text-stone-700"
                      />
                    </div>
                    <div>
                      <label className="label-tech text-[10px] text-stone-400 block font-bold mb-1">Village & Location</label>
                      <input 
                        required
                        type="text" 
                        placeholder="Gajwel, Siddipet, Telangana"
                        value={newFarmerData.location}
                        onChange={(e) => setNewFarmerData(prev => ({ ...prev, location: e.target.value }))}
                        className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none text-stone-700"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="label-tech text-[10px] text-stone-400 block font-bold mb-1">Product Supplied</label>
                      <input 
                        required
                        type="text" 
                        placeholder="Moringa Leaves, Carrots, etc."
                        value={newFarmerData.productSupplied}
                        onChange={(e) => setNewFarmerData(prev => ({ ...prev, productSupplied: e.target.value }))}
                        className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none text-stone-700"
                      />
                    </div>
                    <div>
                      <label className="label-tech text-[10px] text-stone-400 block font-bold mb-1">Quantity details</label>
                      <input 
                        required
                        type="text" 
                        placeholder="1.5 Tons / Month"
                        value={newFarmerData.quantityDetails}
                        onChange={(e) => setNewFarmerData(prev => ({ ...prev, quantityDetails: e.target.value }))}
                        className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none text-stone-700"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="label-tech text-[10px] text-stone-400 block font-bold mb-1">Sourcing Narrative / Agricultural Practices</label>
                    <textarea 
                      required
                      rows={3}
                      placeholder="Practices bio-fertilisation and harvests morning dew leaves..."
                      value={newFarmerData.sourcingInfo}
                      onChange={(e) => setNewFarmerData(prev => ({ ...prev, sourcingInfo: e.target.value }))}
                      className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none text-stone-700 resize-none"
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <button type="button" onClick={() => setShowAddFarmerForm(false)} className="px-4 py-2 text-xs font-bold text-stone-400 hover:text-stone-700">Cancel</button>
                    <ThemedButton type="submit" className="px-6 py-2 text-xs font-bold uppercase">Save Farmer</ThemedButton>
                  </div>
                </form>
              )}

              {/* Farmers Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {farmers.map(farmer => (
                  <div key={farmer.id} className="bg-white rounded-2xl p-6 shadow-ambient border border-stone-100 flex flex-col justify-between text-xs">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-primary font-heading text-sm mb-0.5">{farmer.name}</h4>
                          <span className="text-stone-400 text-[10px]">{farmer.location}</span>
                        </div>
                        <button
                          onClick={() => deleteFarmer(farmer.id)}
                          className="p-1.5 text-stone-300 hover:text-red-500 rounded"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                      <div className="bg-stone-50 p-2 rounded-lg space-y-1 font-semibold">
                        <div className="flex justify-between">
                          <span className="text-stone-400">Crop</span>
                          <span className="text-stone-700">{farmer.productSupplied}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-stone-400">Volume</span>
                          <span className="text-stone-700">{farmer.quantityDetails}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Bulk Inquiries Tab */}
          {activeSubTab === 'inquiries' && (
            <motion.div
              key="inquiries"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="border-b border-stone-50 pb-4">
                <h2 className="text-xl text-primary font-bold font-heading mb-1">Bulk Business Inquiries Hub</h2>
                <p className="text-stone-400 text-xs font-semibold">Custom volume and industrial contract requests from corporations</p>
              </div>

              <div className="space-y-6">
                {bulkInquiries.map(inq => (
                  <div key={inq.id} className="bg-white rounded-2xl p-6 shadow-ambient border border-stone-100 space-y-4 text-xs">
                    <div className="flex justify-between items-start border-b border-stone-50 pb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-heading text-base font-bold text-primary">{inq.fullName}</span>
                          {inq.companyName && <span className="bg-stone-100 text-stone-600 px-2 py-0.5 rounded text-[9px] font-bold">{inq.companyName}</span>}
                        </div>
                        <p className="text-stone-400 text-[10px] font-bold uppercase label-tech">Inquiry ID: {inq.id} | Date: {new Date(inq.date).toLocaleDateString()}</p>
                      </div>
                      <span className="bg-primary/5 text-primary text-[10px] font-bold px-3 py-1 rounded-full uppercase label-tech">{inq.inquiryType || 'General'}</span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-stone-50 p-4 rounded-xl font-semibold">
                      <div>
                        <span className="text-stone-400 block text-[9px] label-tech mb-0.5">Crop Interest</span>
                        <span className="text-stone-700">{inq.productOfInterest || 'Multiple'}</span>
                      </div>
                      <div>
                        <span className="text-stone-400 block text-[9px] label-tech mb-0.5">Quantity</span>
                        <span className="text-stone-700">{inq.quantityNeeded || 'N/A'}</span>
                      </div>
                      <div>
                        <span className="text-stone-400 block text-[9px] label-tech mb-0.5">Email</span>
                        <span className="text-stone-700">{inq.email}</span>
                      </div>
                      <div>
                        <span className="text-stone-400 block text-[9px] label-tech mb-0.5">Phone</span>
                        <span className="text-stone-700">{inq.phone}</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-stone-400 block text-[9px] label-tech mb-1 font-bold">Requirement Notes</span>
                      <p className="text-stone-600 font-medium leading-relaxed bg-stone-50/50 p-3 rounded-lg border border-stone-100/50 italic">
                        "{inq.message}"
                      </p>
                    </div>
                  </div>
                ))}

                {bulkInquiries.length === 0 && (
                  <div className="text-center py-20 bg-white border border-stone-100 rounded-2xl">
                    <p className="text-stone-400 font-bold">No business inquiries logged yet.</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
};

const AnalyticsCard = ({ title, value, icon, trend }) => (
  <div className="bg-white rounded-3xl p-6 shadow-ambient border border-stone-100 flex items-center justify-between">
    <div className="space-y-2">
      <span className="text-stone-400 text-xs font-semibold label-tech uppercase">{title}</span>
      <h3 className="text-primary text-2xl font-heading font-bold mb-0">{value}</h3>
      <span className="text-green-600 text-[10px] font-bold flex items-center gap-1">
        {trend}
      </span>
    </div>
    <div className="w-12 h-12 bg-primary/5 text-primary rounded-2xl flex items-center justify-center shrink-0">
      {icon}
    </div>
  </div>
);

export default Admin;
