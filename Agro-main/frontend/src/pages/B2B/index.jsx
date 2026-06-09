import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building, ShieldCheck, FileText, Send, ArrowRight, Award, HelpCircle, Download, FileSpreadsheet, Layers, BadgePercent } from 'lucide-react';
import { useOrders } from '../../context/OrderContext';
import ThemedButton from '../../components/common/ThemedButton';

const B2B = () => {
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

  const [downloadedDoc, setDownloadedDoc] = useState('');

  const pricingTiers = [
    { name: 'Moringa Leaf Powder', unit: 'kg', tier1: '₹495', tier2: '₹460', tier3: '₹420' },
    { name: 'Tomato Powder', unit: 'kg', tier1: '₹760', tier2: '₹710', tier3: '₹660' },
    { name: 'Dehydrated Onion Flakes', unit: 'kg', tier1: '₹360', tier2: '₹330', tier3: '₹290' },
    { name: 'Tamarind Seed Powder', unit: 'kg', tier1: '₹430', tier2: '₹390', tier3: '₹340' },
    { name: 'Beetroot Powder', unit: 'kg', tier1: '₹670', tier2: '₹620', tier3: '₹580' }
  ];

  const coaDocs = [
    { id: 'coa-moringa', title: 'Moringa Leaf Powder COA', type: 'Microbiology & Pesticides', size: '2.4 MB' },
    { id: 'coa-tomato', title: 'Tomato Powder COA', type: 'Acidity & Lycopene Content', size: '1.8 MB' },
    { id: 'coa-beetroot', title: 'Beetroot Powder COA', type: 'Betalain Pigment Index', size: '2.1 MB' },
    { id: 'coa-onion', title: 'Dehydrated Onion Flakes COA', type: 'Rehydration & Sulfur Assay', size: '1.9 MB' }
  ];

  const handleDownloadCOA = (title) => {
    setDownloadedDoc(title);
    setTimeout(() => setDownloadedDoc(''), 3000);
    // Mock download action
    const link = document.createElement('a');
    link.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(`Mock Certificate of Analysis for: ${title}\nStandards Verified: ISO 9001, FSSAI Export Quality.\nBatch No: AC-B2B-2026`)}`);
    link.setAttribute('download', `${title.replace(/ /g, '_')}_Draft_COA.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
    <div className="min-h-screen bg-surface pt-[100px] pb-24 px-8 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Banner */}
        <section>
          <div className="bg-[#23422A] text-white rounded-[40px] p-8 md:p-16 overflow-hidden relative shadow-ambient flex flex-col lg:flex-row justify-between items-center gap-12">
            <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="z-10 max-w-2xl space-y-6">
              <span className="label-tech text-secondary-container font-bold tracking-[0.2em] uppercase">Industrial B2B Portal</span>
              <h1 className="text-white text-4xl md:text-6xl tracking-tighter mb-4">
                Export-Grade Agricultural Sourcing
              </h1>
              <p className="text-white/80 text-lg leading-relaxed font-medium">
                Direct integration with our Siddipet collections loop representing 12,000+ certified farmers. We provide molecularly stabilized natural powders, dehydrated flakes, and seed binders with customized specification profiles.
              </p>
            </div>
            <div className="z-10 shrink-0 bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 text-center max-w-[280px]">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-secondary-container">
                <Building size={32} />
              </div>
              <span className="text-sm font-bold block text-white uppercase tracking-wider label-tech mb-1">Global Delivery</span>
              <span className="text-xs text-white/60 font-semibold block">COA Lab Testing & FSSAI Licenses Verified</span>
            </div>
          </div>
        </section>

        {/* 2 Grid splits */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Panel: Pricing Tiers & COA Downloads */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Wholesale Pricing Tiers */}
            <div className="bg-white rounded-[32px] p-8 shadow-ambient border border-stone-100 space-y-6">
              <div className="flex items-center gap-3 border-b border-stone-50 pb-4">
                <div className="p-2.5 bg-primary/5 text-primary rounded-xl">
                  <BadgePercent size={20} />
                </div>
                <div>
                  <h3 className="text-lg text-primary font-bold font-heading mb-0">Volume Wholesale Pricing</h3>
                  <span className="text-[10px] text-stone-400 label-tech font-bold">Standard packaging | EXW basis</span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs font-semibold text-stone-600 min-w-[500px]">
                  <thead>
                    <tr className="border-b border-stone-100 text-[9px] label-tech text-stone-400 font-bold uppercase tracking-wider">
                      <th className="pb-3">Product Name</th>
                      <th className="pb-3">50 - 200 kg</th>
                      <th className="pb-3">201 - 999 kg</th>
                      <th className="pb-3">1 Ton + (Bulk)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-50">
                    {pricingTiers.map((tier) => (
                      <tr key={tier.name} className="hover:bg-stone-50/50">
                        <td className="py-3.5 font-heading text-sm font-bold text-primary">{tier.name}</td>
                        <td className="py-3.5">{tier.tier1} / {tier.unit}</td>
                        <td className="py-3.5 text-secondary font-bold">{tier.tier2} / {tier.unit}</td>
                        <td className="py-3.5 text-primary font-extrabold">{tier.tier3} / {tier.unit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-[10px] text-stone-400 font-medium">
                * Note: Pricing varies depending on custom mesh specifications, certification parameters, and container terms. Inquire below for a definitive quotation.
              </p>
            </div>

            {/* Certificate of Analysis (COA) Downloads */}
            <div className="bg-white rounded-[32px] p-8 shadow-ambient border border-stone-100 space-y-6">
              <div className="flex items-center gap-3 border-b border-stone-50 pb-4">
                <div className="p-2.5 bg-primary/5 text-primary rounded-xl">
                  <FileText size={20} />
                </div>
                <div>
                  <h3 className="text-lg text-primary font-bold font-heading mb-0">Technical Specification Downloads</h3>
                  <span className="text-[10px] text-stone-400 label-tech font-bold">Lab Verified Chemistry & Micro-limits</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {coaDocs.map((doc) => (
                  <div key={doc.id} className="border border-stone-100 rounded-2xl p-4 bg-stone-50/50 flex flex-col justify-between space-y-3">
                    <div>
                      <h4 className="font-heading font-bold text-sm text-primary mb-1">{doc.title}</h4>
                      <span className="text-[10px] text-stone-400 font-bold block">{doc.type}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-stone-100/50 text-[10px] font-semibold text-stone-400">
                      <span>PDF • {doc.size}</span>
                      <button 
                        onClick={() => handleDownloadCOA(doc.title)}
                        className="text-secondary hover:text-secondary-container flex items-center gap-1 font-bold cursor-pointer"
                      >
                        <Download size={12} /> DOWNLOAD
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <AnimatePresence>
                {downloadedDoc && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-3 bg-green-500/10 text-green-600 rounded-xl text-xs text-center font-bold"
                  >
                    Successfully downloaded specs for: {downloadedDoc}!
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Panel: Submission Form */}
          <div className="lg:col-span-5 bg-white rounded-[32px] p-8 shadow-ambient border border-stone-100">
            <h3 className="font-heading font-bold text-primary mb-6 border-b border-stone-50 pb-4">Bulk RFQ & Sample Request</h3>
            
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
                  <h4 className="text-lg text-primary font-bold">Inquiry Logged!</h4>
                  <p className="text-stone-500 text-xs font-semibold max-w-sm mx-auto">
                    Your request has been logged in our Sourcing Registry. Our B2B Account Manager will respond with custom pricing terms and physical sample dispatch logs within 24 working hours.
                  </p>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="label-tech text-[10px] text-stone-400 font-bold block mb-1">Full Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="e.g., Prasad Rao"
                      value={formData.fullName}
                      onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                      className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none text-stone-700"
                    />
                  </div>

                  <div>
                    <label className="label-tech text-[10px] text-stone-400 font-bold block mb-1">Company / Organization</label>
                    <input 
                      required
                      type="text" 
                      placeholder="e.g., Indo-Global Foods Ltd"
                      value={formData.companyName}
                      onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                      className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none text-stone-700"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="label-tech text-[10px] text-stone-400 font-bold block mb-1">Corporate Email</label>
                      <input 
                        required
                        type="email" 
                        placeholder="p.rao@indoglobal.com"
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="label-tech text-[10px] text-stone-400 font-bold block mb-1">Product of Interest</label>
                      <select
                        value={formData.productOfInterest}
                        onChange={(e) => setFormData(prev => ({ ...prev, productOfInterest: e.target.value }))}
                        className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none text-stone-700 cursor-pointer"
                      >
                        <option value="Moringa Leaf Powder">Moringa Leaf Powder</option>
                        <option value="Tomato Powder">Tomato Powder</option>
                        <option value="Beetroot Powder">Beetroot Powder</option>
                        <option value="Dehydrated Onion Flakes">Dehydrated Onion Flakes</option>
                        <option value="Tamarind Seed Powder">Tamarind Seed Powder</option>
                        <option value="Amchur Mango Powder">Amchur Mango Powder</option>
                        <option value="Other / Multiple crops">Other / Multiple Crops</option>
                      </select>
                    </div>
                    <div>
                      <label className="label-tech text-[10px] text-stone-400 font-bold block mb-1">Est. Volume Required</label>
                      <input 
                        required
                        type="text" 
                        placeholder="e.g., 500 kg"
                        value={formData.quantityNeeded}
                        onChange={(e) => setFormData(prev => ({ ...prev, quantityNeeded: e.target.value }))}
                        className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none text-stone-700"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="label-tech text-[10px] text-stone-400 font-bold block mb-1">Inquiry Type</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'Bulk Sourcing', label: 'Wholesale Purchase' },
                        { id: 'Export Sourcing', label: 'Export Export' },
                        { id: 'Sample Request', label: 'Free Sample (50g)' }
                      ].map(opt => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, inquiryType: opt.id }))}
                          className={`py-2 px-1.5 rounded-xl border text-[10px] text-center transition-all cursor-pointer font-bold uppercase tracking-wider ${
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
                    <label className="label-tech text-[10px] text-stone-400 font-bold block mb-1">Specification Requirements / Details</label>
                    <textarea 
                      required
                      rows={4}
                      placeholder="Please specify target mesh size, moisture constraints, packaging requirements, or delivery schedule..."
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none text-stone-700 resize-none"
                    />
                  </div>

                  <ThemedButton type="submit" className="w-full py-3.5 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2">
                    Submit RFQ Application <Send size={14} />
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

export default B2B;
