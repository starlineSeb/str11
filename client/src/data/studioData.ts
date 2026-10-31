export type StoryItem = {
  id: string;
  title: string;
  subtitle: string;
  category: "Editorial & Brand" | "Intimate Celebrations" | "Wild Landscapes" | "Studio & Objects";
  location: string;
  year: string;
  coverImage: string;
  galleryImages: string[];
  fieldNotes: string;
  details: {
    camera?: string;
    light?: string;
    season?: string;
    guests?: string;
  };
};

export type InvestmentTier = {
  id: string;
  name: string;
  tagline: string;
  price: string;
  featured?: boolean;
  coverage: string;
  inclusions: string[];
  recommendedFor: string;
};

export type FAQItem = {
  question: string;
  answer: string;
  category?: string;
};

export type FaqItem = FAQItem;

export type PressItem = {
  publication: string;
  quote: string;
  year: string;
};

export type ProcessStep = {
  number: string;
  phase: string;
  title: string;
  description: string;
};

export type TestimonialItem = {
  id: string;
  quote: string;
  client: string;
  celebration: string;
  location: string;
  image: string;
};

export type JournalArticle = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  date: string;
  readTime: string;
  coverImage: string;
  excerpt: string;
  content: string[];
};

export const studioStories: StoryItem[] = [
  {
    id: "high-sierra",
    title: "High Sierra Dusk",
    subtitle: "A silent twilight over granite water",
    category: "Wild Landscapes",
    location: "High Sierra, California",
    year: "2026",
    coverImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=1600&auto=format&fit=crop"
    ],
    fieldNotes: "Standing at the edge of the glacial shelf as the wind died down. The blue hour in the Sierra creates a cool gradient across the water that no studio light could ever manufacture. We waited for twenty minutes in total quiet just to catch the single breath of reflection before the stars surfaced.",
    details: {
      camera: "Medium Format Digital & 35mm Portra 400",
      light: "Natural Twilight / Blue Hour",
      season: "Late Autumn 2026"
    }
  },
  {
    id: "joshua-bloom",
    title: "Desert Wildflower Bloom",
    subtitle: "Golden hour textures across the Mojave",
    category: "Intimate Celebrations",
    location: "Joshua Tree, California",
    year: "2026",
    coverImage: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1600&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1600&auto=format&fit=crop"
    ],
    fieldNotes: "An intimate vow exchange tucked between ancient monzogranite boulders. The low desert sun carved gold edges around wild mustard blossoms. With just twelve guests, the dinner took place at a single long wooden table under open skies as lantern light took over from the sunset.",
    details: {
      camera: "Contax G2 & Leica M11",
      light: "Golden Backlight & Candlelight",
      season: "Spring 2026",
      guests: "12 Close Friends & Family"
    }
  },
  {
    id: "sunday-objects",
    title: "Sunday Objects & Linen",
    subtitle: "Still life studies of slow afternoon light",
    category: "Studio & Objects",
    location: "San Francisco Studio",
    year: "2026",
    coverImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=1600&auto=format&fit=crop"
    ],
    fieldNotes: "Explorations of form, texture, and organic vessels. We let raw afternoon sunlight rake across stone plinths and unbleached Belgian linen, celebrating the beauty of small, overlooked everyday rituals.",
    details: {
      camera: "Hasselblad 500C/M",
      light: "Window Natural Directional Light",
      season: "Summer 2026"
    }
  },
  {
    id: "santa-fe-adobe",
    title: "Shadows in the Adobe Corridor",
    subtitle: "Warm terra cotta walls and sharp shade",
    category: "Editorial & Brand",
    location: "Santa Fe, New Mexico",
    year: "2025",
    coverImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1600&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop"
    ],
    fieldNotes: "Editorial campaign photographed for an artisanal wool and ceramic studio. The warm earth tones of the historic adobe corridors provided the perfect grounding contrast against crisp minimalist silhouettes.",
    details: {
      camera: "35mm Kodak Tri-X 400 & Ektar 100",
      light: "Direct Sun & Ambient Bounce",
      season: "Autumn 2025"
    }
  },
  {
    id: "salt-flats-vastness",
    title: "The White Horizon",
    subtitle: "Minimalist geometry across salt and sky",
    category: "Wild Landscapes",
    location: "Bonneville Salt Flats, Utah",
    year: "2025",
    coverImage: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=1600&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1600&auto=format&fit=crop"
    ],
    fieldNotes: "Where the horizon dissolves completely into mirror reflections. We traveled before sunrise to capture the transition from indigo cold to shimmering desert pastel light.",
    details: {
      camera: "Medium Format GFX 100S",
      light: "Dawn Grazing Horizon Light",
      season: "Spring 2025"
    }
  },
  {
    id: "coastal-fog-passage",
    title: "Pacific Headlands",
    subtitle: "Salt spray, cypress trees, and coastal fog",
    category: "Intimate Celebrations",
    location: "Big Sur, California",
    year: "2026",
    coverImage: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1600&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1600&auto=format&fit=crop"
    ],
    fieldNotes: "Clifftop vows in the rolling ocean mist. The bride wore silk that fluttered with the offshore breeze while seven of their closest companions watched from a redwood bench above the Pacific crash.",
    details: {
      camera: "35mm Leica Summicron 35mm",
      light: "Oceanic Mist Diffused Light",
      season: "Summer 2026",
      guests: "7 Guests"
    }
  }
];

export const investmentTiers: InvestmentTier[] = [
  {
    id: "intimate",
    name: "The Intimate Story",
    tagline: "Tailored for micro-weddings, church ceremonies, and bespoke gatherings. Flexible custom options for every budget.",
    price: "$3,400",
    coverage: "Up to 6 Hours of Seamless Storytelling",
    inclusions: [
      "Full photographic or cinema coverage by Starline senior artist",
      "Curated high-resolution digital master gallery (400+ hand-finished frames)",
      "Full personal printing rights & archival digital downloads",
      "Custom timeline consultation & lighting roadmap",
      "Private online proofing gallery with archival print store",
      "Delivered within 4–6 weeks with 48-hour sneak preview"
    ],
    recommendedFor: "Couples desiring deep intimacy, zero fluff, and timeless documentary frames."
  },
  {
    id: "full-day",
    name: "Dual Atelier Signature (Photo + Video)",
    tagline: "Our premier comprehensive experience combining full-day photography, cinematic wedding film, and complimentary global live streaming.",
    price: "$5,200",
    featured: true,
    coverage: "Up to 9 Hours of Comprehensive Dual Coverage",
    inclusions: [
      "Lead artist + dedicated second photographer & cinematographer",
      "SPECIAL OFFER: Complimentary High-Definition Live Streaming Broadcast included",
      "Hybrid capture: 35mm Analog Film rolls + 4K Cinema + Medium Format Digital",
      "Curated gallery of 700+ hand-toned, timeless images + Full Feature Cinema Film",
      "Custom linen keepsake box containing 50 fine-art archival prints",
      "Complimentary golden-hour engagement or portrait session",
      "All travel expenses included within Dallas-Fort Worth & regional venues",
      "48-hour signature preview story deck"
    ],
    recommendedFor: "Those who want every laughter, whisper, landscape nuance, and celebration moment preserved without looking at the clock."
  },
  {
    id: "destination",
    name: "The Destination & Luxury Multi-Day",
    tagline: "Complete multi-day narrative for luxury destination celebrations, weekend voyages, and multi-ceremony heritage weddings.",
    price: "$7,800",
    coverage: "Two Days / Multi-Event Complete Story",
    inclusions: [
      "Welcome dinner / Sangeet / Rehearsal + Full Wedding Day & Reception coverage",
      "Dual-artist master team with unlimited 35mm film rolls & 4K cinema gear",
      "Complimentary Multi-Camera Global Live Streaming for international family",
      "1,000+ hand-crafted digital frames delivered in full resolution + Feature Film",
      "Custom 12x12 bespoke Italian-bound linen heirloom wedding album",
      "Full drone aerial topography & landscape environmental cinema",
      "Priority artisan delivery within 3 weeks"
    ],
    recommendedFor: "Destination & luxury heritage celebrations where the journey, culture, and loved ones are as central as the vow exchange."
  },
  {
    id: "editorial",
    name: "Editorial & Brand Commissions",
    tagline: "Art-directed imagery for design-led brands, architectural spaces, and lookbooks.",
    price: "From $2,200",
    coverage: "Half-Day or Full-Day Studio & Location Production",
    inclusions: [
      "Complete commercial usage & global digital licensing",
      "Collaborative creative direction, moodboarding & casting consultation",
      "Color grading matched to brand aesthetic guidelines",
      "High-resolution master files + web-optimized exports",
      "Tethered on-set live preview for art directors",
      "Studio or remote location coordination"
    ],
    recommendedFor: "Designers, publications, hoteliers, and luxury brands seeking soulful, organic aesthetics."
  }
];

export const experienceSteps = [
  {
    step: "01",
    title: "Connection & Vision",
    description: "We begin with an unhurried conversation about how you want your day to feel. No generic templates—we align on your energy, the light, and what matters most."
  },
  {
    step: "02",
    title: "Curating the Roadmap",
    description: "I assist with timeline design, golden-hour window alignment, location scouting, and subtle styling guidance so you can breathe easily when the day arrives."
  },
  {
    step: "03",
    title: "The Unhurried Day",
    description: "On the day of, I guide with a gentle hand when needed and step back to let real moments unfold. You will never feel rushed, posed into awkward stiffness, or managed."
  },
  {
    step: "04",
    title: "Heirloom Delivery",
    description: "Within 48 hours, you receive a curated sneak peek gallery. Your full hand-toned collection and custom archival print folios arrive ready to be cherished for decades."
  }
];

export const faqItems: FAQItem[] = [
  {
    question: "Why choose Starline Studios?",
    answer: "With over 35 years of experience and four generations of family craftsmanship, Starline combines deep artistic tradition, unhurried presence, and state-of-the-art cinema technology. We offer personalized service, an unobtrusive documentary eye, and flexible bespoke packages tailored to every celebration budget.",
    category: "Heritage & Vision"
  },
  {
    question: "Do you provide live streaming for our event?",
    answer: "Yes! High-definition digital live streaming is complimentary when you book both photography and videography packages together, allowing family, grandparents, and loved ones across the globe to experience your celebration in real time.",
    category: "Services & Privileges"
  },
  {
    question: "What is your approach on the wedding day?",
    answer: "We believe the best photographs and films occur when you feel completely present in your experience. We balance artful, editorial guidance during portrait sessions with an unobtrusive, documentary eye during the ceremony and reception so you can savor every second with your guests.",
    category: "Booking"
  },
  {
    question: "Do you travel for intimate weddings and destination sessions?",
    answer: "Absolutely. Over 60% of Starline stories are photographed outside of our home base in California. Travel within California, Utah, and Nevada is already included in our signature packages, and worldwide travel is quoted transparently with zero surprise fees.",
    category: "Travel & Weather"
  },
  {
    question: "How and when will we receive our photographs?",
    answer: "You will receive a curated 48-hour sneak peek gallery of 25–40 images right after your celebration. Full digital galleries are delivered within 4 to 6 weeks through a private, password-protected online store where you can download high-resolution and web files, share with family, and order fine art prints.",
    category: "Delivery & Prints"
  },
  {
    question: "Do you shoot film, digital, or both?",
    answer: "We shoot a hybrid approach! Medium format digital gives us exceptional dynamic range and precision in challenging low-light conditions, while 35mm and 120 analog film (Kodak Portra, Tri-X) provides that unmistakable creamy grain, skin tone depth, and timeless tactile feel.",
    category: "Booking"
  },
  {
    question: "How do we secure our date?",
    answer: "To ensure absolute dedication to every story, Starline only accepts a limited number of celebrations each year (maximum 20). Dates are reserved with a signed digital agreement and a 30% retainer. The remaining balance is split into flexible installments.",
    category: "Booking"
  }
];

export const pressQuotes: PressItem[] = [
  {
    publication: "Vogue Weddings",
    quote: "A master of atmospheric light. Starline captures weddings not as spectacles, but as living, breathing cinematic poetry.",
    year: "2025"
  },
  {
    publication: "Harper's Bazaar",
    quote: "Her 35mm film frames possess an unmistakable nostalgic richness—timeless images destined to become family treasures.",
    year: "2025"
  },
  {
    publication: "Over The Moon",
    quote: "The definitive lens for couples seeking unhurried, authentic visual artistry that defies fleeting trend cycles.",
    year: "2024"
  },
  {
    publication: "Kinfolk",
    quote: "Quiet, intentional, and profoundly moving. Starline redefines what it means to document an intimate gathering.",
    year: "2024"
  }
];

export const studioProcessSteps: ProcessStep[] = [
  {
    number: "01",
    phase: "The Introduction",
    title: "Connection & Alignment",
    description: "Every commission begins with an unhurried conversation. We listen to the rhythm of your plans, the setting, the light, and what matters most to your story."
  },
  {
    number: "02",
    phase: "The Preparation",
    title: "Artistic Direction",
    description: "We review lighting schedules, environmental nuances, and wardrobe tones to ensure documentary spontaneity flows naturally on the day."
  },
  {
    number: "03",
    phase: "The Gathering",
    title: "Unhurried Presence",
    description: "On the day, we move like observant guests. We blend gentle guidance during portraits with complete documentary invisibility during your celebration."
  },
  {
    number: "04",
    phase: "The Delivery",
    title: "Permanent Heirlooms",
    description: "You receive a curated 48-Hour Signature Preview Deck, followed by your full high-resolution digital master gallery, heirloom cinema film, and handcrafted linen print box."
  }
];

export const studioFaqs: FaqItem[] = [
  {
    question: "Why choose Starline Studios?",
    answer: "Starline Studios is a fourth-generation family-owned atelier with over 35 years of visual storytelling expertise. We unite generational craftsmanship, creative intuition, and state-of-the-art 4K cinema and 35mm analog film technology. We work attentively with each couple's vision to craft customized packages for every celebration budget."
  },
  {
    question: "Do you provide complimentary live streaming?",
    answer: "Yes. When you commission both photography and videography collections together, comprehensive multi-camera digital live streaming is provided with our compliments, enabling overseas and remote loved ones to celebrate with you live."
  },
  {
    question: "How would you describe your visual approach?",
    answer: "Our style is rooted in natural light, documentary observation, and the timeless organic texture of 35mm film. We prioritize unrehearsed emotion and quiet nuance over stiff, performative poses."
  },
  {
    question: "Do you travel across the United States for weddings?",
    answer: "Yes. The majority of our commissions take place nationwide—from Newport oceanfront estates to Napa Valley vineyards and Big Sur coastal cliffs. All travel logistics are handled seamlessly with all-inclusive transparent quotes."
  },
  {
    question: "What equipment and mediums do you use?",
    answer: "We shoot a bespoke hybrid of authentic 35mm analog film rolls (Kodak Portra 400, Tri-X) and high-resolution medium format cinema bodies paired with vintage prime lenses for low-light reception elegance."
  },
  {
    question: "When will we receive our photographs and films?",
    answer: "Within 48 hours of your wedding, you will receive a Signature Preview Deck of 30–50 hand-edited frames. Complete digital galleries and cinema films are delivered within 4 to 6 weeks."
  },
  {
    question: "How do we reserve our date?",
    answer: "We accept a strictly limited maximum of 18 celebrations per season. Following our introductory video consultation, dates are secured with a signed commission agreement and a 30% retainer."
  }
];

export const testimonials: TestimonialItem[] = [
  {
    id: "1",
    quote: "Finding someone you've never met and then putting your full trust in to capture all the moments of your day is worth it a million times over with Starline. It felt like we had known each other forever. An all-around creative visionary.",
    client: "Adrianne & Marcus",
    celebration: "Intimate High Sierra Vows",
    location: "Lake Tahoe, California",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop"
  },
  {
    id: "2",
    quote: "Seriously, speechlessly stunning. It is rare to find an artist who delivers final photographs where every single frame feels like an editorial cover. Even a year later, we look through our print box in complete awe.",
    client: "Elena & Christian",
    celebration: "Desert Twilight Celebration",
    location: "Joshua Tree, California",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1600&auto=format&fit=crop"
  },
  {
    id: "3",
    quote: "Starline captured the atmosphere, stillness, and intimacy of our celebration in a way that felt entirely honest. Not once did we feel posed. She made our 15 guests feel like royalty.",
    client: "Maya & Julian",
    celebration: "Coastal Redwood Gathering",
    location: "Big Sur, California",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1600&auto=format&fit=crop"
  }
];

export const journalArticles: JournalArticle[] = [
  {
    id: "newport-rosecliff-estate",
    slug: "newport-rhode-island-wedding-alessandra-matteo",
    title: "Rosecliff Mansion Newport // Alessandra + Matteo",
    subtitle: "A Gilded Age oceanfront celebration enveloped in Atlantic sea mist and evening candlelight along Cliff Walk",
    category: "Coastal & Estates",
    date: "18 October 2025",
    readTime: "5 min read",
    coverImage: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=1600&auto=format&fit=crop",
    excerpt: "Across three days on the oceanfront bluffs of Newport, Alessandra and Matteo welcomed guests from New York and Philadelphia for an unhurried celebration of coastal breezes, grand ballrooms, and twilight dining.",
    content: [
      "Newport in early autumn possesses a tranquil, poetic stillness. The Atlantic horizon softens behind morning sea haze, and the deep blue waters reflect the ornate stone balustrades of historic Cliff Walk mansions.",
      "We documented Alessandra and Matteo's celebration using a dual hybrid approach: 35mm Kodak Portra film rolls for the tactile morning preparations and vintage anamorphic cinema lenses to capture the evening banquet beneath towering chandeliers on the oceanfront lawn.",
      "The ceremony took place overlooking the ocean as sailboats glided in the distance, followed by an open-air banquet illuminated by hundreds of tapered beeswax candles."
    ]
  },
  {
    id: "napa-valley-meadowood",
    slug: "napa-valley-wedding-film-juliette-henri",
    title: "Meadowood Estate Napa Valley // Juliette + Henri",
    subtitle: "Rolling vineyard terraces, sun-drenched olive groves, and haute couture black-tie in St. Helena",
    category: "California & West",
    date: "24 September 2025",
    readTime: "6 min read",
    coverImage: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1600&auto=format&fit=crop",
    excerpt: "Perched above the rolling vineyard hills of Napa Valley, Juliette and Henri hosted an iconic weekend capturing the golden-hour breeze on 35mm analog film and vintage anamorphic cinema lenses.",
    content: [
      "Napa Valley is synonymous with timeless wine country elegance. The iconic olive groves and forested hills of St. Helena provided the dramatic backdrop for Juliette and Henri's black-tie celebration.",
      "Juliette wore an architectural couture silk gown that moved effortlessly in the afternoon vineyard breeze. Our team prioritized unhurried, documentary observation—preserving authentic laughter and impromptu dances.",
      "As twilight bathed the hillside in amber and lavender light, dinner was served on the stone courtyard accompanied by a live acoustic jazz quartet."
    ]
  },
  {
    id: "sedona-red-rocks",
    slug: "sedona-red-rock-canyon-soraya-tarek",
    title: "Enchantment Resort Sedona // Soraya + Tarek",
    subtitle: "Towering red rock canyons, piñon pine courtyards, and an open-air starlit harvest banquet",
    category: "Destination Weddings",
    date: "12 August 2025",
    readTime: "5 min read",
    coverImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop",
    excerpt: "Starting in the fragrant pine courtyards of Boynton Canyon and culminating in a starlit desert banquet illuminated by open fire pits and candlelight.",
    content: [
      "Sedona offers an extraordinary sensory canvas for cinema. Towering red sandstone walls, fragrant desert breezes, and radiant sunsets create an immersive atmosphere unlike anywhere else.",
      "Soraya and Tarek greeted their guests with refreshing prickly-pear mocktails and acoustic guitar before transitioning to an open-air celebration under the vast Arizona night sky.",
      "We utilized 35mm black-and-white film to capture the tactile textures of embroidered textiles and the warm glow of open fire installations."
    ]
  },
  {
    id: "big-sur-post-ranch",
    slug: "big-sur-post-ranch-inn-hana-liam",
    title: "Post Ranch Inn Big Sur // Hana + Liam",
    subtitle: "Ancient coastal redwoods, Pacific ocean mist, and a serene cliffside ceremony on Highway 1",
    category: "California & West",
    date: "28 July 2025",
    readTime: "4 min read",
    coverImage: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1600&auto=format&fit=crop",
    excerpt: "Surrounded by towering ancient redwoods and dramatic ocean cliffs, Hana and Liam exchanged quiet personal vows followed by a farm-to-table candlelit dinner overlooking the Pacific.",
    content: [
      "Big Sur's coastline is defined by ancient redwood groves, mist-shrouded ocean cliffs, and raw natural serenity. Hana and Liam desired a celebration rooted in quiet presence and natural reverence.",
      "The ceremony was held on a private cliffside terrace overlooking the Pacific at dusk, followed by an intimate candlelit reception featuring handcrafted ceramics and local floral design.",
      "Every frame was captured to honor the subtle spatial harmony of the California coastline and the quiet emotional connection between the couple."
    ]
  },
  {
    id: "charleston-historic-manor",
    slug: "charleston-historic-manor-isabella-julian",
    title: "Historic Legare Waring Manor // Isabella + Julian",
    subtitle: "Spanish moss canopy, live oak avenues, and an open-air harvest table beneath the Carolina stars",
    category: "Coastal & Estates",
    date: "14 June 2025",
    readTime: "7 min read",
    coverImage: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1600&auto=format&fit=crop",
    excerpt: "An intimate multi-day gathering celebrating the soulful rhythms of Charleston, documented with medium-format analog film and natural golden-hour illumination.",
    content: [
      "The live oak avenues and weeping Spanish moss of Charleston represent the quintessential soul of the Lowcountry. Isabella and Julian curated an unhurried weekend focused on regional cuisine, warm hospitality, and deep connection.",
      "Guests gathered at a single 80-foot rustic timber table set beneath historic oak boughs, illuminated by festoon lights and the warm glow of the setting sun.",
      "Our cinematography highlighted the natural textures of linen, wrought iron, and late-afternoon golden light that makes Southern coastal celebrations so timeless."
    ]
  },
  {
    id: "santa-barbara-montecito",
    slug: "santa-barbara-montecito-clara-soren",
    title: "San Ysidro Ranch Montecito // Clara + Soren",
    subtitle: "Sun-bleached sandstone walls, fragrant citrus groves, and midnight terrace toasts in Santa Barbara",
    category: "California & West",
    date: "2 May 2025",
    readTime: "5 min read",
    coverImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1600&auto=format&fit=crop",
    excerpt: "With the Santa Ynez mountain peaks rising behind and the Pacific stretching to the horizon, Clara and Soren celebrated with wild jasmine florals and acoustic Spanish guitar.",
    content: [
      "Perched in the foothills of Montecito, San Ysidro Ranch is an enchanting enclave of stone cottages, lavender paths, and historic citrus trees.",
      "Clara and Soren hosted their ceremony overlooking the rose gardens as acoustic guitar echoed across the hillside. The evening transitioned into a vibrant midnight party beneath olive trees.",
      "We preserved the vivid golden-hour light and coastal textures on 35mm color film, delivering an heirloom narrative brimming with vitality."
    ]
  }
];
