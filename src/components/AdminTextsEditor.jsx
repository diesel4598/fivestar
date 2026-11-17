import React, { useState, useEffect } from 'react';
import { 
  Save, 
  RotateCcw, 
  Check, 
  AlertTriangle, 
  Type, 
  Megaphone, 
  Phone, 
  Clock, 
  MapPin, 
  Sparkles, 
  Crown, 
  Citrus, 
  Flame, 
  Layers,
  Truck,
  HelpCircle
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useMenu } from '../context/MenuContext';

export const AdminTextsEditor = () => {
  const { lang, dir } = useLanguage();
  const { siteContent, updateSiteContent, resetSiteContentToDefault } = useMenu();

  // Local draft state for editing form
  const [formData, setFormData] = useState({ ...siteContent });
  const [activeSection, setActiveSection] = useState('header'); // 'header' | 'hero' | 'sections' | 'location'
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  const [isSavedRecently, setIsSavedRecently] = useState(false);

  // Keep in sync when siteContent updates from outside
  useEffect(() => {
    setFormData({ ...siteContent });
  }, [siteContent]);

  const handleTextChange = (path, value) => {
    setFormData(prev => {
      const copy = { ...prev };
      const keys = path.split('.');
      if (keys.length === 1) {
        copy[keys[0]] = value;
      } else if (keys.length === 2) {
        copy[keys[0]] = {
          ...copy[keys[0]],
          [keys[1]]: value,
        };
      }
      return copy;
    });
  };

  const handleSave = (e) => {
    if (e) e.preventDefault();
    updateSiteContent(formData);
    setIsSavedRecently(true);
    setTimeout(() => setIsSavedRecently(false), 3000);
  };

  const handleReset = () => {
    resetSiteContentToDefault();
    setShowConfirmReset(false);
  };

  return (
    <div className="space-y-6 pb-8">
      
      {/* Sub-navigation Tabs for Sections */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-neutral-900/90 p-1.5 rounded-2xl border border-neutral-800">
        <button
          type="button"
          onClick={() => setActiveSection('header')}
          className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-bold transition-all ${
            activeSection === 'header'
              ? 'bg-[#E85D04] text-white shadow-lg shadow-orange-950/40'
              : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
          }`}
        >
          <Megaphone className="w-3.5 h-3.5" />
          <span>{lang === 'ar' ? 'الهيدر والشريط العلوي' : 'En-tête & Contact'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSection('hero')}
          className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-bold transition-all ${
            activeSection === 'hero'
              ? 'bg-[#D4AF37] text-neutral-950 shadow-lg shadow-amber-950/40'
              : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{lang === 'ar' ? 'الواجهة الرئيسية (الهيرو)' : 'Section Hero'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSection('sections')}
          className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-bold transition-all ${
            activeSection === 'sections'
              ? 'bg-amber-600 text-white shadow-lg'
              : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>{lang === 'ar' ? 'عناوين الأقسام' : 'Titres de sections'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSection('location')}
          className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-bold transition-all ${
            activeSection === 'location'
              ? 'bg-emerald-600 text-white shadow-lg'
              : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
          }`}
        >
          <Truck className="w-3.5 h-3.5" />
          <span>{lang === 'ar' ? 'التوصيل والموقع' : 'Livraison & Adresse'}</span>
        </button>
      </div>

      {/* Main Edit Form */}
      <form onSubmit={handleSave} className="space-y-6">

        {/* SECTION 1: HEADER & CONTACTS */}
        {activeSection === 'header' && (
          <div className="space-y-5 animate-fadeIn">
            
            {/* Top Announcement Bar */}
            <div className="p-4 sm:p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
              <div className="flex items-center gap-2 text-[#E85D04] font-bold text-sm">
                <Megaphone className="w-4 h-4" />
                <span>{lang === 'ar' ? 'نص الشريط الإعلاني العلوي (Announcement Bar)' : 'Texte de la bannière supérieure'}</span>
              </div>
              <p className="text-xs text-neutral-400">
                {lang === 'ar' 
                  ? 'الشريط الأحمر/الذهبي أعلى الصفحة المخصص لعروض الخصم وأكواد الترويج.' 
                  : 'Bannière défilante en haut pour les promotions et codes de réduction.'}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1.5 flex items-center gap-1">
                    <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-[#D4AF37] text-[10px]">عربي</span>
                    <span>النص بالعربية</span>
                  </label>
                  <input
                    type="text"
                    value={formData.topAnnouncement?.ar || ''}
                    onChange={(e) => handleTextChange('topAnnouncement.ar', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-white text-xs sm:text-sm focus:border-[#D4AF37] focus:outline-none"
                    placeholder="كود خصم 10% على طلبك..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1.5 flex items-center gap-1">
                    <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 text-[10px]">Français</span>
                    <span>النص بالفرنسية</span>
                  </label>
                  <input
                    type="text"
                    value={formData.topAnnouncement?.fr || ''}
                    onChange={(e) => handleTextChange('topAnnouncement.fr', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-white text-xs sm:text-sm focus:border-[#D4AF37] focus:outline-none"
                    placeholder="-10% avec le code..."
                    dir="ltr"
                  />
                </div>
              </div>
            </div>

            {/* Brand Logo & Tagline */}
            <div className="p-4 sm:p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
              <div className="flex items-center gap-2 text-[#D4AF37] font-bold text-sm">
                <Type className="w-4 h-4" />
                <span>{lang === 'ar' ? 'اسم المطعم والشعار في الهيدر' : 'Nom du restaurant & Slogan'}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1.5">
                    {lang === 'ar' ? 'اسم المطعم (عربي)' : 'Nom (Arabe)'}
                  </label>
                  <input
                    type="text"
                    value={formData.brandName?.ar || ''}
                    onChange={(e) => handleTextChange('brandName.ar', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-white text-xs sm:text-sm focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1.5">
                    {lang === 'ar' ? 'اسم المطعم (فرنسي)' : 'Nom (Français)'}
                  </label>
                  <input
                    type="text"
                    value={formData.brandName?.fr || ''}
                    onChange={(e) => handleTextChange('brandName.fr', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-white text-xs sm:text-sm focus:border-[#D4AF37] focus:outline-none"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1.5">
                    {lang === 'ar' ? 'الوصف المختصر تحت الشعار (عربي)' : 'Slogan (Arabe)'}
                  </label>
                  <input
                    type="text"
                    value={formData.brandSubtitle?.ar || ''}
                    onChange={(e) => handleTextChange('brandSubtitle.ar', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-white text-xs sm:text-sm focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1.5">
                    {lang === 'ar' ? 'الوصف المختصر تحت الشعار (فرنسي)' : 'Slogan (Français)'}
                  </label>
                  <input
                    type="text"
                    value={formData.brandSubtitle?.fr || ''}
                    onChange={(e) => handleTextChange('brandSubtitle.fr', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-white text-xs sm:text-sm focus:border-[#D4AF37] focus:outline-none"
                    dir="ltr"
                  />
                </div>
              </div>
            </div>

            {/* Phone & WhatsApp Reception */}
            <div className="p-4 sm:p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Phone className="w-4 h-4" />
                <span>{lang === 'ar' ? 'أرقام الاتصال واستقبال طلبيات واتساب' : 'Téléphone & Commandes WhatsApp'}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1.5">
                    {lang === 'ar' ? 'هاتف المطعم للاتصال السريع' : 'Numéro de téléphone direct'}
                  </label>
                  <input
                    type="text"
                    value={formData.phone || ''}
                    onChange={(e) => handleTextChange('phone', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-white text-xs sm:text-sm focus:border-emerald-500 focus:outline-none"
                    dir="ltr"
                    placeholder="+212 694-916737"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-emerald-300 mb-1.5 flex items-center justify-between">
                    <span>{lang === 'ar' ? 'رقم استقبال الطلبيات على واتساب' : 'Numéro WhatsApp (Réception commandes)'}</span>
                    <span className="text-[10px] text-neutral-400">{lang === 'ar' ? '(بدون +)' : '(sans +)'}</span>
                  </label>
                  <input
                    type="text"
                    value={formData.whatsappNumber || ''}
                    onChange={(e) => handleTextChange('whatsappNumber', e.target.value.replace(/\D/g, ''))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-800 border border-emerald-500/60 text-white text-xs sm:text-sm focus:border-emerald-400 focus:outline-none"
                    dir="ltr"
                    placeholder="212694916737"
                  />
                  <span className="text-[10px] text-neutral-400 block mt-1">
                    {lang === 'ar' ? 'هذا هو الرقم الذي تصله الفاتورة عند ضغط الزبون على "إرسال عبر واتساب".' : 'Ce numéro reçoit les commandes WhatsApp envoyées par les clients.'}
                  </span>
                </div>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="p-4 sm:p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                <Clock className="w-4 h-4" />
                <span>{lang === 'ar' ? 'أوقات وساعات العمل المعروضة' : 'Horaires d\'ouverture'}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1.5">
                    {lang === 'ar' ? 'أوقات العمل (عربي)' : 'Horaires (Arabe)'}
                  </label>
                  <input
                    type="text"
                    value={formData.openingHours?.ar || ''}
                    onChange={(e) => handleTextChange('openingHours.ar', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-white text-xs sm:text-sm focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1.5">
                    {lang === 'ar' ? 'أوقات العمل (فرنسي)' : 'Horaires (Français)'}
                  </label>
                  <input
                    type="text"
                    value={formData.openingHours?.fr || ''}
                    onChange={(e) => handleTextChange('openingHours.fr', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-white text-xs sm:text-sm focus:border-amber-400 focus:outline-none"
                    dir="ltr"
                  />
                </div>
              </div>
            </div>

          </div>
        )}

        {/* SECTION 2: HERO SECTION TEXTS */}
        {activeSection === 'hero' && (
          <div className="space-y-5 animate-fadeIn">
            
            {/* Status Badge */}
            <div className="p-4 sm:p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>{lang === 'ar' ? 'شارة الحالة أعلى الهيرو' : 'Badge d\'état (En direct)'}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1.5">العربية</label>
                  <input
                    type="text"
                    value={formData.heroStatusBadge?.ar || ''}
                    onChange={(e) => handleTextChange('heroStatusBadge.ar', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-white text-xs sm:text-sm focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1.5">Français</label>
                  <input
                    type="text"
                    value={formData.heroStatusBadge?.fr || ''}
                    onChange={(e) => handleTextChange('heroStatusBadge.fr', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-white text-xs sm:text-sm focus:border-emerald-500 focus:outline-none"
                    dir="ltr"
                  />
                </div>
              </div>
            </div>

            {/* Main Headline (Split into 3 segments for typography) */}
            <div className="p-4 sm:p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
              <div className="flex items-center gap-2 text-[#D4AF37] font-bold text-sm">
                <Type className="w-4 h-4" />
                <span>{lang === 'ar' ? 'العنوان الرئيسي الكبير (الهيدلاين)' : 'Titre principal (Hero Headline)'}</span>
              </div>
              <p className="text-xs text-neutral-400">
                {lang === 'ar' 
                  ? 'يتكون العنوان من 3 أجزاء، الجزء الثاني يظهر بلون ذهبي متوهج جذاب.' 
                  : 'Le titre se compose de 3 segments, le second apparaissant en dégradé or étincelant.'}
              </p>

              {/* Arabic Headline */}
              <div className="p-3 rounded-xl bg-neutral-950/70 border border-neutral-800 space-y-3">
                <span className="text-xs font-bold text-[#D4AF37] block">العنوان باللغة العربية:</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] text-neutral-400 mb-1">بداية السطر الأول</label>
                    <input
                      type="text"
                      value={formData.heroTitleMain?.ar || ''}
                      onChange={(e) => handleTextChange('heroTitleMain.ar', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white text-xs focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#D4AF37] font-bold mb-1">الكلمة المضاءة بالذهب ✨</label>
                    <input
                      type="text"
                      value={formData.heroTitleHighlight?.ar || ''}
                      onChange={(e) => handleTextChange('heroTitleHighlight.ar', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-[#D4AF37] text-white text-xs focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-neutral-400 mb-1">تكملة العنوان</label>
                    <input
                      type="text"
                      value={formData.heroTitleSuffix?.ar || ''}
                      onChange={(e) => handleTextChange('heroTitleSuffix.ar', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white text-xs focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* French Headline */}
              <div className="p-3 rounded-xl bg-neutral-950/70 border border-neutral-800 space-y-3" dir="ltr">
                <span className="text-xs font-bold text-blue-400 block">Titre en Français:</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] text-neutral-400 mb-1">Introduction</label>
                    <input
                      type="text"
                      value={formData.heroTitleMain?.fr || ''}
                      onChange={(e) => handleTextChange('heroTitleMain.fr', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white text-xs focus:border-blue-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#D4AF37] font-bold mb-1">Texte Doré ✨</label>
                    <input
                      type="text"
                      value={formData.heroTitleHighlight?.fr || ''}
                      onChange={(e) => handleTextChange('heroTitleHighlight.fr', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-[#D4AF37] text-white text-xs focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-neutral-400 mb-1">Suite du titre</label>
                    <input
                      type="text"
                      value={formData.heroTitleSuffix?.fr || ''}
                      onChange={(e) => handleTextChange('heroTitleSuffix.fr', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white text-xs focus:border-blue-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

            </div>

            {/* Hero Description */}
            <div className="p-4 sm:p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
              <div className="flex items-center gap-2 text-neutral-200 font-bold text-sm">
                <span>{lang === 'ar' ? 'الوصف الترويجي في الهيرو' : 'Description du Hero'}</span>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">الوصف بالعربية</label>
                  <textarea
                    rows={3}
                    value={formData.heroDescription?.ar || ''}
                    onChange={(e) => handleTextChange('heroDescription.ar', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-white text-xs sm:text-sm focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">الوصف بالفرنسية</label>
                  <textarea
                    rows={3}
                    value={formData.heroDescription?.fr || ''}
                    onChange={(e) => handleTextChange('heroDescription.fr', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-white text-xs sm:text-sm focus:border-[#D4AF37] focus:outline-none"
                    dir="ltr"
                  />
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="p-4 sm:p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <Sparkles className="w-4 h-4" />
                <span>{lang === 'ar' ? 'شارات الثقة والمميزات (أسفل أزرار الهيرو)' : 'Badges de confiance'}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800 space-y-2">
                  <span className="text-[11px] font-bold text-amber-300">شارة 1:</span>
                  <input
                    type="text"
                    value={formData.heroTrustBadge1?.ar || ''}
                    onChange={(e) => handleTextChange('heroTrustBadge1.ar', e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white text-xs focus:outline-none"
                    placeholder="تحضير طازج يومياً"
                  />
                  <input
                    type="text"
                    value={formData.heroTrustBadge1?.fr || ''}
                    onChange={(e) => handleTextChange('heroTrustBadge1.fr', e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white text-xs focus:outline-none"
                    dir="ltr"
                    placeholder="Préparé frais..."
                  />
                </div>

                <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800 space-y-2">
                  <span className="text-[11px] font-bold text-amber-300">شارة 2:</span>
                  <input
                    type="text"
                    value={formData.heroTrustBadge2?.ar || ''}
                    onChange={(e) => handleTextChange('heroTrustBadge2.ar', e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white text-xs focus:outline-none"
                    placeholder="توصيل سريع وساخن"
                  />
                  <input
                    type="text"
                    value={formData.heroTrustBadge2?.fr || ''}
                    onChange={(e) => handleTextChange('heroTrustBadge2.fr', e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white text-xs focus:outline-none"
                    dir="ltr"
                    placeholder="Livraison rapide..."
                  />
                </div>

                <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800 space-y-2">
                  <span className="text-[11px] font-bold text-amber-300">شارة 3:</span>
                  <input
                    type="text"
                    value={formData.heroTrustBadge3?.ar || ''}
                    onChange={(e) => handleTextChange('heroTrustBadge3.ar', e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white text-xs focus:outline-none"
                    placeholder="لحوم ودواجن حلال 100%"
                  />
                  <input
                    type="text"
                    value={formData.heroTrustBadge3?.fr || ''}
                    onChange={(e) => handleTextChange('heroTrustBadge3.fr', e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white text-xs focus:outline-none"
                    dir="ltr"
                    placeholder="Viandes 100% Halal"
                  />
                </div>
              </div>
            </div>

          </div>
        )}

        {/* SECTION 3: SECTION HEADINGS & SUBTITLES */}
        {activeSection === 'sections' && (
          <div className="space-y-5 animate-fadeIn">

            {/* Menu Section Headings */}
            <div className="p-4 sm:p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
              <div className="flex items-center gap-2 text-[#E85D04] font-bold text-sm">
                <Flame className="w-4 h-4" />
                <span>{lang === 'ar' ? 'عنوان ووصف قسم قائمة الطعام (المينيو)' : 'En-tête section Menu'}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1.5">الشارة العلوية (عربي)</label>
                  <input
                    type="text"
                    value={formData.menuBadge?.ar || ''}
                    onChange={(e) => handleTextChange('menuBadge.ar', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-white text-xs sm:text-sm focus:border-[#E85D04] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1.5">الشارة العلوية (فرنسي)</label>
                  <input
                    type="text"
                    value={formData.menuBadge?.fr || ''}
                    onChange={(e) => handleTextChange('menuBadge.fr', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-white text-xs sm:text-sm focus:border-[#E85D04] focus:outline-none"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1.5">العنوان الرئيسي (عربي)</label>
                  <input
                    type="text"
                    value={formData.menuTitle?.ar || ''}
                    onChange={(e) => handleTextChange('menuTitle.ar', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-white text-xs sm:text-sm focus:border-[#E85D04] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1.5">العنوان الرئيسي (فرنسي)</label>
                  <input
                    type="text"
                    value={formData.menuTitle?.fr || ''}
                    onChange={(e) => handleTextChange('menuTitle.fr', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-white text-xs sm:text-sm focus:border-[#E85D04] focus:outline-none"
                    dir="ltr"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-neutral-300 mb-1.5">الوصف التوضيحي (عربي)</label>
                  <input
                    type="text"
                    value={formData.menuSubtitle?.ar || ''}
                    onChange={(e) => handleTextChange('menuSubtitle.ar', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-white text-xs sm:text-sm focus:border-[#E85D04] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Juice Bar Headings */}
            <div className="p-4 sm:p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Citrus className="w-4 h-4" />
                <span>{lang === 'ar' ? 'عنوان ووصف ركن العصائر الطبيعية' : 'En-tête section Jus Naturels'}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1.5">العنوان الرئيسي (عربي)</label>
                  <input
                    type="text"
                    value={formData.juicesTitle?.ar || ''}
                    onChange={(e) => handleTextChange('juicesTitle.ar', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-white text-xs sm:text-sm focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1.5">العنوان الرئيسي (فرنسي)</label>
                  <input
                    type="text"
                    value={formData.juicesTitle?.fr || ''}
                    onChange={(e) => handleTextChange('juicesTitle.fr', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-white text-xs sm:text-sm focus:border-emerald-500 focus:outline-none"
                    dir="ltr"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-neutral-300 mb-1.5">الوصف التفصيلي (عربي)</label>
                  <textarea
                    rows={2}
                    value={formData.juicesSubtitle?.ar || ''}
                    onChange={(e) => handleTextChange('juicesSubtitle.ar', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-white text-xs sm:text-sm focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Family Platters Headings */}
            <div className="p-4 sm:p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
              <div className="flex items-center gap-2 text-[#D4AF37] font-bold text-sm">
                <Crown className="w-4 h-4" />
                <span>{lang === 'ar' ? 'عنوان ووصف عروض الولائم والعائلة' : 'En-tête section Banquets & Famille'}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1.5">العنوان الرئيسي (عربي)</label>
                  <input
                    type="text"
                    value={formData.familyTitle?.ar || ''}
                    onChange={(e) => handleTextChange('familyTitle.ar', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-white text-xs sm:text-sm focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1.5">العنوان الرئيسي (فرنسي)</label>
                  <input
                    type="text"
                    value={formData.familyTitle?.fr || ''}
                    onChange={(e) => handleTextChange('familyTitle.fr', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-white text-xs sm:text-sm focus:border-[#D4AF37] focus:outline-none"
                    dir="ltr"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-neutral-300 mb-1.5">الوصف التفصيلي (عربي)</label>
                  <textarea
                    rows={2}
                    value={formData.familySubtitle?.ar || ''}
                    onChange={(e) => handleTextChange('familySubtitle.ar', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-white text-xs sm:text-sm focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
              </div>
            </div>

          </div>
        )}

        {/* SECTION 4: LOCATION & DELIVERY SETTINGS */}
        {activeSection === 'location' && (
          <div className="space-y-5 animate-fadeIn">
            
            {/* Address */}
            <div className="p-4 sm:p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <MapPin className="w-4 h-4" />
                <span>{lang === 'ar' ? 'عنوان ومقر المطعم' : 'Adresse physique du restaurant'}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1.5">العنوان بالعربية</label>
                  <input
                    type="text"
                    value={formData.address?.ar || ''}
                    onChange={(e) => handleTextChange('address.ar', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-white text-xs sm:text-sm focus:border-rose-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1.5">العنوان بالفرنسية</label>
                  <input
                    type="text"
                    value={formData.address?.fr || ''}
                    onChange={(e) => handleTextChange('address.fr', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-white text-xs sm:text-sm focus:border-rose-500 focus:outline-none"
                    dir="ltr"
                  />
                </div>
              </div>
            </div>

            {/* Delivery Fees & Threshold */}
            <div className="p-4 sm:p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Truck className="w-4 h-4" />
                <span>{lang === 'ar' ? 'إعدادات رسوم التوصيل وعرض التوصيل المجاني' : 'Frais de livraison'}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1.5">
                    {lang === 'ar' ? 'رسوم التوصيل الافتراضية (بالدرهم)' : 'Frais de livraison standard (Dh)'}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.deliveryFee !== undefined ? formData.deliveryFee : 10}
                    onChange={(e) => handleTextChange('deliveryFee', Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-white text-xs sm:text-sm focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1.5">
                    {lang === 'ar' ? 'الحد الأدنى للتوصيل المجاني (بالدرهم)' : 'Seuil livraison gratuite (Dh)'}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.freeDeliveryThreshold !== undefined ? formData.freeDeliveryThreshold : 150}
                    onChange={(e) => handleTextChange('freeDeliveryThreshold', Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-white text-xs sm:text-sm focus:border-emerald-500 focus:outline-none"
                  />
                  <span className="text-[10px] text-neutral-400 block mt-1">
                    {lang === 'ar' ? 'أي طلب يتجاوز هذا المبلغ يستفيد الزبون تلقائياً من توصيل مجاني 0 درهم.' : 'Toute commande dépassant ce montant bénéficie de la livraison gratuite.'}
                  </span>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Global Save Bar */}
        <div className="sticky bottom-0 pt-4 pb-2 bg-gradient-to-t from-neutral-950 via-neutral-950/95 to-transparent flex items-center justify-between gap-3 border-t border-neutral-800">
          
          <button
            type="submit"
            className="flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E85D04] hover:from-[#c29f2f] hover:to-[#cf5202] text-neutral-950 font-black font-cairo text-sm sm:text-base shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
          >
            {isSavedRecently ? (
              <>
                <Check className="w-5 h-5 text-emerald-950 stroke-[3]" />
                <span>{lang === 'ar' ? 'تم الحفظ بنجاح! ✨' : 'Enregistré avec succès ! ✨'}</span>
              </>
            ) : (
              <>
                <Save className="w-5 h-5 text-neutral-950" />
                <span>{lang === 'ar' ? 'حفظ كافة تعديلات الهيدر والنصوص' : 'Enregistrer toutes les modifications'}</span>
              </>
            )}
          </button>

          {/* Reset site texts button */}
          {showConfirmReset ? (
            <div className="flex items-center gap-1.5 bg-rose-950/90 px-3 py-2 rounded-xl border border-rose-800">
              <span className="text-[11px] text-rose-300 font-bold">{lang === 'ar' ? 'تأكيد؟' : 'Confirmer ?'}</span>
              <button
                type="button"
                onClick={handleReset}
                className="px-2.5 py-1 rounded bg-rose-600 text-white text-[11px] font-bold"
              >
                {lang === 'ar' ? 'نعم' : 'Oui'}
              </button>
              <button
                type="button"
                onClick={() => setShowConfirmReset(false)}
                className="px-2 py-1 rounded bg-neutral-800 text-neutral-400 text-[11px]"
              >
                ✕
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowConfirmReset(true)}
              className="py-3 px-3 sm:px-4 rounded-xl bg-neutral-800/80 hover:bg-neutral-800 text-neutral-400 hover:text-rose-400 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
              title={lang === 'ar' ? 'استعادة النصوص الافتراضية' : 'Restaurer les textes par défaut'}
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">{lang === 'ar' ? 'استعادة الافتراضي' : 'Par défaut'}</span>
            </button>
          )}

        </div>

      </form>

    </div>
  );
};
