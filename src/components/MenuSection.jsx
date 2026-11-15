import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Flame, 
  Sparkles, 
  Plus, 
  SlidersHorizontal, 
  Star, 
  Layers, 
  Sandwich, 
  Citrus, 
  Salad, 
  Crown, 
  UtensilsCrossed,
  X,
  Check,
  Edit3
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { useMenu } from '../context/MenuContext';
import { CustomizeModal } from './CustomizeModal';

export const MenuSection = () => {
  const { lang, t } = useLanguage();
  const { addToCart } = useCart();
  const { 
    menuItems, 
    categories, 
    isAdminMode, 
    openEditModal, 
    openAddModal 
  } = useMenu();
  
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('all'); // 'all' | 'popular' | 'chef'
  const [customizingItem, setCustomizingItem] = useState(null);
  const [addedAnimationId, setAddedAnimationId] = useState(null);

  // Icon mapping for categories
  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'UtensilsCrossed': return <UtensilsCrossed className="w-4 h-4" />;
      case 'Layers': return <Layers className="w-4 h-4" />;
      case 'Sandwich': return <Sandwich className="w-4 h-4" />;
      case 'Flame': return <Flame className="w-4 h-4" />;
      case 'Sparkles': return <Sparkles className="w-4 h-4" />;
      case 'Citrus': return <Citrus className="w-4 h-4" />;
      case 'Salad': return <Salad className="w-4 h-4" />;
      case 'Crown': return <Crown className="w-4 h-4" />;
      default: return <UtensilsCrossed className="w-4 h-4" />;
    }
  };

  // Filtered menu items from dynamic menuItems state
  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      // Category match
      const matchesCategory = 
        activeCategory === 'all' || 
        item.category === activeCategory ||
        (activeCategory === 'family-platters' && item.isFamily);

      // Search match (in Arabic and French)
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch = 
        !query ||
        item.name.ar.toLowerCase().includes(query) ||
        item.name.fr.toLowerCase().includes(query) ||
        item.description.ar.toLowerCase().includes(query) ||
        item.description.fr.toLowerCase().includes(query);

      // Tag filter
      const matchesTag =
        selectedTag === 'all' ||
        (selectedTag === 'popular' && item.popular) ||
        (selectedTag === 'chef' && item.isChefChoice);

      return matchesCategory && matchesSearch && matchesTag;
    });
  }, [menuItems, activeCategory, searchQuery, selectedTag]);

  // Quick add without customization
  const handleQuickAdd = (item, e) => {
    e.stopPropagation();
    
    // If the item has required protein options or choices, open customize modal instead
    if (item.options?.proteins && item.options.proteins.length > 1) {
      setCustomizingItem(item);
      return;
    }

    addToCart(item, {}, 1);
    setAddedAnimationId(item.id);
    setTimeout(() => {
      setAddedAnimationId(null);
    }, 1200);
  };

  return (
    <section id="menu" className="relative py-16 lg:py-24 bg-[#0E0E0E] scroll-mt-20">
      
      {/* Decorative Warm Ambient Glows */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#E85D04]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold tracking-wider uppercase">
            <Flame className="w-3.5 h-3.5 text-[#E85D04]" />
            <span>{lang === 'ar' ? 'قائمة الطعام الحصرية' : 'Notre Carte Gourmande'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-cairo text-white">
            {lang === 'ar' ? 'أشهى المأكولات والمشاوي المحضرة بشغف' : 'Saveurs Authentiques & Grillades au Feu'}
          </h2>

          <p className="text-sm sm:text-base text-neutral-400">
            {lang === 'ar' 
              ? 'تذوق أشهى شاورما على الصاج، مشاوي على الفحم، سندويشات مقرمشة، ومقبلات غنية بالبهارات الشامية' 
              : 'Dégustez nos shawarmas au saj, grillades au charbon, sandwiches crispy et mezzés aux épices d\'Orient.'}
          </p>
        </div>

        {/* Search Bar & Tag Badges */}
        <div className="max-w-3xl mx-auto mb-8 space-y-4">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'ar' ? 'ابحث عن وجبة، شاورما، مشاوي، عصير...' : 'Rechercher un plat, shawarma, grillade, jus...'}
              className="w-full px-5 py-3.5 ps-12 pe-12 rounded-2xl bg-neutral-900/90 border border-neutral-700/80 focus:border-[#D4AF37] text-white placeholder-neutral-500 text-sm focus:outline-none transition-all shadow-inner"
            />
            <div className="absolute inset-y-0 start-0 ps-4 flex items-center pointer-events-none text-neutral-400">
              <Search className="w-5 h-5" />
            </div>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 end-0 pe-4 flex items-center text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Tag Quick Filters */}
          <div className="flex items-center justify-center gap-2 text-xs">
            <button
              onClick={() => setSelectedTag('all')}
              className={`px-3 py-1.5 rounded-full border transition-colors cursor-pointer ${
                selectedTag === 'all'
                  ? 'bg-[#D4AF37] text-black font-bold border-[#D4AF37]'
                  : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
              }`}
            >
              {lang === 'ar' ? 'جميع الأطباق' : 'Tous les plats'}
            </button>
            <button
              onClick={() => setSelectedTag('popular')}
              className={`px-3 py-1.5 rounded-full border flex items-center gap-1 transition-colors cursor-pointer ${
                selectedTag === 'popular'
                  ? 'bg-[#E85D04] text-white font-bold border-[#E85D04]'
                  : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
              }`}
            >
              <Star className="w-3 h-3 fill-current" />
              <span>{lang === 'ar' ? 'الأكثر طلباً ⭐' : 'Best-Sellers ⭐'}</span>
            </button>
            <button
              onClick={() => setSelectedTag('chef')}
              className={`px-3 py-1.5 rounded-full border flex items-center gap-1 transition-colors cursor-pointer ${
                selectedTag === 'chef'
                  ? 'bg-amber-600 text-white font-bold border-amber-600'
                  : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
              }`}
            >
              <Crown className="w-3 h-3" />
              <span>{lang === 'ar' ? 'توصية الشيف' : 'Choix du Chef'}</span>
            </button>
          </div>
        </div>

        {/* Sticky Horizontal Category Filter Tabs */}
        <div className="sticky top-[73px] sm:top-[77px] z-30 bg-[#0E0E0E]/95 backdrop-blur-md py-3 -mx-4 px-4 sm:mx-0 sm:px-0 mb-8 border-y border-neutral-800/80">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth pb-1">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer shrink-0 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#E85D04] to-[#D4AF37] text-neutral-950 font-black shadow-lg shadow-amber-600/25 scale-[1.02]'
                      : 'bg-neutral-900/90 text-neutral-300 hover:text-white hover:bg-neutral-800 border border-neutral-800'
                  }`}
                >
                  <span className={isActive ? 'text-black' : 'text-[#D4AF37]'}>
                    {getCategoryIcon(cat.icon)}
                  </span>
                  <span>{t(cat.label)}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 glass-panel rounded-3xl max-w-md mx-auto space-y-3">
            <UtensilsCrossed className="w-12 h-12 text-neutral-600 mx-auto" />
            <h3 className="text-lg font-bold text-white font-cairo">
              {lang === 'ar' ? 'لم نجد أي طبق مطابق لبحثك' : 'Aucun plat correspondant trouvé'}
            </h3>
            <p className="text-xs text-neutral-400">
              {lang === 'ar' ? 'جرب البحث بكلمات أخرى أو اختر فئة مختلفة' : 'Essayez avec un autre mot-clé ou catégorie.'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
                setSelectedTag('all');
              }}
              className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-white transition-colors cursor-pointer"
            >
              {lang === 'ar' ? 'إعادة ضبط البحث' : 'Réinitialiser'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredItems.map((item) => {
              const isAdded = addedAnimationId === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setCustomizingItem(item)}
                  className="group relative rounded-3xl bg-[#141414] border border-neutral-800/90 hover:border-[#D4AF37]/50 shadow-xl hover:shadow-2xl hover:shadow-amber-950/20 transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
                >
                  
                  {/* Item Image with Badges */}
                  <div className="relative h-56 sm:h-60 w-full overflow-hidden bg-neutral-900">
                    <img
                      src={item.image}
                      alt={t(item.name)}
                      className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    
                    {/* Dark gradient for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-black/30" />

                    {/* Top Badges */}
                    <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {item.popular && (
                          <span className="px-2.5 py-1 rounded-full bg-gradient-to-r from-[#E85D04] to-amber-600 text-white font-bold text-[10px] sm:text-[11px] shadow-md flex items-center gap-1">
                            <Star className="w-3 h-3 fill-white" />
                            <span>{lang === 'ar' ? 'الأكثر طلباً' : 'Best-Seller'}</span>
                          </span>
                        )}
                        {item.isChefChoice && (
                          <span className="px-2.5 py-1 rounded-full bg-[#D4AF37] text-neutral-950 font-black text-[10px] sm:text-[11px] shadow-md flex items-center gap-1">
                            <Crown className="w-3 h-3" />
                            <span>{lang === 'ar' ? 'توصية الشيف' : 'Chef'}</span>
                          </span>
                        )}
                      </div>

                      {/* Calorie / Portion Pill */}
                      {item.serves ? (
                        <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white text-[11px] font-medium">
                          {t(item.serves)}
                        </span>
                      ) : item.calories ? (
                        <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-neutral-300 text-[11px] font-mono">
                          {item.calories}
                        </span>
                      ) : null}
                    </div>

                    {/* Price Pill Over Image */}
                    <div className="absolute bottom-3 end-3.5">
                      <div className="px-3.5 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-[#D4AF37]/50 text-[#D4AF37] font-black font-mono text-base sm:text-lg shadow-lg">
                        {item.price} <span className="text-xs font-tajawal font-bold text-white">{lang === 'ar' ? 'درهم' : 'Dh'}</span>
                      </div>
                    </div>

                  </div>

                  {/* Item Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    
                    <div className="space-y-1.5">
                      <h3 className="font-cairo font-bold text-lg sm:text-xl text-white group-hover:text-amber-400 transition-colors">
                        {t(item.name)}
                      </h3>
                      <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                        {t(item.description)}
                      </p>
                    </div>

                    {/* Card Actions */}
                    <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between gap-2">
                      
                      {/* Customize Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCustomizingItem(item);
                        }}
                        className="px-3 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700/80 hover:border-[#D4AF37]/40 text-neutral-300 hover:text-white text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <SlidersHorizontal className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>{lang === 'ar' ? 'تخصيص' : 'Options'}</span>
                      </button>

                      {/* Quick Add Button */}
                      <button
                        type="button"
                        onClick={(e) => handleQuickAdd(item, e)}
                        className={`flex-1 px-4 py-2 rounded-xl font-cairo font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md ${
                          isAdded
                            ? 'bg-emerald-600 text-white scale-95'
                            : 'bg-gradient-to-r from-[#E85D04] to-[#D4AF37] hover:from-[#f06810] hover:to-[#dfbb43] text-black hover:scale-[1.02] active:scale-95'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-4 h-4 stroke-[3]" />
                            <span>{lang === 'ar' ? 'تمت الإضافة!' : 'Ajouté !'}</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4 stroke-[2.5]" />
                            <span>{lang === 'ar' ? 'أضف للسلة' : 'Ajouter'}</span>
                          </>
                        )}
                      </button>

                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Customize Modal */}
      <CustomizeModal
        item={customizingItem}
        isOpen={Boolean(customizingItem)}
        onClose={() => setCustomizingItem(null)}
      />

    </section>
  );
};

