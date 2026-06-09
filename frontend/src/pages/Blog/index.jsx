import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Clock, Calendar, ArrowLeft, ArrowRight, ShieldCheck, ChevronRight, X } from 'lucide-react';
import ThemedButton from '../../components/common/ThemedButton';

// Blog Image Assets
import fieldSurveyImg from '../../assets/blog/field-survey.jpg';
import farmersMeetingImg from '../../assets/blog/farmers-meeting.jpg';
import farmerDiscussionImg from '../../assets/blog/farmer-discussion.jpg';
import farmerTrainingImg from '../../assets/blog/farmer-training.jpg';
import cropHarvestImg from '../../assets/blog/crop-harvest.jpg';
import moringaFieldImg from '../../assets/blog/moringa-field.jpg';
import fieldSelfieImg from '../../assets/blog/field-selfie.jpg';

const BLOG_IMAGES = {
  'field-survey': fieldSurveyImg,
  'farmers-meeting': farmersMeetingImg,
  'farmer-discussion': farmerDiscussionImg,
  'farmer-training': farmerTrainingImg,
  'crop-harvest': cropHarvestImg,
  'moringa-field': moringaFieldImg,
  'field-selfie': fieldSelfieImg,
};

const Blog = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);

  const articles = [
    {
      id: 'art-science-dehydration',
      title: 'The Science of Low-Temperature Dehydration: Locking in 98% Nutrients',
      category: 'Food Science',
      date: 'June 05, 2026',
      readTime: '6 mins read',
      author: 'Dr. Ramesh Chandra, Food Research Lead',
      image: 'crop-harvest',
      summary: 'Explore how convective low-temperature drying loops lock in crop minerals, fiber, and raw antioxidants compared to high-heat boiling or sun-bleaching.',
      content: [
        'Convective dehydration operates by passing controlled, heated air flows over raw agricultural biomass. Unlike conventional boiling or high-heat canning, convective processes maintain the crop environment below critical thermal thresholds. This is especially vital for heat-sensitive compounds like Vitamin C, Vitamin A, and delicate betalain pigments.',
        'At our decentralized collecting hubs, crops are loaded into solar thermal dehydration chambers within 4 hours of harvest. By locking the ambient air temperature at precisely 45°C, we evaporate free moisture without breaking down cellular wall structures or thermal enzymes.',
        'The resulting dry biomass holds a residual moisture level of less than 5.0%. When ground into mesh powders, the concentration index rises—10 grams of Moringa leaf powder offers the nutrient equivalent of 100 grams of fresh leaves, making active nutrition accessible in modern household cooking.'
      ]
    },
    {
      id: 'art-fieldwork-diaries',
      title: 'Fieldwork Diaries: Sourcing, SCM Transparency, and Dehydration Training',
      category: 'Fieldwork',
      date: 'June 09, 2026',
      readTime: '5 mins read',
      author: 'Sandeep Naik, SCM Director',
      image: 'field-survey',
      images: ['field-survey', 'farmers-meeting', 'farmer-discussion', 'farmer-training', 'crop-harvest', 'moringa-field', 'field-selfie'],
      summary: 'Go behind the scenes of our village-level sourcing operations, direct training workshops, and okra & tomato harvest collections in Telangana.',
      content: [
        'At Avasan Chakra, we believe that true transparency starts on the ground. Sourcing dehydrated vegetables and fruits directly from 12,000+ growers requires rigorous field training, logistics synchronization, and group alignment at the farm gate. In our recent fieldwork loop through village clusters in Siddipet and Yadadri, our team conducted hands-on audits and safety training sessions.',
        'During our community workshops, we gathered with hundreds of local farmers in local village halls. Sourcing surplus crops during gluts prevents agricultural waste while doubling farm income. We explained how our micro-dehydration hubs process fresh crops within 4 hours of harvest, locking in 98% of vitamins and antioxidants.',
        'Quality control is crucial. Our team worked directly with farmers in the fields, inspecting organic crop health (such as fresh okra and tomatoes) and detailing molecular moisture requirements. We also organized sanitation training, introducing hygienic hairnets, gloves, and eco-pouch packing procedures to guarantee export-grade purity.'
      ]
    },
    {
      id: 'art-circular-farming',
      title: 'Circular Sourcing: Solving Mandi Price Crashes & Agricultural Residue Burning',
      category: 'Circularity',
      date: 'May 28, 2026',
      readTime: '8 mins read',
      author: 'Saroja M., Sustainable SCM Officer',
      image: 'farmers-meeting',
      summary: 'Every year, visual crop defects and seasonal bumper gluts cause up to 40% harvest waste in Telangana mandis. Here is how direct farm gate collection alters smallholder economics.',
      content: [
        'Harvest gluts in local mandis frequently trigger catastrophic price drops. When supply peaks, buyers decrease bids, forcing farmers to dump perfectly nutritious crops due to shape anomalies or surplus transport costs. Simultaneously, post-harvest stalks (like cotton stalks or millet husks) are burned, emitting toxic plumes across rural villages.',
        'Avasan Chakra solves both issues through circular upcycling loops. We deploy local micro-dehydration hubs directly within village clusters. When a tomato price crash occurs, we buy the surplus red tomatoes at a guaranteed fair margin. Instead of going to waste, these tomatoes are stabilized, sliced, and turned into premium export tomato powder.',
        'Furthermore, agricultural residuals are upcycled. Cotton stalks are converted into biochar to capture carbon back into soils, and millet husks are packaged as soil mulching bags. Upcycling turns carbon emissions into rural economic growth.'
      ]
    },
    {
      id: 'art-beetroot-nitrates',
      title: 'Beetroot Nitrates: The Natural Stamina Secret for Active Lifestyles',
      category: 'Nutrition',
      date: 'May 15, 2026',
      readTime: '5 mins read',
      author: 'Anitha Chenna, Nutritionist & SCM Liaison',
      image: 'field-selfie',
      summary: 'Understanding the bio-mechanisms of organic beetroot nitrates in oxygen transport, cardio stamina, and muscle fatigue recovery.',
      content: [
        'Beetroots are naturally rich in inorganic nitrates (NO3-). When consumed, oral bacteria and stomach enzymes reduce these nitrates into nitrites (NO2-) and eventually into nitric oxide (NO) in the bloodstream.',
        'Nitric oxide is a potent vasodilator. It relaxes blood vessel walls, increasing arterial diameter and lowering resting blood pressure. For fitness enthusiasts and athletes, this means more oxygen is delivered to active muscle groups, reducing the aerobic cost of exercise and postponing muscle fatigue.',
        'Consuming fresh beetroots daily can be cumbersome. Dehydrated beetroot powder offers an instant, highly concentrated nitrate dose. Stirring 1.5 teaspoons into a morning juice or pre-workout shaker provides the bio-equivalent of two whole organic beetroots without added sugars.'
      ]
    },
    {
      id: 'art-moringa-ayurveda',
      title: 'Moringa & Ayurveda: The Ancient Herb Meeting Modern Science',
      category: 'Ayurveda',
      date: 'April 20, 2026',
      readTime: '7 mins read',
      author: 'Shastri Ramakrishna, Ayurvedic Advisor',
      image: 'moringa-field',
      summary: 'Known as the "Shigru" in classical texts, Moringa has been used for centuries to address inflammation, joint comfort, and digestive fire.',
      content: [
        'In classical Ayurvedic texts, Moringa (Shigru) is categorized as a heating, pungent herb that pacifies Kapha and Vata doshas. Its traditional uses encompass joint support, toxin removal (ama-pachana), and strengthening digestive fire (agni).',
        'Modern pharmacological research correlates these claims. Moringa leaf tissues contain highly active isothiocyanates, quercetin, and chlorogenic acid. These compounds act as natural anti-inflammatory agents, inhibiting inflammatory cytokines and reducing systemic joint stiffness.',
        'Additionally, because of its rich iron and calcium content, Moringa serves as an excellent natural mineral supplement. It supports red blood cell production and bone density indices, serving as a comprehensive wellness daily booster.'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-surface page-offset-top pb-24 px-8 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Banner Section */}
        <section className="text-center max-w-2xl mx-auto space-y-4">
          <span className="label-tech text-secondary font-bold tracking-[0.2em] uppercase">Wellness Center</span>
          <h1 className="tracking-tighter">Avasan Sourcing Blog</h1>
          <p className="text-stone-600 font-medium text-sm leading-relaxed">
            Read expert articles covering agricultural circularity, food science innovations, and ancient Ayurvedic principles updated for modern dietary health.
          </p>
        </section>

        {/* Featured Article Spot */}
        {articles.length > 0 && (
          <section 
            onClick={() => setSelectedArticle(articles[0])}
            className="bg-[#23422A] text-white rounded-[40px] p-8 md:p-12 shadow-ambient border border-white/10 flex flex-col lg:flex-row justify-between items-center gap-8 hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden"
          >
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center gap-3 text-[10px] text-secondary-container font-bold label-tech">
                <span className="bg-white/10 px-3 py-1 rounded-full uppercase">FEATURED SCIENCE</span>
                <span>{articles[0].date}</span>
                <span>• {articles[0].readTime}</span>
              </div>
              <h2 className="text-white text-2xl md:text-3xl font-heading font-bold mb-0">
                {articles[0].title}
              </h2>
              <p className="text-white/70 text-xs md:text-sm leading-relaxed font-semibold">
                {articles[0].summary}
              </p>
            </div>
            {articles[0].image && (
              <div className="w-full lg:w-56 h-40 rounded-2xl overflow-hidden bg-white/10 shrink-0 relative border border-white/10 shadow-sm">
                <img 
                  src={BLOG_IMAGES[articles[0].image]} 
                  alt={articles[0].title} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            )}
          </section>
        )}

        {/* Regular Articles Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.slice(1).map(art => (
            <div 
              key={art.id}
              onClick={() => setSelectedArticle(art)}
              className="bg-white rounded-[32px] overflow-hidden shadow-ambient border border-stone-100 flex flex-col justify-between hover:shadow-xl transition-all duration-300 cursor-pointer group"
            >
              <div>
                {art.image && (
                  <div className="w-full h-48 overflow-hidden bg-parchment relative shrink-0">
                    <img 
                      src={BLOG_IMAGES[art.image]} 
                      alt={art.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                )}
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-center text-[9px] text-stone-400 font-bold label-tech">
                    <span className="text-secondary">{art.category}</span>
                    <span>{art.readTime}</span>
                  </div>

                  <h3 className="text-base text-primary font-heading font-bold mb-2 group-hover:text-secondary transition-colors line-clamp-2">
                    {art.title}
                  </h3>

                  <p className="text-stone-500 text-xs leading-relaxed line-clamp-3">
                    {art.summary}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-4 border-t border-stone-50 text-[9px] font-bold label-tech text-stone-400 flex justify-between items-center">
                <span>By {art.author.split(',')[0]}</span>
                <span className="text-primary group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  READ MORE <ChevronRight size={12} />
                </span>
              </div>
            </div>
          ))}
        </section>

        {/* Article Reading Modal */}
        <AnimatePresence>
          {selectedArticle && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-primary/20 backdrop-blur-sm z-50 flex items-center justify-center p-6"
              onClick={() => setSelectedArticle(null)}
            >
              <motion.div 
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                className="bg-white rounded-[40px] p-8 md:p-10 max-w-2xl w-full shadow-2xl border border-stone-100 max-h-[85vh] overflow-y-auto space-y-6 relative scrollbar-hide"
                onClick={e => e.stopPropagation()}
              >
                {/* Close Button */}
                <button 
                  onClick={() => setSelectedArticle(null)}
                  className="absolute top-6 right-6 p-2 text-stone-400 hover:text-stone-700 bg-stone-50 hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>

                {/* Header Info */}
                <div className="space-y-2 border-b border-stone-100 pb-4">
                  <span className="text-[10px] text-secondary font-bold label-tech">{selectedArticle.category}</span>
                  <h2 className="text-xl md:text-2xl text-primary font-heading font-bold">{selectedArticle.title}</h2>
                  <div className="flex flex-wrap gap-4 text-[10px] font-bold label-tech text-stone-400">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {selectedArticle.date}</span>
                    <span className="flex items-center gap-1"><BookOpen size={12} /> {selectedArticle.readTime}</span>
                  </div>
                  <p className="text-[10px] font-bold text-stone-500 uppercase label-tech pt-2">Written by: {selectedArticle.author}</p>
                </div>

                {/* Content Paragraphs */}
                <div className="space-y-4 text-stone-600 text-xs leading-relaxed font-semibold">
                  {selectedArticle.content.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>

                {/* Image Gallery / Grid for Fieldwork */}
                {selectedArticle.images && (
                  <div className="space-y-3 pt-4 border-t border-stone-100">
                    <h4 className="font-heading font-bold text-primary text-xs uppercase tracking-wide label-tech">Fieldwork Gallery</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {selectedArticle.images.map((imgKey, index) => (
                        <div 
                          key={index}
                          className="aspect-[4/3] rounded-xl overflow-hidden border border-stone-100 shadow-sm cursor-zoom-in hover:scale-[1.02] transition-transform duration-300"
                        >
                          <img 
                            src={BLOG_IMAGES[imgKey]} 
                            alt={`Avasan Fieldwork ${index + 1}`} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quality Standard badge */}
                <div className="bg-stone-50 border border-stone-100 rounded-2xl p-4 flex items-center gap-3 text-[10px] font-bold label-tech text-stone-500 justify-center">
                  <ShieldCheck size={14} className="text-green-600" />
                  <span>Sourced & Processed under strict FSSAI Dehydration parameters.</span>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default Blog;
