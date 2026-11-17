import React from 'react';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Send, 
  ShieldCheck, 
  Flame, 
  Heart,
  ExternalLink,
  Navigation,
  Lock
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useMenu } from '../context/MenuContext';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const LocationFooterSection = () => {
  const { lang, dir, t } = useLanguage();
  const { requestOpenManager, isAdminRevealed, isAuthenticated, siteContent } = useMenu();

  return (
    <footer id="contact" className="relative bg-[#0A0A0A] text-neutral-300 pt-16 pb-24 lg:pb-12 border-t border-neutral-800 scroll-mt-20">
      
      {/* Ambient background light */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-[#E85D04]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          {/* Card 1: Address & Maps */}
          <div className="p-6 rounded-3xl bg-[#141414] border border-neutral-800/90 space-y-4 hover:border-[#D4AF37]/40 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-[#E85D04]/10 border border-[#E85D04]/30 flex items-center justify-center text-[#E85D04]">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-cairo font-bold text-lg text-white mb-1">
                {lang === 'ar' ? 'موقعنا في الدار البيضاء' : 'Notre Adresse'}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                {siteContent?.address?.[lang] || t(RESTAURANT_INFO.address)}
              </p>
            </div>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#D4AF37] hover:underline pt-2"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'افتح الموقع عبر خرائط جوجل' : 'Ouvrir sur Google Maps'}</span>
            </a>
          </div>

          {/* Card 2: Operating Hours */}
          <div className="p-6 rounded-3xl bg-[#141414] border border-neutral-800/90 space-y-4 hover:border-[#D4AF37]/40 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-cairo font-bold text-lg text-white mb-1">
                {lang === 'ar' ? 'ساعات العمل والتوصيل' : 'Horaires d\'Ouverture'}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                {siteContent?.openingHours?.[lang] || t(RESTAURANT_INFO.openingHours)}
              </p>
              <span className="inline-block mt-2 px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold">
                {lang === 'ar' ? 'خدمة التوصيل السريع متاحة طوال الوقت' : 'Service de livraison continu'}
              </span>
            </div>
          </div>

          {/* Card 3: Contact & Direct WhatsApp */}
          <div className="p-6 rounded-3xl bg-[#141414] border border-neutral-800/90 space-y-4 hover:border-[#D4AF37]/40 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-cairo font-bold text-lg text-white mb-1">
                {lang === 'ar' ? 'الطلب المباشر والاستفسارات' : 'Contact & Réservations'}
              </h3>
              <p className="text-xs text-neutral-400 mb-3">
                {lang === 'ar' ? 'نسعد بخدمتكم وتلبية طلبات الحفلات والولائم' : 'À votre service pour vos commandes et réceptions'}
              </p>
              <div className="flex flex-col gap-2">
                <a
                  href={`tel:${siteContent?.phone || RESTAURANT_INFO.phone}`}
                  className="inline-flex items-center gap-2 text-sm font-black text-white hover:text-[#D4AF37] transition-colors"
                  dir="ltr"
                >
                  <Phone className="w-4 h-4 text-[#E85D04]" />
                  <span>{siteContent?.phone || RESTAURANT_INFO.phone}</span>
                </a>
                <a
                  href={`https://wa.me/${siteContent?.whatsappNumber || RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(lang === 'ar' ? 'السلام عليكم، أود الاستفسار عن المنيو والطلبات' : 'Bonjour, je souhaite me renseigner sur le menu')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 hover:text-emerald-300"
                >
                  <Send className="w-3.5 h-3.5 rtl:rotate-180" />
                  <span>{lang === 'ar' ? 'تحدث مباشرة عبر واتساب' : 'Discuter sur WhatsApp'}</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Visual Map / Location Embed Placeholder */}
        <div className="relative rounded-3xl overflow-hidden border border-neutral-800 mb-14 bg-neutral-900 h-64 sm:h-80 shadow-2xl flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-cover bg-center filter grayscale contrast-125 opacity-35"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80')`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-black/40 to-[#0A0A0A]" />
          
          <div className="relative z-10 text-center p-6 space-y-3 max-w-md">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#E85D04] to-[#D4AF37] text-neutral-950 flex items-center justify-center mx-auto shadow-xl animate-bounce">
              <MapPin className="w-7 h-7" />
            </div>
            <h4 className="font-cairo font-black text-xl text-white">
              {siteContent?.brandName?.[lang] || (lang === 'ar' ? 'مطعم خمس نجوم - المعاريف' : '5 ÉTOILES - Casablanca Maârif')}
            </h4>
            <p className="text-xs text-neutral-300">
              {siteContent?.address?.[lang] || t(RESTAURANT_INFO.address)}
            </p>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-900/90 border border-[#D4AF37]/50 hover:bg-[#D4AF37] hover:text-black text-white text-xs font-bold transition-all shadow cursor-pointer"
            >
              <span>{lang === 'ar' ? 'بدء الملاحة عبر خرائط جوجل' : 'Itinéraire Google Maps'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Brand Bottom Footer */}
        <div className="pt-8 border-t border-neutral-800/80 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-neutral-500">
          
          {/* Logo & Halal badge */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 font-cairo font-bold text-white text-base">
              <Flame className="w-4 h-4 text-[#E85D04]" />
              <span>{siteContent?.brandName?.[lang] || (lang === 'ar' ? 'خمس نجوم' : '5 ÉTOILES')}</span>
            </div>
            <span className="text-neutral-700">|</span>
            <span className="flex items-center gap-1 text-[#D4AF37] font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'لحوم حلال 100% طازجة يومياً' : 'Viande 100% Halal Certifiée'}</span>
            </span>
          </div>

          {/* Social Links with SVG */}
          <div className="flex items-center gap-4 text-neutral-400">
            {/* Instagram SVG */}
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-[#D4AF37] transition-colors p-1" 
              aria-label="Instagram"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            {/* Facebook SVG */}
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-[#D4AF37] transition-colors p-1" 
              aria-label="Facebook"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.688 5H18V0h-3.808C10.597 0 9 1.583 9 4.615V8z"/>
              </svg>
            </a>
            {/* WhatsApp SVG */}
            <a 
              href={`https://wa.me/${siteContent?.whatsappNumber || RESTAURANT_INFO.whatsappNumber}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-[#25D366] transition-colors p-1" 
              aria-label="WhatsApp"
            >
              <Send className="w-4 h-4 rtl:rotate-180" />
            </a>
          </div>

          {/* Copyright & Discreet Admin Access */}
          <div className="flex items-center gap-4">
            <span>© {new Date().getFullYear()} {lang === 'ar' ? 'خمس نجوم - جميع الحقوق محفوظة' : '5 Étoiles. Tous droits réservés.'}</span>
            {(isAdminRevealed || isAuthenticated) && (
              <>
                <span className="text-neutral-700">•</span>
                <button
                  type="button"
                  onClick={requestOpenManager}
                  className="inline-flex items-center gap-1 text-[11px] text-neutral-500 hover:text-[#D4AF37] transition-colors cursor-pointer animate-fadeIn"
                >
                  <Lock className="w-3 h-3" />
                  <span>{lang === 'ar' ? 'دخول الإدارة 🔒' : 'Espace Gérant 🔒'}</span>
                </button>
              </>
            )}
          </div>

        </div>

      </div>

    </footer>
  );
};
