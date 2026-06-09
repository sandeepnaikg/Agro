import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ShieldCheck, Leaf } from 'lucide-react';
import logoImg from '../../assets/logo.jpg';

const Footer = () => {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for subscribing to Avasan Chakra updates!');
    e.target.reset();
  };

  return (
    <footer className="bg-primary text-white/75 py-14 px-6 md:px-12 lg:px-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
        <div className="lg:col-span-4 space-y-5">
          <Link to="/" className="flex items-center gap-3">
            <img src={logoImg} alt="Avasan Chakra" className="h-16 w-16 rounded-xl object-cover border border-white/10" />
            <div>
              <span className="text-white font-heading font-bold text-lg block">Avasan Chakra</span>
              <span className="text-secondary-container text-[10px] label-tech">Farm to Future. Pure. Natural. Powerful.</span>
            </div>
          </Link>
          <p className="text-white/60 text-sm leading-relaxed max-w-sm">
            Avsan Chakra Kernin Eco Solutions Pvt Ltd — India's trusted farm-to-table platform for dehydrated vegetable powders, fruit powders, and eco products from 12,000+ partner farmers.
          </p>
          <div className="space-y-2.5 text-sm text-white/70">
            <div className="flex items-center gap-2.5">
              <MapPin size={14} className="text-secondary-container shrink-0" />
              <span>Siddipet, Telangana & Hyderabad Tech Hub</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone size={14} className="text-secondary-container shrink-0" />
              <span>+91 90088 12345</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail size={14} className="text-secondary-container shrink-0" />
              <span>info@avasan.in · b2b@avasan.in</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-white font-heading font-bold text-xs label-tech">Shop</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/products" className="hover:text-white transition-colors">All Products</Link></li>
            <li><Link to="/subscription" className="hover:text-white transition-colors">Subscribe & Save</Link></li>
            <li><Link to="/b2b" className="hover:text-white transition-colors">B2B / Bulk Orders</Link></li>
            <li><Link to="/recipes" className="hover:text-white transition-colors">Recipes</Link></li>
          </ul>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-white font-heading font-bold text-xs label-tech">Company</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link to="/farmers" className="hover:text-white transition-colors">Our Farmers</Link></li>
            <li><Link to="/blog" className="hover:text-white transition-colors">Blog & Wellness</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-white font-heading font-bold text-xs label-tech">Support</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
            <li><Link to="/track-order" className="hover:text-white transition-colors">Track Order</Link></li>
            <li><Link to="/account" className="hover:text-white transition-colors">My Account</Link></li>
          </ul>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-white font-heading font-bold text-xs label-tech">Newsletter</h4>
          <p className="text-white/60 text-sm">Harvest alerts, seasonal offers & recipe ideas.</p>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-2">
            <input
              required
              type="email"
              placeholder="Your email"
              className="bg-white/10 border border-white/15 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-white/40 focus:ring-secondary-container/30"
            />
            <button type="submit" className="bg-secondary hover:bg-[#9A4E2E] text-white px-4 py-2.5 rounded-xl font-bold label-tech text-[10px] transition-colors">
              SUBSCRIBE
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-white/50 text-xs">
        <span>© {new Date().getFullYear()} Avasan Chakra Kernin Eco Solutions Pvt Ltd. All Rights Reserved.</span>
        <div className="flex flex-wrap gap-5 items-center">
          <span className="flex items-center gap-1.5"><ShieldCheck size={13} className="text-secondary-container" /> FSSAI Certified</span>
          <span className="flex items-center gap-1.5"><Leaf size={13} className="text-secondary-container" /> Organic Certified</span>
          <span className="flex items-center gap-1.5"><ShieldCheck size={13} className="text-secondary-container" /> Export Grade</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
