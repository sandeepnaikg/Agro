import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChefHat, Clock, Sparkles, X, ShoppingBag, ArrowRight, Award, Plus } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useProducts } from '../../context/ProductContext';
import { getProductImage } from '../../utils/productImages';
import ThemedButton from '../../components/common/ThemedButton';

const Recipes = () => {
  const { addToCart } = useCart();
  const { products } = useProducts();

  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const categories = ['All', 'Immunity Drinks', 'Sauces & Curries', 'Baking & Flour', 'Snacks & Salads'];

  const recipes = [
    {
      id: 'rec-tomato-pasta',
      name: 'Instant Tomato Herb Pasta Sauce',
      category: 'Sauces & Curries',
      time: '10 mins',
      difficulty: 'Easy',
      productId: 'tomato-powder',
      productName: 'Tomato Powder',
      description: 'A rich, flavorful, and instant Italian pasta sauce made directly from dehydrated tomato powder. Solves shape-crop gluts while saving time.',
      ingredients: [
        '4 tbsp Avasan Tomato Powder',
        '1 cup lukewarm water',
        '1 tbsp Olive Oil',
        '2 cloves Garlic, finely chopped',
        '1 tsp Dried Oregano & Basil',
        'Salt & Pepper to taste'
      ],
      steps: [
        'Whisk the Avasan Tomato Powder and water together in a small bowl until completely smooth.',
        'Sauté the chopped garlic in olive oil in a pan over medium heat for 1 minute until fragrant.',
        'Pour in the tomato mixture, add oregano, basil, salt, and pepper.',
        'Simmer for 5-7 minutes on low heat until the sauce thickens. Toss with cooked pasta immediately.'
      ]
    },
    {
      id: 'rec-beet-smoothie',
      name: 'Nitric Oxide Beetroot Smoothie Bowl',
      category: 'Immunity Drinks',
      time: '5 mins',
      difficulty: 'Easy',
      productId: 'beetroot-powder',
      productName: 'Beetroot Powder',
      description: 'A vibrant energy-boosting smoothie loaded with dietary nitrates for enhanced blood flow and stamina.',
      ingredients: [
        '1.5 tsp Avasan Beetroot Powder',
        '1 Frozen Banana',
        '1/2 cup Greek Yogurt or Oat Milk',
        '1/2 cup Mixed Berries',
        '1 tsp Honey or Chia Seeds (optional)'
      ],
      steps: [
        'Add the frozen banana, berries, yogurt/oat milk, and Avasan Beetroot Powder to a high-speed blender.',
        'Blend until thick and creamy, adjusting liquid if necessary.',
        'Pour into a bowl and top with chia seeds, banana slices, or organic granola.'
      ]
    },
    {
      id: 'rec-moringa-tea',
      name: 'Moringa Immunity Morning Infusion',
      category: 'Immunity Drinks',
      time: '5 mins',
      difficulty: 'Easy',
      productId: 'moringa-powder',
      productName: 'Moringa Leaf Powder',
      description: 'A powerful green tonic loaded with minerals and vitamins. Excellent replacement for morning caffeine.',
      ingredients: [
        '1 tsp Avasan Moringa Leaf Powder',
        '1.5 cups Hot Water (not boiling)',
        '1 tbsp Lemon Juice',
        '1 tsp Raw Honey'
      ],
      steps: [
        'Place the Avasan Moringa Leaf Powder in your mug.',
        'Pour in hot water (around 80°C to preserve vitamin C) and stir vigorously to dissolve.',
        'Squeeze in lemon juice and add honey.',
        'Stir well, let settle for 30 seconds, and drink warm.'
      ]
    },
    {
      id: 'rec-mango-chat',
      name: 'Tangy Summer Street Salad Seasoning',
      category: 'Snacks & Salads',
      time: '3 mins',
      difficulty: 'Easy',
      productId: 'mango-powder',
      productName: 'Amchur Mango Powder',
      description: 'A traditional souring spice rub that adds a bright punch to fruit bowls, roasted chickpeas, or cucumber salads.',
      ingredients: [
        '2 tsp Avasan Amchur Mango Powder',
        '1 tsp Roasted Cumin Powder',
        '1/2 tsp Black Salt',
        '1/4 tsp Chili Powder'
      ],
      steps: [
        'Mix all the dry spices together in a small shaker or bowl.',
        'Chop fresh cucumbers, tomatoes, and apples.',
        'Sprinkle the tangy mix over the salad and toss well. Serve chilled.'
      ]
    },
    {
      id: 'rec-spinach-roti',
      name: 'Spinach Green Wheat Chapatis',
      category: 'Baking & Flour',
      time: '20 mins',
      difficulty: 'Easy',
      productId: 'spinach-powder',
      productName: 'Spinach Powder',
      description: 'Incorporate leafy greens easily into children\'s meals by enriching regular wheat dough with stabilized spinach powder.',
      ingredients: [
        '2 tbsp Avasan Spinach Powder',
        '2 cups Whole Wheat Flour (Atta)',
        '1 tsp Oil or Ghee',
        'Warm water for kneading',
        'Pinch of Salt'
      ],
      steps: [
        'In a mixing bowl, combine whole wheat flour, salt, and Avasan Spinach Powder. Stir dry to distribute.',
        'Add oil/ghee, and slowly add warm water while kneading to form a soft, smooth dough.',
        'Rest the green dough covered for 10 minutes.',
        'Divide into balls, roll flat, and cook on a hot tawa (griddle) with ghee until golden spots appear.'
      ]
    },
    {
      id: 'rec-tamarind-sauce',
      name: 'Thickened Tamarind Souring Blend',
      category: 'Sauces & Curries',
      time: '15 mins',
      difficulty: 'Medium',
      productId: 'tamarind-seed-powder',
      productName: 'Tamarind Seed Powder',
      description: 'Upcycle de-hulled tamarind seed starch as a gluten-free thickener for heavy curries, soups, and traditional gravies.',
      ingredients: [
        '1 tbsp Avasan Tamarind Seed Powder',
        '1/2 cup cold water',
        '2 cups Sambar or Lentil Curry base'
      ],
      steps: [
        'Vigorously dissolve the Avasan Tamarind Seed Powder in cold water to form a slurry (doing this in hot water causes lumps).',
        'Bring your curry base to a rolling boil.',
        'Slowly pour in the slurry while stirring constantly.',
        'Simmer for 5 minutes until the curry achieves a glossy, thick consistency.'
      ]
    }
  ];

  const filteredRecipes = recipes.filter(r => activeCategory === 'All' || r.category === activeCategory);

  const handleAddIngredient = (productId, name) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      addToCart(product, 'Powder', 100, 1);
      alert(`${name} added to cart!`);
    } else {
      // Fallback if not matching context exactly
      addToCart({ id: productId, name, price: '₹500 / kg' }, 'Powder', 100, 1);
      alert(`${name} added to cart!`);
    }
  };

  return (
    <div className="min-h-screen bg-surface page-offset-top pb-24 px-8 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Banner Section */}
        <section className="text-center max-w-2xl mx-auto space-y-4">
          <span className="label-tech text-secondary font-bold tracking-[0.2em] uppercase">Culinary Hub</span>
          <h1 className="tracking-tighter">Recipes & Usage Ideas</h1>
          <p className="text-stone-600 font-medium text-sm leading-relaxed">
            Discover creative and nutritious ways to integrate our molecularly stabilized vegetable and fruit powders into your daily meals. Cook pure, natural, and powerful dishes.
          </p>
        </section>

        {/* Categories Navigation */}
        <section className="flex flex-wrap gap-2.5 justify-center">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-white text-primary/60 border border-stone-100 hover:bg-primary/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </section>

        {/* Recipes Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredRecipes.map(rec => (
              <motion.div
                key={rec.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={() => setSelectedRecipe(rec)}
                className="bg-white rounded-[32px] p-6 shadow-ambient border border-stone-100 flex flex-col justify-between hover:shadow-xl transition-all duration-300 cursor-pointer group"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-[10px] text-stone-400 font-bold label-tech">
                    <span className="text-secondary">{rec.category}</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {rec.time}</span>
                  </div>

                  <h3 className="text-lg text-primary font-heading font-bold mb-2 group-hover:text-secondary transition-colors">
                    {rec.name}
                  </h3>

                  <p className="text-stone-500 text-xs leading-relaxed line-clamp-2">
                    {rec.description}
                  </p>
                </div>

                <div className="flex justify-between items-center pt-4 mt-6 border-t border-stone-50 text-[10px] font-bold label-tech text-stone-400">
                  <span>Ingredient: {rec.productName}</span>
                  <span className="text-primary group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    VIEW STEPS <ArrowRight size={12} />
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </section>

        {/* Recipe Detail Modal */}
        <AnimatePresence>
          {selectedRecipe && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-primary/20 backdrop-blur-sm z-50 flex items-center justify-center p-6"
              onClick={() => setSelectedRecipe(null)}
            >
              <motion.div 
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                className="bg-white rounded-[40px] p-8 md:p-10 max-w-2xl w-full shadow-2xl border border-stone-100 max-h-[85vh] overflow-y-auto space-y-6 relative"
                onClick={e => e.stopPropagation()}
              >
                {/* Close Button */}
                <button 
                  onClick={() => setSelectedRecipe(null)}
                  className="absolute top-6 right-6 p-2 text-stone-400 hover:text-stone-700 bg-stone-50 hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>

                {/* Header */}
                <div className="space-y-2 border-b border-stone-100 pb-4">
                  <span className="text-[10px] text-secondary font-bold label-tech">{selectedRecipe.category}</span>
                  <h2 className="text-2xl text-primary font-heading font-bold">{selectedRecipe.name}</h2>
                  <div className="flex gap-4 text-[10px] font-bold label-tech text-stone-400">
                    <span className="flex items-center gap-1"><Clock size={12} /> {selectedRecipe.time}</span>
                    <span className="flex items-center gap-1"><ChefHat size={12} /> {selectedRecipe.difficulty}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-stone-500 text-xs leading-relaxed font-semibold">
                  {selectedRecipe.description}
                </p>

                {/* Ingredients & Steps split */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                  {/* Ingredients */}
                  <div className="md:col-span-2 space-y-3">
                    <h4 className="font-heading font-bold text-sm text-primary">Ingredients</h4>
                    <ul className="space-y-2 text-xs font-semibold text-stone-600 list-disc list-inside">
                      {selectedRecipe.ingredients.map((ing, idx) => (
                        <li key={idx} className="leading-tight">{ing}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Steps */}
                  <div className="md:col-span-3 space-y-3">
                    <h4 className="font-heading font-bold text-sm text-primary">Instructions</h4>
                    <ol className="space-y-3 text-xs font-semibold text-stone-500 list-decimal list-inside">
                      {selectedRecipe.steps.map((step, idx) => (
                        <li key={idx} className="leading-normal pl-1.5"><span className="text-stone-700 font-bold ml-1">{step}</span></li>
                      ))}
                    </ol>
                  </div>
                </div>

                {/* CTA Box */}
                <div className="bg-stone-50 border border-stone-100 p-5 rounded-3xl flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white rounded-xl overflow-hidden flex items-center justify-center p-2 border border-stone-100 shrink-0">
                      <img src={getProductImage(selectedRecipe.productId)} alt={selectedRecipe.productName} className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <span className="text-[8px] text-stone-400 label-tech block">REQUIRES</span>
                      <h4 className="font-heading font-bold text-xs text-primary">{selectedRecipe.productName}</h4>
                    </div>
                  </div>

                  <button
                    onClick={() => handleAddIngredient(selectedRecipe.productId, selectedRecipe.productName)}
                    className="btn-terracotta px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 label-tech cursor-pointer"
                  >
                    <ShoppingBag size={12} /> ADD INGREDIENT
                  </button>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default Recipes;
