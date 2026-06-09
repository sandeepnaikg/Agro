import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Award, Recycle, Users, ArrowRight, ShieldCheck, Heart, Sparkles, Building, TrendingUp } from 'lucide-react';
import ThemedButton from '../../components/common/ThemedButton';
import { useNavigate, Link } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface page-offset-top pb-24 px-8 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Banner Section */}
        <section className="max-w-4xl mx-auto text-center space-y-4">
          <span className="label-tech text-secondary font-bold tracking-[0.2em] uppercase">About Avasan Chakra</span>
          <h1 className="tracking-tighter">Farm to Future. Pure. Natural. Powerful.</h1>
          <p className="text-stone-600 font-medium text-sm leading-relaxed max-w-2xl mx-auto">
            Avasan Chakra Kernin Eco Solutions Pvt Ltd is India's trusted farm-to-table platform for dehydrated vegetable powders, fruit powders, and eco products — connecting 12,000+ farmers directly to households, businesses, and export buyers.
          </p>
        </section>

        {/* Mission, Vision, and Values Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-[32px] p-8 shadow-ambient border border-stone-100 space-y-4">
            <div className="w-12 h-12 bg-primary/5 text-primary rounded-2xl flex items-center justify-center">
              <Leaf size={22} />
            </div>
            <h3 className="text-lg text-primary font-bold">Our Mission</h3>
            <p className="text-stone-500 text-xs leading-relaxed font-semibold">
              Connecting sustainable agricultural products directly from trusted farmers to customers through eco-friendly solutions. Sourcing visual crop defects and crop surpluses to stabilize rural mandi margins.
            </p>
          </div>

          <div className="bg-white rounded-[32px] p-8 shadow-ambient border border-stone-100 space-y-4">
            <div className="w-12 h-12 bg-primary/5 text-primary rounded-2xl flex items-center justify-center">
              <Sparkles size={22} />
            </div>
            <h3 className="text-lg text-primary font-bold">Our Vision</h3>
            <p className="text-stone-500 text-xs leading-relaxed font-semibold">
              To build India's most transparent, high-quality, and pesticide-free decentralized food network—reducing global agricultural emissions through innovative dry processing technologies.
            </p>
          </div>

          <div className="bg-white rounded-[32px] p-8 shadow-ambient border border-stone-100 space-y-4">
            <div className="w-12 h-12 bg-primary/5 text-primary rounded-2xl flex items-center justify-center">
              <Recycle size={22} />
            </div>
            <h3 className="text-lg text-primary font-bold">Our Values</h3>
            <p className="text-stone-500 text-xs leading-relaxed font-semibold">
              Radical transparency, farmer empowerment, molecular preservation science, and a carbon-neutral footprint across all collection loops.
            </p>
          </div>
        </section>

        {/* The Brand Journey */}
        <section className="bg-white rounded-[40px] p-8 md:p-12 shadow-ambient border border-stone-100 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="label-tech text-secondary font-bold">The Journey</span>
            <h2 className="text-primary font-heading font-bold mb-4">Empowering 12,000+ Smallholders</h2>
            <p className="text-stone-600 font-medium text-xs md:text-sm leading-relaxed">
              Founded in 2019 in Hyderabad, Avasan Chakra began with a pilot project in Siddipet, installing low-cost solar dehydration chambers at farm gates. During harvest peaks, local farmers often face price drops at mandis. Instead of discarding surplus crops, we upcycled them into shelf-stable, nutrient-dense mesh powders.
            </p>
            <p className="text-stone-600 font-medium text-xs md:text-sm leading-relaxed">
              Today, our network covers over 15 agricultural clusters and 12,000+ growers, turning visual shape crop anomalies and biomass residues (like cotton stalks or tamarind seeds) into direct household profits.
            </p>
            <div className="flex gap-4 pt-2">
              <ThemedButton onClick={() => navigate('/farmers')} className="px-6 py-3 text-xs uppercase font-bold">
                Meet Our Farmers
              </ThemedButton>
            </div>
          </div>

          {/* SCM Impact Stats */}
          <div className="lg:col-span-5 bg-stone-50 rounded-[32px] p-8 border border-stone-100 space-y-6">
            <h4 className="font-heading font-bold text-primary text-sm border-b border-stone-250 pb-2">Verified SCM Footprint</h4>
            
            <div className="space-y-4 text-xs font-semibold text-stone-600">
              <div className="flex justify-between items-center py-2 border-b border-stone-100/50">
                <span className="text-stone-400">Total Connected Growers</span>
                <span className="text-primary font-bold">12,240+ Farmers</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-stone-100/50">
                <span className="text-stone-400">Agricultural Waste Upcycled</span>
                <span className="text-primary font-bold">48.5+ Tons</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-stone-100/50">
                <span className="text-stone-400">Pesticide Residue Limit</span>
                <span className="text-green-600 font-bold">0.0% (Organic Standard)</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-stone-400">Average Processing Speed</span>
                <span className="text-primary font-bold">Within 4 Hours of Harvest</span>
              </div>
            </div>
          </div>
        </section>

        {/* B2B call out */}
        <section className="bg-primary text-white rounded-[40px] p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-8 shadow-ambient">
          <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="z-10 space-y-3">
            <span className="label-tech text-secondary-container font-bold text-[9px] bg-white/10 px-3 py-1 rounded-full uppercase">Wholesale Partnerships</span>
            <h3 className="text-white text-2xl font-heading font-bold mb-0">Partner with our SCM Registry</h3>
            <p className="text-white/70 text-xs font-semibold">We offer customizable packaging, mesh sizes, and export certificates.</p>
          </div>
          <Link to="/contact" className="z-10 shrink-0">
            <button className="bg-white text-primary hover:bg-stone-50 px-6 py-3.5 rounded-xl font-bold label-tech text-xs transition-all uppercase shadow-md cursor-pointer">
              Explore B2B Solutions
            </button>
          </Link>
        </section>

      </div>
    </div>
  );
};

export default About;
