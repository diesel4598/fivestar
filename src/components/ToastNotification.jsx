import React from 'react';
import { CheckCircle2, ShoppingBag, ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';

export const ToastNotification = () => {
  const { lang, dir, t } = useLanguage();
  const { lastAddedNotification, setIsCartOpen } = useCart();

  if (!lastAddedNotification) return null;

  const { item, quantity } = lastAddedNotification;

  return (
    <div className={`fixed top-20 ${
      dir === 'rtl' ? 'left-4 sm:left-6' : 'right-4 sm:right-6'
    } z-50 animate-bounce-short max-w-sm w-full pointer-events-auto`}>
      <div className="p-3.5 rounded-2xl glass-panel-gold border border-[#D4AF37]/60 shadow-2xl flex items-center justify-between gap-3 text-white">
        
        <div className="flex items-center gap-2.5 min-w-0">
          <img
            src={item.image}
            alt={t(item.name)}
            className="w-11 h-11 rounded-xl object-cover border border-[#D4AF37]/50 shrink-0"
          />
          <div className="min-w-0">
            <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'أُضيفت إلى السلة!' : 'Ajouté au panier !'}</span>
            </div>
            <h4 className="font-cairo font-bold text-xs truncate text-white">
              {quantity}x {t(item.name)}
            </h4>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsCartOpen(true)}
          className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#E85D04] to-[#D4AF37] text-neutral-950 font-bold text-xs shrink-0 hover:scale-105 active:scale-95 transition-all shadow cursor-pointer flex items-center gap-1"
        >
          <span>{lang === 'ar' ? 'السلة' : 'Panier'}</span>
          {dir === 'rtl' ? <ArrowLeft className="w-3 h-3" /> : <ArrowRight className="w-3 h-3" />}
        </button>

      </div>
    </div>
  );
};

