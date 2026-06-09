import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, HelpCircle, ShieldCheck, Mail, Phone } from 'lucide-react';
import ThemedButton from '../../components/common/ThemedButton';
import { useNavigate } from 'react-router-dom';

const FAQ = () => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [openFaqId, setOpenFaqId] = useState(null);

  const categories = ['All', 'General', 'Subscriptions', 'B2B & Sourcing', 'Shipping'];

  const faqs = [
    {
      id: 'faq-sourcing',
      category: 'General',
      question: 'Where do you source your agricultural products?',
      answer: 'We source directly from our verified network of over 12,000+ smallholder farmers across Siddipet, Gajwel, Yadadri, and Nalgonda districts in Telangana, India. Every purchase helps stabilize mandi prices during crop gluts and puts fair profit margins back in the hands of the growers.'
    },
    {
      id: 'faq-format',
      category: 'General',
      question: 'What is the difference between Dried Form and Powder Form?',
      answer: 'Dried Form consists of stabilized, low-temperature dehydrated crop pieces (like onion flakes or tomato slices) which rehydrate easily in cooking. Powder Form consists of micro-pulverized extracts ground to fine mesh sizes (typically 80-100 mesh) that blend seamlessly into juices, batters, and seasonings. Dried forms are 10% cheaper to process.'
    },
    {
      id: 'faq-stabilization',
      category: 'General',
      question: 'How do you lock in 98% of crop nutrients?',
      answer: 'We utilize decentralized collection hubs located within 4 hours of harvesting. By avoiding long transit times in cold chains, we stabilize the fresh biomass immediately using convective, low-temperature solar dehydration. This prevents thermal enzyme degradation and nutrient loss.'
    },
    {
      id: 'faq-sub-swap',
      category: 'Subscriptions',
      question: 'How does the Subscription Box Builder work?',
      answer: 'Our subscription lets you choose a plan tier (Starter, Family, or Wellness Pro) depending on your monthly quantity needs. You can build your custom box, choose delivery frequency (weekly, bi-weekly, or monthly), and swap products up to 48 hours before dispatch. You can skip, pause, or cancel anytime without fees.'
    },
    {
      id: 'faq-b2b-coa',
      category: 'B2B & Sourcing',
      question: 'Do you provide Certificates of Analysis (COAs) for bulk orders?',
      answer: 'Yes. Every wholesale batch undergoes multi-spectrum laboratory testing. We provide downloadable COAs detailing moisture percentage, heavy metals, microbial limits, and pesticide residues. You can view sample COAs and download reports directly from our B2B Portal page.'
    },
    {
      id: 'faq-b2b-moq',
      category: 'B2B & Sourcing',
      question: 'What is the minimum order quantity (MOQ) for B2B wholesale prices?',
      answer: 'Our tiered wholesale discount pricing begins at 50kg per crop product. For smaller food industries, cloud kitchens, and retailers, we provide free 50g samples to test mesh sizing and rehydration rates prior to full contract agreements.'
    },
    {
      id: 'faq-shipping-eta',
      category: 'Shipping',
      question: 'What is your shipping duration and delivery zone?',
      answer: 'We ship nationwide across India. Standard retail deliveries take between 3-4 working days. Industrial B2B bulk freight timelines depend on specifications, destination, and container shipping requirements. You can track any active order using our Track Order tool.'
    }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFaq = (id) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-surface page-offset-top pb-24 px-8 md:px-16 lg:px-24">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Banner Section */}
        <section className="text-center max-w-2xl mx-auto space-y-4">
          <span className="label-tech text-secondary font-bold tracking-[0.2em] uppercase">FAQ & Help</span>
          <h1 className="tracking-tighter">Frequently Asked Questions</h1>
          <p className="text-stone-600 font-medium text-sm leading-relaxed">
            Search or browse answers regarding our direct-farmer sourcing, subscription box builder, shipping timelines, and industrial B2B requirements.
          </p>
        </section>

        {/* Search & Filters Bar */}
        <section className="space-y-6">
          {/* Search bar */}
          <div className="relative w-full max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30" size={18} />
            <input 
              type="text" 
              placeholder="Search questions by keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white rounded-xl px-12 py-3.5 shadow-ambient focus:outline-none focus:ring-2 focus:ring-primary/10 placeholder:text-primary/30 font-medium text-sm text-stone-700 border border-stone-100"
            />
          </div>

          {/* Categories Tabs */}
          <div className="flex flex-wrap gap-2.5 justify-center">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setOpenFaqId(null); // Close active FAQ when switching tab
                }}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-white text-primary/60 border border-stone-100 hover:bg-primary/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* FAQ Accordion List */}
        <section className="bg-white rounded-[32px] p-6 md:p-8 shadow-ambient border border-stone-100 space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 text-stone-400 font-semibold italic">
              No matching questions found. Try refining your keywords.
            </div>
          ) : (
            <div className="divide-y divide-stone-50">
              {filteredFaqs.map(faq => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div key={faq.id} className="py-4 first:pt-0 last:pb-0">
                    {/* Header trigger */}
                    <button 
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full flex justify-between items-center text-left py-2 font-heading font-bold text-sm md:text-base text-primary hover:text-secondary transition-colors cursor-pointer"
                    >
                      <span>{faq.question}</span>
                      <motion.div 
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        className="text-stone-300"
                      >
                        <ChevronDown size={18} />
                      </motion.div>
                    </button>

                    {/* Answer content */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="text-stone-500 text-xs md:text-sm font-semibold leading-relaxed pt-2 pb-4 pr-6">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* SCM Support Call-out */}
        <section className="bg-stone-50 border border-stone-100 rounded-3xl p-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white rounded-2xl shadow-sm text-primary border border-stone-150 shrink-0">
              <HelpCircle size={22} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-primary mb-1">Still have questions?</h3>
              <p className="text-stone-500 text-xs font-semibold leading-normal">
                Our support team is available Mon-Sat to clarify custom sourcing certifications, bulk cargo logistics, or subscription box swapping parameters.
              </p>
            </div>
          </div>
          <ThemedButton onClick={() => navigate('/contact')} className="px-6 py-3.5 text-xs font-bold uppercase shrink-0">
            Contact Support Desks
          </ThemedButton>
        </section>

      </div>
    </div>
  );
};

export default FAQ;
