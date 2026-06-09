import React, { createContext, useContext, useState } from 'react';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([
    {
      id: 'moringa-powder',
      name: 'Moringa Leaf Powder',
      price: '₹550 / kg',
      category: 'Leaf & Soft Dry',
      description: 'Stabilized within 4 hours of harvest to lock in maximum mineral and vitamin content.',
      phase: 'Stabilized',
      farmerId: 'AC-F-0001',
      isHighImpact: true,
      uses: 'Add 1 tsp to smoothies, juices, morning teas, lentil soups, or bread doughs daily.',
      benefits: 'Rich in Iron, Calcium, Vitamins A, C, and E. Improves stamina, bone density, and immunity.',
      processingNote: 'Decentralized farm-gate low-temperature solar dehydration. Leaf moisture maintained below 5%.',
      availabilityNote: 'Year-round active harvesting',
      stockQty: 850
    },
    {
      id: 'tomato-powder',
      name: 'Tomato Powder',
      price: '₹850 / kg',
      category: 'Vegetable Powders',
      description: 'Converting surplus crop gluts during price crashes into high-value stable powder.',
      phase: 'Eco-Safe',
      farmerId: 'AC-F-0002',
      isHighImpact: true,
      uses: 'Ideal for instant pasta sauces, curry bases, dry seasonings, soups, and marinades.',
      benefits: 'High concentration of Lycopene (antioxidant), Vitamin C, and Potassium. Lowers heart disease risk.',
      processingNote: 'Harvested at peak red ripeness. Flash dried to capture sweet, rich umami flavor profile.',
      availabilityNote: 'Peak harvest: Dec to April',
      stockQty: 1200
    },
    {
      id: 'mango-powder',
      name: 'Amchur Mango Powder',
      price: '₹1,100 / kg',
      category: 'Fruit Powders',
      description: 'Short intense summer harvest mangoes dehydration standard.',
      phase: 'Dehydrated',
      farmerId: 'AC-F-0003',
      isHighImpact: false,
      uses: 'A key souring agent in Indian curries, stir-fries, spice rubs, and street food dishes like chat masala.',
      benefits: 'Digestive aid, rich in Vitamins A, C, and D. Stimulates enzymes for healthy nutrient absorption.',
      processingNote: 'Peeled, sun-dried sliced raw green mangoes, ground to a fine, tangy powder format.',
      availabilityNote: 'Summer harvest: May to July',
      stockQty: 420
    },
    {
      id: 'beetroot-powder',
      name: 'Beetroot Powder',
      price: '₹750 / kg',
      category: 'Vegetable Powders',
      description: 'Fresh organic beetroots, dehydrated and ground to preserve natural sweetness and deep color.',
      phase: 'Stabilized',
      farmerId: 'AC-F-0004',
      isHighImpact: false,
      uses: 'Excellent as natural red food coloring, in pre-workout juices, baking batters, and raitas.',
      benefits: 'Improves blood circulation and lowers blood pressure due to high dietary nitrates. Boosts oxygen delivery.',
      processingNote: 'Gentle convective warm air drying prevents thermal degradation of natural betalain pigments.',
      availabilityNote: 'Winter harvest focus: Nov to March',
      stockQty: 600
    },
    {
      id: 'spinach-powder',
      name: 'Spinach Powder',
      price: '₹680 / kg',
      category: 'Leaf & Soft Dry',
      description: 'Concentrated spinach extract sourced from local farms in Yadadri district.',
      phase: 'Stabilized',
      farmerId: 'AC-F-0005',
      isHighImpact: false,
      uses: 'Mix into chapati flour, cream soup bases, pesto sauces, and kid-friendly green purees.',
      benefits: 'Contains high amounts of folate, iron, and dietary fibers. Excellent for detoxification and digestion.',
      processingNote: 'Blanched briefly for color preservation before entering a low-moisture collection dryer.',
      availabilityNote: 'Year-round except heavy monsoon',
      stockQty: 500
    },
    {
      id: 'tamarind-seed-powder',
      name: 'Tamarind Seed Powder',
      price: '₹480 / kg',
      category: 'Seed Products',
      description: 'High-binding starch powder from de-hulled tamarind seeds, useful for culinary and industrial thickeners.',
      phase: 'Eco-Safe',
      farmerId: 'AC-F-0006',
      isHighImpact: true,
      uses: 'Used as an egg substitute in baking, a natural thickening agent for sauces, and a binder in pharmaceutical pills.',
      benefits: 'High protein and complex carbohydrates. Suppresses glucose spikes and acts as a joint lubricant.',
      processingNote: 'Roasted, decorticated (de-hulled), and pulverized under high pressure to ensure standard mesh size.',
      availabilityNote: 'Annual collection: April to June',
      stockQty: 1800
    },
    {
      id: 'mango-seed-powder',
      name: 'Mango Kernel Seed Powder',
      price: '₹600 / kg',
      category: 'Seed Products',
      description: 'Upcycled green mango seed kernels, dry ground. High in polyphenols.',
      phase: 'Dehydrated',
      farmerId: 'AC-F-0003',
      isHighImpact: true,
      uses: 'Used in traditional hair packs, cosmetic formulations, and health drinks targeting metabolic wellness.',
      benefits: 'Anti-inflammatory, anti-parasitic, and rich in essential fatty acids. Lowers LDL cholesterol.',
      processingNote: 'Kernels extracted from processed mango pulp lines, washed, sun dried, and milled to 100 mesh.',
      availabilityNote: 'Post-juice season: June to August',
      stockQty: 950
    },
    {
      id: 'carrot-powder',
      name: 'Carrot Powder',
      price: '₹820 / kg',
      category: 'Vegetable Powders',
      description: 'Upcycled surplus carrots converted into bright orange nutrient-rich food ingredient.',
      phase: 'Stabilized',
      farmerId: 'AC-F-0007',
      isHighImpact: false,
      uses: 'Add to baby foods, instant soups, smoothies, carrot cakes, and pet nutrition mixes.',
      benefits: 'Extremely high Beta-Carotene (Vitamin A precursor) for eye health. Supports skin glowing indices.',
      processingNote: 'Dehydrated in clean air loops to retain beta-carotene and natural sugars without chemical additives.',
      availabilityNote: 'Peak harvest: Jan to April',
      stockQty: 750
    },
    {
      id: 'onion-flakes',
      name: 'Dehydrated Onion Flakes',
      price: '₹400 / kg',
      category: 'Leaf & Soft Dry',
      description: 'Golden crispy dehydrated red onion flakes. Solves harvest glut waste.',
      phase: 'Eco-Safe',
      farmerId: 'AC-F-0008',
      isHighImpact: true,
      uses: 'Used directly in spice mixes, instant cup noodles, stir-fries, and gravies. Rehydrates in 2 minutes.',
      benefits: 'High in organosulfur compounds and flavonoids. Acts as a natural preservative and heart tonic.',
      processingNote: 'Onions peeled, sliced uniformly, and dried in low-heat multi-stage conveyor ovens.',
      availabilityNote: 'Year-round active cycles',
      stockQty: 2500
    },
    {
      id: 'amla-powder',
      name: 'Amla (Gooseberry) Powder',
      price: '₹980 / kg',
      category: 'Fruit Powders',
      description: 'Sourced from organic orchards, stabilized to preserve vitamin C potency.',
      phase: 'Stabilized',
      farmerId: 'AC-F-0002',
      isHighImpact: false,
      uses: 'Mix in lukewarm water, add to hair masks, or sprinkle on fresh fruit salads.',
      benefits: 'World\'s richest organic source of Vitamin C. Boosts collagen, rejuvenates hair, and strengthens gut barrier.',
      processingNote: 'Deseeded amla pieces dehydrated in solar thermal chambers to avoid high-heat nutrient loss.',
      availabilityNote: 'Winter harvest: Dec to Feb',
      stockQty: 800
    },
    {
      id: 'coconut-milk-powder',
      name: 'Vegan Coconut Milk Powder',
      price: '₹1,200 / kg',
      category: 'Fruit Powders',
      description: 'Spray-dried natural coconut milk. Zero lactose, zero artificial emulsifiers.',
      phase: 'Stabilized',
      farmerId: 'AC-F-0004',
      isHighImpact: false,
      uses: 'Dissolve in water to make instant coconut milk. Used in vegan baking, curries, and smoothies.',
      benefits: 'Rich in Medium Chain Triglycerides (MCTs) which provide quick, clean energy to brain cells.',
      processingNote: 'Fresh coconut meat squeezed, filtered, and flash spray-dried at low temperature to protect lipids.',
      availabilityNote: 'Year-round tropical collection',
      stockQty: 550
    },
    {
      id: 'castor-seed-extract',
      name: 'Castor Seed Oil Extraction grade',
      price: '₹350 / kg',
      category: 'Oil Extraction',
      description: 'High oil yield castor seeds sourced from drought-resilient farms in Nalgonda.',
      phase: 'Eco-Safe',
      farmerId: 'AC-F-0006',
      isHighImpact: true,
      uses: 'Premium raw material for cold-press castor oil production and industrial lubricant synthesis.',
      benefits: 'Contains 48% oil content with high ricinoleic acid composition, making it a powerful therapeutic oil.',
      processingNote: 'Decorticated and sorted by density to remove immature seeds, ensuring optimal extraction yields.',
      availabilityNote: 'Dry season harvest: March to May',
      stockQty: 4000
    },
    {
      id: 'neem-seed-powder',
      name: 'Neem Kernel Seed Powder',
      price: '₹280 / kg',
      category: 'Seed Products',
      description: 'Pure organic neem seed kernel powder, specialized for bio-pesticide and soil fertilizers.',
      phase: 'Eco-Safe',
      farmerId: 'AC-F-0005',
      isHighImpact: false,
      uses: 'Mix into farming soil to prevent root nematodes, or dilute in water as an organic leaf insecticide spray.',
      benefits: 'Azadirachtin content > 3000 ppm. Natural antimicrobial and pesticide, harmless to beneficial earthworms.',
      processingNote: 'Seeds collected from village trees, dried, shelled, and cold-milled to retain active azadirachtin.',
      availabilityNote: 'Monsoon harvest: July to Sept',
      stockQty: 3000
    },
    {
      id: 'millet-husk-mulch',
      name: 'Organic Millet Husk Mulch',
      price: '₹120 / kg',
      category: 'Biomass & Waste',
      description: 'Dry upcycled millet de-husking residues. Superb soil moisture retainer.',
      phase: 'Dehydrated',
      farmerId: 'AC-F-0001',
      isHighImpact: true,
      uses: 'Spread a 1-inch layer over crop beds to prevent weed growth and conserve 50% watering requirements.',
      benefits: 'High silica content. Slowly decomposes to enrich the soil with minerals while maintaining moisture structure.',
      processingNote: 'Millet milling residues collected, heat-treated to kill weed seeds, and compressed into breathable sacks.',
      availabilityNote: 'Post-milling: Oct to Dec',
      stockQty: 8000
    },
    {
      id: 'cotton-stalk-biochar',
      name: 'Upcycled Cotton Stalk Biochar',
      price: '₹150 / kg',
      category: 'Biomass & Waste',
      description: 'Pyrolyzed cotton stalk residues. Prevents field stubble burning carbon emissions.',
      phase: 'Eco-Safe',
      farmerId: 'AC-F-0008',
      isHighImpact: true,
      uses: 'Blend with compost to inoculate and improve carbon content in sandy or degraded agricultural fields.',
      benefits: 'Extremely porous carbon structure. Locks carbon permanently in soil, creating a haven for soil microbes.',
      processingNote: 'Harvested cotton stalks pyrolyzed at 550°C in oxygen-free ovens, avoiding smoke emission.',
      availabilityNote: 'Post-cotton harvest: Feb to April',
      stockQty: 10000
    }
  ]);

  const addProduct = (newProd) => {
    const newId = newProd.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const fullProd = {
      ...newProd,
      id: newId,
      farmerId: newProd.farmerId || 'AC-F-0001', // fallback
      stockQty: newProd.stockQty || 500,
      uses: newProd.uses || 'Culinary and nutrition blends.',
      benefits: newProd.benefits || 'High organic dietary elements.',
      availabilityNote: newProd.isYearRound ? 'Year-round active cycles' : 'Seasonal peak harvest',
      phase: newProd.isNowProcessing ? 'Stabilized' : 'Paused'
    };
    setProducts((prev) => [...prev, fullProd]);
  };

  const updateProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const refreshProducts = () => {
    console.log("Product inventory refreshed from blockchain ledger.");
  };

  const getProductById = (id) => {
    return products.find((p) => p.id === id);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        refreshProducts,
        getProductById
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
