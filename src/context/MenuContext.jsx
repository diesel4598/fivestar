import React, { createContext, useContext, useState, useEffect } from 'react';
import { MENU_ITEMS as DEFAULT_MENU_ITEMS, CATEGORIES } from '../data/restaurantData';

const MenuContext = createContext();

const STORAGE_KEY = 'fivestar_menu_items_v1';
const PIN_STORAGE_KEY = 'fivestar_admin_pin_v1';
export const DEFAULT_PIN = '4598';
export const SECRET_PIN = DEFAULT_PIN;

export const MenuProvider = ({ children }) => {
  const [adminPin, setAdminPin] = useState(() => {
    try {
      const saved = localStorage.getItem(PIN_STORAGE_KEY);
      if (saved && /^\d{4}$/.test(saved)) {
        return saved;
      }
    } catch (e) {}
    return DEFAULT_PIN;
  });

  const [menuItems, setMenuItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading menu from localStorage', e);
    }
    return DEFAULT_MENU_ITEMS;
  });

  // Authentication state protected by PIN
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return sessionStorage.getItem('fivestar_admin_auth') === 'true';
    } catch {
      return false;
    }
  });

  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [isManagerOpen, setIsManagerOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null); // Item currently in edit modal
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [feedbackToast, setFeedbackToast] = useState(null);

  // Sync menu items to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(menuItems));
    } catch (e) {
      console.error('Error saving menu to localStorage', e);
    }
  }, [menuItems]);

  // Sync PIN to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(PIN_STORAGE_KEY, adminPin);
    } catch (e) {
      console.error('Error saving PIN to localStorage', e);
    }
  }, [adminPin]);

  // Sync auth status to sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem('fivestar_admin_auth', isAuthenticated ? 'true' : 'false');
    } catch (e) {}
  }, [isAuthenticated]);

  const showToast = (message, type = 'success') => {
    setFeedbackToast({ message, type, time: Date.now() });
    setTimeout(() => {
      setFeedbackToast(null);
    }, 3500);
  };

  // Verify secret PIN (dynamically against adminPin)
  const verifyPin = (enteredPin) => {
    if (enteredPin === adminPin) {
      setIsAuthenticated(true);
      setIsPinModalOpen(false);
      setIsManagerOpen(true);
      showToast({
        ar: 'تم فتح صلاحيات التعديل بنجاح! 🔓',
        fr: 'Accès administrateur déverrouillé ! 🔓',
      });
      return { success: true };
    } else {
      return {
        success: false,
        error: {
          ar: 'الرقم السري غير صحيح، يرجى المحاولة مجدداً',
          fr: 'Code secret incorrect, veuillez réessayer',
        },
      };
    }
  };

  // Change secret PIN
  const changePin = (newPin, confirmPin) => {
    const trimmedNew = (newPin || '').trim();
    const trimmedConfirm = (confirmPin || '').trim();

    if (!/^\d{4}$/.test(trimmedNew)) {
      return {
        success: false,
        error: {
          ar: 'يجب أن يتكون الرقم السري الجديد من 4 أرقام عددية فقط (0-9)',
          fr: 'Le nouveau code secret doit comporter exactement 4 chiffres',
        },
      };
    }

    if (trimmedNew !== trimmedConfirm) {
      return {
        success: false,
        error: {
          ar: 'تأكيد الرقم السري غير متطابق، يرجى التحقق',
          fr: 'Les deux codes saisis ne correspondent pas',
        },
      };
    }

    setAdminPin(trimmedNew);
    try {
      localStorage.setItem(PIN_STORAGE_KEY, trimmedNew);
    } catch (e) {}

    showToast({
      ar: 'تم تغيير الرمز السري بنجاح! 🔑 احفظه لدخول الإدارة القادم',
      fr: 'Code secret mis à jour avec succès ! 🔑',
    });

    return { success: true };
  };

  // Reset PIN to default (4598)
  const resetPinToDefault = () => {
    setAdminPin(DEFAULT_PIN);
    try {
      localStorage.setItem(PIN_STORAGE_KEY, DEFAULT_PIN);
    } catch (e) {}
    showToast({
      ar: 'تمت استعادة الرمز السري الافتراضي (4598) 🔄',
      fr: 'Code secret réinitialisé à 4598 🔄',
    });
    return { success: true };
  };

  // Request to open management panel
  const requestOpenManager = () => {
    if (isAuthenticated) {
      setIsManagerOpen(true);
    } else {
      setIsPinModalOpen(true);
    }
  };

  // Lock and logout
  const lockAdmin = () => {
    setIsAuthenticated(false);
    setIsManagerOpen(false);
    setIsAddEditModalOpen(false);
    try {
      sessionStorage.removeItem('fivestar_admin_auth');
    } catch (e) {}
    showToast({
      ar: 'تم قفل صلاحيات التعديل وإغلاق لوحة الإدارة 🔒',
      fr: 'Session administrateur verrouillée 🔒',
    }, 'info');
  };

  // Add new dish or juice
  const addItem = (itemData) => {
    const id = itemData.id || `item-${Date.now()}`;
    const newItem = {
      ...itemData,
      id,
      price: Number(itemData.price) || 0,
    };

    setMenuItems(prev => [newItem, ...prev]);
    showToast({
      ar: `تمت إضافة "${newItem.name.ar}" بنجاح إلى القائمة! ✨`,
      fr: `"${newItem.name.fr}" a été ajouté avec succès ! ✨`,
    });
    return newItem;
  };

  // Update existing dish or juice
  const updateItem = (id, updatedFields) => {
    setMenuItems(prev => {
      return prev.map(item => {
        if (item.id === id) {
          return {
            ...item,
            ...updatedFields,
            price: updatedFields.price !== undefined ? Number(updatedFields.price) : item.price,
          };
        }
        return item;
      });
    });

    showToast({
      ar: 'تم تحديث بيانات الوجبة بنجاح! 💾',
      fr: 'Plat mis à jour avec succès ! 💾',
    });
  };

  // Quick price update
  const updatePrice = (id, newPrice) => {
    const numPrice = Number(newPrice);
    if (isNaN(numPrice) || numPrice < 0) return false;

    setMenuItems(prev => {
      return prev.map(item => {
        if (item.id === id) {
          return { ...item, price: numPrice };
        }
        return item;
      });
    });

    showToast({
      ar: `تم تحديث السعر إلى ${numPrice} درهم! 💰`,
      fr: `Prix actualisé à ${numPrice} Dh ! 💰`,
    });
    return true;
  };

  // Delete dish or juice
  const deleteItem = (id) => {
    setMenuItems(prev => prev.filter(item => item.id !== id));
    showToast({
      ar: 'تم حذف العنصر من القائمة.',
      fr: 'Élément supprimé du menu.',
    }, 'info');
  };

  // Reset to original default menu
  const resetMenuToDefault = () => {
    setMenuItems(DEFAULT_MENU_ITEMS);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
    showToast({
      ar: 'تمت استعادة القائمة الأصلية بنجاح 🔄',
      fr: 'Menu réinitialisé par défaut 🔄',
    });
  };

  // Open modal to add item
  const openAddModal = (defaultCategory = 'shawarma-platters') => {
    setEditingItem({
      isNew: true,
      category: defaultCategory,
      price: 35,
      popular: false,
      isChefChoice: false,
      image: '/images/shawarma-arabi-platter.jpg',
      name: { ar: '', fr: '' },
      description: { ar: '', fr: '' },
      calories: '650 kcal',
    });
    setIsAddEditModalOpen(true);
  };

  // Open modal to edit specific item
  const openEditModal = (item) => {
    setEditingItem({ ...item, isNew: false });
    setIsAddEditModalOpen(true);
  };

  return (
    <MenuContext.Provider
      value={{
        menuItems,
        categories: CATEGORIES,
        isAuthenticated,
        adminPin,
        changePin,
        resetPinToDefault,
        isPinModalOpen,
        setIsPinModalOpen,
        isManagerOpen,
        setIsManagerOpen,
        requestOpenManager,
        verifyPin,
        lockAdmin,
        editingItem,
        setEditingItem,
        isAddEditModalOpen,
        setIsAddEditModalOpen,
        addItem,
        updateItem,
        updatePrice,
        deleteItem,
        resetMenuToDefault,
        openAddModal,
        openEditModal,
        feedbackToast,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};
