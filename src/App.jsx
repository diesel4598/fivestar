import React from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { CartProvider } from './context/CartContext';
import { MenuProvider, useMenu } from './context/MenuContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MenuSection } from './components/MenuSection';
import { JuiceBarSection } from './components/JuiceBarSection';
import { FamilyPlattersSection } from './components/FamilyPlattersSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { LocationFooterSection } from './components/LocationFooterSection';
import { CartDrawer } from './components/CartDrawer';
import { MobileStickyBar } from './components/MobileStickyBar';
import { FloatingWhatsAppButton } from './components/FloatingWhatsAppButton';
import { ToastNotification } from './components/ToastNotification';
import { AdminDashboardDrawer } from './components/AdminDashboardDrawer';
import { AdminAddEditModal } from './components/AdminAddEditModal';
import { AdminPinModal } from './components/AdminPinModal';
import { CheckCircle2, Info } from 'lucide-react';
import { useLanguage } from './context/LanguageContext';

export function AppContent() {
  const { feedbackToast } = useMenu();
  const { lang, dir } = useLanguage();

  return (
    <div className="relative min-h-screen bg-[#0E0E0E] text-[#F8F9FA] overflow-x-hidden">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Sections */}
      <main>
        <HeroSection />
        <MenuSection />
        <JuiceBarSection />
        <FamilyPlattersSection />
        <TestimonialsSection />
      </main>

      {/* Location & Footer */}
      <LocationFooterSection />

      {/* Slide-over Cart Drawer */}
      <CartDrawer />

      {/* Admin Management Drawer & Add/Edit Modal & PIN Security */}
      <AdminDashboardDrawer />
      <AdminAddEditModal />
      <AdminPinModal />

      {/* Mobile Sticky Bottom Ordering Bar */}
      <MobileStickyBar />

      {/* Quick WhatsApp Floating Chat */}
      <FloatingWhatsAppButton />

      {/* Notification Toast for Cart */}
      <ToastNotification />

      {/* Admin Operations Toast */}
      {feedbackToast && (
        <div className={`fixed bottom-24 ${
          dir === 'rtl' ? 'right-6' : 'left-6'
        } z-50 animate-bounce-short pointer-events-none`}>
          <div className="px-4 py-3 rounded-2xl bg-neutral-900 border border-[#D4AF37] text-white shadow-2xl flex items-center gap-2.5 text-xs font-bold">
            {feedbackToast.type === 'info' ? (
              <Info className="w-4 h-4 text-amber-400" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            )}
            <span>{feedbackToast.message[lang] || feedbackToast.message['ar']}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MenuProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </MenuProvider>
    </LanguageProvider>
  );
}
