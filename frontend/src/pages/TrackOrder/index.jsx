import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Compass, Calendar, MapPin, Package, Clock, Truck, CheckCircle2, ChevronRight, HelpCircle, ShieldCheck } from 'lucide-react';
import { useOrders } from '../../context/OrderContext';
import ThemedButton from '../../components/common/ThemedButton';

const TrackOrder = () => {
  const { orders } = useOrders();
  const [searchId, setSearchId] = useState('');
  const [trackedOrder, setTrackedOrder] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchId.trim()) return;

    const found = orders.find(o => o.id.toUpperCase() === searchId.trim().toUpperCase());
    setTrackedOrder(found || null);
    setHasSearched(true);
  };

  const getStatusStepIndex = (status) => {
    const steps = ['Ordered', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered'];
    return steps.indexOf(status);
  };

  return (
    <div className="min-h-screen bg-surface page-offset-top pb-24 px-8 md:px-16 lg:px-24">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Banner Section */}
        <section className="text-center max-w-2xl mx-auto space-y-4">
          <span className="label-tech text-secondary font-bold tracking-[0.2em] uppercase">SCM Transparency</span>
          <h1 className="tracking-tighter">Public Order Tracking</h1>
          <p className="text-stone-600 font-medium text-sm leading-relaxed">
            Enter your Avasan Chakra Order ID to see the complete sourcing timeline of your natural products, including farm harvest date, dehydration node timing, and carbon-neutral transit updates.
          </p>
        </section>

        {/* Search Form */}
        <section className="bg-white rounded-[32px] p-8 shadow-ambient border border-stone-100 max-w-xl mx-auto">
          <form onSubmit={handleSearch} className="space-y-4">
            <div>
              <label className="label-tech text-[10px] text-stone-400 block font-bold mb-1.5">Enter Order ID</label>
              <div className="flex gap-2">
                <div className="relative flex-grow">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30" size={18} />
                  <input 
                    required
                    type="text" 
                    placeholder="e.g., AC-ORD-2041"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-100 rounded-xl px-12 py-3.5 text-xs font-bold uppercase focus:outline-none text-stone-700 placeholder:text-stone-300"
                  />
                </div>
                <ThemedButton type="submit" className="px-6 py-3.5 text-xs uppercase font-bold shrink-0">
                  Track Order
                </ThemedButton>
              </div>
            </div>
            <p className="text-[10px] text-stone-400 font-semibold leading-normal">
              * Note: Order IDs are structured as <span className="font-bold text-stone-500">AC-ORD-XXXX</span>. Example codes available to test: <span className="font-bold text-stone-500">AC-ORD-2041</span> (Delivered) or <span className="font-bold text-stone-500">AC-ORD-3059</span> (Processing).
            </p>
          </form>
        </section>

        {/* Results Panel */}
        <section>
          <AnimatePresence mode="wait">
            {hasSearched && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-8"
              >
                {trackedOrder ? (
                  <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-ambient border border-stone-100 space-y-10">
                    
                    {/* Header Summary */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-stone-50 pb-6 gap-4">
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="font-heading text-2xl font-bold text-primary">{trackedOrder.id}</span>
                          <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase label-tech ${
                            trackedOrder.status === 'Delivered'
                              ? 'bg-green-500/10 text-green-600'
                              : trackedOrder.status === 'Cancelled'
                              ? 'bg-red-500/10 text-red-600'
                              : 'bg-amber-500/10 text-amber-600 animate-pulse'
                          }`}>
                            {trackedOrder.status}
                          </span>
                        </div>
                        <p className="text-stone-400 text-xs font-semibold mt-1 flex items-center gap-1"><Calendar size={12} /> Ordered: {new Date(trackedOrder.date).toLocaleDateString('en-IN', { dateStyle: 'medium' })}</p>
                      </div>
                      <div className="text-left sm:text-right">
                        <span className="text-stone-400 text-[9px] label-tech block">Estimated Delivery</span>
                        <span className="text-sm font-bold text-primary">Within 3 Working Days</span>
                      </div>
                    </div>

                    {/* Timeline Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                      
                      {/* Left: Interactive Timeline */}
                      <div className="lg:col-span-8 space-y-6">
                        <h3 className="text-lg text-primary font-heading font-bold mb-6">Transparent SCM Milestones</h3>
                        
                        <div className="relative border-l-2 border-stone-100 pl-8 ml-4 space-y-8">
                          {[
                            { status: 'Ordered', icon: <Clock size={14} />, label: 'Order Registered' },
                            { status: 'Processing', icon: <Package size={14} />, label: 'Upcycle Processing at Farm Gate' },
                            { status: 'Shipped', icon: <Truck size={14} />, label: 'Dispatched via Green Transport' },
                            { status: 'Out for Delivery', icon: <MapPin size={14} />, label: 'Out for Local Delivery' },
                            { status: 'Delivered', icon: <CheckCircle2 size={14} />, label: 'Delivered & Certified' }
                          ].map((stepObj, idx) => {
                            const stepIndex = getStatusStepIndex(trackedOrder.status);
                            const isCompleted = idx <= stepIndex;
                            const isCurrent = idx === stepIndex;

                            const logEntry = trackedOrder.trackingLogs.find(l => l.status === stepObj.status);

                            return (
                              <div key={stepObj.status} className="relative group text-xs">
                                <div className={`absolute left-[-42px] top-1.5 w-7 h-7 rounded-full flex items-center justify-center border transition-all ${
                                  isCompleted 
                                    ? 'bg-primary border-primary text-white shadow-md' 
                                    : 'bg-white border-stone-200 text-stone-300'
                                } ${isCurrent ? 'ring-4 ring-primary/20 scale-110' : ''}`}>
                                  {stepObj.icon}
                                </div>
                                
                                <div className="space-y-1">
                                  <h4 className={`text-sm font-bold transition-colors ${isCompleted ? 'text-primary' : 'text-stone-400'}`}>
                                    {stepObj.label}
                                  </h4>
                                  {logEntry ? (
                                    <div className="space-y-0.5 mt-1 text-stone-600 font-medium">
                                      <p className="leading-relaxed">{logEntry.note}</p>
                                      <span className="text-[9px] text-stone-400 font-bold uppercase">{new Date(logEntry.time).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</span>
                                    </div>
                                  ) : (
                                    <p className="text-stone-300 mt-0.5 italic font-medium">Pending shipping progress</p>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Right: SCM Sourcing Details */}
                      <div className="lg:col-span-4 space-y-6">
                        
                        {/* Delivery Info */}
                        <div className="bg-stone-50 border border-stone-100 rounded-2xl p-6 space-y-4 text-xs font-semibold">
                          <h4 className="text-primary font-bold font-heading text-sm mb-2 border-b border-stone-200/50 pb-2">Shipping Destination</h4>
                          <div className="space-y-1">
                            <span className="text-stone-400 text-[9px] label-tech block">Ship to Address</span>
                            <p className="text-stone-700 leading-normal font-medium">
                              {trackedOrder.shippingAddress.street}, <br />
                              {trackedOrder.shippingAddress.city} - {trackedOrder.shippingAddress.zip}
                            </p>
                          </div>
                          <div className="space-y-1 pt-2 border-t border-stone-100/50">
                            <span className="text-stone-400 text-[9px] label-tech block">Delivery Agent Code</span>
                            <p className="text-stone-700">AC-LOG-DEH39</p>
                          </div>
                        </div>

                        {/* Verification Certification */}
                        <div className="bg-primary text-white rounded-2xl p-6 space-y-4 text-xs">
                          <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-secondary-container">
                            <ShieldCheck size={20} />
                          </div>
                          <div className="space-y-1">
                            <h4 className="text-white font-heading font-bold text-xs uppercase label-tech">Ledger Sealed</h4>
                            <p className="text-white/70 leading-relaxed font-semibold">
                              This shipment's digital quality certificate has been generated. Every crop extract corresponds to direct farm gate payments.
                            </p>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-[32px] p-16 text-center border border-stone-100 max-w-xl mx-auto space-y-4">
                    <Compass size={48} className="text-stone-300 mx-auto" />
                    <h3 className="text-lg text-primary font-bold">Order ID Not Found</h3>
                    <p className="text-stone-500 text-xs font-semibold max-w-xs mx-auto">
                      We couldn't locate Order ID <span className="font-bold text-stone-700 font-mono">"{searchId}"</span> in our active database. Please double-check spelling or check back in 1 hour if order was just placed.
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </section>

      </div>
    </div>
  );
};

export default TrackOrder;
