import React from 'react';
import { 
  Flame, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Star, 
  ArrowLeft, 
  ArrowRight,
  Citrus,
  ChevronDown
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const HeroSection = () => {
  const { lang, dir, t } = useLanguage();

  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) {
      const navHeight = 90;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const scrollToJuices = () => {
    const el = document.getElementById('juices');
    if (el) {
      const navHeight = 90;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-12 lg:py-20">
      
      {/* Background Ambience & Lighting */}
      <div className="absolute inset-0 bg-[#0E0E0E] pointer-events-none">
        {/* Amber & Gold Radial Glows */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#E85D04]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/3 left-1/4 w-[30rem] h-[30rem] bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
        {/* Subtle Charcoal Grid / Texture Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#262626_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column (in RTL: Right Side): Text Content & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-start">
            
            {/* Top Pill / Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-neutral-900/90 border border-[#D4AF37]/35 shadow-inner backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs sm:text-sm font-semibold text-[#D4AF37]">
                {lang === 'ar' ? 'مفتوح الآن نستقبل طلباتكم طازجة حتى 2:00 فجراً' : 'Ouvert maintenant • Commandes en direct jusqu\'à 02h00'}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-cairo text-white leading-[1.2] tracking-tight">
              {lang === 'ar' ? (
                <>
                  أصالة المذاق الشرقي.. <br />
                  <span className="bg-gradient-to-r from-[#D4AF37] via-[#F4D068] to-[#E85D04] bg-clip-text text-transparent">
                    شاورما على الصاج
                  </span>{' '}
                  ومشاوي على الفحم
                </>
              ) : (
                <>
                  L'authenticité des saveurs d'Orient.. <br />
                  <span className="bg-gradient-to-r from-[#D4AF37] via-[#F4D068] to-[#E85D04] bg-clip-text text-transparent">
                    Shawarma au Saj
                  </span>{' '}
                  & Grillades au Charbon
                </>
              )}
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-neutral-300 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {t(RESTAURANT_INFO.subheadline)}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={scrollToMenu}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#E85D04] via-[#F48C06] to-[#D4AF37] text-neutral-950 font-cairo font-bold text-base shadow-xl shadow-amber-600/25 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>{lang === 'ar' ? 'اطلب الآن من المنيو' : 'Commander Maintenant'}</span>
                {dir === 'rtl' ? (
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                ) : (
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                )}
              </button>

              <button
                onClick={scrollToJuices}
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-700/80 hover:border-[#D4AF37]/50 text-white font-cairo font-semibold text-base transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer hover:shadow-lg"
              >
                <Citrus className="w-5 h-5 text-amber-400" />
                <span>{lang === 'ar' ? 'ركن العصائر الطبيعية' : 'Bar à Jus Frais'}</span>
              </button>
            </div>

            {/* Trust Badges Bar */}
            <div className="pt-6 border-t border-neutral-800/80 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className="flex items-center gap-2 text-start">
                <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">
                    {lang === 'ar' ? 'حلال 100%' : '100% Halal'}
                  </div>
                  <div className="text-[11px] text-neutral-400">
                    {lang === 'ar' ? 'لحوم بلدية طازجة' : 'Viande fraîche'}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-start">
                <div className="w-9 h-9 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0">
                  <Flame className="w-5 h-5 text-[#E85D04]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">
                    {lang === 'ar' ? 'شوي على الفحم' : 'Charbon de bois'}
                  </div>
                  <div className="text-[11px] text-neutral-400">
                    {lang === 'ar' ? 'نكهة أصيلة مدخنة' : 'Goût authentique'}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-start">
                <div className="w-9 h-9 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">
                    {lang === 'ar' ? 'توصيل 35 دقيقة' : '30-45 min'}
                  </div>
                  <div className="text-[11px] text-neutral-400">
                    {lang === 'ar' ? 'ساخن ومحكم الغلق' : 'Livraison rapide'}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-start">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                  <Star className="w-5 h-5 text-[#D4AF37] fill-[#D4AF37]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">
                    {lang === 'ar' ? 'تقييم 4.9 / 5' : 'Note 4.9/5'}
                  </div>
                  <div className="text-[11px] text-neutral-400">
                    {lang === 'ar' ? '+2,500 زبون سعيد' : '+2500 clients'}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column (in RTL: Left Side): High Impact Studio Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer Glow Halo */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#E85D04]/30 via-[#D4AF37]/25 to-transparent rounded-3xl blur-xl opacity-75" />

              {/* Main Visual Image Card */}
              <div className="relative rounded-3xl overflow-hidden border-2 border-[#D4AF37]/40 shadow-2xl bg-[#171717] group">
                <img
                  src="/images/hero-grand-feast.jpg"
                  alt="صينية خمس نجوم الفاخرة - مشاوي وشاورما"
                  className="w-full h-[360px] sm:h-[420px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                {/* Bottom Image Caption */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl glass-panel border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-[#D4AF37] font-semibold block">
                      {lang === 'ar' ? 'الأكثر طلباً للولائم والعائلات' : 'Le Best-Seller Famille'}
                    </span>
                    <h3 className="font-cairo font-bold text-white text-sm sm:text-base">
                      {lang === 'ar' ? 'صينية خمس نجوم الملكية الفاخرة' : 'Plateau Royal 5 Étoiles'}
                    </h3>
                  </div>
                  <div className="text-end">
                    <span className="text-xs text-neutral-400 block line-through">295 Dh</span>
                    <span className="text-base sm:text-lg font-black text-amber-400 font-mono">260 Dh</span>
                  </div>
                </div>
              </div>

              {/* Floating Highlight Card 1: Fresh Grill Skillet */}
              <div className="absolute -top-4 -right-4 sm:-right-6 glass-panel rounded-2xl p-2.5 border border-[#D4AF37]/50 shadow-xl flex items-center gap-3 animate-float hidden sm:flex">
                <img
                  src="/images/grill-mashawi-skillet.jpg"
                  alt="مشاوي مشكلة"
                  className="w-12 h-12 rounded-xl object-cover border border-[#D4AF37]/40"
                />
                <div className="pe-2">
                  <div className="flex items-center gap-1 text-[11px] font-bold text-[#D4AF37]">
                    <Flame className="w-3 h-3 text-[#E85D04]" />
                    <span>{lang === 'ar' ? 'شوي على الفحم' : 'Grillé au Charbon'}</span>
                  </div>
                  <span className="text-xs font-semibold text-white">
                    {lang === 'ar' ? 'مشاوي مشكلة ساخنة' : 'Grillades Mixtes'}
                  </span>
                </div>
              </div>

              {/* Floating Highlight Card 2: Fresh Shawarma Platter */}
              <div className="absolute -bottom-5 -left-4 sm:-left-6 glass-panel rounded-2xl p-2.5 border border-[#E85D04]/50 shadow-xl flex items-center gap-3 hidden sm:flex">
                <img
                  src="/images/shawarma-arabi-platter.jpg"
                  alt="شاورما عربي"
                  className="w-12 h-12 rounded-xl object-cover border border-[#E85D04]/40"
                />
                <div className="pe-2">
                  <div className="flex items-center gap-1 text-[11px] font-bold text-amber-400">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>{lang === 'ar' ? 'صاج مقرمش' : 'Saj Croustillant'}</span>
                  </div>
                  <span className="text-xs font-semibold text-white">
                    {lang === 'ar' ? 'شاورما عربي بالثومية' : 'Shawarma Arabi'}
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

    </section>
  );
};

