// Auto-discover all image files in the products folder (JPG, PNG, WebP)
// This never fails — it just picks up whatever exists on disk.
const imageModules = import.meta.glob(
  '../assets/products/*.{jpg,jpeg,png,webp}',
  { eager: true, import: 'default' }
);

// Build a lookup: filename (without extension) → resolved image URL
const imageMap = {};
for (const [path, url] of Object.entries(imageModules)) {
  const filename = path.split('/').pop().replace(/\.[^.]+$/, '');
  imageMap[filename] = url;
}

const productProfiles = [
  {
    match: ['mango-powder'],
    imageKey: 'mango-powder',
    ingredient: 'mango',
    ingredientColor: '#67A649',
    ingredientAccent: '#E8F4CF',
    powderColor: '#AD7A3C'
  },
  {
    match: ['amla-powder'],
    imageKey: 'amla-powder',
    ingredient: 'amla',
    ingredientColor: '#7DBB4F',
    ingredientAccent: '#E4F5BD',
    powderColor: '#9D8A4D'
  },
  {
    match: ['beetroot-powder'],
    imageKey: 'beetroot-powder',
    ingredient: 'beetroot',
    ingredientColor: '#A0163D',
    ingredientAccent: '#DE5A7A',
    powderColor: '#C55A89'
  },
  {
    match: ['carrot-powder'],
    imageKey: 'carrot-powder',
    ingredient: 'carrot',
    ingredientColor: '#E5792C',
    ingredientAccent: '#FFD6A8',
    powderColor: '#D0702E'
  },
  {
    match: ['castor-seed-extract'],
    imageKey: 'castor-seed-extract',
    ingredient: 'castor',
    ingredientColor: '#6B4B3E',
    ingredientAccent: '#BA9582',
    powderColor: '#8A6B58'
  },
  {
    match: ['onion-flakes'],
    imageKey: 'onion-flakes',
    ingredient: 'onion',
    ingredientColor: '#B08C67',
    ingredientAccent: '#EBD9BE',
    powderColor: '#D4B789'
  },
  {
    match: ['mango-seed-powder', 'kernel'],
    imageKey: 'mango-seed-powder',
    ingredient: 'kernel',
    ingredientColor: '#8B6A46',
    ingredientAccent: '#D9BF92',
    powderColor: '#B49162'
  },
  {
    match: ['moringa-powder'],
    imageKey: 'moringa-powder',
    ingredient: 'moringa-leaf',
    ingredientColor: '#3D8B4E',
    ingredientAccent: '#BFE4B7',
    powderColor: '#4E8A49'
  },
  {
    match: ['spinach-powder'],
    imageKey: 'spinach-powder',
    ingredient: 'spinach-leaf',
    ingredientColor: '#2D7A3F',
    ingredientAccent: '#B8E2B5',
    powderColor: '#3A6B41'
  },
  {
    match: ['neem-seed-powder'],
    imageKey: 'neem-seed-powder',
    ingredient: 'neem-seed',
    ingredientColor: '#648545',
    ingredientAccent: '#C6DEA5',
    powderColor: '#758A55'
  },
  {
    match: ['tamarind-seed-powder'],
    imageKey: 'tamarind-seed-powder',
    ingredient: 'tamarind-seed',
    ingredientColor: '#67422E',
    ingredientAccent: '#BC8A65',
    powderColor: '#7B5034'
  },
  {
    match: ['tomato-powder'],
    imageKey: 'tomato-powder',
    ingredient: 'tomato',
    ingredientColor: '#D94436',
    ingredientAccent: '#F6AF9E',
    powderColor: '#C93629'
  },
  {
    match: ['coconut-milk-powder'],
    imageKey: 'coconut-milk-powder',
    ingredient: 'coconut',
    ingredientColor: '#7B5D43',
    ingredientAccent: '#F8F5EE',
    powderColor: '#F5ECE0'
  },
  {
    match: ['millet-husk-mulch'],
    imageKey: 'millet-husk-mulch',
    ingredient: 'millet-mulch',
    ingredientColor: '#A88D57',
    ingredientAccent: '#DCCB97',
    powderColor: '#A88D57'
  },
  {
    match: ['cotton-stalk-biochar'],
    imageKey: 'cotton-stalk-biochar',
    ingredient: 'cotton-biochar',
    ingredientColor: '#202020',
    ingredientAccent: '#8B7355',
    powderColor: '#1A1A1A'
  }
];

const getProfile = (id) => {
  return productProfiles.find((profile) => profile.match.some((token) => id.includes(token))) || {
    imageKey: '',
    ingredient: 'default-seed',
    ingredientColor: '#6E8C56',
    ingredientAccent: '#D7E6C2',
    powderColor: '#9FB687'
  };
};

const ingredientMarkup = (profile) => {
  switch (profile.ingredient) {
    case 'moringa-leaf':
      return `
        <!-- Main Stem -->
        <path d="M22 68 C 24 55, 30 40, 42 22" fill="none" stroke="#2c5e3b" stroke-width="1.8" stroke-linecap="round" />
        <!-- Leaflets grouped in pinnate structure -->
        <ellipse cx="42" cy="22" rx="4" ry="7" fill="#3D8B4E" transform="rotate(28 42 22)" />
        <ellipse cx="37" cy="31" rx="5" ry="8" fill="#4fa762" transform="rotate(-30 37 31)" />
        <ellipse cx="44" cy="35" rx="5" ry="8" fill="#3D8B4E" transform="rotate(40 44 35)" />
        <ellipse cx="32" cy="44" rx="6" ry="9.5" fill="#4fa762" transform="rotate(-40 32 44)" />
        <ellipse cx="41" cy="48" rx="6" ry="9.5" fill="#3D8B4E" transform="rotate(35 41 48)" />
        <!-- Leaflet Vein Indicators -->
        <path d="M37 31 L34 32 M44 35 L47 34 M32 44 L28 45 M41 48 L45 47" stroke="#9ee3a7" stroke-width="0.5" opacity="0.6" />
      `;
    case 'spinach-leaf':
      return `
        <!-- Broad Spinach Leaf -->
        <path d="M20 62 C22 45, 28 32, 42 26 C52 32, 55 45, 52 56 C48 64, 38 68, 20 62 Z" fill="#2D7A3F" stroke="#1d592a" stroke-width="0.8" />
        <!-- Leaf Veins -->
        <path d="M20 62 Q34 47 42 26" stroke="#5db772" stroke-width="1.5" fill="none" opacity="0.8" />
        <path d="M28 53 Q36 49 46 48" stroke="#5db772" stroke-width="0.8" fill="none" opacity="0.6" />
        <path d="M32 45 Q38 41 48 37" stroke="#5db772" stroke-width="0.8" fill="none" opacity="0.6" />
        <path d="M36 36 Q40 34 46 30" stroke="#5db772" stroke-width="0.8" fill="none" opacity="0.6" />
      `;
    case 'neem-seed':
      return `
        <!-- Background Neem Leaves -->
        <path d="M16 48 C 22 42, 34 38, 48 38 C 42 46, 32 48, 16 48 Z" fill="#4A752C" transform="rotate(-15 16 48)" />
        <!-- Neem Seeds & Kernels -->
        <ellipse cx="32" cy="54" rx="7" ry="11" fill="#7FA043" transform="rotate(20 32 54)" />
        <ellipse cx="44" cy="48" rx="6" ry="10" fill="#90B24F" transform="rotate(-30 44 48)" />
        <ellipse cx="50" cy="56" rx="6.5" ry="10.5" fill="#7FA043" transform="rotate(10 50 56)" />
      `;
    case 'tamarind-seed':
      return `
        <!-- Cracked Tamarind Pod -->
        <path d="M16 40 C 25 36, 35 48, 48 44 C 44 54, 32 50, 16 40 Z" fill="#8B5A2B" stroke="#5C3A21" stroke-width="1" />
        <!-- Roasted Seeds inside -->
        <rect x="22" y="42" width="8" height="8" rx="2" fill="#3D1D0F" transform="rotate(12 22 42)" />
        <rect x="34" y="44" width="7.5" height="7.5" rx="2" fill="#4A2711" transform="rotate(-8 34 44)" />
        <rect x="44" y="41" width="8" height="8" rx="2" fill="#3D1D0F" transform="rotate(25 44 41)" />
      `;
    case 'kernel':
      return `
        <!-- Raw Mango Kernels -->
        <ellipse cx="30" cy="52" rx="14" ry="8" fill="#D2B48C" stroke="#8B5A2B" stroke-width="0.8" transform="rotate(-15 30 52)" />
        <ellipse cx="30" cy="52" rx="11" ry="6" fill="#F5DEB3" transform="rotate(-15 30 52)" />
        <ellipse cx="45" cy="46" rx="13" ry="7.5" fill="#CD853F" stroke="#5C3A21" stroke-width="0.8" transform="rotate(20 45 46)" />
        <ellipse cx="45" cy="46" rx="10.5" ry="5.5" fill="#FFE4B5" transform="rotate(20 45 46)" />
      `;
    case 'tomato':
      return `
        <!-- Glossy Red Tomato -->
        <circle cx="36" cy="48" r="16" fill="#D94436" />
        <circle cx="32" cy="44" r="14" fill="#E65547" />
        <!-- Gloss Highlight -->
        <ellipse cx="28" cy="38" rx="4" ry="2" fill="#ffffff" opacity="0.65" transform="rotate(-30 28 38)" />
        <!-- Crown Sepals -->
        <path d="M36 32 L34 26 L36 30 L40 25 L38 31 L44 28 L39 33 L41 36 L37 34 L35 38 L35 33 Z" fill="#3E7C32" />
      `;
    case 'coconut':
      return `
        <!-- Half Coconut Shell -->
        <ellipse cx="35" cy="48" rx="17" ry="14" fill="#5C3A21" transform="rotate(-10 35 48)" />
        <ellipse cx="35" cy="48" rx="14.5" ry="11.5" fill="#ffffff" transform="rotate(-10 35 48)" />
        <ellipse cx="35" cy="48" rx="12" ry="9.5" fill="#fcfcf9" transform="rotate(-10 35 48)" />
        <circle cx="35" cy="48" r="3" fill="#FAF5EE" opacity="0.3" />
      `;
    case 'millet-mulch':
      return `
        <!-- Detailed Millet Husk Mulch Straw pile -->
        <path d="M12 60 Q34 40 56 60 Q40 45 12 60 Z" fill="#CBB682" stroke="#8B7355" stroke-width="0.5" />
        <path d="M15 58 L28 48 M22 55 L35 46 M30 52 L45 44 M38 54 L50 48" stroke="#8B7355" stroke-width="1.2" opacity="0.8" />
        <path d="M18 52 L32 50 M25 48 L40 48 M32 46 L48 48" stroke="#EEDC82" stroke-width="0.8" />
      `;
    case 'cotton-biochar':
      return `
        <!-- Black porous charcoal pieces with geometric highlights -->
        <path d="M16 62 L26 44 L38 52 L32 64 Z" fill="#1C1C1C" stroke="#333333" stroke-width="0.5" />
        <path d="M26 44 L38 52 L42 42 L30 38 Z" fill="#2E2E2E" />
        <path d="M32 64 L38 52 L52 56 L46 68 Z" fill="#121212" />
        <path d="M26 44 L38 52" stroke="#555555" stroke-width="0.8" />
        <path d="M38 52 L32 64" stroke="#444444" stroke-width="0.8" />
        <!-- Raw cotton stalks -->
        <line x1="12" y1="35" x2="30" y2="28" stroke="#8B7355" stroke-width="2" stroke-linecap="round" />
        <line x1="28" y1="28" x2="48" y2="24" stroke="#A0522D" stroke-width="1.5" stroke-linecap="round" />
      `;
    default:
      return `
        <ellipse cx="36" cy="48" rx="18" ry="12" fill="${profile.ingredientColor}" />
        <ellipse cx="47" cy="45" rx="16" ry="10" fill="${profile.ingredientAccent}" />
      `;
  }
};

export const getProductImage = (productId) => {
  const id = (productId || '').toLowerCase();
  const profile = getProfile(id);

  // Check if a static image file exists for this product
  const staticImage = imageMap[profile.imageKey];
  if (staticImage) {
    return staticImage;
  }

  // Otherwise, render a high-fidelity organic layout SVG:
  // - White background
  // - Ingredient occupies 70%
  // - 3D rustic wooden bowl of powder occupies 30%
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <defs>
        <filter id="shadow-${id}" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000" flood-opacity="0.18" />
        </filter>
        <filter id="soft-${id}" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="1.2" stdDeviation="1.5" flood-color="#000" flood-opacity="0.12" />
        </filter>
        <linearGradient id="powder-${id}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${profile.powderColor}" />
          <stop offset="60%" stop-color="${profile.powderColor}" />
          <stop offset="100%" stop-color="#ffffff" stop-opacity="0.3" />
        </linearGradient>
      </defs>

      <!-- Clean White Background (1:1 Square) -->
      <rect width="100" height="100" fill="#ffffff" />

      <!-- Natural soft shadows below elements -->
      <ellipse cx="36" cy="65" rx="22" ry="5" fill="#000" fill-opacity="0.06" filter="url(#soft-${id})" />
      <ellipse cx="74" cy="76" rx="15" ry="4" fill="#000" fill-opacity="0.15" filter="url(#soft-${id})" />

      <!-- 1. Fresh Sourced Ingredient (70% space) -->
      <g filter="url(#soft-${id})">
        ${ingredientMarkup(profile)}
      </g>

      <!-- 2. Premium 3D Wood Bowl of Ground Powder (30% space) -->
      <g filter="url(#shadow-${id})">
        <!-- Outer Dark Wood Rim -->
        <ellipse cx="74" cy="74" rx="19" ry="14" fill="#8B5A2B" stroke="#5C3A21" stroke-width="0.8" />
        <!-- Inner Warm Wood Bowl -->
        <ellipse cx="74" cy="73.5" rx="16.5" ry="11.5" fill="#CD853F" />
        <!-- Wood grain details -->
        <ellipse cx="74" cy="73.5" rx="14" ry="9" fill="none" stroke="#8B5A2B" stroke-width="0.5" stroke-dasharray="3 7" opacity="0.3" />
        
        <!-- Heap of Ground Powder -->
        <path d="M59 73 C65 55, 83 55, 89 73 Z" fill="url(#powder-${id})" />
        
        <!-- Subtle highlights on powder heap -->
        <ellipse cx="70" cy="64" rx="3" ry="1.5" fill="#ffffff" opacity="0.15" />
      </g>
    </svg>
  `;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};
