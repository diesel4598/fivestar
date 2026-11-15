import React, { useState, useEffect, useRef } from 'react';
import { 
  Lock, 
  Unlock, 
  X, 
  AlertCircle, 
  Check, 
  Delete, 
  ShieldCheck 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useMenu } from '../context/MenuContext';

export const AdminPinModal = () => {
  const { lang, dir } = useLanguage();
  const { 
    isPinModalOpen, 
    setIsPinModalOpen, 
    verifyPin, 
    isAuthenticated 
  } = useMenu();

  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isPinModalOpen) {
      setPin('');
      setError('');
      setIsSuccess(false);
      setIsShaking(false);
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 150);
    }
  }, [isPinModalOpen]);

  if (!isPinModalOpen) return null;

  const handleDigitPress = (digit) => {
    setPin(prev => {
      if (prev.length < 4) {
        const next = prev + digit;
        setError('');
        if (next.length === 4) {
          setTimeout(() => submitPin(next), 60);
        }
        return next;
      }
      return prev;
    });
  };

  const handleBackspace = () => {
    setPin(prev => prev.slice(0, -1));
    setError('');
  };

  const handleClear = () => {
    setPin('');
    setError('');
  };

  const submitPin = (codeToTest) => {
    const result = verifyPin(codeToTest);
    if (result.success) {
      setIsSuccess(true);
      setError('');
    } else {
      setIsShaking(true);
      setError(
        lang === 'ar' 
          ? 'الرمز السري غير صحيح! يرجى المحاولة مرة أخرى' 
          : 'Code secret incorrect ! Veuillez réessayer'
      );
      setTimeout(() => {
        setIsShaking(false);
        setPin('');
      }, 650);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key >= '0' && e.key <= '9') {
      e.preventDefault();
      handleDigitPress(e.key);
    } else if (e.key === 'Backspace') {
      e.preventDefault();
      handleBackspace();
    } else if (e.key === 'Escape') {
      setIsPinModalOpen(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      {/* Click outside to close */}
      <div 
        className="fixed inset-0" 
        onClick={() => setIsPinModalOpen(false)} 
      />

      <div 
        className={`relative w-full max-w-sm rounded-3xl bg-[#141414] border-2 border-[#D4AF37]/50 shadow-2xl overflow-hidden z-10 transition-all ${
          isShaking ? 'animate-shake border-rose-500' : ''
        }`}
      >
        {/* Top Gold Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#D4AF37] via-[#E85D04] to-[#D4AF37]" />

        {/* Modal Header */}
        <div className="p-6 text-center space-y-3 relative">
          <button
            type="button"
            onClick={() => setIsPinModalOpen(false)}
            className="absolute top-4 end-4 p-2 rounded-xl bg-neutral-800/80 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Icon Badge */}
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#292212] to-[#161410] border border-[#D4AF37]/60 flex items-center justify-center text-[#D4AF37] shadow-xl shadow-amber-950/40">
            {isSuccess ? (
              <Unlock className="w-8 h-8 text-emerald-400 animate-bounce" />
            ) : (
              <Lock className="w-8 h-8 text-[#D4AF37]" />
            )}
          </div>

          <div className="space-y-1">
            <h3 className="text-xl font-black font-cairo text-white">
              {lang === 'ar' ? 'حماية المنيو والأسعار' : 'Gestion Sécurisée du Menu'}
            </h3>
            <p className="text-xs text-neutral-400">
              {lang === 'ar'
                ? 'أدخل الرقم السري لتعديل الوجبات والعصائر والأسعار'
                : 'Entrez le code secret pour modifier plats et tarifs'}
            </p>
          </div>

          {/* 4 Digit Boxes */}
          <div className="flex items-center justify-center gap-3 pt-3 pb-1" dir="ltr">
            {[0, 1, 2, 3].map((index) => {
              const digit = pin[index];
              const isFilled = digit !== undefined;
              return (
                <div
                  key={index}
                  className={`w-12 h-14 rounded-2xl flex items-center justify-center font-mono text-2xl font-black transition-all ${
                    isSuccess
                      ? 'bg-emerald-950/60 border-2 border-emerald-500 text-emerald-300'
                      : isFilled
                      ? 'bg-[#1F1B12] border-2 border-[#D4AF37] text-[#D4AF37] scale-105 shadow-lg shadow-amber-950/30'
                      : 'bg-neutral-900 border border-neutral-700 text-neutral-600'
                  }`}
                >
                  {isFilled ? '●' : ''}
                </div>
              );
            })}
          </div>

          {/* Error Message or Status */}
          <div className="min-h-6 flex items-center justify-center">
            {error ? (
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-400 bg-rose-950/40 px-3 py-1 rounded-full border border-rose-800/60 animate-fadeIn">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{error}</span>
              </div>
            ) : isSuccess ? (
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-800/60 animate-fadeIn">
                <Check className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? 'تم التحقق بنجاح!' : 'Code validé avec succès !'}</span>
              </div>
            ) : null}
          </div>
        </div>

        {/* Virtual Number Keypad for Easy Touch */}
        <div className="p-4 bg-neutral-950/80 border-t border-neutral-800" dir="ltr">
          <div className="grid grid-cols-3 gap-2.5 max-w-[260px] mx-auto">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
              <button
                key={digit}
                type="button"
                onClick={() => handleDigitPress(digit)}
                className="h-12 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-[#D4AF37]/50 text-white font-mono font-bold text-lg transition-all active:scale-95 shadow cursor-pointer"
              >
                {digit}
              </button>
            ))}

            {/* Clear Button */}
            <button
              type="button"
              onClick={handleClear}
              className="h-12 rounded-xl bg-neutral-900 hover:bg-rose-950/50 border border-neutral-800 hover:border-rose-500/50 text-neutral-400 hover:text-rose-300 font-bold text-xs transition-all active:scale-95 cursor-pointer"
            >
              C
            </button>

            {/* 0 */}
            <button
              type="button"
              onClick={() => handleDigitPress('0')}
              className="h-12 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-[#D4AF37]/50 text-white font-mono font-bold text-lg transition-all active:scale-95 shadow cursor-pointer"
            >
              0
            </button>

            {/* Backspace */}
            <button
              type="button"
              onClick={handleBackspace}
              className="h-12 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-amber-500/50 text-neutral-300 hover:text-amber-400 flex items-center justify-center transition-all active:scale-95 cursor-pointer"
              title="مسح"
            >
              <Delete className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Footer */}
        <div className="px-6 py-3 bg-[#111111] border-t border-neutral-800/80 text-center">
          <span className="text-[11px] text-neutral-400 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{lang === 'ar' ? 'صلاحيات المدير فقط • خمس نجوم' : 'Réservé à l\'administration 5 Étoiles'}</span>
          </span>
        </div>
      </div>
    </div>
  );
};
