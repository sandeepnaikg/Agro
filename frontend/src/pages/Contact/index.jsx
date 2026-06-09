import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, Building, ShieldCheck, FileText, Send, ArrowRight, Award, HelpCircle } from 'lucide-react';
import { useOrders } from '../../context/OrderContext';
import ThemedButton from '../../components/common/ThemedButton';

const Contact = () => {
  const { addBulkInquiry } = useOrders();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    productOfInterest: 'Moringa Leaf Powder',
    quantityNeeded: '',
    inquiryType: 'Bulk Sourcing',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addBulkInquiry(formData);
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        fullName: '',
        companyName: '',
        email: '',
        phone: '',
        productOfInterest: 'Moringa Leaf Powder',
        quantityNeeded: '',
        inquiryType: 'Bulk Sourcing',
        message: ''
      });
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-surface page-offset-top pb-24 px-8 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        
        {/* Banner */}
        <section className="mb-16">
          <div className="bg-[#9F402D] text-white rounded-[40px] p-8 md:p-16 overflow-hidden relative shadow-ambient flex flex-col lg:flex-row justify-between items-center gap-12">
            <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="z-10 max-w-2xl space-y-6">
              <span className="label-tech text-secondary-container font-bold tracking-[0.2em] uppercase">Industrial SCM</span>
              <h1 className="text-white text-4xl md:text-6xl tracking-tighter mb-4">
                B2B & Sourcing Support
              </h1>
              <p className="text-white/80 text-lg leading-relaxed font-medium">
                Are you looking for custom specification mesh sizes, targeted moisture levels, or export documents? Partner directly with our Siddipet collection loops to secure reliable volume supply chains.
              </p>
            </div>
            <div className="z-10 shrink-0 bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 text-center max-w-[280px]">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-secondary-container">
                <Building size={32} />
              </div>
              <span className="text-sm font-bold block text-white uppercase tracking-wider label-tech mb-1">Export Ready</span>
              <span className="text-xs text-white/60 font-semibold block">COA Lab Testing & FSSAI Licenses Verified</span>
            </div>
          </div>
        </section>

        {/* 2 Grid splits */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left: General Contact Specs & Info */}
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-4">
              <span className="label-tech text-secondary font-bold">Contact Directory</span>
              <h2 className="text-primary font-heading font-bold mb-4">Direct Communication Channels</h2>
              <p className="text-stone-600 font-medium leading-relaxed">
                Connect with our local procurement desks, food scientists, or account managers. We support B2B clients across India, Europe, and North America.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="p-3 bg-white rounded-2xl shadow-sm border border-stone-100 text-primary shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="text-primary font-bold text-sm mb-1">Call Sourcing Desk</h4>
                  <p className="text-stone-600 text-xs font-semibold">+91 90088 12345 (Sales Desk)</p>
                  <p className="text-stone-400 text-[10px] font-semibold">Mon - Sat: 9 AM - 6 PM IST</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="p-3 bg-white rounded-2xl shadow-sm border border-stone-100 text-primary shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="text-primary font-bold text-sm mb-1">Corporate Email</h4>
                  <p className="text-stone-600 text-xs font-semibold">b2b@avasan.in (Bulk Inquiries)</p>
                  <p className="text-stone-600 text-xs font-semibold">info@avasan.in (General Support)</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="p-3 bg-white rounded-2xl shadow-sm border border-stone-100 text-primary shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="text-primary font-bold text-sm mb-1">Registered HQ</h4>
                  <p className="text-stone-600 text-xs leading-relaxed font-semibold">
                    Avasan Chakra Kernin Eco Solutions Pvt Ltd,<br />
                    Plot 124, Gachibowli Technology Hub,<br />
                    Hyderabad, Telangana - 500032
                  </p>
                </div>
              </div>
            </div>

            {/* Quality specs certifications details */}
            <div className="bg-white border border-stone-100 rounded-3xl p-6 space-y-4">
              <h4 className="font-heading font-bold text-sm text-primary border-b border-stone-50 pb-2">B2B SCM Standards</h4>
              <div className="grid grid-cols-2 gap-4 text-[10px] font-bold label-tech text-stone-500">
                <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-green-600" /> COA lab records</span>
                <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-green-600" /> GST Invoicing</span>
                <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-green-600" /> Custom Mesh Sizes</span>
                <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-green-600" /> Free Samples (50g)</span>
              </div>
            </div>
          </div>

          {/* Right: Sourcing submission form */}
          <div className="lg:col-span-7 bg-white rounded-[40px] p-8 md:p-10 shadow-ambient border border-stone-100">
            <h3 className="font-heading font-bold text-primary mb-6">Bulk Sourcing & Inquiry Form</h3>
            
            <AnimatePresence mode="wait">
              {formSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-16 text-center space-y-4"
                >
                  <div className="w-16 h-16 bg-green-500/10 text-green-600 rounded-full flex items-center justify-center mx-auto">
                    <Award size={36} />
                  </div>
                  <h4 className="text-lg text-primary font-bold">Inquiry Logged successfully!</h4>
                  <p className="text-stone-500 text-xs font-semibold max-w-sm mx-auto">
                    Your request has been filed in our Sourcing Registry. An account manager will reach out via email with spec sheets and quotes within 24 business hours.
                  </p>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="label-tech text-[10px] text-stone-400 font-bold block mb-1">Full Name</label>
                      <input 
                        required
                        type="text" 
                        placeholder="Prasad Rao"
                        value={formData.fullName}
                        onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                        className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none text-stone-700"
                      />
                    </div>
                    <div>
                      <label className="label-tech text-[10px] text-stone-400 font-bold block mb-1">Company / Organization</label>
                      <input 
                        type="text" 
                        placeholder="Telangana Foods Ltd"
                        value={formData.companyName}
                        onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                        className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none text-stone-700"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="label-tech text-[10px] text-stone-400 font-bold block mb-1">Email Address</label>
                      <input 
                        required
                        type="email" 
                        placeholder="p.rao@telanganafoods.org"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none text-stone-700"
                      />
                    </div>
                    <div>
                      <label className="label-tech text-[10px] text-stone-400 font-bold block mb-1">Phone Number</label>
                      <input 
                        required
                        type="text" 
                        placeholder="+91 94400 55110"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none text-stone-700"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="label-tech text-[10px] text-stone-400 font-bold block mb-1">Product of Interest</label>
                      <select
                        value={formData.productOfInterest}
                        onChange={(e) => setFormData(prev => ({ ...prev, productOfInterest: e.target.value }))}
                        className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none text-stone-700 cursor-pointer"
                      >
                        <option value="Moringa Leaf Powder">Moringa Leaf Powder</option>
                        <option value="Tomato Powder">Tomato Powder</option>
                        <option value="Amchur Mango Powder">Amchur Mango Powder</option>
                        <option value="Beetroot Powder">Beetroot Powder</option>
                        <option value="Tamarind Seed Powder">Tamarind Seed Powder</option>
                        <option value="Dehydrated Onion Flakes">Dehydrated Onion Flakes</option>
                        <option value="Other Sourcing Requirement">Other Raw Crop Specs</option>
                      </select>
                    </div>
                    <div>
                      <label className="label-tech text-[10px] text-stone-400 font-bold block mb-1">Estimated Quantity (e.g. 100 kg, 2 Tons)</label>
                      <input 
                        required
                        type="text" 
                        placeholder="500 kg"
                        value={formData.quantityNeeded}
                        onChange={(e) => setFormData(prev => ({ ...prev, quantityNeeded: e.target.value }))}
                        className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none text-stone-700"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="label-tech text-[10px] text-stone-400 font-bold block mb-1">Type of Sourcing Partner</label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: 'Bulk Sourcing', label: 'Domestic Sourcing' },
                        { id: 'Export Sourcing', label: 'Export Buyer' },
                        { id: 'Sample Request', label: 'Request Sample (50g)' }
                      ].map(opt => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, inquiryType: opt.id }))}
                          className={`py-3 rounded-xl border text-xs text-center transition-all cursor-pointer font-semibold ${
                            formData.inquiryType === opt.id
                              ? 'bg-primary text-white border-primary shadow-md'
                              : 'bg-white text-stone-600 border-stone-150 hover:bg-stone-50'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="label-tech text-[10px] text-stone-400 font-bold block mb-1">Requirements notes & mesh size specifications</label>
                    <textarea 
                      required
                      rows={4}
                      placeholder="Please specify target mesh size, moisture percentages, certification reports needed..."
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none text-stone-700 resize-none"
                    />
                  </div>

                  <ThemedButton type="submit" className="w-full py-4 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2">
                    Submit Sourcing Application <Send size={14} />
                  </ThemedButton>

                </motion.form>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Contact;
