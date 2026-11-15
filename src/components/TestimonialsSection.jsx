import React from 'react';
import { Star, Quote, Heart, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { TESTIMONIALS } from '../data/restaurantData';

export const TestimonialsSection = () => {
  const { lang, t } = useLanguage();

  return (
    <section id="reviews" className="py-16 lg:py-24 bg-[#0E0E0E] relative overflow-hidden border-t border-neutral-800/80 scroll-mt-20">
      
      {/* Decorative Glow */}
      <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-[#D4AF37]/35 text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
            <Star className="w-3.5 h-3.5 fill-[#D4AF37]" />
            <span>{lang === 'ar' ? 'ثقة زبائننا الغالية' : 'Avis & Témoignages'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black font-cairo text-white">
            {lang === 'ar' ? 'ماذا يقول عشاق المذاق الأصيل عنا؟' : 'Ce que nos clients fidèles disent de nous'}
          </h2>

          <p className="text-sm text-neutral-400">
            {lang === 'ar'
              ? 'أكثر من 2,500 تقييم 5 نجوم على منصات التوصيل وجوجل لمطعم خمس نجوم'
              : 'Plus de 2500 notes 5 étoiles sur Google et les applications de livraison.'}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {TESTIMONIALS.map((testi) => (
            <div
              key={testi.id}
              className="rounded-3xl bg-[#141414] border border-neutral-800/90 hover:border-[#D4AF37]/40 p-6 sm:p-7 flex flex-col justify-between space-y-6 shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="space-y-4">
                {/* Stars & Quote Icon */}
                <div className="flex items-center justify-between">
                  <div className="flex text-[#D4AF37] gap-1">
                    {[...Array(testi.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#D4AF37]" />
                    ))}
                  </div>
                  <Quote className="w-7 h-7 text-[#D4AF37]/25" />
                </div>

                {/* Comment Text */}
                <p className="text-sm text-neutral-300 leading-relaxed italic">
                  "{t(testi.comment)}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
                <div>
                  <h4 className="font-cairo font-bold text-sm text-white">
                    {t(testi.name)}
                  </h4>
                  <span className="text-[11px] text-[#D4AF37]">
                    {t(testi.location)}
                  </span>
                </div>
                <span className="text-[11px] text-neutral-500 font-mono">
                  {t(testi.date)}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

    </section>
  );
};

