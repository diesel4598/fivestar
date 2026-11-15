import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { RESTAURANT_INFO } from '../data/restaurantData';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('fivestar_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderType, setOrderType] = useState('delivery'); // 'delivery' | 'pickup'
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState(null);
  const [lastAddedNotification, setLastAddedNotification] = useState(null);

  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: '',
    neighborhood: '',
    notes: '',
  });

  useEffect(() => {
    try {
      localStorage.setItem('fivestar_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);

  const addToCart = (item, customizations = {}, quantity = 1) => {
    // Generate unique ID based on item ID and customizations
    const proteinId = customizations.protein?.id || 'default';
    const sizeId = customizations.size?.id || 'default';
    const spicinessId = customizations.spiciness?.id || 'default';
    const sugarId = customizations.sugar?.id || 'default';
    const addonsIds = (customizations.addons || []).map(a => a.id).sort().join('-');
    const notes = customizations.notes || '';

    const uniqueId = `${item.id}-${proteinId}-${sizeId}-${spicinessId}-${sugarId}-${addonsIds}-${notes}`;

    // Calculate unit price
    let unitPrice = item.price;
    if (customizations.protein?.price) unitPrice += customizations.protein.price;
    if (customizations.size?.price) unitPrice += customizations.size.price;
    if (customizations.spiciness?.price) unitPrice += customizations.spiciness.price;
    if (customizations.sugar?.price) unitPrice += customizations.sugar.price;

    const addonsCost = (customizations.addons || []).reduce((acc, curr) => acc + (curr.price || 0), 0);
    unitPrice += addonsCost;

    setCartItems(prev => {
      const existingIndex = prev.findIndex(ci => ci.uniqueId === uniqueId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        updated[existingIndex].totalPrice = updated[existingIndex].quantity * unitPrice;
        return updated;
      } else {
        return [
          ...prev,
          {
            uniqueId,
            item,
            customizations,
            unitPrice,
            quantity,
            totalPrice: unitPrice * quantity,
          },
        ];
      }
    });

    // Notification toast
    setLastAddedNotification({
      item,
      quantity,
      time: Date.now(),
    });

    // Auto clear notification after 3.5 seconds
    setTimeout(() => {
      setLastAddedNotification(null);
    }, 3500);
  };

  const updateQuantity = (uniqueId, delta) => {
    setCartItems(prev => {
      return prev
        .map(ci => {
          if (ci.uniqueId === uniqueId) {
            const newQty = ci.quantity + delta;
            if (newQty <= 0) return null;
            return {
              ...ci,
              quantity: newQty,
              totalPrice: newQty * ci.unitPrice,
            };
          }
          return ci;
        })
        .filter(Boolean);
    });
  };

  const removeFromCart = (uniqueId) => {
    setCartItems(prev => prev.filter(ci => ci.uniqueId !== uniqueId));
  };

  const clearCart = () => {
    setCartItems([]);
    setPromoCode('');
    setDiscountPercent(0);
    setPromoMessage(null);
  };

  const applyPromoCode = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === '5STARS' || cleanCode === 'STAR10') {
      setDiscountPercent(10);
      setPromoCode(cleanCode);
      setPromoMessage({ type: 'success', text: { ar: 'تم تطبيق خصم 10% بنجاح! 🎉', fr: 'Code appliqué ! 10% de réduction 🎉' } });
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#D4AF37', '#E85D04', '#FFFFFF'],
        });
      } catch (e) {}
      return true;
    } else if (cleanCode === 'CHEF15') {
      setDiscountPercent(15);
      setPromoCode(cleanCode);
      setPromoMessage({ type: 'success', text: { ar: 'تم تطبيق خصم الشيف 15%! 🔥', fr: 'Code Chef appliqué ! -15% 🔥' } });
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.8 },
          colors: ['#D4AF37', '#E85D04', '#FFFFFF'],
        });
      } catch (e) {}
      return true;
    } else {
      setPromoMessage({ type: 'error', text: { ar: 'كود الخصم غير صالح أو منتهي الصلاحية', fr: 'Code promo invalide ou expiré' } });
      return false;
    }
  };

  const removePromoCode = () => {
    setPromoCode('');
    setDiscountPercent(0);
    setPromoMessage(null);
  };

  // Calculations
  const subtotal = cartItems.reduce((acc, curr) => acc + curr.totalPrice, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  
  const deliveryFee = orderType === 'pickup' 
    ? 0 
    : subtotal >= RESTAURANT_INFO.freeDeliveryThreshold || subtotal === 0
      ? 0
      : RESTAURANT_INFO.deliveryFee;

  const grandTotal = Math.max(0, subtotal - discountAmount + deliveryFee);
  const totalItemsCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  // Generate WhatsApp Order Message
  const generateWhatsAppUrl = (lang = 'ar') => {
    const isAr = lang === 'ar';
    const orderNumber = `FS-${Math.floor(1000 + Math.random() * 9000)}`;

    let message = '';

    if (isAr) {
      message += `⭐ *طلب جديد من مطعم خمس نجوم* ⭐\n`;
      message += `🔖 *رقم الطلب:* #${orderNumber}\n`;
      message += `📅 *التاريخ:* ${new Date().toLocaleDateString('ar-MA')} - ${new Date().toLocaleTimeString('ar-MA', { hour: '2-digit', minute: '2-digit' })}\n`;
      message += `──────────────────\n`;
      message += `👤 *معلومات الزبون:*\n`;
      message += `• *الاسم:* ${customerInfo.name || 'غير محدد'}\n`;
      message += `• *رقم الهاتف:* ${customerInfo.phone || 'غير محدد'}\n`;
      message += `• *طريقة الاستلام:* ${orderType === 'delivery' ? '🛵 توصيل للمنزل' : '🏬 استلام من المطعم'}\n`;
      if (orderType === 'delivery') {
        message += `• *الحي / العنوان:* ${customerInfo.neighborhood ? customerInfo.neighborhood + ' - ' : ''}${customerInfo.address || 'العنوان عبر مشاركة الموقع'}\n`;
      }
      message += `──────────────────\n`;
      message += `🍽️ *تفاصيل الوجبات المطلوبة:*\n`;

      cartItems.forEach((ci, idx) => {
        message += `\n*${idx + 1}. ${ci.quantity}x ${ci.item.name.ar}* (${ci.totalPrice} درهم)\n`;
        
        const details = [];
        if (ci.customizations.protein) details.push(`البروتين: ${ci.customizations.protein.name.ar}`);
        if (ci.customizations.size) details.push(`الحجم: ${ci.customizations.size.name.ar}`);
        if (ci.customizations.spiciness) details.push(`النكهة: ${ci.customizations.spiciness.name.ar}`);
        if (ci.customizations.sugar) details.push(`السكر: ${ci.customizations.sugar.name.ar}`);
        if (ci.customizations.addons && ci.customizations.addons.length > 0) {
          details.push(`إضافات: ${ci.customizations.addons.map(a => a.name.ar).join('، ')}`);
        }
        if (ci.customizations.notes) {
          details.push(`ملاحظة خاصة: "${ci.customizations.notes}"`);
        }

        if (details.length > 0) {
          message += `   ↳ ${details.join(' | ')}\n`;
        }
      });

      message += `\n──────────────────\n`;
      message += `🧾 *ملخص الفاتورة:*\n`;
      message += `• المجموع الفرعي: ${subtotal} درهم\n`;
      if (discountAmount > 0) {
        message += `• كود الخصم (${promoCode}): -${discountAmount} درهم\n`;
      }
      message += `• رسوم التوصيل: ${orderType === 'pickup' ? 'مجاناً (استلام)' : deliveryFee === 0 ? 'مجاناً (عرض التوصيل)' : deliveryFee + ' درهم'}\n`;
      message += `💰 *المجموع النهائي للدفع: ${grandTotal} درهم*\n`;
      message += `──────────────────\n`;
      if (customerInfo.notes) {
        message += `📝 *ملاحظات الزبون:* ${customerInfo.notes}\n`;
        message += `──────────────────\n`;
      }
      message += `✨ شكراً لاختياركم خمس نجوم! نرجو تأكيد الطلب وسنبدأ التحضير فوراً.`;
    } else {
      message += `⭐ *NOUVELLE COMMANDE - 5 ÉTOILES* ⭐\n`;
      message += `🔖 *N° Commande:* #${orderNumber}\n`;
      message += `📅 *Date:* ${new Date().toLocaleDateString('fr-FR')} - ${new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}\n`;
      message += `──────────────────\n`;
      message += `👤 *Client:*\n`;
      message += `• *Nom:* ${customerInfo.name || 'Non spécifié'}\n`;
      message += `• *Tél:* ${customerInfo.phone || 'Non spécifié'}\n`;
      message += `• *Type:* ${orderType === 'delivery' ? '🛵 Livraison à domicile' : '🏬 À emporter (Pickup)'}\n`;
      if (orderType === 'delivery') {
        message += `• *Adresse:* ${customerInfo.neighborhood ? customerInfo.neighborhood + ' - ' : ''}${customerInfo.address || 'Localisation WhatsApp'}\n`;
      }
      message += `──────────────────\n`;
      message += `🍽️ *Articles commandés:*\n`;

      cartItems.forEach((ci, idx) => {
        message += `\n*${idx + 1}. ${ci.quantity}x ${ci.item.name.fr}* (${ci.totalPrice} Dh)\n`;
        
        const details = [];
        if (ci.customizations.protein) details.push(`Option: ${ci.customizations.protein.name.fr}`);
        if (ci.customizations.size) details.push(`Format: ${ci.customizations.size.name.fr}`);
        if (ci.customizations.spiciness) details.push(`Assaisonnement: ${ci.customizations.spiciness.name.fr}`);
        if (ci.customizations.sugar) details.push(`Sucre: ${ci.customizations.sugar.name.fr}`);
        if (ci.customizations.addons && ci.customizations.addons.length > 0) {
          details.push(`Extras: ${ci.customizations.addons.map(a => a.name.fr).join(', ')}`);
        }
        if (ci.customizations.notes) {
          details.push(`Note: "${ci.customizations.notes}"`);
        }

        if (details.length > 0) {
          message += `   ↳ ${details.join(' | ')}\n`;
        }
      });

      message += `\n──────────────────\n`;
      message += `🧾 *Détail facture:*\n`;
      message += `• Sous-total: ${subtotal} Dh\n`;
      if (discountAmount > 0) {
        message += `• Code Promo (${promoCode}): -${discountAmount} Dh\n`;
      }
      message += `• Livraison: ${orderType === 'pickup' ? 'Gratuit (Emporté)' : deliveryFee === 0 ? 'Gratuit' : deliveryFee + ' Dh'}\n`;
      message += `💰 *TOTAL À PAYER: ${grandTotal} Dh*\n`;
      message += `──────────────────\n`;
      if (customerInfo.notes) {
        message += `📝 *Instructions spéciales:* ${customerInfo.notes}\n`;
        message += `──────────────────\n`;
      }
      message += `✨ Merci de commander chez 5 Étoiles ! Merci de confirmer votre commande.`;
    }

    const encoded = encodeURIComponent(message);
    return `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encoded}`;
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
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
        lastAddedNotification,
        generateWhatsAppUrl,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

