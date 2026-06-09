import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import {
  Leaf, Recycle, Users, ArrowRight, ShieldCheck, Star, ChevronDown,
  MapPin, Truck, Sparkles, ChefHat, Clock
} from 'lucide-react';
import ThemedButton from '../../components/common/ThemedButton';
import { ScrollReveal, StaggerGrid, StaggerItem } from '../../components/common/ScrollReveal';
import { getProductImage } from '../../utils/productImages';
import { useProducts } from '../../context/ProductContext';
import { useFarmers } from '../../context/FarmerContext';
import heroImg from '../../assets/hero.jpg';

const HOME_CATEGORIES = ['All', 'Vegetable Powders', 'Fruit Powders', 'Seed Products', 'Leaf & Soft Dry', 'Biomass & Waste'];

const CATEGORY_STRIP = [
  { label: 'All Products', filter: 'All', imageKey: 'moringa-powder' },
  { label: 'Leaf & Soft Dry', filter: 'Leaf & Soft Dry', imageKey: 'spinach-powder' },
  { label: 'Seed Products', filter: 'Seed Products', imageKey: 'tamarind-seed-powder' },
  { label: 'Vegetable Powders', filter: 'Vegetable Powders', imageKey: 'tomato-powder' },
  { label: 'Fruit Powders', filter: 'Fruit Powders', imageKey: 'coconut-milk-powder' },
  { label: 'Oil Extraction', filter: 'Oil Extraction', imageKey: 'castor-seed-extract' },
  { label: 'Biomass & Waste', filter: 'Biomass & Waste', imageKey: 'millet-husk-mulch' },
];

const TRUST_HIGHLIGHTS = [
  { icon: Leaf, title: '100% Organic Certified', desc: 'Pesticide-free farm soils' },
  { icon: MapPin, title: 'Traceable Origin Logs', desc: 'Batch-level farm tracking' },
  { icon: Users, title: '12,000+ Farmers Network', desc: 'Direct grower partnerships' },
  { icon: Recycle, title: 'Zero Waste Stabilisation', desc: 'Upcycled crop surplus' },
];

const PROCESS_STEPS = [
  { step: '01', title: 'Farm Harvest', desc: 'Surplus & organic produce collected at farm gate within 4 hours' },
  { step: '02', title: 'Dehydration', desc: 'Low-temperature solar & convective drying locks in 98% nutrients' },
  { step: '03', title: 'Packed & Delivered', desc: 'Traceable batches packed in eco pouches, shipped nationwide' },
];

const SUBSCRIPTION_PLANS = [
  { name: 'Starter', price: '₹299', discount: '5%', highlight: 'Up to 3 products/month' },
  { name: 'Family', price: '₹699', discount: '12%', highlight: 'Up to 8 products/month', popular: true },
  { name: 'Wellness Pro', price: '₹1,299', discount: '20%', highlight: 'Unlimited products' },
];

const HOME_RECIPES = [
  { name: 'Tomato Herb Pasta Sauce', time: '10 mins', productId: 'tomato-powder', category: 'Sauces' },
  { name: 'Moringa Immunity Tea', time: '5 mins', productId: 'moringa-powder', category: 'Drinks' },
  { name: 'Beetroot Smoothie Bowl', time: '5 mins', productId: 'beetroot-powder', category: 'Wellness' },
];

const TESTIMONIALS = [
  {
    name: 'Rangaiah K.',
    role: 'Moringa Grower, Siddipet',
    content: 'Prior to joining the Avasan Chakra network, summer wilting cost us 40% of our leaves. Farm-gate dryers have doubled our seasonal profits.',
    rating: 5,
  },
  {
    name: 'Anitha Chenna',
    role: 'Procurement Lead, Telangana Foods',
    content: 'We source custom mesh sizes of Carrot and Beetroot powders. The transparency of trace origin logs is unparalleled.',
    rating: 5,
  },
  {
    name: 'Priya Sharma',
    role: 'Home Chef, Hyderabad',
    content: 'The tomato and moringa powders have replaced half my spice cabinet. Fresh taste, clean ingredients, and I love knowing which farmer grew it.',
    rating: 5,
  },
];

const Home = () => {
  const navigate = useNavigate();
  const { products } = useProducts();
  const { farmers, totalFarmersCount } = useFarmers();

  const [hasHeroVideo, setHasHeroVideo] = useState(false);
  const [heroVideoFailed, setHeroVideoFailed] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [cropFilter, setCropFilter] = useState('All Crops');

  useEffect(() => {
    let isMounted = true;
    fetch('/hero-farm.mp4', { method: 'HEAD' })
      .then((res) => { if (isMounted && res.ok) setHasHeroVideo(true); })
      .catch(() => {});
    return () => { isMounted = false; };
  }, []);

  const filteredProducts = products
    .filter((p) => activeCategory === 'All' || p.category === activeCategory)
    .slice(0, 8);

  const cropOptions = ['All Crops', ...new Set(farmers.map((f) => f.productSupplied))];
  const displayedFarmers = farmers
    .filter((f) => cropFilter === 'All Crops' || f.productSupplied === cropFilter)
    .slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      {/* ── HERO (left-aligned, reference-inspired) ── */}
      <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          {hasHeroVideo && !heroVideoFailed ? (
            <video
              autoPlay muted loop playsInline poster={heroImg}
              onError={() => setHeroVideoFailed(true)}
              className="absolute inset-0 w-full h-full object-cover object-[70%_center] hero-ken-burns"
            >
              <source src="/hero-farm.mp4" type="video/mp4" />
            </video>
          ) : (
            <img
              src={heroImg}
              alt="Indian farm at sunrise — farmers plowing fields"
              className="absolute inset-0 w-full h-full object-cover object-[70%_center] hero-ken-burns"
            />
          )}
        </div>

        {/* Left-heavy overlay — farm photo stays visible on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-black/20" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pt-32 pb-36 lg:pb-40">
          <div className="max-w-xl lg:max-w-2xl">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="label-tech text-secondary-container text-[10px] tracking-[0.2em] block mb-4"
            >
              CENTRAL MARKETPLACE
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.08 }}
              className="text-white text-4xl sm:text-5xl md:text-[3.25rem] lg:text-6xl font-heading font-bold tracking-tight leading-[1.1] mb-4"
            >
              From Our Farms to Your Kitchen
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.18 }}
              className="text-white text-lg md:text-xl font-semibold mb-3"
            >
              Farm to Future. Pure. Natural. Powerful.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.65, delay: 0.28 }}
              className="text-white/75 text-sm md:text-base leading-relaxed mb-8 max-w-lg"
            >
              Connecting sustainable agricultural products directly from 12,000+ trusted farmers to your kitchen — available in dried and powder forms.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.38 }}
              className="flex flex-wrap gap-3"
            >
              <ThemedButton
                onClick={() => navigate('/products')}
                className="px-7 py-3.5 text-sm font-bold flex items-center gap-2 shadow-lg"
              >
                Shop Products <ArrowRight size={15} />
              </ThemedButton>
              <button
                onClick={() => navigate('/farmers')}
                className="px-7 py-3.5 text-sm font-bold text-primary bg-white rounded-xl hover:bg-stone-50 transition-all label-tech shadow-md"
              >
                Our Farmers
              </button>
            </motion.div>
          </div>
        </div>

        <motion.button
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.2 }}
          onClick={() => document.getElementById('categories-section')?.scrollIntoView({ behavior: 'smooth' })}
          className="absolute bottom-24 lg:bottom-28 left-1/2 -translate-x-1/2 z-10 text-white/50 hover:text-white transition-colors"
          aria-label="Scroll down"
        >
          <ChevronDown size={26} />
        </motion.button>
      </section>

      {/* ── CATEGORY STRIP ── */}
      <section id="categories-section" className="relative z-20 -mt-14 lg:-mt-16 px-4 sm:px-6 md:px-12 lg:px-20 pb-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            {/* Mobile/tablet: horizontal scroll with edge padding. Desktop: centered equal grid */}
            <div className="flex lg:grid lg:grid-cols-7 gap-3 md:gap-4 overflow-x-auto lg:overflow-visible pb-1 scrollbar-hide snap-x snap-mandatory scroll-pl-4 scroll-pr-4 lg:scroll-pl-0 lg:scroll-pr-0 justify-start lg:justify-items-stretch">
              {CATEGORY_STRIP.map((cat, i) => (
                <motion.button
                  key={cat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.45 }}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setActiveCategory(cat.filter);
                    navigate('/products');
                  }}
                  className="snap-center shrink-0 w-[118px] sm:w-[128px] lg:w-auto flex flex-col bg-white rounded-2xl border border-stone-100 shadow-card hover:shadow-card-hover transition-all overflow-hidden group"
                >
                  <div className="aspect-square w-full p-2.5 bg-parchment flex items-center justify-center overflow-hidden">
                    <img
                      src={getProductImage(cat.imageKey)}
                      alt={cat.label}
                      className="max-w-full max-h-full w-auto h-auto object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 min-h-[48px] flex items-center justify-center bg-white border-t border-stone-50 px-2 py-2">
                    <p className="text-[8px] sm:text-[9px] font-bold label-tech text-primary text-center leading-tight">
                      {cat.label.toUpperCase()}
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── TRUST + B2B TWIN CARDS ── */}
      <section id="trust-section" className="section-padding section-bg-parchment pt-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <ScrollReveal>
              <div className="bg-[#E8EFE4] rounded-3xl p-6 md:p-8 border border-primary/5 h-full">
                <div className="grid grid-cols-2 gap-5">
                  {TRUST_HIGHLIGHTS.map(({ icon: Icon, title, desc }) => (
                    <motion.div
                      key={title}
                      whileHover={{ scale: 1.02 }}
                      className="space-y-2"
                    >
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm">
                        <Icon size={18} />
                      </div>
                      <h3 className="text-sm text-primary font-bold leading-tight">{title}</h3>
                      <p className="text-stone-500 text-[11px] leading-relaxed">{desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.12}>
              <div className="bg-[#E8EFE4] rounded-3xl p-6 md:p-8 border border-primary/5 flex flex-col sm:flex-row items-center gap-6 h-full">
                <div className="flex-1 space-y-4">
                  <span className="label-tech text-secondary text-[9px]">Industrial B2B</span>
                  <h3 className="text-xl text-primary font-bold leading-snug">
                    Need Custom Specifications or Bulk Quantities?
                  </h3>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    Tailored mesh sizes, moisture levels, and organic lab certification reports for food industries and export clients.
                  </p>
                  <ThemedButton
                    onClick={() => navigate('/b2b')}
                    className="px-6 py-3 text-xs font-bold flex items-center gap-2 w-fit"
                  >
                    Submit Bulk Sourcing Form <ArrowRight size={14} />
                  </ThemedButton>
                </div>
                <div className="w-36 h-36 sm:w-40 sm:h-40 shrink-0 rounded-2xl bg-white border border-stone-100 p-3 flex items-center justify-center overflow-hidden">
                  <img
                    src={getProductImage('moringa-powder')}
                    alt="Avasan eco products"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>

          <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8 relative">
            {PROCESS_STEPS.map((s, i) => (
              <StaggerItem key={s.step}>
                <motion.div
                  whileHover={{ y: -6, transition: { duration: 0.3 } }}
                  className="relative bg-white rounded-3xl p-7 border border-stone-100 shadow-card h-full"
                >
                  <span className="text-5xl font-heading font-bold text-primary/8 absolute top-4 right-6">{s.step}</span>
                  {i < PROCESS_STEPS.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-primary/20 to-transparent z-10" />
                  )}
                  <h3 className="text-lg text-primary font-bold mb-2 relative">{s.title}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed relative">{s.desc}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* ── FARMER DATABASE ── */}
      <section id="farmers-section" className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-10">
            <ScrollReveal>
              <span className="label-tech text-secondary text-[10px]">Farmer Database</span>
              <h2 className="mt-2 text-primary font-heading">Meet Our Partner Farmers</h2>
              <p className="text-stone-500 mt-2 text-sm max-w-xl">
                Every purchase links to a real Telangana grower. Filter by crop, explore profiles, and trace your product's origin.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="flex gap-6 bg-parchment rounded-2xl px-6 py-4 shadow-card border border-stone-100">
                {[
                  { val: totalFarmersCount.toLocaleString() + '+', label: 'Farmers' },
                  { val: '3', label: 'States' },
                  { val: '8', label: 'Crop Types' },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <span className="text-primary text-xl font-heading font-bold block">{s.val}</span>
                    <span className="text-stone-400 text-[8px] label-tech">{s.label}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.1}>
            <div className="flex flex-wrap gap-2 mb-8">
              {cropOptions.map((crop) => (
                <motion.button
                  key={crop}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setCropFilter(crop)}
                  className={`px-4 py-2 rounded-full text-[10px] font-bold label-tech transition-all duration-300 ${
                    cropFilter === crop ? 'bg-primary text-white shadow-md' : 'bg-parchment text-primary/60 border border-stone-100 hover:bg-primary/5'
                  }`}
                >
                  {crop.toUpperCase()}
                </motion.button>
              ))}
            </div>
          </ScrollReveal>

          <AnimatePresence mode="popLayout">
            <motion.div
              key={cropFilter}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            >
              {displayedFarmers.map((farmer, i) => (
                <motion.div
                  key={farmer.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.45 }}
                  whileHover={{ y: -5, transition: { duration: 0.25 } }}
                  className="product-card space-y-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center font-heading font-bold text-sm">
                      {farmer.avatar}
                    </div>
                    <div>
                      <h3 className="text-sm text-primary font-bold">{farmer.name}</h3>
                      <span className="text-[10px] text-stone-400 flex items-center gap-1">
                        <MapPin size={10} /> {farmer.location}
                      </span>
                    </div>
                  </div>
                  <p className="text-stone-500 text-xs italic leading-relaxed line-clamp-3">"{farmer.sourcingInfo}"</p>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="badge-cert">Organic</span>
                    <span className="badge-cert">FSSAI</span>
                    <span className="badge-cert">Since {farmer.joinedYear}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-stone-50">
                    <span className="text-[10px] text-stone-400 label-tech">{farmer.productSupplied}</span>
                    <button
                      onClick={() => navigate(`/farmers/${farmer.id}`)}
                      className="text-secondary text-[10px] font-bold label-tech hover:underline flex items-center gap-1"
                    >
                      View Profile <ArrowRight size={10} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          <ScrollReveal className="text-center mt-10">
            <ThemedButton onClick={() => navigate('/farmers')} className="px-8 py-3.5 text-xs font-bold">
              Explore All Farmers <ArrowRight size={14} className="ml-1" />
            </ThemedButton>
          </ScrollReveal>
        </div>
      </section>

      {/* ── PRODUCT SHOWCASE ── */}
      <section className="section-padding section-bg-stone">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
            <div>
              <span className="label-tech text-secondary text-[10px]">Product Catalogue</span>
              <h2 className="mt-2 text-primary font-heading">Explore Our Eco Products</h2>
            </div>
            <Link to="/products" className="text-primary font-bold text-xs label-tech flex items-center gap-1.5 hover:text-secondary transition-colors">
              Explore All 16+ Products <ArrowRight size={14} />
            </Link>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide">
              {HOME_CATEGORIES.map((cat) => (
                <motion.button
                  key={cat}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-[10px] font-bold label-tech whitespace-nowrap transition-all duration-300 shrink-0 ${
                    activeCategory === cat ? 'bg-primary text-white shadow-md' : 'bg-white text-primary/60 border border-stone-100 hover:bg-primary/5'
                  }`}
                >
                  {cat.toUpperCase()}
                </motion.button>
              ))}
            </div>
          </ScrollReveal>

          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
            >
              {filteredProducts.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  onClick={() => navigate(`/products/${p.id}`)}
                  className="product-card cursor-pointer group"
                >
                  <div className="product-img-wrap mb-4 relative">
                    <img src={getProductImage(p.id)} alt={p.name} className="product-img" />
                    {p.isHighImpact && (
                      <span className="absolute bottom-2 left-2 bg-secondary text-white text-[7px] font-bold label-tech px-2 py-0.5 rounded-full z-10">
                        BESTSELLER
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm text-primary font-bold leading-tight line-clamp-1 mb-1">{p.name}</h3>
                  <p className="text-stone-500 text-[11px] line-clamp-2 mb-3">{p.description}</p>
                  <div className="flex justify-between items-center pt-2 border-t border-stone-50">
                    <span className="text-primary font-bold text-sm">{p.price}</span>
                    <span className="text-secondary text-[10px] font-bold label-tech group-hover:underline">View →</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── SUBSCRIPTION ── */}
      <section className="section-padding section-bg-parchment">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-10">
            <span className="label-tech text-secondary text-[10px] flex items-center justify-center gap-1.5">
              <Sparkles size={12} /> Subscribe & Save
            </span>
            <h2 className="mt-2 text-primary font-heading">Never Run Out. Subscribe & Save up to 20%</h2>
            <p className="text-stone-500 text-sm mt-2">2,400+ families subscribe monthly · Skip, pause, or swap anytime</p>
          </ScrollReveal>

          <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {SUBSCRIPTION_PLANS.map((plan) => (
              <StaggerItem key={plan.name}>
                <motion.div
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className={`rounded-3xl p-7 border h-full transition-all ${
                    plan.popular
                      ? 'bg-primary text-white border-primary shadow-card-hover md:scale-[1.03]'
                      : 'bg-white border-stone-100 shadow-card'
                  }`}
                >
                  {plan.popular && (
                    <span className="text-[9px] label-tech bg-secondary text-white px-3 py-1 rounded-full mb-4 inline-block">
                      MOST POPULAR
                    </span>
                  )}
                  <h3 className={`text-xl font-bold mb-1 ${plan.popular ? 'text-white' : 'text-primary'}`}>{plan.name}</h3>
                  <span className={`text-3xl font-heading font-bold block mb-1 ${plan.popular ? 'text-secondary-container' : 'text-secondary'}`}>
                    {plan.price}<span className="text-sm font-normal opacity-60">/mo</span>
                  </span>
                  <span className={`text-xs block mb-4 ${plan.popular ? 'text-white/70' : 'text-stone-500'}`}>
                    Save {plan.discount} · {plan.highlight}
                  </span>
                  <ul className={`space-y-2 text-xs ${plan.popular ? 'text-white/80' : 'text-stone-500'}`}>
                    <li className="flex items-center gap-2"><ShieldCheck size={12} /> Free delivery</li>
                    <li className="flex items-center gap-2"><Truck size={12} /> Skip or pause anytime</li>
                    <li className="flex items-center gap-2"><ChefHat size={12} /> Monthly recipe booklet</li>
                  </ul>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerGrid>

          <ScrollReveal className="text-center">
            <ThemedButton onClick={() => navigate('/subscription')} className="px-10 py-4 text-sm font-bold">
              Choose Your Plan <ArrowRight size={16} className="ml-1" />
            </ThemedButton>
          </ScrollReveal>
        </div>
      </section>

      {/* ── RECIPES ── */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="flex justify-between items-end mb-8">
            <div>
              <span className="label-tech text-secondary text-[10px]">Recipe Ideas</span>
              <h2 className="mt-2 text-primary font-heading">Cook with Avasan Powders</h2>
            </div>
            <Link to="/recipes" className="text-primary text-xs font-bold label-tech hover:text-secondary flex items-center gap-1">
              All Recipes <ArrowRight size={12} />
            </Link>
          </ScrollReveal>

          <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {HOME_RECIPES.map((recipe) => (
              <StaggerItem key={recipe.name}>
                <motion.div
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  onClick={() => navigate('/recipes')}
                  className="product-card cursor-pointer group overflow-hidden"
                >
                  <div className="product-img-wrap mb-4 h-40">
                    <img src={getProductImage(recipe.productId)} alt={recipe.name} className="product-img" />
                  </div>
                  <span className="text-[9px] label-tech text-secondary">{recipe.category}</span>
                  <h3 className="text-base text-primary font-bold mt-1 mb-2">{recipe.name}</h3>
                  <div className="flex items-center gap-3 text-stone-400 text-[11px]">
                    <span className="flex items-center gap-1"><Clock size={12} /> {recipe.time}</span>
                    <span className="flex items-center gap-1"><ChefHat size={12} /> Easy</span>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* ── PROMO ── */}
      <section className="px-6 md:px-12 lg:px-20 py-8 max-w-7xl mx-auto w-full">
        <ScrollReveal variant="scaleIn">
          <div className="bg-secondary text-white rounded-[32px] p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(45deg,#fff_25%,transparent_25%,transparent_50%,#fff_50%,#fff_75%,transparent_75%,transparent)] [background-size:20px_20px]" />
            <div className="space-y-2 relative z-10">
              <span className="label-tech text-secondary-container text-[9px] bg-white/15 px-3 py-1 rounded-full">First Order Offer</span>
              <h3 className="text-white text-2xl font-heading font-bold">Get 10% Off Your First Purchase</h3>
              <p className="text-white/75 text-sm">Use code <span className="font-mono font-bold bg-white/20 px-2 py-0.5 rounded">AVASAN10</span> at checkout</p>
            </div>
            <ThemedButton onClick={() => navigate('/products')} className="relative z-10 bg-white !text-secondary hover:!bg-stone-50 px-8 py-3.5 text-xs font-bold shrink-0">
              Shop Now
            </ThemedButton>
          </div>
        </ScrollReveal>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section-padding section-bg-stone">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-10">
            <span className="label-tech text-secondary text-[10px]">Reviews & Testimonials</span>
            <h2 className="mt-2 text-primary font-heading">What Our Community Says</h2>
          </ScrollReveal>

          <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((item) => (
              <StaggerItem key={item.name}>
                <motion.div
                  whileHover={{ y: -4, transition: { duration: 0.25 } }}
                  className="bg-white rounded-3xl p-7 border border-stone-100 shadow-card space-y-4 h-full"
                >
                  <div className="flex gap-0.5">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-stone-600 text-sm italic leading-relaxed">"{item.content}"</p>
                  <div>
                    <h4 className="font-bold text-primary text-sm">{item.name}</h4>
                    <span className="text-[10px] text-stone-400 label-tech">{item.role}</span>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* ── CERTIFICATIONS ── */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <ScrollReveal>
            <span className="label-tech text-stone-400 text-[10px]">Quality Assurance</span>
          </ScrollReveal>

          <StaggerGrid className="flex flex-wrap justify-center gap-8 md:gap-14 mt-8">
            {[
              { title: 'Organic Certified', desc: 'Pesticide-free soils' },
              { title: 'FSSAI Approved', desc: 'Food safety compliant' },
              { title: 'Export Grade', desc: 'Global standards' },
              { title: 'ISO 9001:2015', desc: 'Quality management' },
            ].map((cert) => (
              <StaggerItem key={cert.title}>
                <motion.div
                  whileHover={{ scale: 1.04, transition: { duration: 0.25 } }}
                  className="flex items-center gap-3 text-left"
                >
                  <div className="w-12 h-12 bg-parchment rounded-2xl flex items-center justify-center text-primary border border-stone-100">
                    <ShieldCheck size={22} />
                  </div>
                  <div>
                    <h4 className="text-primary text-sm font-bold">{cert.title}</h4>
                    <p className="text-stone-400 text-[10px] label-tech">{cert.desc}</p>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>
    </div>
  );
};

export default Home;
