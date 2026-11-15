import React, { useState } from 'react';
import { 
  Citrus, 
  Sparkles, 
  Plus, 
  Check, 
  Droplets, 
  Heart, 
  Zap 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { useMenu } from '../context/MenuContext';

export const JuiceBarSection = () => {
  const { lang, dir, t } = useLanguage();
  const { addToCart } = useCart();
  const { menuItems } = useMenu();
  const [addedJuiceId, setAddedJuiceId] = useState(null);

  // Filter juices from dynamic menu
  const juices = menuItems.filter(item => item.category === 'juices');

  const handleAddJuice = (juice) => {
    addToCart(juice, {}, 1);
    setAddedJuiceId(juice.id);
    setTimeout(() => {
      setAddedJuiceId(null);
    }, 1200);
  };

  return (
    <section id="juices" className="relative py-16 lg:py-24 bg-[#111111] overflow-hidden border-y border-amber-500/20 scroll-mt-20">
      
      {/* Background Juice Bar Accents (Lush Citrus / Emerald / Berry Glows) */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs font-bold tracking-wider">
              <Droplets className="w-3.5 h-3.5 animate-bounce" />
              <span>{lang === 'ar' ? 'ركن العصائر الطبيعية 100%' : 'Bar à Jus 100% Naturels'}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-cairo text-white">
              {lang === 'ar' ? (
                <>
                  انتعاش الفواكه الطازجة..{' '}
                  <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">
                    عصائر تُعصر لحظة الطلب
                  </span>
                </>
              ) : (
                <>
                  Fraîcheur & Vitalité..{' '}
                  <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">
                    Jus Pressés à la Minute
                  </span>
                </>
              )}
            </h2>

            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              {lang === 'ar'
                ? 'فواكه استوائية ومحلية طازجة، بدون أي سكر صناعي أو مواد حافظة. الرفيق المثالي لكل ساندويش وطبق مشاوي.'
                : 'Fruits frais pressés à froid sans conservateurs ni sucre raffiné. L\'accord parfait pour équilibrer vos repas.'}
            </p>
          </div>

          {/* Quick Combo Promo Badge */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <div className="p-4 rounded-2xl glass-panel-gold border border-[#D4AF37]/40 max-w-xs">
              <div className="flex items-center gap-2 text-xs font-bold text-[#D4AF37] mb-1">
                <Zap className="w-4 h-4 text-[#E85D04]" />
                <span>{lang === 'ar' ? 'نصيحة الشيف' : 'Le Conseil du Chef'}</span>
              </div>
              <p className="text-xs text-neutral-300">
                {lang === 'ar'
                  ? 'أضف كوكتيل المانجو والبرتقال مع شاورما الصاج لتجربة نكهات استثنائية!'
                  : 'Associez le cocktail mangue-orange avec votre shawarma pour une explosion de saveurs !'}
              </p>
            </div>
          </div>
        </div>

        {/* Juices Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {juices.map((juice) => {
            const isAdded = addedJuiceId === juice.id;
            return (
              <div
                key={juice.id}
                className="group relative rounded-3xl bg-[#181818] border border-neutral-800 hover:border-amber-500/50 shadow-xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
              >
                {/* Juice Image */}
                <div className="relative h-64 w-full overflow-hidden bg-neutral-900">
                  <img
                    src={juice.image}
                    alt={t(juice.name)}
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-black/20" />

                  {/* 100% Natural Badge */}
                  <div className="absolute top-3.5 right-3.5">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-950/80 backdrop-blur-md border border-emerald-500/40 text-emerald-300 text-[10px] font-bold flex items-center gap-1 shadow">
                      <Droplets className="w-3 h-3" />
                      <span>{lang === 'ar' ? 'طبيعي 100%' : '100% Pur'}</span>
                    </span>
                  </div>

                  {/* Price */}
                  <div className="absolute bottom-3 end-3">
                    <div className="px-3 py-1 rounded-xl bg-black/80 backdrop-blur-md border border-amber-400/40 text-[#D4AF37] font-black font-mono text-base shadow flex items-center gap-1.5">
                      <span>{juice.price}</span>
                      <span className="text-xs font-tajawal font-bold text-white">{lang === 'ar' ? 'درهم' : 'Dh'}</span>
                    </div>
                  </div>
                </div>

                {/* Juice Info & Action */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <h3 className="font-cairo font-bold text-lg text-white group-hover:text-amber-400 transition-colors">
                      {t(juice.name)}
                    </h3>
                    <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                      {t(juice.description)}
                    </p>
                  </div>

                  {/* 1-Click Quick Add Button */}
                  <button
                    type="button"
                    onClick={() => handleAddJuice(juice)}
                    className={`w-full py-2.5 px-4 rounded-xl font-cairo font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                      isAdded
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black hover:scale-[1.02] active:scale-95'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4 stroke-[3]" />
                        <span>{lang === 'ar' ? 'تمت الإضافة للمائدة!' : 'Ajouté !'}</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 stroke-[2.5]" />
                        <span>{lang === 'ar' ? 'أضف العصير لوجبتك' : 'Ajouter ce Jus'}</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>

    </section>
  );
};

