import React from 'react';
import { ShoppingBag, ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';

export const MobileStickyBar = () => {
  const { lang, dir } = useLanguage();
  const { totalItemsCount, grandTotal, setIsCartOpen } = useCart();

  if (totalItemsCount === 0) return null;

  return (
    <div className="lg:hidden fixed bottom-3 left-3 right-3 z-40 animate-slideUp">
      <button
        onClick={() => setIsCartOpen(true)}
        className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-[#E85D04] via-[#F48C06] to-[#D4AF37] text-neutral-950 font-cairo font-black shadow-2xl shadow-amber-950/60 flex items-center justify-between border border-amber-300/40 active:scale-[0.98] transition-transform cursor-pointer"
      >
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-black/20 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-black" />
            </div>
            <span className="absolute -top-1.5 -end-1.5 bg-black text-[#D4AF37] text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-[#D4AF37]">
              {totalItemsCount}
            </span>
          </div>
          <div className="text-start">
            <span className="text-xs uppercase tracking-wider block font-bold text-neutral-900 leading-tight">
              {lang === 'ar' ? 'سلة الطلبات' : 'Mon Panier'}
            </span>
            <span className="text-[11px] text-neutral-800 font-medium">
              {totalItemsCount} {lang === 'ar' ? 'وجبة مختارة' : 'articles'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-base font-black bg-black/15 px-2.5 py-1 rounded-lg">
            {grandTotal} {lang === 'ar' ? 'درهم' : 'Dh'}
          </span>
          {dir === 'rtl' ? (
            <ArrowLeft className="w-5 h-5" />
          ) : (
            <ArrowRight className="w-5 h-5" />
          )}
        </div>
      </button>
    </div>
  );
};

