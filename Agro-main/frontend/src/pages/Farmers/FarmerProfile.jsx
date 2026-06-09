import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Calendar, Leaf, ShieldCheck, Award, ShoppingBag, BarChart3, Database } from 'lucide-react';
import { useFarmers } from '../../context/FarmerContext';
import { useProducts } from '../../context/ProductContext';
import { getProductImage } from '../../utils/productImages';
import ThemedButton from '../../components/common/ThemedButton';

const FarmerProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { farmers } = useFarmers();
  const { products, addToCart } = useProducts();

  const farmer = farmers.find(f => f.id === id);
  const farmerProducts = products.filter(p => p.farmerId === id);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!farmer) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center page-offset-top px-8 text-center">
        <ShieldCheck size={48} className="text-secondary mx-auto mb-4" />
        <h2 className="text-xl font-heading font-bold text-primary mb-2">Farmer Profile Not Found</h2>
        <p className="text-stone-500 text-xs font-semibold mb-6">This farmer ID is not registered in our active SCM database.</p>
        <Link to="/farmers">
          <ThemedButton className="px-6 py-2.5 text-xs uppercase">Back to Directory</ThemedButton>
        </Link>
      </div>
    );
  }

  // Simulated metrics
  const acres = farmer.id.charCodeAt(5) % 5 + 3; // 3 to 8 acres
  const soilType = farmer.id.charCodeAt(5) % 2 === 0 ? 'Sandy Loam Organic' : 'Red Clay Organic';
  const cropHealth = '98%';

  return (
    <div className="min-h-screen bg-surface page-offset-top pb-24 px-8 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Breadcrumb and Back */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/farmers')} 
            className="p-2 hover:bg-white rounded-xl border border-transparent hover:border-stone-150 text-stone-500 transition-all cursor-pointer"
          >
            <ArrowLeft size={18} />
          </button>
          <h1 className="tracking-tighter mb-0 mt-0">Farmer Profile Details</h1>
        </div>

        {/* Profile Card Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Bio Info */}
          <div className="lg:col-span-5 bg-white rounded-[32px] p-8 shadow-ambient border border-stone-100 space-y-6 text-center lg:text-left">
            <div className="w-24 h-24 bg-primary/5 text-primary border-2 border-primary/10 rounded-[24px] flex items-center justify-center font-heading font-extrabold text-3xl italic mx-auto lg:mx-0 shadow-sm">
              {farmer.avatar}
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl text-primary font-heading font-bold mb-1">{farmer.name}</h2>
              <div className="flex items-center justify-center lg:justify-start gap-1.5 text-xs text-stone-400 font-bold uppercase label-tech">
                <MapPin size={12} className="text-secondary" />
                <span>{farmer.location}</span>
              </div>
            </div>

            <p className="text-stone-500 text-sm italic leading-relaxed">
              "{farmer.sourcingInfo}"
            </p>

            <div className="border-t border-stone-50 pt-6 grid grid-cols-2 gap-4 text-xs font-semibold text-stone-500">
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-100 text-center">
                <span className="text-stone-400 text-[8px] font-bold label-tech uppercase tracking-wider block mb-1">CULTIVATED SOIL</span>
                <span className="text-primary font-bold text-sm block leading-tight">{soilType}</span>
              </div>
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-100 text-center">
                <span className="text-stone-400 text-[8px] font-bold label-tech uppercase tracking-wider block mb-1">ACRES MANAGED</span>
                <span className="text-primary font-bold text-sm block leading-tight">{acres} Acres</span>
              </div>
            </div>

            <div className="flex justify-between items-center text-[10px] text-stone-400 font-bold label-tech border-t border-stone-50 pt-4">
              <span className="flex items-center gap-1"><Calendar size={12} /> Partner since {farmer.joinedYear}</span>
              <span className="bg-green-500/10 text-green-600 px-2 py-0.5 rounded-full uppercase tracking-wider text-[8px]">VERIFIED GATE</span>
            </div>
          </div>

          {/* Right: SCM Stats & Associated Products */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* SCM Sourcing Stats */}
            <div className="bg-white rounded-[32px] p-8 shadow-ambient border border-stone-100 space-y-6">
              <div className="flex items-center gap-3 border-b border-stone-50 pb-4">
                <div className="p-2.5 bg-primary/5 text-primary rounded-xl">
                  <BarChart3 size={20} />
                </div>
                <div>
                  <h3 className="text-lg text-primary font-bold font-heading mb-0">Agricultural Yield & SCM Stats</h3>
                  <span className="text-[10px] text-stone-400 label-tech font-bold">Traceable harvest logs</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-xs font-semibold text-stone-500">
                <div className="bg-stone-50 p-5 rounded-2xl border border-stone-100">
                  <span className="text-stone-400 text-[8px] font-bold label-tech uppercase tracking-wider block mb-1.5">MONTHLY SUPPLY</span>
                  <span className="text-xl font-heading font-extrabold text-primary block leading-none">{farmer.quantityDetails.split('/')[0]}</span>
                  <span className="text-[9px] text-stone-400 block mt-1">Average capacity</span>
                </div>
                <div className="bg-stone-50 p-5 rounded-2xl border border-stone-100">
                  <span className="text-stone-400 text-[8px] font-bold label-tech uppercase tracking-wider block mb-1.5">QUALITY SCORE</span>
                  <span className="text-xl font-heading font-extrabold text-primary block leading-none">{cropHealth}</span>
                  <span className="text-[9px] text-stone-400 block mt-1">Staple moisture index</span>
                </div>
                <div className="bg-stone-50 p-5 rounded-2xl border border-stone-100">
                  <span className="text-stone-400 text-[8px] font-bold label-tech uppercase tracking-wider block mb-1.5">VERIFIED BIO</span>
                  <span className="text-xl font-heading font-extrabold text-primary block leading-none">100%</span>
                  <span className="text-[9px] text-stone-400 block mt-1">Pesticide free</span>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-primary/5 p-4 rounded-2xl border border-primary/5 text-xs text-primary font-medium">
                <Database size={16} className="text-secondary shrink-0" />
                <span>
                  All produce harvested by {farmer.name} is stabilized locally at Yadadri/Siddipet collection points within 4 hours to lock in minerals.
                </span>
              </div>
            </div>

            {/* Sourced Products */}
            <div className="bg-white rounded-[32px] p-8 shadow-ambient border border-stone-100 space-y-6">
              <h3 className="text-lg text-primary font-bold font-heading border-b border-stone-50 pb-4 mb-2">Products Sourced From This Farm</h3>
              
              {farmerProducts.length === 0 ? (
                <p className="text-stone-400 text-xs italic font-medium">No direct catalog products currently sourced from this farm. Inventory is in dehydration collection phase.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {farmerProducts.map((p) => (
                    <div key={p.id} className="border border-stone-100 rounded-2xl p-4 bg-stone-50/50 flex flex-col justify-between space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white rounded-lg overflow-hidden flex items-center justify-center p-2 border border-stone-100 shrink-0">
                          <img src={getProductImage(p.id)} alt={p.name} className="w-full h-full object-contain" />
                        </div>
                        <div>
                          <h4 className="font-heading font-bold text-xs text-primary mb-0.5">{p.name}</h4>
                          <span className="text-[9px] text-stone-400 font-bold uppercase label-tech block">{p.price}</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-2 border-t border-stone-100/50 text-[10px] font-bold label-tech text-stone-500">
                        <span>{p.category}</span>
                        <Link 
                          to={`/products/${p.id}`}
                          className="text-secondary hover:text-secondary-container flex items-center gap-1 font-bold cursor-pointer"
                        >
                          <ShoppingBag size={12} /> CONFIGURE
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default FarmerProfile;
