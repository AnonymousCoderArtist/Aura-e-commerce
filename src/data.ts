import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'chronometer',
    name: 'Onyx Chronometer',
    subtitle: 'Series 01 Titanium Automatic Timepiece',
    category: 'Horology',
    price: 1850.00,
    discountPrice: 1690.00,
    rating: 4.9,
    gradient3D: 'from-slate-900 via-neutral-800 to-stone-900',
    tag: 'Limited Edition',
    description: 'An elegant statement of micro-engineering. Sandblasted from aerospace-grade Grade 5 Titanium other-world casing, operating with a high-beat automatic movement and an anti-reflective double-curved sapphire dome. Styled with a rich, hand-stitched grain leather calf strap.',
    images: [
      '/src/assets/images/onyx_chronometer_1780731184999.png',
      'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Sable Titanium', hex: '#1c1d1f' },
      { name: 'Brushed Platinum', hex: '#cfd2d6' },
      { name: 'Raw Aurum', hex: '#e6c891' }
    ],
    sizes: ['40mm', '42mm'],
    stock: 7,
    features: [
      'Genuine Japanese Calibre 9015 Automatic Movement',
      'Sandblasted aerospace-grade titanium frame',
      'Anti-reflective, scratch-resistant sapphire glass',
      '50m water-resistant high-gasket seal',
      '52-hour reserve continuous power tracking'
    ],
    specifications: [
      { label: 'Bezel Material', value: 'Grade 5 Titanium' },
      { label: 'Movement', value: 'Automatic Self-Winding' },
      { label: 'Power Reserve', value: '52 Hours' },
      { label: 'Straps Included', value: 'Onyx Leather & Titanium Mesh' },
      { label: 'Case Thickness', value: '11.4mm' }
    ],
    reviews: [
      {
        id: 'rev-1',
        author: 'Evelyn V.',
        rating: 5,
        date: '2026-05-18',
        comment: 'Stunning piece of micro-engineering. The titanium sandblast catches light in an incredibly subtle way. Exquisite craftsmanship.',
        isVerified: true
      },
      {
        id: 'rev-2',
        author: 'Julian K.',
        rating: 5,
        date: '2026-05-02',
        comment: 'Absolute masterpiece. Works with incredible precision. The sweep of the gold second hand is mesmerizing.',
        isVerified: true
      },
      {
        id: 'rev-3',
        author: 'Marcus S.',
        rating: 4,
        date: '2026-04-12',
        comment: 'A bit light on the hand due to the titanium build but feels beautifully balanced. Design is highly architectural.',
        isVerified: true
      }
    ]
  },
  {
    id: 'speaker',
    name: 'Aether Dome Speaker',
    subtitle: 'Omnidirectional Audiophile Acoustic Sphere',
    category: 'Audio',
    price: 890.00,
    rating: 4.8,
    gradient3D: 'from-zinc-800 via-neutral-900 to-zinc-950',
    tag: 'Acoustic Core',
    description: 'An acoustic marvel that fills space not with directions, but with presence. Engineered using a spherical direct-radiating tweeter and dynamic long-throw woofers encased in a spun architectural steel dome, layered with premium acoustics-permeable wool cloth.',
    images: [
      '/src/assets/images/aether_speaker_1780731202682.png',
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1518444065439-e933c06ceb1f?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Glacier Silver', hex: '#eceef2' },
      { name: 'Nordic Charcoal', hex: '#26282b' }
    ],
    stock: 12,
    features: [
      '360° omnidirectional high-fidelity sonic stage',
      'Spun aerospace aluminum frame',
      'Eco-certified acoustic wool wrapping',
      'Ultra-fast Lossless Wi-Fi & Bluetooth 5.3 streaming',
      'Intelligent active ambient bass room correction'
    ],
    specifications: [
      { label: 'Frequency Range', value: '32Hz - 25kHz' },
      { label: 'Drivers', value: '1x 6.5" Woofer, 3x 1.5" Tweeters' },
      { label: 'Amplification', value: '120W Class D High-Efficiency' },
      { label: 'Dimensions', value: '240mm diameter sphere' },
      { label: 'Weight', value: '4.8 kg' }
    ],
    reviews: [
      {
        id: 'rev-4',
        author: 'Soren L.',
        rating: 5,
        date: '2026-05-29',
        comment: 'The dome acoustics fill my loft completely. The knit wool cover feels warm and luxuriously tactile to the touch.',
        isVerified: true
      },
      {
        id: 'rev-5',
        author: 'Elena R.',
        rating: 4,
        date: '2026-05-15',
        comment: 'Crisp transients and clean, non-bloated bass representation. Highly recommended for minimalist modern spaces.',
        isVerified: true
      }
    ]
  },
  {
    id: 'lamp',
    name: 'Brutalist Prism Light',
    subtitle: 'Sculptural Basalt & Refractive Dome Light',
    category: 'Licht',
    price: 640.00,
    rating: 5.0,
    gradient3D: 'from-amber-950 via-stone-900 to-neutral-950',
    tag: 'Sculptural',
    description: 'A physical dialogue between raw geological monoliths and pure optic geometry. Each light bases upon an individually split basalt stone segment, paired with a solid, optical-grade crystal block diffuser that refracts warm golden-hued glow into organic patterns.',
    images: [
      '/src/assets/images/brutalist_lamp_1780731217521.png',
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Basalt Obsidian', hex: '#161719' },
      { name: 'Oat Sandstone', hex: '#ccc7ba' }
    ],
    stock: 4,
    features: [
      'Individually sourced split volcanic slab base',
      'Pure clear optical light refraction glass dome',
      'Capacitive touch metal touch plate for dimming',
      'Proportional dimming control (10% - 100%)',
      'Calibrated warm-temperature LEDs (2200K - 2700K)'
    ],
    specifications: [
      { label: 'Base Material', value: 'Hand-Cut Polish Basalt Stone' },
      { label: 'Diffuser', value: 'Solid High-Index Optic Crystal' },
      { label: 'Luminous Flux', value: '450 Lumens max' },
      { label: 'Interfacing', value: 'Invisible Capacitive Base Tap' },
      { label: 'Power Draw', value: '8W High efficiency' }
    ],
    reviews: [
      {
        id: 'rev-6',
        author: 'Clara M.',
        rating: 5,
        date: '2026-06-01',
        comment: 'Prismatic refraction is gorgeous at sunset. Heavy and substantial basalt feels centuries old. A perfect visual anchor.',
        isVerified: true
      }
    ]
  },
  {
    id: 'keyboard',
    name: 'Apex Core Keyboard',
    subtitle: 'High-Profile Modular Mechanical Instrument',
    category: 'Lifestyle',
    price: 495.00,
    discountPrice: 450.00,
    rating: 4.9,
    gradient3D: 'from-amber-900 via-neutral-900 to-teal-950',
    tag: 'Classic Pick',
    description: 'An acoustic instrument designed for the sensory writer. Features a seamless copper bottom weights plate, high-density customized gaskets, and lubricated custom-linear switches. Dressed in premium dual-tone PBT dye-sublimated retro cream keycaps.',
    images: [
      '/src/assets/images/apex_keyboard_1780731231262.png',
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Warm Retro Cream', hex: '#f0ede1' },
      { name: 'Nocturnal Moss', hex: '#2c3b36' },
      { name: 'Stealth Asphalt', hex: '#212224' }
    ],
    stock: 5,
    features: [
      'Gasket-mounted modular aluminum assembly',
      'Solid copper base resonance weight',
      'Hot-swappable tactile linear sound profile switches',
      'Bespoke thick dye-sublimated PBT retro keycaps',
      'Detachable aviator spiral-wound paracord USB-C cable'
    ],
    specifications: [
      { label: 'Layout', value: '75% Minimalist US Layout' },
      { label: 'Switch Type', value: 'Alpaca Linear v2 (Lubed)' },
      { label: 'Weight Element', value: '1.2kg Solid Copper plate' },
      { label: 'Connectivity', value: 'USB-C Coiled Aviator Cable' },
      { label: 'Mounting Style', value: 'Double Gasket Mount' }
    ],
    reviews: [
      {
        id: 'rev-7',
        author: 'Dorian P.',
        rating: 5,
        date: '2026-05-20',
        comment: 'The heavy brass/copper resonance base provides extremely satisfying, woody hollow vibrations. Typing feels like absolute poetry.',
        isVerified: true
      },
      {
        id: 'rev-8',
        author: 'Nadia T.',
        rating: 4.8,
        date: '2026-05-04',
        comment: 'Keycaps show incredible finish. Linear keys are silky smooth. Best premium design board I have ever owned.',
        isVerified: true
      }
    ]
  },
  {
    id: 'glasses',
    name: 'Spectra Air Glasses',
    subtitle: 'Sartorial Aerodynamic Bio-Carbon Frame',
    category: 'Lifestyle',
    price: 320.00,
    rating: 4.7,
    gradient3D: 'from-blue-950 via-slate-900 to-zinc-950',
    tag: 'New Season',
    description: 'Extravagantly light eyewear designed for physical performance and visual precision. Tailored from a carbon-neutral bio-based graphite frame and armed with polarization-calibrated lenses that dramatically boost red, green, and contrast levels.',
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Jet Carbon', hex: '#000000' },
      { name: 'Crystal Moss', hex: '#4d5d53' },
      { name: 'Tortoise Umber', hex: '#7a5a40' }
    ],
    stock: 15,
    features: [
      'Ultra-featherweight 18g bio-carbon frame',
      'Polarized high-definition light filtration lenses',
      'Anti-fog, hydrophobic water-bead coating',
      'Surgical-grade titanium dual-action joints',
      'Fully recyclable biological protective travel case'
    ],
    specifications: [
      { label: 'Lenses', value: 'Zeiss Carbon polarized contrast' },
      { label: 'UV Protection', value: '100% UVA/UVB protection' },
      { label: 'Frame weight', value: '18 grams' },
      { label: 'Temple Length', value: '142 mm' }
    ],
    reviews: [
      {
        id: 'rev-9',
        author: 'Aris G.',
        rating: 5,
        date: '2026-05-11',
        comment: 'Incredible clarity. Perfect for driving and bright water surfaces, yet looks elegant enough for executive dressing.',
        isVerified: true
      }
    ]
  },
  {
    id: 'vessel',
    name: 'Hydro-Vessel 01',
    subtitle: 'Vacuum-Insulated Faceted Tech Canteen',
    category: 'Lifestyle',
    price: 110.00,
    rating: 4.9,
    gradient3D: 'from-neutral-800 via-stone-850 to-neutral-900',
    tag: 'Essential Element',
    description: 'A structural canteen with geometric grip facets, engineered with triple-walled vacuum insulation keeping cold liquids chilled for 36 hours and warm coffee hot for 18 hours. Made from matte coarse-coated medical-grade stainless titanium-alloy steel.',
    images: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Raw Basalt Steel', hex: '#3e4042' },
      { name: 'Chalk White', hex: '#f2f3f5' },
      { name: 'Muted Gold', hex: '#b5a182' }
    ],
    stock: 30,
    features: [
      'Proprietary geometric non-slip faceted hold outline',
      'Triple-wall food grade medical stainless composition',
      'Double magnetic secure cap stow lock',
      'Cold retention 36 hours, Heat retention 18 hours',
      'Scratch-resistant micro-texture powder coat coat'
    ],
    specifications: [
      { label: 'Capacity', value: '620 ml (21 oz)' },
      { label: 'Insulation', value: 'Vacuum insulated triple-walled' },
      { label: 'Material', value: '18/8 Pro-Grade Stainless Steel' },
      { label: 'Cap lock', value: 'Double magnetic clip system' }
    ],
    reviews: [
      {
        id: 'rev-10',
        author: 'Leopold F.',
        rating: 5,
        date: '2026-06-03',
        comment: 'Keeps water icy cold even in desert warmth. The faceted design sits perfectly in car cup holders and looks incredibly high-end.',
        isVerified: true
      }
    ]
  }
];
