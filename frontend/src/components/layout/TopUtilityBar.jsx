import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Recycle, ShieldCheck, Users } from 'lucide-react';

const TRUST_PILLS = [
  { icon: Leaf, label: 'Sustainable Farming' },
  { icon: Recycle, label: 'Zero Waste' },
  { icon: ShieldCheck, label: '100% Organic' },
  { icon: Users, label: '12,000+ Farmers' },
];

const TopUtilityBar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className={`fixed top-0 inset-x-0 z-[60] glass-utility text-white/95 transition-all duration-300 ${
        scrolled ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-9 flex items-center justify-between gap-4 text-[10px] font-semibold">
        <div className="hidden md:flex items-center gap-5 overflow-hidden">
          {TRUST_PILLS.map(({ icon: Icon, label }) => (
            <span key={label} className="flex items-center gap-1.5 whitespace-nowrap label-tech text-[8px] text-white/75">
              <Icon size={11} className="text-secondary-container shrink-0" />
              {label}
            </span>
          ))}
        </div>
        <span className="md:hidden label-tech text-[8px] text-white/70">Farm to Future · Pure · Natural</span>

        <div className="flex items-center gap-4 shrink-0">
          <Link to="/track-order" className="label-tech text-[8px] hover:text-white transition-colors hidden sm:inline">
            Track Order
          </Link>
          <Link to="/b2b" className="label-tech text-[8px] hover:text-white transition-colors">
            B2B Portal
          </Link>
          <Link to="/farmers" className="label-tech text-[8px] hover:text-white transition-colors hidden sm:inline">
            Farmer Network
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopUtilityBar;
