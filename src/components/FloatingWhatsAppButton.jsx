import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useMenu } from '../context/MenuContext';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const FloatingWhatsAppButton = () => {
  const { lang, dir } = useLanguage();
  const { siteContent } = useMenu();
  const whatsappNumber = siteContent?.whatsappNumber || RESTAURANT_INFO.whatsappNumber;

  const message = encodeURIComponent(
    lang === 'ar'
      ? 'مرحباً مطعم خمس نجوم، أود الاستفسار عن المنيو وتوصيل الطلبات.'
      : 'Bonjour 5 Étoiles, je souhaite me renseigner sur le menu et la livraison.'
  );

  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact via WhatsApp"
      className={`fixed bottom-20 lg:bottom-6 ${
        dir === 'rtl' ? 'left-4 sm:left-6' : 'right-4 sm:right-6'
      } z-30 group flex items-center gap-2.5 px-3.5 py-3 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-2xl shadow-emerald-950/60 transition-all duration-300 hover:scale-105 active:scale-95`}
    >
      <div className="relative flex items-center justify-center">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-40"></span>
        <MessageCircle className="w-6 h-6 fill-white text-[#25D366]" />
      </div>
      <span className="hidden sm:inline font-cairo font-bold text-xs">
        {lang === 'ar' ? 'طلب فوري واتساب' : 'WhatsApp'}
      </span>
    </a>
  );
};

