import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  Edit3, 
  Trash2, 
  Search, 
  RotateCcw, 
  Flame, 
  SlidersHorizontal, 
  Check, 
  AlertTriangle,
  ArrowUpDown,
  DollarSign,
  Utensils,
  Layers,
  Sparkles,
  Lock,
  Unlock,
  ShieldCheck,
  KeyRound,
  AlertCircle,
  MessageCircle,
  Phone,
  Type
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useMenu } from '../context/MenuContext';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { AdminTextsEditor } from './AdminTextsEditor';

export const AdminDashboardDrawer = () => {
  const { lang, dir, t } = useLanguage();
  const { 
    menuItems, 
    categories, 
    isManagerOpen, 
    setIsManagerOpen, 
    lockAdmin,
    adminPin,
    changePin,
    resetPinToDefault,
    openAddModal, 
    openEditModal, 
    updatePrice, 
    deleteItem, 
    resetMenuToDefault,
    activeAdminTab,
    setActiveAdminTab,
    siteContent
  } = useMenu();

  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');
  const [inlinePriceMap, setInlinePriceMap] = useState({});
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Change PIN state
  const [isChangingPin, setIsChangingPin] = useState(false);
  const [newPinInput, setNewPinInput] = useState('');
  const [confirmPinInput, setConfirmPinInput] = useState('');
  const [pinChangeError, setPinChangeError] = useState('');

  if (!isManagerOpen) return null;

  // Filter items
  const filtered = menuItems.filter(item => {
    const matchesCat = selectedCat === 'all' || item.category === selectedCat;
    const q = search.trim().toLowerCase();
    const matchesSearch = 
      !q ||
      item.name.ar.toLowerCase().includes(q) ||
      item.name.fr.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  const handleInlinePriceChange = (id, val) => {
    setInlinePriceMap(prev => ({ ...prev, [id]: val }));
  };

  const handleSaveInlinePrice = (id) => {
    const newPrice = inlinePriceMap[id];
    if (newPrice !== undefined && newPrice !== '') {
      updatePrice(id, newPrice);
      setInlinePriceMap(prev => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
    }
  };

  const handleSaveNewPin = () => {
    if (!newPinInput || newPinInput.length !== 4) {
      setPinChangeError(
        lang === 'ar'
          ? 'يرجى إدخال 4 أرقام عددية كاملة للرمز الجديد'
          : 'Veuillez saisir exactement 4 chiffres'
      );
      return;
    }
    if (newPinInput !== confirmPinInput) {
      setPinChangeError(
        lang === 'ar'
          ? 'الرمزان غير متطابقين، يرجى إعادة التأكيد'
          : 'Les deux codes saisis ne correspondent pas'
      );
      return;
    }
    const res = changePin(newPinInput, confirmPinInput);
    if (res.success) {
      setIsChangingPin(false);
      setNewPinInput('');
      setConfirmPinInput('');
      setPinChangeError('');
    } else {
      setPinChangeError(res.error?.[lang] || res.error?.ar);
    }
  };

  const handleResetPinToDefault = () => {
    resetPinToDefault();
    setIsChangingPin(false);
    setNewPinInput('');
    setConfirmPinInput('');
    setPinChangeError('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/85 backdrop-blur-md animate-fadeIn">
      
      {/* Backdrop */}
      <div 
        className="fixed inset-0" 
        onClick={() => setIsManagerOpen(false)} 
      />

      {/* Slide-out Management Panel */}
      <div className={`fixed inset-y-0 ${
        dir === 'rtl' ? 'left-0' : 'right-0'
      } max-w-full w-screen sm:max-w-2xl bg-[#111111] border-s border-[#D4AF37]/30 shadow-2xl flex flex-col z-10 transition-transform duration-300`}>
        
        {/* Panel Header */}
        <div className="p-5 bg-gradient-to-r from-[#221C11] to-[#141414] border-b border-[#D4AF37]/30 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-400">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-cairo font-black text-lg sm:text-xl text-white">
                {lang === 'ar' ? 'لوحة إدارة الوجبات والأسعار' : 'Gestion des Plats & Tarifs'}
              </h2>
              <span className="text-xs text-[#D4AF37]">
                {menuItems.length} {lang === 'ar' ? 'وجبة وعصير في القائمة' : 'articles enregistrés'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={lockAdmin}
              className="px-3 py-1.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/60 text-rose-300 font-cairo text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              title={lang === 'ar' ? 'قفل الصلاحيات وتسجيل الخروج' : 'Verrouiller et quitter'}
            >
              <Lock className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{lang === 'ar' ? 'قفل 🔒' : 'Verrouiller'}</span>
            </button>
            <button
              type="button"
              onClick={() => setIsManagerOpen(false)}
              className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Security & PIN Banner with Edit PIN Option */}
        <div className="bg-[#1C1810] px-4 sm:px-5 py-2.5 border-b border-[#D4AF37]/20 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-xs text-neutral-300 font-semibold">
              {lang === 'ar' ? 'جلسة الإدارة محمية برقم سري' : 'Session gérant sécurisée par PIN'}
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-800/60 ms-2" dir="ltr">
              <MessageCircle className="w-3 h-3 text-emerald-400" />
              <span>{RESTAURANT_INFO.phone}</span>
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[11px] font-mono font-bold text-[#D4AF37] bg-neutral-900 px-2.5 py-1 rounded-lg border border-neutral-700/80 shadow-inner">
              PIN: {adminPin}
            </span>
            <button
              type="button"
              onClick={() => {
                setIsChangingPin(!isChangingPin);
                setPinChangeError('');
                setNewPinInput('');
                setConfirmPinInput('');
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow ${
                isChangingPin
                  ? 'bg-amber-400 text-black'
                  : 'bg-neutral-800 hover:bg-[#2A2213] text-amber-300 border border-[#D4AF37]/40 hover:border-[#D4AF37]'
              }`}
              title={lang === 'ar' ? 'تعديل الرقم السري للإدارة' : 'Modifier le code secret PIN'}
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'تعديل الرقم السري' : 'Changer PIN'}</span>
            </button>
          </div>
        </div>

        {/* Change PIN Form Expandable Panel */}
        {isChangingPin && (
          <div className="bg-[#17130D] border-b border-[#D4AF37]/40 p-4 sm:p-5 space-y-3.5 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-[#D4AF37]">
                  <KeyRound className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-cairo font-bold text-xs sm:text-sm text-white">
                    {lang === 'ar' ? 'تعديل الرقم السري الخاص بالإدارة' : 'Modifier le Code Secret (PIN)'}
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-neutral-400">
                    {lang === 'ar' 
                      ? 'اختر رمزاً جديداً من 4 أرقام عددية لتسجيل دخول الإدارة وتعديل الأسعار' 
                      : 'Définissez un code à 4 chiffres pour gérer les prix'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsChangingPin(false);
                  setNewPinInput('');
                  setConfirmPinInput('');
                  setPinChangeError('');
                }}
                className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" dir="ltr">
              <div>
                <label className="block text-[11px] font-bold text-neutral-300 mb-1" dir={dir}>
                  {lang === 'ar' ? 'الرقم السري الجديد (4 أرقام):' : 'Nouveau PIN (4 chiffres) :'}
                </label>
                <input
                  type="password"
                  maxLength={4}
                  inputMode="numeric"
                  value={newPinInput}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '').slice(0, 4);
                    setNewPinInput(val);
                    setPinChangeError('');
                  }}
                  placeholder="••••"
                  className="w-full px-3.5 py-2 rounded-xl bg-neutral-950 border border-neutral-700 focus:border-[#D4AF37] text-white font-mono text-center tracking-widest text-base focus:outline-none shadow-inner"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-neutral-300 mb-1" dir={dir}>
                  {lang === 'ar' ? 'تأكيد الرقم السري الجديد:' : 'Confirmer le nouveau PIN :'}
                </label>
                <input
                  type="password"
                  maxLength={4}
                  inputMode="numeric"
                  value={confirmPinInput}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '').slice(0, 4);
                    setConfirmPinInput(val);
                    setPinChangeError('');
                  }}
                  placeholder="••••"
                  className="w-full px-3.5 py-2 rounded-xl bg-neutral-950 border border-neutral-700 focus:border-[#D4AF37] text-white font-mono text-center tracking-widest text-base focus:outline-none shadow-inner"
                />
              </div>
            </div>

            {/* Error Message */}
            {pinChangeError && (
              <div className="text-xs text-rose-400 bg-rose-950/40 p-2.5 rounded-xl border border-rose-800/60 flex items-center gap-2 animate-fadeIn">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{pinChangeError}</span>
              </div>
            )}

            {/* Bottom Form Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-1">
              <button
                type="button"
                onClick={handleResetPinToDefault}
                className="text-[11px] text-neutral-500 hover:text-amber-400 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? 'استعادة الرمز الافتراضي (4598)' : 'Restaurer le code par défaut (4598)'}</span>
              </button>

              <div className="flex items-center gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setIsChangingPin(false);
                    setNewPinInput('');
                    setConfirmPinInput('');
                    setPinChangeError('');
                  }}
                  className="px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs font-semibold cursor-pointer"
                >
                  {lang === 'ar' ? 'إلغاء' : 'Annuler'}
                </button>
                <button
                  type="button"
                  onClick={handleSaveNewPin}
                  className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-cairo font-black text-xs shadow-md cursor-pointer flex items-center gap-1.5 hover:scale-105 active:scale-95 transition-all"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>{lang === 'ar' ? 'حفظ الرمز السري الجديد' : 'Enregistrer le nouveau PIN'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Tabs Switcher: Meals & Pricing vs Header & Texts */}
        <div className="flex border-b border-neutral-800 bg-neutral-900/90 px-4 sm:px-5 pt-2.5 gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setActiveAdminTab('menu')}
            className={`pb-2.5 px-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeAdminTab === 'menu'
                ? 'border-[#D4AF37] text-[#D4AF37]'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <Utensils className="w-4 h-4" />
            <span>{lang === 'ar' ? 'إدارة الوجبات والأسعار' : 'Gestion des Plats & Prix'}</span>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-neutral-800 text-neutral-300 font-mono">
              {menuItems.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveAdminTab('texts')}
            className={`pb-2.5 px-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeAdminTab === 'texts'
                ? 'border-[#E85D04] text-[#E85D04]'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <Type className="w-4 h-4" />
            <span>{lang === 'ar' ? 'تعديل الهيدر والنصوص والمعلومات' : 'En-tête, Textes & Infos'}</span>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-amber-500/20 text-[#D4AF37] font-semibold">
              {lang === 'ar' ? 'جديد ✨' : 'Nouveau'}
            </span>
          </button>
        </div>

        {/* TAB 1: MEALS & PRICING */}
        {activeAdminTab === 'menu' && (
          <>
            {/* Toolbar: Search, Category, and Add Button */}
            <div className="p-4 sm:p-5 border-b border-neutral-800 space-y-3 bg-neutral-900/60 shrink-0">
          
          <div className="flex flex-col sm:flex-row items-center gap-2.5">
            {/* Search */}
            <div className="relative flex-1 w-full">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={lang === 'ar' ? 'بحث عن وجبة أو عصير لتعديله...' : 'Rechercher un plat à modifier...'}
                className="w-full px-3.5 py-2.5 ps-9 rounded-xl bg-neutral-950 border border-neutral-700 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37]"
              />
              <Search className="w-4 h-4 text-neutral-500 absolute start-3 top-3" />
            </div>

            {/* Add New Button */}
            <button
              type="button"
              onClick={() => openAddModal(selectedCat !== 'all' ? selectedCat : 'shawarma-platters')}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#E85D04] to-[#D4AF37] hover:from-[#f06810] hover:to-[#dfbb43] text-black font-cairo font-bold text-xs flex items-center justify-center gap-1.5 shrink-0 shadow-md cursor-pointer hover:scale-105 transition-transform"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>{lang === 'ar' ? 'إضافة وجبة أو عصير جديد' : 'Ajouter un plat/jus'}</span>
            </button>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs">
            <button
              onClick={() => setSelectedCat('all')}
              className={`px-3 py-1.5 rounded-lg border whitespace-nowrap transition-colors cursor-pointer ${
                selectedCat === 'all'
                  ? 'bg-[#D4AF37] text-black font-bold border-[#D4AF37]'
                  : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
              }`}
            >
              {lang === 'ar' ? 'الكل' : 'Tous'}
            </button>
            {categories.filter(c => c.id !== 'all').map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.id)}
                className={`px-3 py-1.5 rounded-lg border whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCat === cat.id
                    ? 'bg-[#D4AF37] text-black font-bold border-[#D4AF37]'
                    : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
                }`}
              >
                {t(cat.label)}
              </button>
            ))}
          </div>

        </div>

        {/* Dishes & Juices List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
          {filtered.length === 0 ? (
            <div className="py-16 text-center text-neutral-500 space-y-2">
              <Utensils className="w-10 h-10 mx-auto text-neutral-700" />
              <p className="text-xs">
                {lang === 'ar' ? 'لا توجد وجبات مطابقة لبحثك' : 'Aucun élément correspondant'}
              </p>
            </div>
          ) : (
            filtered.map((item) => {
              const currentInlineVal = inlinePriceMap[item.id] !== undefined 
                ? inlinePriceMap[item.id] 
                : item.price;
              const hasUnsavedPrice = inlinePriceMap[item.id] !== undefined && inlinePriceMap[item.id] !== item.price;

              return (
                <div
                  key={item.id}
                  className="p-3.5 rounded-2xl bg-neutral-900/90 border border-neutral-800 hover:border-neutral-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5 transition-colors"
                >
                  
                  {/* Left: Thumbnail & Details */}
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={item.image}
                      alt={t(item.name)}
                      className="w-14 h-14 rounded-xl object-cover border border-neutral-700 shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-cairo font-bold text-sm text-white truncate">
                          {t(item.name)}
                        </h4>
                        {item.popular && (
                          <span className="text-[10px] text-amber-400">★</span>
                        )}
                      </div>
                      <span className="text-[11px] text-neutral-400 block truncate">
                        {t(categories.find(c => c.id === item.category)?.label) || item.category}
                      </span>
                    </div>
                  </div>

                  {/* Right: Quick Price Input & Edit/Delete Actions */}
                  <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 border-neutral-800 pt-2 sm:pt-0">
                    
                    {/* Quick Inline Price Box */}
                    <div className="flex items-center gap-1.5 bg-neutral-950 px-2.5 py-1.5 rounded-xl border border-neutral-800">
                      <span className="text-[11px] text-[#D4AF37] font-semibold">
                        {lang === 'ar' ? 'الثمن:' : 'Prix:'}
                      </span>
                      <input
                        type="number"
                        min="1"
                        step="0.5"
                        value={currentInlineVal}
                        onChange={(e) => handleInlinePriceChange(item.id, e.target.value)}
                        className="w-16 bg-neutral-900 border border-neutral-700 rounded-lg px-2 py-1 text-xs font-mono font-bold text-amber-400 text-center focus:outline-none focus:border-[#D4AF37]"
                      />
                      <span className="text-[10px] text-neutral-400 font-bold">
                        {lang === 'ar' ? 'درهم' : 'Dh'}
                      </span>

                      {/* Save price check button */}
                      {hasUnsavedPrice && (
                        <button
                          type="button"
                          onClick={() => handleSaveInlinePrice(item.id)}
                          className="p-1 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
                          title={lang === 'ar' ? 'حفظ السعر الجديد' : 'Enregistrer le nouveau prix'}
                        >
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </button>
                      )}
                    </div>

                    {/* Full Edit Modal Button */}
                    <button
                      type="button"
                      onClick={() => openEditModal(item)}
                      className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                      title={lang === 'ar' ? 'تعديل كافة تفاصيل الوجبة' : 'Modifier tous les détails'}
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    {/* Delete Item Button */}
                    {deleteConfirmId === item.id ? (
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => {
                            deleteItem(item.id);
                            setDeleteConfirmId(null);
                          }}
                          className="px-2 py-1 rounded-lg bg-rose-600 text-white text-[10px] font-bold"
                        >
                          {lang === 'ar' ? 'تأكيد الحذف' : 'Confirmer'}
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteConfirmId(null)}
                          className="p-1 rounded-lg bg-neutral-800 text-neutral-400 text-xs"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setDeleteConfirmId(item.id)}
                        className="p-2 rounded-xl bg-neutral-800/80 hover:bg-rose-950/60 text-neutral-400 hover:text-rose-400 transition-colors cursor-pointer"
                        title={lang === 'ar' ? 'حذف من القائمة' : 'Supprimer'}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}

                  </div>

                </div>
              );
            })
          )}
        </div>

        {/* Panel Footer: Reset to Default Catalog Option */}
        <div className="p-4 sm:p-5 bg-neutral-900/90 border-t border-neutral-800 flex items-center justify-between text-xs">
          {showConfirmReset ? (
            <div className="w-full flex items-center justify-between gap-3 bg-rose-950/40 p-3 rounded-xl border border-rose-800/60">
              <span className="text-rose-300 text-xs flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{lang === 'ar' ? 'هل تريد استعادة قائمة الطعام الأصلية؟' : 'Restaurer le menu d\'origine ?'}</span>
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    resetMenuToDefault();
                    setShowConfirmReset(false);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-rose-600 text-white font-bold"
                >
                  {lang === 'ar' ? 'نعم، استعادة' : 'Confirmer'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowConfirmReset(false)}
                  className="px-2 py-1.5 rounded-lg bg-neutral-800 text-neutral-300"
                >
                  {lang === 'ar' ? 'إلغاء' : 'Annuler'}
                </button>
              </div>
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setShowConfirmReset(true)}
                className="text-neutral-500 hover:text-rose-400 transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? 'استعادة القائمة والأسعار الافتراضية' : 'Réinitialiser le catalogue'}</span>
              </button>

              <span className="text-[11px] text-neutral-500">
                {lang === 'ar' ? 'الحفظ تلقائي في المتصفح' : 'Sauvegarde automatique'}
              </span>
            </>
          )}
        </div>
        </>
        )}

        {/* TAB 2: HEADER & TEXTS EDITOR */}
        {activeAdminTab === 'texts' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 no-scrollbar">
            <AdminTextsEditor />
          </div>
        )}

      </div>

    </div>
  );
};

