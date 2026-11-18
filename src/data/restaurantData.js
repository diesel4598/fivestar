export const RESTAURANT_INFO = {
  name: {
    ar: "خمس نجوم | مطعم شرقي",
    fr: "5 ÉTOILES | Restaurant Oriental",
  },
  tagline: {
    ar: "أصالة المذاق الشرقي.. شاورما على الصاج ومشاوي على الفحم",
    fr: "L'authenticité des saveurs d'Orient.. Shawarma au Saj & Grillades au charbon de bois",
  },
  subheadline: {
    ar: "نطهو بشغف وتوابل شامية أصيلة، لحوم ودواجن حلال 100% طازجة يومياً، مع عصائر طبيعية 100% منعشة ومقبلات فاخرة.",
    fr: "Cuisiné avec passion et épices orientales authentiques, viandes 100% Halal fraîches du jour, jus naturels pressés et mezzés raffinés.",
  },
  phone: "+212 694-916737",
  whatsappNumber: "212694916737",
  address: {
    ar: "زنقة جورج صاند، المعاريف، الدار البيضاء 20100",
    fr: "Rue Georges Sand, Maârif, Casablanca 20100",
  },
  googleMapsUrl: "https://maps.app.goo.gl/DZn3wbDjtxDf2ecL9",
  coordinates: {
    lat: 33.5768037,
    lng: -7.6362643,
  },
  openingHours: {
    ar: "يومياً: 12:00 ظهراً – 02:00 فجراً",
    fr: "Tous les jours: 12h00 – 02h00 du matin",
  },
  deliveryTime: {
    ar: "30 - 45 دقيقة",
    fr: "30 - 45 minutes",
  },
  deliveryFee: 10, // 10 Dh
  freeDeliveryThreshold: 150, // Free above 150 Dh
  currency: {
    ar: "درهم",
    fr: "Dh",
  },
};

export const CATEGORIES = [
  { id: "all", label: { ar: "الكل", fr: "Tous" }, icon: "UtensilsCrossed" },
  { id: "shawarma-platters", label: { ar: "وجبات الشاورما", fr: "Plats Shawarma" }, icon: "Layers" },
  { id: "shawarma-sandwiches", label: { ar: "سندويشات الشاورما", fr: "Sandwiches Shawarma" }, icon: "Sandwich" },
  { id: "grills", label: { ar: "أطباق المشاوي", fr: "Grillades au Charbon" }, icon: "Flame" },
  { id: "sandwiches-crispy", label: { ar: "السندويشات والكريسبي", fr: "Crispy & Spéciaux" }, icon: "Sparkles" },
  { id: "juices", label: { ar: "العصائر الطبيعية", fr: "Jus Naturels" }, icon: "Citrus" },
  { id: "mezze-salads", label: { ar: "المقبلات والسلطات", fr: "Mezzés & Salades" }, icon: "Salad" },
  { id: "family-platters", label: { ar: "عروض العائلة والولائم", fr: "Plateaux Famille" }, icon: "Crown" },
];

export const MENU_ITEMS = [
  {
    id: "royal-grand-feast",
    name: {
      ar: "صينية خمس نجوم الملكية (ولائم 1 كجم)",
      fr: "Plateau Royal 5 Étoiles (1 Kg Mixte)",
    },
    category: "family-platters",
    popular: true,
    isChefChoice: true,
    isFamily: true,
    price: 260,
    calories: "2200 kcal",
    serves: { ar: "4 - 6 أشخاص", fr: "4 - 6 personnes" },
    image: "/images/hero-grand-feast.jpg",
    description: {
      ar: "صينية ولائم فاخرة مشوية على فحم السنديان: كباب لحم غنم بلدي، كفتة متبلة، شيش طاووق طري، شاورما ميكس، سجق مشوي، مع حمص بيروتي، فتوش بالرمان، متبل باذنجان، صوصات الثوم الحلبية وخبز صاج ساخن.",
      fr: "Grand festin royal braisé au charbon naturel : kefta d'agneau, shish taouk tendre, shawarma mixte, merguez grillées, houmous, fattouche grenade, moutabal, sauces toum et pain saj frais.",
    },
    options: {
      proteins: [
        { id: "mix", name: { ar: "ميكس مشاوي وشاورما مشكل", fr: "Mixte Grillades & Shawarma" }, price: 0 },
        { id: "all-meat", name: { ar: "لحوم فقط (كباب وكفتة ولحم)", fr: "100% Viande d'Agneau & Bœuf" }, price: 25 },
      ],
      sizes: [
        { id: "large", name: { ar: "صينية عائلية (1 كجم مشاوي + مقبلات)", fr: "Grand Format (1 Kg + Mezzés)" }, price: 0 },
        { id: "mega", name: { ar: "صينية الملوك (1.5 كجم مشاوي + مقبلات مضاعفة)", fr: "Format XL (1.5 Kg + Double Mezzés)" }, price: 90 },
      ],
    },
  },
  {
    id: "shawarma-arabi-platter",
    name: {
      ar: "وجبة شاورما عربي خمس نجوم",
      fr: "Assiette Shawarma Arabi 5 Étoiles",
    },
    category: "shawarma-platters",
    popular: true,
    isChefChoice: true,
    price: 48,
    calories: "850 kcal",
    image: "/images/shawarma-arabi-platter.jpg",
    description: {
      ar: "شاورما مشوية على الصاج مقطعة رولز شهية، تقدم على صينية خشبية دائرية أنيقة مع بطاطس مقلية مقرمشة، صوص الثومية الخاص، شطة حارة ومخللات شامية مقرمشة.",
      fr: "Shawarma grillé découpé en rouleaux dorés, servi sur plateau en bois avec frites croustillantes, crème de toum à l'ail, sauce pimentée et pickles libanais.",
    },
    options: {
      proteins: [
        { id: "chicken", name: { ar: "دجاج متبل أصيل", fr: "Poulet Mariné" }, price: 0 },
        { id: "meat", name: { ar: "لحم عجل طازج", fr: "Bœuf Tendre" }, price: 8 },
        { id: "mix", name: { ar: "ميكس دجاج ولحم", fr: "Mixte Poulet & Bœuf" }, price: 5 },
      ],
      sizes: [
        { id: "regular", name: { ar: "وجبة عادية (رول كبير)", fr: "Portion Standard" }, price: 0 },
        { id: "double", name: { ar: "وجبة دبل (2 رول صاج كبير)", fr: "Portion Double (2 Rolls)" }, price: 22 },
      ],
    },
  },
  {
    id: "grill-mashawi-skillet",
    name: {
      ar: "طبق مشاوي مشكلة على الفحم في المقلاة",
      fr: "Poêlon de Grillades Mixtes au Charbon",
    },
    category: "grills",
    popular: true,
    isChefChoice: true,
    price: 85,
    calories: "920 kcal",
    image: "/images/grill-mashawi-skillet.jpg",
    description: {
      ar: "تشكيلة أسياخ كباب لحم غنم طازج، كفتة متبلة، وقطع شيش طاووق طرية، طماطم وبصل مشويين على فحم السنديان، تقدم في مقلاة حديدية ساخنة مع مثلثات الخبز الشامي المتبل.",
      fr: "Assortiment grésillant de brochettes de kefta d'agneau, shish taouk mariné aux aromates, tomates et oignons braisés, servi en poêlon avec triangles de pita grillée.",
    },
    options: {
      proteins: [
        { id: "mix", name: { ar: "مشكل (كباب + شيش طاووق + كفتة)", fr: "Mixte (Kefta + Shish Taouk)" }, price: 0 },
        { id: "meat-only", name: { ar: "لحم فقط (كباب غنم ممتاز وكفتة)", fr: "100% Viande Rouge Agneau" }, price: 15 },
        { id: "tawook-only", name: { ar: "شيش طاووق دجاج مشوي فقط", fr: "100% Shish Taouk Poulet" }, price: 0 },
      ],
      sizes: [
        { id: "standard", name: { ar: "طبق فردي غني (3 أسياخ)", fr: "Portion Individuelle (3 Brochettes)" }, price: 0 },
        { id: "jumbo", name: { ar: "طبق دبل لشخصين (6 أسياخ)", fr: "Portion Duo (6 Brochettes)" }, price: 65 },
      ],
    },
  },
  {
    id: "shawarma-rice-plate",
    name: {
      ar: "طبق شاورما بالأرز البسمتي الذهبي",
      fr: "Assiette Shawarma & Riz Basmati Doré",
    },
    category: "shawarma-platters",
    popular: false,
    price: 52,
    calories: "780 kcal",
    image: "/images/shawarma-rice-plate.jpg",
    description: {
      ar: "شرائح شاورما مشوية على نار هادئة تقدم فوق أرز بسمتي فاخر بنكهة الهيل والمكسرات، مصحوبة ببطاطس مقلية ذهبية وسلطة خضار طازجة ومخللات.",
      fr: "Émincé de shawarma doré servi sur un lit de riz basmati parfumé à la cardamome, frites chaudes, salade fraîche croquante et pickles.",
    },
    options: {
      proteins: [
        { id: "chicken", name: { ar: "شاورما دجاج متبل", fr: "Shawarma Poulet" }, price: 0 },
        { id: "meat", name: { ar: "شاورما لحم عجل", fr: "Shawarma Bœuf" }, price: 8 },
        { id: "mix", name: { ar: "ميكس دجاج ولحم", fr: "Shawarma Mixte" }, price: 5 },
      ],
    },
  },
  {
    id: "shawarma-saj-wrap",
    name: {
      ar: "سندويش شاورما صاج جامبو الأصلي",
      fr: "Sandwich Shawarma Saj Jumbo Artisanal",
    },
    category: "shawarma-sandwiches",
    popular: true,
    price: 32,
    calories: "620 kcal",
    image: "/images/shawarma-saj-wrap.jpg",
    description: {
      ar: "خبز الصاج الرقيق المحمص مع شرائح الشاورما الغنية، الثومية الأصلية، خيار مخلل مقرمش، وبطاطس مقلية، محمص ومقرمش على الصاج.",
      fr: "Galette saj artisanale croustillante garnie d'émincé de shawarma juteux, sauce toum onctueuse, cornichons libanais et frites chaudes.",
    },
    options: {
      proteins: [
        { id: "chicken", name: { ar: "دجاج متبل بالثوم والليمون", fr: "Poulet Mariné à l'Ail" }, price: 0 },
        { id: "meat", name: { ar: "لحم عجل مع صوص الطحينة", fr: "Bœuf au Tahini" }, price: 6 },
      ],
      sizes: [
        { id: "single", name: { ar: "حجم عادي", fr: "Taille Normale" }, price: 0 },
        { id: "jumbo", name: { ar: "حجم جامبو كبير", fr: "Taille Jumbo XL" }, price: 10 },
      ],
    },
  },
  {
    id: "shawarma-pita-lebanese",
    name: {
      ar: "سندويش شاورما خبز لبناني تقليدي",
      fr: "Sandwich Shawarma Pain Pita Libanais",
    },
    category: "shawarma-sandwiches",
    popular: false,
    price: 26,
    calories: "520 kcal",
    image: "/images/shawarma-pita-lebanese.jpg",
    description: {
      ar: "جيب الخبز اللبناني الطري محشو حتى الحافة بشرائح الشاورما المتبلة، مكعبات الطماطم، الخس المقرمش، صوص الثومية والبطاطس الذهبية.",
      fr: "Poche de pain pita libanais frais bien garnie de shawarma tendre, dés de tomates fraîches, laitue, sauce toum et frites.",
    },
    options: {
      proteins: [
        { id: "chicken", name: { ar: "دجاج متبل", fr: "Poulet" }, price: 0 },
        { id: "meat", name: { ar: "لحم عجل متبل", fr: "Bœuf" }, price: 5 },
      ],
    },
  },
  {
    id: "shawarma-triple-rolls",
    name: {
      ar: "بوكس تريو شاورما رولز & مقبلات",
      fr: "Box Trio Shawarma Rolls & Condiments",
    },
    category: "shawarma-sandwiches",
    popular: true,
    price: 68,
    calories: "1150 kcal",
    image: "/images/shawarma-triple-rolls.jpg",
    description: {
      ar: "ثلاث لفائف شاورما صاج محشوة ومحمصة مقطعة إلى قطع شهية للمشاركة، تقدم مع صوص طحينة كريمي، مخللات شامية، وثومية حلبية.",
      fr: "Trio de trois wraps toastés découpés en bouchées gourmandes, accompagnés de crème tahina, pickles variés et sauce toum artisanale.",
    },
    options: {
      proteins: [
        { id: "mix-rolls", name: { ar: "رول لحم + 2 رول دجاج", fr: "1 Bœuf + 2 Poulet" }, price: 0 },
        { id: "all-chicken", name: { ar: "3 رولز دجاج كاملة", fr: "3 Poulet" }, price: 0 },
        { id: "all-meat", name: { ar: "3 رولز لحم بلدي", fr: "3 Bœuf" }, price: 12 },
      ],
    },
  },
  {
    id: "sandwich-crispy-supreme",
    name: {
      ar: "سندويش كريسبي دجاج سوبريم بالجبن",
      fr: "Sandwich Suprême Crispy Poulet & Cheddar",
    },
    category: "sandwiches-crispy",
    popular: true,
    isChefChoice: true,
    price: 38,
    calories: "740 kcal",
    image: "/images/sandwich-crispy-supreme.jpg",
    description: {
      ar: "قطع دجاج كريسبي مقرمشة بخلطة خمس نجوم السرية في خبز سمسم طويل طازج، شرائح شيدر ذائبة، خس، طماطم، وصوص المايونيز المتبل، يقدم مع بطاطس.",
      fr: "Filets de poulet ultra-panés croustillants, pain long artisanal au sésame, cheddar fondu, laitue, sauce gourmet et frites dorées.",
    },
    options: {
      spiciness: [
        { id: "original", name: { ar: "عادي بنكهة الأعشاب", fr: "Normal doux" }, price: 0 },
        { id: "spicy", name: { ar: "سبايسي حار مقرمش 🌶️", fr: "Épicé / Spicy 🌶️" }, price: 0 },
      ],
    },
  },
  {
    id: "sandwich-fajita-sub",
    name: {
      ar: "سندويش فاهيتا دجاج مشوي على الصاج",
      fr: "Sub Fajita Poulet Grillé & Poivrons",
    },
    category: "sandwiches-crispy",
    popular: false,
    price: 36,
    calories: "690 kcal",
    image: "/images/sandwich-fajita-sub.jpg",
    description: {
      ar: "شرائح صدور دجاج متبلة ومشوية مع فلفل ملون، بصل مكرمل، بهارات مكسيكية مدخنة، وجبنة موتزاريلا ذائبة، تقدم في خبز باجيت محمص مع بطاطس.",
      fr: "Émincé de filets de poulet grillé, poivrons tricolores, oignons caramélisés, épices douces et mozzarella fondante, servi avec frites.",
    },
  },
  {
    id: "crispy-chicken-tenders",
    name: {
      ar: "وجبة كريسبي تندرز المقرمشة (6 قطع)",
      fr: "Assiette Crispy Tenders 6 Pièces & Sauces",
    },
    category: "sandwiches-crispy",
    popular: true,
    price: 45,
    calories: "680 kcal",
    image: "/images/crispy-chicken-tenders.jpg",
    description: {
      ar: "6 قطع من صدور الدجاج الصافية المقرمشة بخلطة التتبيلة الذهبية، تقدم مع بطاطس مقلية مقرمشة، صوص الخردل بالعسل وصوص الباربيكيو المدخن.",
      fr: "6 généreux tenders de poulet panés extra-croquants, servis avec frites bien chaudes, sauce moutarde au miel et sauce barbecue fumée.",
    },
    options: {
      spiciness: [
        { id: "regular", name: { ar: "عادي مقرمش", fr: "Nature Croustillant" }, price: 0 },
        { id: "spicy", name: { ar: "حار سبايسي 🌶️", fr: "Piquant Épicé 🌶️" }, price: 0 },
      ],
    },
  },
  {
    id: "shawarma-weight-half-kg",
    name: {
      ar: "شاورما عربي بالوزن (نصف كيلو 500 غرام)",
      fr: "Shawarma au Poids (500g pur émincé)",
    },
    category: "shawarma-platters",
    popular: true,
    isFamily: true,
    price: 115,
    calories: "1350 kcal",
    serves: { ar: "2 - 3 أشخاص", fr: "2 - 3 personnes" },
    image: "/images/shawarma-arabi-platter.jpg",
    description: {
      ar: "500 غرام من شاورما اللحم أو الدجاج الصافية المشوية، تقدم مع 4 أرغفة خبز صاج، طبق بطاطس مقلية، 2 صوص ثومية، مخللات مشكلة وشطة حلبية.",
      fr: "500g d'émincé de shawarma grillé au choix, 4 galettes saj fraîches, grande portion de frites, 2 pots de toum, pickles et sauce pimentée.",
    },
    options: {
      proteins: [
        { id: "chicken", name: { ar: "نصف كيلو دجاج صافي", fr: "500g Poulet pur" }, price: 0 },
        { id: "meat", name: { ar: "نصف كيلو لحم عجل بلدي", fr: "500g Bœuf pur" }, price: 20 },
        { id: "mix", name: { ar: "نصف كيلو ميكس (دجاج ولحم)", fr: "500g Mixte" }, price: 10 },
      ],
    },
  },
  {
    id: "juice-orange-mango",
    name: {
      ar: "كوكتيل خمس نجوم مانجو وبرتقال طبقات",
      fr: "Cocktail 5 Étoiles Mangue & Orange Bicolore",
    },
    category: "juices",
    popular: true,
    isChefChoice: true,
    price: 24,
    calories: "160 kcal",
    image: "/images/juice-orange-mango.jpg",
    description: {
      ar: "عصير طبيعي 100% منعش بطبقات مميزة من بيوريه المانجو الكثيف والبرتقال الطازج المعصور على البارد، يقدم مثلجاً بدون أي إضافات صناعية.",
      fr: "Cocktail 100% naturel vitaminé : onctueuse purée de mangue tropicale et jus d'orange fraîchement pressé à froid, sans sucre ajouté.",
    },
    options: {
      sugar: [
        { id: "natural", name: { ar: "طبيعي بدون سكر (موصى به)", fr: "100% Naturel sans sucre" }, price: 0 },
        { id: "honey", name: { ar: "محلى بعسل النحل الطبيعي", fr: "Sucré au miel pur" }, price: 3 },
      ],
    },
  },
  {
    id: "juice-strawberry",
    name: {
      ar: "عصير فراولة بلدي طبيعي مثلج",
      fr: "Jus de Fraises Fraîches Givré",
    },
    category: "juices",
    popular: true,
    price: 22,
    calories: "140 kcal",
    image: "/images/juice-strawberry.jpg",
    description: {
      ar: "فراولة طازجة منتقاة بعناية ومضروبة مع الثلج المجروش لنكهة صيفية منعشة وغنية بمضادات الأكسدة.",
      fr: "Fraises fraîches mixées avec glace pilée pour un smoothie velouté, rafraîchissant et riche en vitamines.",
    },
  },
  {
    id: "juice-avocado-royal",
    name: {
      ar: "سموذي الأفوكادو الملكي بالعسل والمكسرات",
      fr: "Smoothie Avocat Royal Miel & Fruits Secs",
    },
    category: "juices",
    popular: true,
    isChefChoice: true,
    price: 28,
    calories: "380 kcal",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80",
    description: {
      ar: "أفوكادو كريمي طازج مضروب بالحليب الصافي وعسل النحل الأصيل، مزين بطبقة من القشطة البلدية واللوز والكاجو والفستق الحلبي المقرمش.",
      fr: "Avocat onctueux mixé au lait crémeux et miel d'acacia, couronné de crème fraîche, amandes, noix de cajou et pistaches grillées.",
    },
  },
  {
    id: "juice-lemon-mint",
    name: {
      ar: "عصير ليمون بالنعناع المنعش (موخيتو شرقي)",
      fr: "Citronnade Fraîche à la Menthe & Glace Pilée",
    },
    category: "juices",
    popular: true,
    price: 18,
    calories: "110 kcal",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
    description: {
      ar: "عصير الليمون الطازج المعصور مع أوراق النعناع الأخضر والثلج المبروش، المشروب المثالي والأكثر انتعاشاً مع المشاوي والشاورما.",
      fr: "Citrons jaunes pressés à la minute, feuilles de menthe verte fraîche et glace pilée, la boisson digestive par excellence.",
    },
  },
  {
    id: "mezze-grand-platter",
    name: {
      ar: "صينية مقبلات خمس نجوم المشكلة",
      fr: "Grand Plateau Mezzés 5 Étoiles",
    },
    category: "mezze-salads",
    popular: true,
    price: 42,
    calories: "450 kcal",
    image: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=800&q=80",
    description: {
      ar: "تشكيلة مقبلات فاخرة تضم حمص بالطحينة، متبل باذنجان مدخن، سلطة فتوش بدبس الرمان، كول سلو منعش، وخبز صاج دافئ.",
      fr: "Sélection d'entrées royales : Houmous onctueux, moutabal d'aubergines fumées, salade fattouche grenade et pain saj chaud.",
    },
  },
  {
    id: "fattoush-salad",
    name: {
      ar: "سلطة فتوش شامية بدبس الرمان",
      fr: "Salade Fattouche Traditionnelle à la Grenade",
    },
    category: "mezze-salads",
    popular: false,
    price: 24,
    calories: "220 kcal",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    description: {
      ar: "خضار طازجة ومقرمشة متبلة بالسماق البلدي، زيت الزيتون البكر ودبس الرمان الطبيعي، تعلوها حبات الرمان ومربعات الخبز المقرمش.",
      fr: "Légumes croquants du potager, sumac sauvage, mélasse de grenade aigre-douce, perles de grenade et triangles de pita dorée.",
    },
  },
  {
    id: "hummus-beiruti",
    name: {
      ar: "حمص بيروتي بالطحينة وزيت الزيتون البكر",
      fr: "Houmous Libanais à l'Huile d'Olive Vierge",
    },
    category: "mezze-salads",
    popular: false,
    price: 20,
    calories: "290 kcal",
    image: "https://images.unsplash.com/photo-1577906096429-f73c2c312435?auto=format&fit=crop&w=800&q=80",
    description: {
      ar: "حمص مسلوق ومطحون بقوام مخملي مع طحينة السمسم الصافية وعصير الليمون، مع رشة كمون وبابريكا وزيت زيتون بكر معصور على البارد.",
      fr: "Velouté de pois chiches au tahini de sésame pur, jus de citron, cumin, paprika et généreux filet d'huile d'olive vierge.",
    },
  },
];

export const ADDONS_LIST = [
  { id: "french-fries", name: { ar: "طبق بطاطس مقلية متبلة", fr: "Portion frites assaisonnées" }, price: 10 },
  { id: "extra-cheddar", name: { ar: "جبنة شيدر ذائبة إضافية", fr: "Fromage cheddar fondu extra" }, price: 6 },
  { id: "extra-toum", name: { ar: "صلصة ثومية أصلية (تومية)", fr: "Sauce Toum à l'ail maison" }, price: 3 },
  { id: "spicy-shatta", name: { ar: "شطة حلبية حارة منزلية 🌶️", fr: "Sauce pimentée maison 🌶️" }, price: 3 },
  { id: "pomegranate-molasses", name: { ar: "صوص دبس رمان طبيعي", fr: "Mélasse de grenade pure" }, price: 3 },
  { id: "coleslaw", name: { ar: "طبق سلطة كول سلو منعش", fr: "Salade coleslaw fraîche" }, price: 7 },
  { id: "extra-saj-bread", name: { ar: "خبز صاج إضافي (2 رغيف)", fr: "2 Pains Saj chauds en plus" }, price: 4 },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: { ar: "كريم المنصوري", fr: "Karim Mansouri" },
    location: { ar: "الدار البيضاء", fr: "Casablanca" },
    rating: 5,
    date: { ar: "منذ يومين", fr: "Il y a 2 jours" },
    comment: {
      ar: "أفضل شاورما عربي ذقتها في المدينة بدون منازع! الصاج مقرمش واللحمة طرية ومتبلة صح بدون زفارة، والثومية عالمية. التوصيل وصل في أقل من 35 دقيقة ساخن وكأني جالس في المطعم.",
      fr: "Le meilleur shawarma arabi que j'ai goûté en ville ! Le pain saj est croustillant, la viande parfaitement tendre et le toum exquis. Livraison en 35 min bien chaude.",
    },
  },
  {
    id: 2,
    name: { ar: "سارة بناني", fr: "Sara Bennani" },
    location: { ar: "المعاريف", fr: "Maârif" },
    rating: 5,
    date: { ar: "منذ أسبوع", fr: "Il y a 1 semaine" },
    comment: {
      ar: "طلبنا صينية العائلة الملكية يوم الجمعة وكانت تجربة خرافية! المشاوي على الفحم نكهتها أصيلة والكمية وفيرة جداً مع المقبلات والخبز. عصير المانجو والبرتقال طبيعي 100% ومنعش.",
      fr: "Nous avons commandé le plateau royal pour un repas de famille. Saveur au charbon inégalée, portions très généreuses et le cocktail mangue-orange est un pur délice 100% naturel.",
    },
  },
  {
    id: 3,
    name: { ar: "عمر السلاوي", fr: "Omar Slaoui" },
    location: { ar: "عين دياب", fr: "Aïn Diab" },
    rating: 5,
    date: { ar: "منذ 3 أيام", fr: "Il y a 3 jours" },
    comment: {
      ar: "سندويش الكريسبي سوبريم عندهم خطير ومقرمش من برة وطري من جوة، والطلب بالواتساب منظم وسريع جداً. خدمة خمس نجوم بحق وحقيق!",
      fr: "Le crispy suprême est sensationnel, super croustillant et plein de saveur. La commande WhatsApp est fluide et instantanée. Un vrai service 5 étoiles !",
    },
  },
];

