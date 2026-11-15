import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowLeft, 
  ArrowRight, 
  Send, 
  Tag, 
  Bike, 
  Store, 
  User, 
  Phone, 
  MapPin, 
  FileText,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Percent
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const CartDrawer = () => {
  const { lang, dir, t } = useLanguage();
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    orderType,
    setOrderType,
    promoCode,
    discountPercent,
    promoMessage,
    applyPromoCode,
    removePromoCode,
    customerInfo,
    setCustomerInfo,
    subtotal,
    discountAmount,
    deliveryFee,
    grandTotal,
    totalItemsCount,
    generateWhatsAppUrl,
  } = useCart();

  const [inputCode, setInputCode] = useState('');
  const [formErrors, setFormErrors] = useState({});

  if (!isCartOpen) return null;

  // Free delivery calculation
  const amountToFreeDelivery = Math.max(0, RESTAURANT_INFO.freeDeliveryThreshold - subtotal);
  const freeDeliveryPercent = Math.min(100, Math.round((subtotal / RESTAURANT_INFO.freeDeliveryThreshold) * 100));

  const handleApplyCode = (e) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    applyPromoCode(inputCode);
    setInputCode('');
  };

  const handleCheckout = (e) => {
    e.preventDefault();

    // Basic validation
    const errors = {};
    if (!customerInfo.name.trim()) {
      errors.name = lang === 'ar' ? 'يرجى إدخال اسمك الكريم' : 'Veuillez saisir votre nom';
    }
    if (!customerInfo.phone.trim() || customerInfo.phone.trim().length < 8) {
      errors.phone = lang === 'ar' ? 'يرجى إدخال رقم هاتف صحيح للتواصل' : 'Numéro de téléphone requis';
    }
    if (orderType === 'delivery' && !customerInfo.address.trim()) {
      errors.address = lang === 'ar' ? 'يرجى إدخال عنوان التوصيل أو الحي' : 'Adresse de livraison requise';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});

    // Confetti effect
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#E85D04', '#10B981'],
      });
    } catch (e) {}

    // Generate WhatsApp URL and redirect
    const url = generateWhatsAppUrl(lang);
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-fadeIn">
      
      {/* Click outside to close */}
      <div 
        className="fixed inset-0" 
        onClick={() => setIsCartOpen(false)} 
      />

      {/* Slide-out Drawer */}
      <div className={`fixed inset-y-0 ${
        dir === 'rtl' ? 'left-0' : 'right-0'
      } max-w-full w-screen sm:max-w-lg bg-[#121212] border-s border-neutral-800 shadow-2xl flex flex-col z-10 transition-transform duration-300`}>
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 bg-neutral-900/90 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E85D04]/15 border border-[#E85D04]/40 flex items-center justify-center text-[#E85D04]">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-cairo font-bold text-lg text-white">
                {lang === 'ar' ? 'سلة الطلبات' : 'Mon Panier'}
              </h2>
              <span className="text-xs text-[#D4AF37] font-medium">
                {totalItemsCount} {lang === 'ar' ? 'وجبات مختارة' : 'articles'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {cartItems.length > 0 && (
              <button
                type="button"
                onClick={clearCart}
                className="p-2 text-neutral-400 hover:text-rose-400 transition-colors text-xs flex items-center gap-1"
                title={lang === 'ar' ? 'إفراغ السلة' : 'Vider le panier'}
              >
                <Trash2 className="w-4 h-4" />
                <span className="hidden sm:inline">{lang === 'ar' ? 'إفراغ' : 'Vider'}</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Free Delivery Bar (if delivery mode and items exist) */}
        {cartItems.length > 0 && orderType === 'delivery' && (
          <div className="bg-[#1C1810] px-4 py-2.5 border-b border-[#D4AF37]/20 text-xs">
            <div className="flex items-center justify-between mb-1 text-neutral-300">
              <span className="flex items-center gap-1.5 font-medium">
                <Bike className="w-3.5 h-3.5 text-[#D4AF37]" />
                {amountToFreeDelivery === 0 ? (
                  <span className="text-emerald-400 font-bold">
                    {lang === 'ar' ? 'تهانينا! حصلت على توصيل مجاني 🎉' : 'Livraison gratuite débloquée ! 🎉'}
                  </span>
                ) : (
                  <span>
                    {lang === 'ar' 
                      ? `أضف بـ ${amountToFreeDelivery} درهم إضافية للتوصيل المجاني`
                      : `Plus que ${amountToFreeDelivery} Dh pour la livraison offerte`}
                  </span>
                )}
              </span>
              <span className="font-mono text-[#D4AF37] font-bold">{freeDeliveryPercent}%</span>
            </div>
            <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-amber-500 to-emerald-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${freeDeliveryPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Scrollable Items & Order Form Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6">
          
          {cartItems.length === 0 ? (
            <div className="py-20 text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto text-neutral-600">
                <ShoppingBag className="w-10 h-10" />
              </div>
              <h3 className="font-cairo font-bold text-lg text-white">
                {lang === 'ar' ? 'سلتك فارغة حالياً' : 'Votre panier est vide'}
              </h3>
              <p className="text-xs text-neutral-400 max-w-xs mx-auto">
                {lang === 'ar'
                  ? 'اختر وجبتك المفضلة من الشاورما أو المشاوي الطازجة والعصائر وأضفها بلمسة واحدة.'
                  : 'Parcourez notre carte et composez votre commande sur mesure.'}
              </p>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#E85D04] to-[#D4AF37] text-neutral-950 font-bold text-sm shadow cursor-pointer hover:scale-105 transition-transform"
              >
                {lang === 'ar' ? 'تصفح قائمة الطعام' : 'Découvrir le Menu'}
              </button>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="space-y-3">
                {cartItems.map((ci) => (
                  <div
                    key={ci.uniqueId}
                    className="p-3.5 rounded-2xl bg-neutral-900/90 border border-neutral-800 flex items-start gap-3 relative group"
                  >
                    {/* Item Thumbnail */}
                    <img
                      src={ci.item.image}
                      alt={t(ci.item.name)}
                      className="w-16 h-16 rounded-xl object-cover border border-neutral-700/80 shrink-0"
                    />

                    {/* Details */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-cairo font-bold text-sm text-white truncate">
                          {t(ci.item.name)}
                        </h4>
                        <button
                          type="button"
                          onClick={() => removeFromCart(ci.uniqueId)}
                          className="text-neutral-500 hover:text-rose-400 transition-colors p-1"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Customization Badges */}
                      <div className="text-[11px] text-neutral-400 space-y-0.5 leading-snug">
                        {ci.customizations.protein && (
                          <span className="block text-[#D4AF37]">
                            • {t(ci.customizations.protein.name)}
                          </span>
                        )}
                        {ci.customizations.size && (
                          <span className="block text-neutral-300">
                            • {t(ci.customizations.size.name)}
                          </span>
                        )}
                        {ci.customizations.addons && ci.customizations.addons.length > 0 && (
                          <span className="block text-neutral-300">
                            + {ci.customizations.addons.map(a => t(a.name)).join('، ')}
                          </span>
                        )}
                        {ci.customizations.notes && (
                          <span className="block text-amber-200 italic">
                            "{ci.customizations.notes}"
                          </span>
                        )}
                      </div>

                      {/* Quantity & Item Total Price */}
                      <div className="pt-2 flex items-center justify-between">
                        <div className="flex items-center gap-2 bg-neutral-950 px-2 py-1 rounded-lg border border-neutral-800">
                          <button
                            type="button"
                            onClick={() => updateQuantity(ci.uniqueId, -1)}
                            className="w-5 h-5 rounded flex items-center justify-center text-neutral-400 hover:text-white"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-mono font-bold text-xs text-white min-w-[14px] text-center">
                            {ci.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(ci.uniqueId, 1)}
                            className="w-5 h-5 rounded flex items-center justify-center text-neutral-400 hover:text-white"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="font-mono font-black text-sm text-[#D4AF37]">
                          {ci.totalPrice} {lang === 'ar' ? 'درهم' : 'Dh'}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Code Input */}
              <div className="p-3.5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
                <form onSubmit={handleApplyCode} className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value)}
                      placeholder={lang === 'ar' ? 'كود الخصم (مثال: 5STARS)' : 'Code promo (ex: 5STARS)'}
                      className="w-full px-3 py-2 ps-8 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white placeholder-neutral-500 uppercase focus:outline-none focus:border-[#D4AF37]"
                    />
                    <Tag className="w-3.5 h-3.5 text-neutral-500 absolute start-2.5 top-2.5" />
                  </div>
                  <button
                    type="submit"
                    className="px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-[#D4AF37] hover:text-black font-semibold text-xs text-white transition-colors cursor-pointer"
                  >
                    {lang === 'ar' ? 'تطبيق' : 'Appliquer'}
                  </button>
                </form>

                {promoMessage && (
                  <div className={`text-xs flex items-center justify-between ${
                    promoMessage.type === 'success' ? 'text-emerald-400' : 'text-rose-400'
                  }`}>
                    <span>{t(promoMessage.text)}</span>
                    {discountPercent > 0 && (
                      <button
                        type="button"
                        onClick={removePromoCode}
                        className="text-[11px] underline text-neutral-400 hover:text-white"
                      >
                        {lang === 'ar' ? 'إلغاء الكود' : 'Retirer'}
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Order Type Toggle: Delivery vs Pickup */}
              <div className="space-y-2">
                <label className="text-xs font-bold font-cairo text-neutral-300 block">
                  {lang === 'ar' ? 'طريقة استلام الطلب:' : 'Mode de Réception :'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setOrderType('delivery')}
                    className={`py-2.5 px-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                      orderType === 'delivery'
                        ? 'bg-gradient-to-r from-[#E85D04]/20 to-[#D4AF37]/20 border-[#D4AF37] text-white shadow-sm'
                        : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Bike className="w-4 h-4 text-[#E85D04]" />
                    <span>{lang === 'ar' ? 'توصيل للمنزل' : 'Livraison'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setOrderType('pickup')}
                    className={`py-2.5 px-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                      orderType === 'pickup'
                        ? 'bg-gradient-to-r from-[#E85D04]/20 to-[#D4AF37]/20 border-[#D4AF37] text-white shadow-sm'
                        : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Store className="w-4 h-4 text-[#D4AF37]" />
                    <span>{lang === 'ar' ? 'استلام من المطعم' : 'À emporter'}</span>
                  </button>
                </div>
              </div>

              {/* Customer Checkout Form */}
              <div className="space-y-3 pt-2 border-t border-neutral-800">
                <span className="text-xs font-bold font-cairo text-[#D4AF37] block">
                  {lang === 'ar' ? 'معلومات الزبون والتوصيل:' : 'Coordonnées de Livraison :'}
                </span>

                {/* Name */}
                <div>
                  <div className="relative">
                    <input
                      type="text"
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                      placeholder={lang === 'ar' ? 'الاسم الكامل *' : 'Nom & Prénom *'}
                      className={`w-full px-3 py-2.5 ps-9 rounded-xl bg-neutral-900 border ${
                        formErrors.name ? 'border-rose-500' : 'border-neutral-800'
                      } text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37]`}
                    />
                    <User className="w-4 h-4 text-neutral-500 absolute start-3 top-3" />
                  </div>
                  {formErrors.name && (
                    <span className="text-[10px] text-rose-400 mt-0.5 block">{formErrors.name}</span>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <div className="relative">
                    <input
                      type="tel"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                      placeholder={lang === 'ar' ? 'رقم الهاتف / الواتساب * (مثال: 0661123456)' : 'Numéro WhatsApp *'}
                      className={`w-full px-3 py-2.5 ps-9 rounded-xl bg-neutral-900 border ${
                        formErrors.phone ? 'border-rose-500' : 'border-neutral-800'
                      } text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37]`}
                    />
                    <Phone className="w-4 h-4 text-neutral-500 absolute start-3 top-3" />
                  </div>
                  {formErrors.phone && (
                    <span className="text-[10px] text-rose-400 mt-0.5 block">{formErrors.phone}</span>
                  )}
                </div>

                {/* Address (only if delivery) */}
                {orderType === 'delivery' && (
                  <div>
                    <div className="relative">
                      <input
                        type="text"
                        value={customerInfo.address}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                        placeholder={lang === 'ar' ? 'الحي، اسم الشارع، رقم العمارة أو الشقة *' : 'Quartier, Rue, N° Immeuble / Étage *'}
                        className={`w-full px-3 py-2.5 ps-9 rounded-xl bg-neutral-900 border ${
                          formErrors.address ? 'border-rose-500' : 'border-neutral-800'
                        } text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37]`}
                      />
                      <MapPin className="w-4 h-4 text-neutral-500 absolute start-3 top-3" />
                    </div>
                    {formErrors.address && (
                      <span className="text-[10px] text-rose-400 mt-0.5 block">{formErrors.address}</span>
                    )}
                  </div>
                )}

                {/* Delivery Notes */}
                <div className="relative">
                  <input
                    type="text"
                    value={customerInfo.notes}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, notes: e.target.value })}
                    placeholder={lang === 'ar' ? 'ملاحظات إضافية على الطلب (اختياري)' : 'Instructions de livraison (facultatif)'}
                    className="w-full px-3 py-2.5 ps-9 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                  <FileText className="w-4 h-4 text-neutral-500 absolute start-3 top-3" />
                </div>
              </div>
            </>
          )}

        </div>

        {/* Drawer Footer: Price Breakdown & WhatsApp Checkout Button */}
        {cartItems.length > 0 && (
          <div className="p-4 sm:p-5 bg-neutral-900 border-t border-neutral-800 space-y-3">
            
            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs text-neutral-400 font-medium">
              <div className="flex justify-between">
                <span>{lang === 'ar' ? 'المجموع الفرعي:' : 'Sous-total :'}</span>
                <span className="font-mono text-white">{subtotal} {lang === 'ar' ? 'درهم' : 'Dh'}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>{lang === 'ar' ? `الخصم (${promoCode}):` : `Remise (${promoCode}) :`}</span>
                  <span className="font-mono">-{discountAmount} {lang === 'ar' ? 'درهم' : 'Dh'}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>{lang === 'ar' ? 'رسوم التوصيل:' : 'Frais de livraison :'}</span>
                <span className="font-mono text-white">
                  {orderType === 'pickup' 
                    ? (lang === 'ar' ? 'مجاناً (استلام)' : 'Gratuit')
                    : deliveryFee === 0
                      ? (lang === 'ar' ? 'مجاناً (توصيل مجاني)' : 'Gratuit')
                      : `${deliveryFee} ${lang === 'ar' ? 'درهم' : 'Dh'}`}
                </span>
              </div>

              <div className="pt-2 border-t border-neutral-800 flex justify-between items-baseline text-white">
                <span className="font-cairo font-bold text-sm sm:text-base">
                  {lang === 'ar' ? 'المجموع الإجمالي للدفع:' : 'TOTAL À PAYER :'}
                </span>
                <span className="font-mono font-black text-xl text-[#D4AF37]">
                  {grandTotal} <span className="text-xs font-tajawal font-bold text-white">{lang === 'ar' ? 'درهم' : 'Dh'}</span>
                </span>
              </div>
            </div>

            {/* Direct WhatsApp Checkout Button */}
            <button
              type="button"
              onClick={handleCheckout}
              className="w-full py-4 px-4 rounded-xl bg-gradient-to-r from-[#25D366] via-[#1EBE5D] to-[#128C7E] hover:from-[#22bf5b] hover:to-[#0f776a] text-white font-cairo font-black text-sm sm:text-base shadow-xl shadow-emerald-900/30 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-5 h-5 rtl:rotate-180" />
              <span>{lang === 'ar' ? 'إرسال الطلب عبر واتساب' : 'Commander via WhatsApp'}</span>
            </button>

            <p className="text-[10px] text-center text-neutral-500">
              {lang === 'ar'
                ? '🔒 سيتم فتح محادثة واتساب مع المطعم مباشرة متضمنة الفاتورة وتفاصيل طلبك'
                : '🔒 Ouvre directement une conversation WhatsApp préremplie avec le restaurant.'}
            </p>

          </div>
        )}

      </div>

    </div>
  );
};

