import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Menu as MenuIcon, 
  X, 
  Phone, 
  Sparkles, 
  Languages, 
  Clock, 
  Flame,
  ChevronDown,
  SlidersHorizontal,
  Settings,
  Lock,
  Unlock
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { useMenu } from '../context/MenuContext';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const Navbar = () => {
  const { lang, dir, toggleLanguage, t } = useLanguage();
  const { totalItemsCount, grandTotal, setIsCartOpen } = useCart();
  const { 
    requestOpenManager, 
    isAuthenticated, 
    lockAdmin, 
    isAdminRevealed, 
    handleLogoSecretClick 
  } = useMenu();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const onLogoClick = (e) => {
    const didTrigger = handleLogoSecretClick();
    if (!didTrigger) {
      handleLinkClick(e, '#home');
    } else {
      e.preventDefault();
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: { ar: 'الرئيسية', fr: 'Accueil' } },
    { href: '#menu', label: { ar: 'قائمة الطعام', fr: 'Menu' } },
    { href: '#juices', label: { ar: 'ركن العصائر', fr: 'Jus Naturels' } },
    { href: '#family', label: { ar: 'عروض العائلة', fr: 'Plateaux Famille' } },
    { href: '#reviews', label: { ar: 'آراء الزبائن', fr: 'Avis Clients' } },
    { href: '#contact', label: { ar: 'تواصل معنا', fr: 'Contact' } },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const navHeight = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-[#8B0000] via-[#E85D04] to-[#B8860B] text-white text-xs sm:text-sm py-1.5 px-4 font-tajawal transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            <span className="font-semibold">
              {lang === 'ar' 
                ? '🔥 كود خصم 10% على طلبك: استخدم كود "5STARS" عند الدفع | توصيل مجاني فوق 150 درهم'
                : '🔥 -10% avec le code "5STARS" | Livraison offerte dès 150 Dh'}
            </span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1 opacity-90">
              <Clock className="w-3.5 h-3.5 text-amber-200" />
              <span>{t(RESTAURANT_INFO.openingHours)}</span>
            </span>
            <a 
              href={`tel:${RESTAURANT_INFO.phone}`} 
              className="flex items-center gap-1 font-bold text-amber-100 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span dir="ltr">{RESTAURANT_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Glassmorphic Navbar */}
      <header 
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'glass-nav shadow-2xl py-3 border-b border-amber-500/20' 
            : 'bg-[#0E0E0E]/90 backdrop-blur-md py-4 border-b border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Logo - 7 clicks secretly triggers Admin access */}
          <a 
            href="#home" 
            onClick={onLogoClick}
            className="flex items-center gap-3 group select-none cursor-pointer"
            title={lang === 'ar' ? 'خمس نجوم | الرئيسية' : '5 ÉTOILES | Accueil'}
          >
            {/* Visual Logo Emblem */}
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-[#241F14] to-[#121212] border border-[#D4AF37]/50 shadow-lg group-hover:border-[#D4AF37] transition-all duration-300">
              <Flame className="w-6 h-6 text-[#E85D04] animate-pulse" />
              <div className="absolute -top-1 -right-1 flex">
                <span className="text-[10px] text-[#D4AF37]">★</span>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-cairo font-black text-xl sm:text-2xl tracking-tight text-white group-hover:text-amber-400 transition-colors">
                  {lang === 'ar' ? 'خمس نجوم' : '5 ÉTOILES'}
                </span>
                <div className="flex text-[#D4AF37] text-xs space-x-0.5 rtl:space-x-reverse">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
              </div>
              <span className="text-[11px] text-[#D4AF37]/90 font-medium tracking-wide">
                {lang === 'ar' ? 'مطعم شرقي أصيل • مشاوي وشاورما' : 'Restaurant Oriental Authentique'}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="px-3.5 py-2 rounded-lg text-sm font-medium text-neutral-300 hover:text-white hover:bg-white/5 transition-all duration-200 relative group"
              >
                {t(link.label)}
                <span className="absolute bottom-1 left-3.5 right-3.5 h-0.5 bg-gradient-to-r from-[#D4AF37] to-[#E85D04] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center rounded-full" />
              </a>
            ))}
          </nav>

          {/* Actions: Admin Manager & Language Switcher & Cart Button & Mobile Menu */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Manager / Menu Admin Button - HIDDEN by default; revealed ONLY after 7 clicks on logo */}
            {(isAdminRevealed || isAuthenticated) && (
              isAuthenticated ? (
                <div className="flex items-center gap-1 animate-fadeIn">
                  <button
                    type="button"
                    onClick={requestOpenManager}
                    className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-amber-500/20 border border-[#D4AF37] text-[#D4AF37] hover:bg-amber-500/30 font-cairo text-xs font-bold transition-all shadow cursor-pointer"
                    title={lang === 'ar' ? 'فتح لوحة إدارة المنيو والأسعار' : 'Ouvrir la gestion du menu'}
                  >
                    <Unlock className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="hidden md:inline">{lang === 'ar' ? 'لوحة التحكم' : 'Gestion'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={lockAdmin}
                    className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-700/80 hover:bg-rose-950/40 text-neutral-400 hover:text-rose-400 text-xs transition-colors cursor-pointer"
                    title={lang === 'ar' ? 'قفل الصلاحيات وإخفاء الزر 🔒' : 'Verrouiller et masquer 🔒'}
                  >
                    <Lock className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={requestOpenManager}
                  aria-label="Admin PIN Access"
                  className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-neutral-900/90 border border-[#D4AF37]/60 text-xs font-semibold text-[#D4AF37] hover:bg-neutral-800 transition-all cursor-pointer animate-fadeIn shadow-lg shadow-amber-950/40"
                  title={lang === 'ar' ? 'الدخول للوحة الإدارة 🔒' : 'Accès Administration 🔒'}
                >
                  <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span className="hidden md:inline font-cairo text-xs">
                    {lang === 'ar' ? 'الإدارة' : 'Gérant'}
                  </span>
                </button>
              )
            )}

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              aria-label="Switch Language"
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-700/70 hover:border-[#D4AF37]/60 text-xs sm:text-sm font-semibold text-neutral-200 hover:text-white transition-all duration-200 hover:scale-105 cursor-pointer"
            >
              <Languages className="w-4 h-4 text-[#D4AF37]" />
              <span className="uppercase tracking-wider">
                {lang === 'ar' ? 'FR' : 'عربي'}
              </span>
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="View Shopping Cart"
              className="relative flex items-center gap-2.5 px-3.5 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-[#E85D04] to-[#D4AF37] hover:from-[#f06810] hover:to-[#dfbb43] text-black font-bold text-sm shadow-lg shadow-amber-500/20 hover:shadow-amber-500/35 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5" />
                {totalItemsCount > 0 && (
                  <span className="absolute -top-2.5 -right-2.5 bg-black text-[#D4AF37] text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#D4AF37] shadow">
                    {totalItemsCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline font-cairo">
                {lang === 'ar' ? 'السلة' : 'Panier'}
              </span>
              {grandTotal > 0 && (
                <span className="hidden md:inline-block border-s border-black/20 ps-2 font-mono text-xs font-black">
                  {grandTotal} {lang === 'ar' ? 'درهم' : 'Dh'}
                </span>
              )}
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
              className="lg:hidden p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-Down Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden glass-panel border-t border-neutral-800 mt-2 px-4 py-4 space-y-2 animate-fadeIn">
            {/* Direct Admin Access Button in Mobile Menu - ONLY if revealed or authenticated */}
            {(isAdminRevealed || isAuthenticated) && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  requestOpenManager();
                }}
                className="w-full text-start flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#1A160F] border border-[#D4AF37]/40 text-[#D4AF37] font-bold text-xs mb-3 shadow cursor-pointer animate-fadeIn"
              >
                <div className="flex items-center gap-2">
                  {isAuthenticated ? (
                    <Unlock className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Lock className="w-4 h-4 text-[#D4AF37]" />
                  )}
                  <span>{lang === 'ar' ? 'لوحة الإدارة والتحكم في الأسعار 🔒' : 'Espace Administration & Tarifs 🔒'}</span>
                </div>
                <span className="text-[10px] bg-neutral-900 px-2 py-0.5 rounded text-neutral-400">
                  {isAuthenticated ? (lang === 'ar' ? 'مفتوح 🔓' : 'Actif 🔓') : (lang === 'ar' ? 'محمي 🔒' : 'Protégé 🔒')}
                </span>
              </button>
            )}

            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="block px-4 py-2.5 rounded-lg text-base font-medium text-neutral-200 hover:text-[#D4AF37] hover:bg-neutral-800/80 transition-colors"
              >
                {t(link.label)}
              </a>
            ))}
            <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                {t(RESTAURANT_INFO.openingHours)}
              </span>
              <a 
                href={`tel:${RESTAURANT_INFO.phone}`} 
                className="font-bold text-[#E85D04]"
                dir="ltr"
              >
                {RESTAURANT_INFO.phone}
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

