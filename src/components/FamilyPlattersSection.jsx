import React from 'react';
import { 
  Crown, 
  Users, 
  Flame, 
  Sparkles, 
  CheckCircle2, 
  ShoppingBag, 
  ArrowLeft, 
  ArrowRight, 
  ShieldAlert, 
  Percent,
  Edit3
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { useMenu } from '../context/MenuContext';

export const FamilyPlattersSection = () => {
  const { lang, dir, t } = useLanguage();
  const { addToCart, setIsCartOpen } = useCart();
  const { menuItems, isAdminMode, openEditModal } = useMenu();

  const royalFeastItem = menuItems.find(i => i.id === 'royal-grand-feast') || menuItems[0];

  const handleOrderFeast = () => {
    if (royalFeastItem) {
      addToCart(royalFeastItem, {}, 1);
      setIsCartOpen(true);
    }
  };

  return (
    <section id="family" className="relative py-16 lg:py-24 bg-[#0A0A0A] overflow-hidden scroll-mt-20">
      
      {/* Golden Glow Backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55rem] h-[35rem] bg-[#D4AF37]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Intro */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/50 text-[#D4AF37] text-xs font-bold tracking-wider uppercase">
            <Crown className="w-4 h-4" />
            <span>{lang === 'ar' ? 'عروض العائلة والولائم الكبرى' : 'Offres Familiales & Banquets'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-cairo text-white">
            {lang === 'ar' ? 'صينية خمس نجوم الملكية.. لمة العائلة على أصولها' : 'Le Banquet Royal 5 Étoiles.. Pour Réunir la Famille'}
          </h2>

          <p className="text-sm sm:text-base text-neutral-400">
            {lang === 'ar'
              ? 'سفرة كاملة من أشهى المشاوي والشاورما والمقبلات الشامية الساخنة، مجهزة لتبهج ضيوفك وعائلتك بأعلى معايير الجودة.'
              : 'Une table généreuse composée des meilleures viandes braisées, shawarmas et mezzés chauds pour vos grands moments.'}
          </p>
        </div>

        {/* Grand Feast Showcase Card */}
        <div className="relative rounded-3xl bg-gradient-to-b from-[#1C1810] to-[#121212] border-2 border-[#D4AF37]/50 shadow-2xl overflow-hidden p-6 sm:p-8 lg:p-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Visual Photo on Left (in RTL Right) */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden border border-[#D4AF37]/40 shadow-2xl group">
                <img
                  src="/images/hero-grand-feast.jpg"
                  alt="صينية خمس نجوم الملكية"
                  className="w-full h-[320px] sm:h-[420px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Savings Pill */}
                <div className="absolute top-4 start-4 bg-gradient-to-r from-red-600 to-amber-600 text-white text-xs font-black px-3.5 py-1.5 rounded-xl shadow-lg flex items-center gap-1.5">
                  <Percent className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'وفر 45 درهم مقارنة بالطلب المنفصل' : 'Économisez 45 Dh'}</span>
                </div>

                {/* Servings Pill */}
                <div className="absolute bottom-4 end-4 glass-panel px-3.5 py-1.5 rounded-xl border border-white/20 text-white text-xs font-bold flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#D4AF37]" />
                  <span>{lang === 'ar' ? 'تكفي 4 - 6 أشخاص' : 'Pour 4 à 6 personnes'}</span>
                </div>
              </div>
            </div>

            {/* Feast Breakdown & Details */}
            <div className="lg:col-span-6 space-y-6">
              
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#D4AF37] mb-1">
                  <Crown className="w-4 h-4 text-[#E85D04]" />
                  <span>{lang === 'ar' ? 'الطبق الأسطوري الأول' : 'La Pièce Maîtresse'}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black font-cairo text-white">
                  {lang === 'ar' ? 'صينية خمس نجوم الملكية (1 كجم مشاوي + شاورما)' : 'Plateau Royal 5 Étoiles (1 Kg Mixte & Shawarma)'}
                </h3>
              </div>

              {/* Items List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-neutral-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>{lang === 'ar' ? '4 أسياخ كباب لحم غنم بلدي' : '4 brochettes kefta agneau'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>{lang === 'ar' ? '4 أسياخ شيش طاووق متبل' : '4 brochettes shish taouk'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>{lang === 'ar' ? 'شاورما لحم ودجاج على الصاج' : 'Shawarma mixte poulet & viande'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>{lang === 'ar' ? 'سجق مشوي على الفحم' : 'Merguez grillées au charbon'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>{lang === 'ar' ? 'حمص بيروتي بزيت الزيتون' : 'Houmous libanais onctueux'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>{lang === 'ar' ? 'سلطة فتوش بالرمان والمقرمشات' : 'Salade fattouche à la grenade'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>{lang === 'ar' ? 'متبل باذنجان مشوي مدخن' : 'Moutabal d\'aubergine fumée'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>{lang === 'ar' ? 'سلة خبز صاج ساخن + صوصات' : 'Pains saj chauds & sauces toum'}</span>
                </div>
              </div>

              {/* Price & CTA Box */}
              <div className="pt-4 border-t border-[#D4AF37]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-neutral-400 block line-through">
                    {(royalFeastItem?.price || 260) + 45} {lang === 'ar' ? 'درهم' : 'Dh'}
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-black font-mono text-[#D4AF37]">
                      {royalFeastItem?.price || 260}
                    </span>
                    <span className="text-base font-bold text-white">
                      {lang === 'ar' ? 'درهم مغربي' : 'Dh'}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleOrderFeast}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#E85D04] via-[#F48C06] to-[#D4AF37] hover:from-[#f06810] hover:to-[#dfbb43] text-black font-cairo font-black text-base shadow-xl shadow-amber-600/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>{lang === 'ar' ? 'اطلب الصينية الملكية الآن' : 'Commander le Banquet'}</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

