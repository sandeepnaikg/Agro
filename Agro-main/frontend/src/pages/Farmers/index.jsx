import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Leaf, Calendar, Award, Users, ShoppingBag } from 'lucide-react';
import { useFarmers } from '../../context/FarmerContext';
import { useProducts } from '../../context/ProductContext';

const Farmers = () => {
  const { farmers, totalFarmersCount } = useFarmers();
  const { products } = useProducts();
  const location = useLocation();
  const navigate = useNavigate();
  const farmerRefs = useRef({});

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCrop, setSelectedCrop] = useState('All Crops');
  const [highlightedFarmerId, setHighlightedFarmerId] = useState(null);

  // Extract unique crop list from farmers
  const crops = ['All Crops', ...new Set(farmers.map(f => f.productSupplied))];

  useEffect(() => {
    const passedFarmerId = location.state?.highlightFarmerId;
    if (passedFarmerId) {
      setHighlightedFarmerId(passedFarmerId);
      const targetFarmer = farmers.find(f => f.id === passedFarmerId);
      if (targetFarmer) {
        setSearchQuery(targetFarmer.name);
        // Clear history state to avoid loops
        window.history.replaceState({}, document.title);
      }
    }
  }, [location, farmers]);

  const filteredFarmers = farmers.filter(f => {
    const matchesSearch = 
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCrop = selectedCrop === 'All Crops' || f.productSupplied === selectedCrop;
    return matchesSearch && matchesCrop;
  });

  return (
    <div className="min-h-screen bg-surface page-offset-top pb-24 px-8 md:px-16 lg:px-24">
      {/* Hero Banner */}
      <section className="max-w-7xl mx-auto mb-16 relative">
        <div className="bg-[#23422A] text-white rounded-[40px] p-8 md:p-16 overflow-hidden relative shadow-ambient flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
          
          <div className="z-10 max-w-2xl space-y-6">
            <span className="label-tech text-secondary-container font-bold tracking-[0.2em] uppercase">Transparency Ledger</span>
            <h1 className="text-white text-4xl md:text-6xl tracking-tighter mb-4">
              Our 12,000+ Farmer Network
            </h1>
            <p className="text-white/80 text-lg leading-relaxed font-medium">
              We connect conscious consumers directly with Telangana's smallholders. By deploying decentralized processing hubs, we capture nutrients right at the farm gate, providing premium prices to farmers and premium quality to you.
            </p>
          </div>

          <div className="z-10 shrink-0 bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 text-center max-w-[280px]">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-secondary-container">
              <Users size={32} />
            </div>
            <span className="text-4xl font-bold font-heading italic block mb-1 text-white">
              {totalFarmersCount.toLocaleString()}+
            </span>
            <span className="text-xs font-semibold label-tech text-white/60 tracking-wider">
              Connected Growers
            </span>
          </div>
        </div>
      </section>

      {/* Sourcing Origin Info Block */}
      <section className="max-w-7xl mx-auto mb-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white rounded-3xl p-8 shadow-ambient border border-stone-100 flex items-start gap-4">
          <div className="p-3 bg-secondary/5 rounded-2xl text-secondary shrink-0">
            <Leaf size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-primary mb-2">Sustainable Cultivation</h3>
            <p className="text-sm text-stone-500 leading-relaxed">
              Every farmer in our directory undergoes strict agricultural checks ensuring pesticide-free, organic, and resource-efficient farming methods.
            </p>
          </div>
        </div>
        <div className="bg-white rounded-3xl p-8 shadow-ambient border border-stone-100 flex items-start gap-4">
          <div className="p-3 bg-secondary/5 rounded-2xl text-secondary shrink-0">
            <Award size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-primary mb-2">Fair Pricing Standard</h3>
            <p className="text-sm text-stone-500 leading-relaxed">
              We eliminate middlemen, paying up to 40% higher margins back to growers by upcycling surplus or rejected shape crop harvests.
            </p>
          </div>
        </div>
        <div className="bg-white rounded-3xl p-8 shadow-ambient border border-stone-100 flex items-start gap-4">
          <div className="p-3 bg-secondary/5 rounded-2xl text-secondary shrink-0">
            <MapPin size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-primary mb-2">Geographic Traceability</h3>
            <p className="text-sm text-stone-500 leading-relaxed">
              Every product batch is traced to village-level processing clusters in Telangana, providing absolute transparency on raw crop origins.
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="max-w-7xl mx-auto mb-12 flex flex-col md:flex-row gap-6 justify-between items-center">
        {/* Search */}
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30" size={18} />
          <input 
            type="text"
            placeholder="Search farmers by name or village..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white rounded-xl px-12 py-3.5 shadow-ambient focus:outline-none focus:ring-2 focus:ring-primary/10 placeholder:text-primary/30 font-medium text-sm text-stone-700 border border-stone-100"
          />
        </div>

        {/* Crops Filtering tabs */}
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
          {crops.map(crop => (
            <button
              key={crop}
              onClick={() => setSelectedCrop(crop)}
              className={`px-6 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCrop === crop
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-white text-primary/60 border border-stone-100 hover:bg-primary/5'
              }`}
            >
              {crop}
            </button>
          ))}
        </div>
      </section>

      {/* Grid of Farmers */}
      <section className="max-w-7xl mx-auto">
        {filteredFarmers.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[32px] border border-stone-100">
            <p className="text-stone-400 font-medium text-lg mb-2">No farmers match your query.</p>
            <p className="text-stone-300 text-sm">Try modifying your search or crop category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredFarmers.map(farmer => {
                // Find products grown by this farmer
                const farmerProducts = products.filter(p => p.farmerId === farmer.id);
                const isHighlighted = highlightedFarmerId === farmer.id;

                return (
                  <motion.div
                    key={farmer.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={`rounded-[24px] p-6 shadow-ambient border transition-all duration-300 flex flex-col justify-between ${
                      isHighlighted 
                        ? 'border-secondary bg-secondary/5 ring-2 ring-secondary/20 shadow-lg scale-102' 
                        : 'bg-white border-stone-100 hover:shadow-xl'
                    }`}
                  >
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex items-center gap-4 border-b border-stone-50 pb-4">
                        <div className="w-12 h-12 bg-primary/5 text-primary rounded-xl flex items-center justify-center font-bold text-sm shrink-0 border border-primary/10">
                          {farmer.avatar}
                        </div>
                        <div>
                          <h3 className="text-base text-primary font-bold mb-0.5 leading-tight">{farmer.name}</h3>
                          <div className="flex items-center gap-1 text-[11px] text-stone-400 font-semibold uppercase font-mono">
                            <MapPin size={10} className="text-secondary" />
                            <span className="line-clamp-1">{farmer.location.split(',')[0]}</span>
                          </div>
                        </div>
                      </div>

                      {/* Sourcing Facts */}
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between items-center bg-stone-50 p-2 rounded-lg">
                          <span className="text-stone-400 font-medium">Crop Sourced</span>
                          <span className="text-primary font-bold">{farmer.productSupplied}</span>
                        </div>
                        <div className="flex justify-between items-center bg-stone-50 p-2 rounded-lg">
                          <span className="text-stone-400 font-medium">Supply Volume</span>
                          <span className="text-stone-600 font-bold">{farmer.quantityDetails}</span>
                        </div>
                      </div>

                      {/* Associated Products links */}
                      {farmerProducts.length > 0 && (
                        <div className="space-y-1.5 pt-1">
                          <span className="text-stone-400 text-[9px] font-bold label-tech uppercase tracking-wider block">Shop Crops:</span>
                          <div className="flex flex-wrap gap-1.5">
                            {farmerProducts.map(fp => (
                              <button
                                key={fp.id}
                                onClick={() => navigate('/products')}
                                className="bg-primary/5 hover:bg-primary/15 text-primary text-[10px] font-bold px-2 py-1 rounded-lg flex items-center gap-1 cursor-pointer transition-colors border border-primary/5"
                              >
                                <ShoppingBag size={10} /> {fp.name.replace(" Powder", "").replace(" Seed", "")}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Sourcing Narrative */}
                      <p className="text-stone-500 text-xs leading-relaxed italic line-clamp-3 hover:line-clamp-none transition-all duration-300">
                        "{farmer.sourcingInfo}"
                      </p>
                    </div>

                    {/* Footing */}
                    <div className="border-t border-stone-50 pt-4 mt-6 flex justify-between items-center text-[10px] text-stone-400 font-semibold label-tech">
                      <span className="flex items-center gap-1"><Calendar size={12} /> Member since {farmer.joinedYear}</span>
                      <span className="bg-green-500/10 text-green-600 px-2 py-0.5 rounded-full uppercase tracking-wider text-[8px]">VERIFIED GATE</span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </section>
    </div>
  );
};

export default Farmers;
