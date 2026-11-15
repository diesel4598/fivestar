import React, { useState, useEffect } from 'react';
import { 
  X, 
  Plus, 
  Minus, 
  Check, 
  Sparkles, 
  Flame, 
  ShieldCheck, 
  Info,
  ShoppingBag
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { ADDONS_LIST } from '../data/restaurantData';

export const CustomizeModal = ({ item, isOpen, onClose }) => {
  const { lang, t } = useLanguage();
  const { addToCart } = useCart();

  if (!isOpen || !item) return null;

  // Selected state
  const [selectedProtein, setSelectedProtein] = useState(
    item.options?.proteins ? item.options.proteins[0] : null
  );
  const [selectedSize, setSelectedSize] = useState(
    item.options?.sizes ? item.options.sizes[0] : null
  );
  const [selectedSpiciness, setSelectedSpiciness] = useState(
    item.options?.spiciness ? item.options.spiciness[0] : null
  );
  const [selectedSugar, setSelectedSugar] = useState(
    item.options?.sugar ? item.options.sugar[0] : null
  );
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [specialNotes, setSpecialNotes] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Reset or initialize on item change
  useEffect(() => {
    if (item) {
      setSelectedProtein(item.options?.proteins ? item.options.proteins[0] : null);
      setSelectedSize(item.options?.sizes ? item.options.sizes[0] : null);
      setSelectedSpiciness(item.options?.spiciness ? item.options.spiciness[0] : null);
      setSelectedSugar(item.options?.sugar ? item.options.sugar[0] : null);
      setSelectedAddons([]);
      setSpecialNotes('');
      setQuantity(1);
    }
  }, [item]);

  // Toggle addon
  const toggleAddon = (addon) => {
    setSelectedAddons(prev => {
      const exists = prev.some(a => a.id === addon.id);
      if (exists) {
        return prev.filter(a => a.id !== addon.id);
      } else {
        return [...prev, addon];
      }
    });
  };

  // Calculate dynamic unit price
  let currentUnitPrice = item.price;
  if (selectedProtein?.price) currentUnitPrice += selectedProtein.price;
  if (selectedSize?.price) currentUnitPrice += selectedSize.price;
  if (selectedSpiciness?.price) currentUnitPrice += selectedSpiciness.price;
  if (selectedSugar?.price) currentUnitPrice += selectedSugar.price;
  const addonsTotal = selectedAddons.reduce((acc, curr) => acc + curr.price, 0);
  currentUnitPrice += addonsTotal;

  const currentTotalPrice = currentUnitPrice * quantity;

  const handleConfirmAddToCart = () => {
    const customizations = {
      protein: selectedProtein,
      size: selectedSize,
      spiciness: selectedSpiciness,
      sugar: selectedSugar,
      addons: selectedAddons,
      notes: specialNotes.trim(),
    };

    addToCart(item, customizations, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-fadeIn">
      
      {/* Click outside to close */}
      <div 
        className="fixed inset-0" 
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl bg-[#141414] border border-[#D4AF37]/30 rounded-3xl shadow-2xl overflow-hidden z-10 my-8">
        
        {/* Top Header with Image Preview */}
        <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-neutral-900">
          <img
            src={item.image}
            alt={t(item.name)}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/40 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 sm:right-5 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer hover:rotate-90"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Dish Title & Price Pill */}
          <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
            <div>
              <span className="text-xs font-semibold text-[#D4AF37] block mb-0.5">
                {lang === 'ar' ? 'تخصيص وجبتك' : 'Personnalisez votre plat'}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-cairo text-white">
                {t(item.name)}
              </h2>
            </div>
            <div className="bg-gradient-to-r from-[#E85D04] to-[#D4AF37] text-neutral-950 font-black px-3.5 py-1.5 rounded-xl font-mono text-base shadow-lg">
              {currentUnitPrice} {lang === 'ar' ? 'درهم' : 'Dh'}
            </div>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          
          {/* Description */}
          <p className="text-sm text-neutral-300 leading-relaxed">
            {t(item.description)}
          </p>

          {/* Option: Protein / Meat Choice (if available) */}
          {item.options?.proteins && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold font-cairo text-white flex items-center gap-2">
                  <Flame className="w-4 h-4 text-[#E85D04]" />
                  <span>{lang === 'ar' ? 'نوع اللحم / الحشوة' : 'Choix de la Viande'}</span>
                </label>
                <span className="text-[11px] text-[#D4AF37] font-semibold">
                  {lang === 'ar' ? 'مطلوب (اختيار واحد)' : 'Obligatoire'}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {item.options.proteins.map((opt) => {
                  const isSelected = selectedProtein?.id === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedProtein(opt)}
                      className={`p-3 rounded-xl border text-start flex items-center justify-between transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#E85D04]/15 border-[#E85D04] text-white shadow-md'
                          : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-[#E85D04] bg-[#E85D04]' : 'border-neutral-600'
                        }`}>
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                        <span className="text-xs sm:text-sm font-medium">{t(opt.name)}</span>
                      </div>
                      {opt.price > 0 && (
                        <span className="text-xs font-bold text-[#D4AF37] font-mono">
                          +{opt.price} {lang === 'ar' ? 'درهم' : 'Dh'}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Option: Size / Format (if available) */}
          {item.options?.sizes && (
            <div className="space-y-3 pt-2 border-t border-neutral-800/80">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold font-cairo text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  <span>{lang === 'ar' ? 'الحجم / الكمية' : 'Format de la Portion'}</span>
                </label>
                <span className="text-[11px] text-neutral-400">
                  {lang === 'ar' ? 'اختياري' : 'Optionnel'}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {item.options.sizes.map((opt) => {
                  const isSelected = selectedSize?.id === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedSize(opt)}
                      className={`p-3 rounded-xl border text-start flex items-center justify-between transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#D4AF37]/15 border-[#D4AF37] text-white shadow-md'
                          : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-[#D4AF37] bg-[#D4AF37]' : 'border-neutral-600'
                        }`}>
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
                        </div>
                        <span className="text-xs sm:text-sm font-medium">{t(opt.name)}</span>
                      </div>
                      {opt.price > 0 && (
                        <span className="text-xs font-bold text-[#D4AF37] font-mono">
                          +{opt.price} {lang === 'ar' ? 'درهم' : 'Dh'}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Option: Spiciness (if available) */}
          {item.options?.spiciness && (
            <div className="space-y-3 pt-2 border-t border-neutral-800/80">
              <label className="text-sm font-bold font-cairo text-white flex items-center gap-2">
                <span>🌶️</span>
                <span>{lang === 'ar' ? 'درجة الحرارة والتتبيلة' : 'Niveau de piment'}</span>
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {item.options.spiciness.map((opt) => {
                  const isSelected = selectedSpiciness?.id === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedSpiciness(opt)}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer text-xs sm:text-sm font-medium ${
                        isSelected
                          ? 'bg-rose-950/40 border-rose-500 text-rose-300'
                          : 'bg-neutral-900 border-neutral-800 text-neutral-300'
                      }`}
                    >
                      {t(opt.name)}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Add-ons Checklist */}
          <div className="space-y-3 pt-2 border-t border-neutral-800/80">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold font-cairo text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#D4AF37]" />
                <span>{lang === 'ar' ? 'إضافات ومقبلات جانبية' : 'Suppléments & Extras'}</span>
              </label>
              <span className="text-[11px] text-[#D4AF37]">
                {lang === 'ar' ? 'اختر ما تحب' : 'Au choix'}
              </span>
            </div>
            <div className="space-y-2">
              {ADDONS_LIST.map((addon) => {
                const isChecked = selectedAddons.some(a => a.id === addon.id);
                return (
                  <div
                    key={addon.id}
                    onClick={() => toggleAddon(addon)}
                    className={`p-3 rounded-xl border flex items-center justify-between transition-all cursor-pointer select-none ${
                      isChecked
                        ? 'bg-[#D4AF37]/10 border-[#D4AF37]/70 text-white'
                        : 'bg-neutral-900 border-neutral-800/80 text-neutral-300 hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                        isChecked ? 'bg-[#D4AF37] border-[#D4AF37] text-black' : 'border-neutral-600 bg-neutral-800'
                      }`}>
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <span className="text-xs sm:text-sm">{t(addon.name)}</span>
                    </div>
                    <span className="text-xs font-bold font-mono text-amber-400">
                      +{addon.price} {lang === 'ar' ? 'درهم' : 'Dh'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Special Instructions Note */}
          <div className="space-y-2 pt-2 border-t border-neutral-800/80">
            <label className="text-sm font-bold font-cairo text-white">
              {lang === 'ar' ? 'ملاحظات خاصة للشيف' : 'Instructions spéciales'}
            </label>
            <input
              type="text"
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
              placeholder={lang === 'ar' ? 'مثال: بدون مخلل، ثوم زيادة، تحمير إضافي...' : 'Ex: sans cornichons, ail supplémentaire...'}
              className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 text-xs sm:text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
            />
          </div>

        </div>

        {/* Modal Footer: Quantity Stepper & Add to Cart Button */}
        <div className="p-4 sm:p-6 bg-neutral-900/90 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Quantity Stepper */}
          <div className="flex items-center gap-3 bg-neutral-950 px-3 py-1.5 rounded-xl border border-neutral-800">
            <span className="text-xs text-neutral-400 font-medium">
              {lang === 'ar' ? 'الكمية:' : 'Qté:'}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="w-7 h-7 rounded-lg bg-neutral-800 hover:bg-neutral-700 disabled:opacity-40 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono font-bold text-white text-base min-w-[20px] text-center">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              className="w-7 h-7 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add to Cart Submit Button */}
          <button
            type="button"
            onClick={handleConfirmAddToCart}
            className="w-full sm:w-auto flex-1 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#E85D04] via-[#F48C06] to-[#D4AF37] hover:from-[#f06810] hover:to-[#dfbb43] text-black font-cairo font-bold text-sm sm:text-base shadow-xl shadow-amber-600/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>{lang === 'ar' ? 'أضف للسلة' : 'Ajouter au Panier'}</span>
            <span className="font-mono font-black border-s border-black/25 ps-2 ms-1">
              {currentTotalPrice} {lang === 'ar' ? 'درهم' : 'Dh'}
            </span>
          </button>

        </div>

      </div>

    </div>
  );
};

