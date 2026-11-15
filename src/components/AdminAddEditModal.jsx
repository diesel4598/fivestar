import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Save, 
  Plus, 
  Image as ImageIcon, 
  Flame, 
  Sparkles, 
  Crown, 
  Star, 
  Check, 
  Utensils,
  DollarSign,
  Upload,
  UploadCloud,
  FolderOpen,
  Trash2,
  Link as LinkIcon,
  AlertCircle
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useMenu } from '../context/MenuContext';

// Available uploaded photos for quick selection
const AVAILABLE_PHOTOS = [
  { path: '/images/shawarma-arabi-platter.jpg', label: 'شاورما عربي مقطع' },
  { path: '/images/shawarma-saj-wrap.jpg', label: 'شاورما صاج جامبو' },
  { path: '/images/shawarma-pita-lebanese.jpg', label: 'شاورما خبز لبناني' },
  { path: '/images/shawarma-triple-rolls.jpg', label: 'تريو شاورما رولز' },
  { path: '/images/shawarma-rice-plate.jpg', label: 'شاورما أرز وسلطة' },
  { path: '/images/grill-mashawi-skillet.jpg', label: 'مقلاة مشاوي مشكلة' },
  { path: '/images/hero-grand-feast.jpg', label: 'صينية الولائم الملكية' },
  { path: '/images/sandwich-crispy-supreme.jpg', label: 'ساندويش كريسبي سوبريم' },
  { path: '/images/sandwich-fajita-sub.jpg', label: 'ساندويش فاهيتا دجاج' },
  { path: '/images/crispy-chicken-tenders.jpg', label: 'وجبة كريسبي تندرز' },
  { path: '/images/juice-orange-mango.jpg', label: 'كوكتيل مانجو وبرتقال' },
  { path: '/images/juice-strawberry.jpg', label: 'عصير فراولة مثلج' },
];

export const AdminAddEditModal = () => {
  const { lang, t } = useLanguage();
  const { 
    isAddEditModalOpen, 
    setIsAddEditModalOpen, 
    editingItem, 
    addItem, 
    updateItem, 
    categories 
  } = useMenu();

  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    nameAr: '',
    nameFr: '',
    category: 'shawarma-platters',
    price: 35,
    calories: '650 kcal',
    descAr: '',
    descFr: '',
    image: '/images/shawarma-arabi-platter.jpg',
    popular: false,
    isChefChoice: false,
    isFamily: false,
  });

  const [imageTab, setImageTab] = useState('upload'); // 'upload' | 'gallery' | 'url'
  const [uploadedFileInfo, setUploadedFileInfo] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingItem) {
      const img = editingItem.image || '/images/shawarma-arabi-platter.jpg';
      setFormData({
        nameAr: editingItem.name?.ar || '',
        nameFr: editingItem.name?.fr || '',
        category: editingItem.category || 'shawarma-platters',
        price: editingItem.price || 35,
        calories: editingItem.calories || '650 kcal',
        descAr: editingItem.description?.ar || '',
        descFr: editingItem.description?.fr || '',
        image: img,
        popular: Boolean(editingItem.popular),
        isChefChoice: Boolean(editingItem.isChefChoice),
        isFamily: Boolean(editingItem.isFamily),
      });

      // Set initial image tab based on format
      if (img.startsWith('data:image/')) {
        setImageTab('upload');
        setUploadedFileInfo({ name: 'صورة محملة من الجهاز', size: 'محفوظة' });
      } else if (img.startsWith('http://') || img.startsWith('https://')) {
        setImageTab('url');
      } else {
        setImageTab('gallery');
      }

      setErrors({});
      setUploadError(null);
    }
  }, [editingItem]);

  if (!isAddEditModalOpen || !editingItem) return null;

  const isNew = editingItem.isNew;

  // Process file upload from desktop
  const handleProcessFile = (file) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError(lang === 'ar' ? 'يرجى اختيار ملف صورة صالح (JPG, PNG, WEBP)' : 'Veuillez sélectionner une image valide');
      return;
    }

    setUploadError(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      const rawDataUrl = e.target.result;

      // Optimize/scale image using HTML5 Canvas to prevent local storage bloat
      const img = new Image();
      img.onload = () => {
        const MAX_DIMENSION = 1200;
        let w = img.width;
        let h = img.height;

        if (w > MAX_DIMENSION || h > MAX_DIMENSION) {
          if (w > h) {
            h = Math.round((h * MAX_DIMENSION) / w);
            w = MAX_DIMENSION;
          } else {
            w = Math.round((w * MAX_DIMENSION) / h);
            h = MAX_DIMENSION;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);

        const optimizedDataUrl = canvas.toDataURL('image/jpeg', 0.88);
        setFormData(prev => ({ ...prev, image: optimizedDataUrl }));
        setUploadedFileInfo({
          name: file.name,
          size: `${(file.size / 1024).toFixed(1)} KB`,
        });
        setImageTab('upload');
      };

      img.onerror = () => {
        setFormData(prev => ({ ...prev, image: rawDataUrl }));
        setUploadedFileInfo({
          name: file.name,
          size: `${(file.size / 1024).toFixed(1)} KB`,
        });
        setImageTab('upload');
      };

      img.src = rawDataUrl;
    };

    reader.readAsDataURL(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleProcessFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleProcessFile(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const err = {};
    if (!formData.nameAr.trim()) {
      err.nameAr = lang === 'ar' ? 'اسم الوجبة بالعربية مطلوب' : 'Nom en arabe requis';
    }
    if (!formData.price || Number(formData.price) <= 0) {
      err.price = lang === 'ar' ? 'يرجى إدخال ثمن صحيح' : 'Prix invalide';
    }
    if (!formData.image.trim()) {
      err.image = lang === 'ar' ? 'يرجى اختيار أو رفع صورة للوجبة' : 'Photo requise';
    }

    if (Object.keys(err).length > 0) {
      setErrors(err);
      return;
    }

    const payload = {
      name: {
        ar: formData.nameAr.trim(),
        fr: formData.nameFr.trim() || formData.nameAr.trim(),
      },
      category: formData.category,
      price: Number(formData.price),
      calories: formData.calories.trim(),
      description: {
        ar: formData.descAr.trim() || 'وجبة طازجة ومحضرة يومياً بأجود المكونات والبهارات الشامية.',
        fr: formData.descFr.trim() || 'Préparé frais chaque jour avec les meilleurs ingrédients et épices orientales.',
      },
      image: formData.image.trim(),
      popular: formData.popular,
      isChefChoice: formData.isChefChoice,
      isFamily: formData.isFamily,
    };

    if (isNew) {
      addItem(payload);
    } else {
      updateItem(editingItem.id, payload);
    }

    setIsAddEditModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-fadeIn">
      
      {/* Backdrop */}
      <div 
        className="fixed inset-0" 
        onClick={() => setIsAddEditModalOpen(false)} 
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#141414] border-2 border-[#D4AF37]/50 rounded-3xl shadow-2xl overflow-hidden z-10 my-8 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-[#201A10] to-[#141414] border-b border-[#D4AF37]/30 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E85D04]/20 border border-[#E85D04]/50 flex items-center justify-center text-[#E85D04]">
              {isNew ? <Plus className="w-5 h-5 stroke-[2.5]" /> : <Save className="w-5 h-5" />}
            </div>
            <div>
              <h2 className="font-cairo font-black text-lg sm:text-xl text-white">
                {isNew 
                  ? (lang === 'ar' ? 'إضافة وجبة أو عصير جديد للقائمة' : 'Ajouter un nouveau plat ou jus')
                  : (lang === 'ar' ? 'تعديل بيانات الوجبة والثمن' : 'Modifier le plat et son prix')}
              </h2>
              <span className="text-xs text-[#D4AF37] font-medium">
                {lang === 'ar' ? 'يمكنك رفع الصور مباشرة من سطح المكتب أو جهازك' : 'Téléchargez des photos directement depuis votre ordinateur'}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsAddEditModalOpen(false)}
            className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5 overflow-y-auto flex-1">
          
          {/* Item Names (AR & FR) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold font-cairo text-white mb-1.5">
                {lang === 'ar' ? 'اسم الوجبة أو العصير (بالعربية) *' : 'Nom du plat (Arabe) *'}
              </label>
              <input
                type="text"
                value={formData.nameAr}
                onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
                placeholder={lang === 'ar' ? 'مثال: وجبة شاورما عربي سوبريم' : 'Ex: وجبة شاورما عربي سوبريم'}
                className={`w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border ${
                  errors.nameAr ? 'border-rose-500' : 'border-neutral-700'
                } text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37]`}
                dir="rtl"
              />
              {errors.nameAr && (
                <span className="text-[11px] text-rose-400 mt-1 block">{errors.nameAr}</span>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold font-cairo text-white mb-1.5">
                {lang === 'ar' ? 'اسم الوجبة أو العصير (بالفرنسية)' : 'Nom du plat (Français)'}
              </label>
              <input
                type="text"
                value={formData.nameFr}
                onChange={(e) => setFormData({ ...formData, nameFr: e.target.value })}
                placeholder="Ex: Assiette Shawarma Arabi Suprême"
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37]"
                dir="ltr"
              />
            </div>
          </div>

          {/* Category & Price */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Category Dropdown */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold font-cairo text-white mb-1.5">
                {lang === 'ar' ? 'فئة الوجبة أو المشروب *' : 'Catégorie *'}
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
              >
                {categories.filter(c => c.id !== 'all').map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {t(cat.label)}
                  </option>
                ))}
              </select>
            </div>

            {/* Price (Thaman) in Dh */}
            <div>
              <label className="block text-xs font-bold font-cairo text-[#D4AF37] mb-1.5">
                {lang === 'ar' ? 'الثمن (بالدرهم Dh) *' : 'Prix (en Dh) *'}
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  step="0.5"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="35"
                  className={`w-full px-3.5 py-2.5 pe-12 rounded-xl bg-neutral-900 border ${
                    errors.price ? 'border-rose-500' : 'border-[#D4AF37]/50'
                  } text-base font-mono font-bold text-amber-400 focus:outline-none focus:border-[#D4AF37]`}
                />
                <span className="absolute end-3 top-2.5 text-xs text-neutral-400 font-bold">
                  {lang === 'ar' ? 'درهم' : 'Dh'}
                </span>
              </div>
              {errors.price && (
                <span className="text-[11px] text-rose-400 mt-1 block">{errors.price}</span>
              )}
            </div>
          </div>

          {/* Calories / Portion Info */}
          <div>
            <label className="block text-xs font-bold font-cairo text-white mb-1.5">
              {lang === 'ar' ? 'السعرات الحرارية أو عدد الحصص' : 'Calories ou Portions'}
            </label>
            <input
              type="text"
              value={formData.calories}
              onChange={(e) => setFormData({ ...formData, calories: e.target.value })}
              placeholder={lang === 'ar' ? 'مثال: 720 kcal أو 2-3 أشخاص' : 'Ex: 720 kcal ou 2-3 personnes'}
              className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          {/* IMAGE SELECTION & DESKTOP FILE UPLOADER */}
          <div className="space-y-3 pt-2 border-t border-neutral-800">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <label className="text-xs font-bold font-cairo text-white flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-[#D4AF37]" />
                <span>{lang === 'ar' ? 'صورة الوجبة أو العصير *' : 'Photo du plat ou jus *'}</span>
              </label>

              {/* Source Tabs: Upload from PC, Studio Gallery, or Direct URL */}
              <div className="flex items-center gap-1 bg-neutral-950 p-1 rounded-xl border border-neutral-800 text-xs">
                <button
                  type="button"
                  onClick={() => setImageTab('upload')}
                  className={`px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    imageTab === 'upload' 
                      ? 'bg-[#E85D04] text-white' 
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <UploadCloud className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'من سطح المكتب' : 'Ordinateur'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setImageTab('gallery')}
                  className={`px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    imageTab === 'gallery' 
                      ? 'bg-[#D4AF37] text-black' 
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <FolderOpen className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'معرض الاستوديو' : 'Galerie'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setImageTab('url')}
                  className={`px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    imageTab === 'url' 
                      ? 'bg-neutral-800 text-white' 
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <LinkIcon className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'رابط URL' : 'Lien'}</span>
                </button>
              </div>
            </div>

            {/* TAB 1: DESKTOP FILE UPLOADER (DRAG & DROP ZONE) */}
            {imageTab === 'upload' && (
              <div className="space-y-3">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/png, image/jpeg, image/jpg, image/webp"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative p-6 sm:p-8 rounded-2xl border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center text-center group ${
                    isDragging
                      ? 'border-[#D4AF37] bg-[#D4AF37]/15 scale-[1.01]'
                      : 'border-neutral-700 hover:border-[#D4AF37]/60 bg-neutral-950/70 hover:bg-neutral-900/80'
                  }`}
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#E85D04]/15 border border-[#E85D04]/30 text-[#E85D04] group-hover:text-[#D4AF37] group-hover:scale-110 flex items-center justify-center mb-3 transition-all shadow-inner">
                    <UploadCloud className="w-7 h-7" />
                  </div>

                  <h4 className="font-cairo font-bold text-sm text-white mb-1">
                    {lang === 'ar' 
                      ? 'انقر لاختيار صورة من سطح المكتب أو اسحب الملف هنا' 
                      : 'Cliquez pour parcourir vos fichiers ou glissez l\'image ici'}
                  </h4>

                  <p className="text-xs text-neutral-400 max-w-sm">
                    {lang === 'ar'
                      ? 'يدعم صور عالية الجودة بصيغة PNG أو JPG أو WEBP من جهاز الكمبيوتر مباشرة'
                      : 'Prend en charge les formats PNG, JPG, WEBP de haute qualité'}
                  </p>

                  <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-700 text-xs font-semibold text-[#D4AF37]">
                    <FolderOpen className="w-3.5 h-3.5" />
                    <span>{lang === 'ar' ? 'تصفح ملفات جهازك / سطح المكتب' : 'Parcourir l\'ordinateur'}</span>
                  </div>
                </div>

                {uploadError && (
                  <div className="flex items-center gap-1.5 text-xs text-rose-400">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{uploadError}</span>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: STUDIO GALLERY SELECTOR */}
            {imageTab === 'gallery' && (
              <div className="space-y-2">
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 p-2 bg-neutral-950 rounded-2xl border border-neutral-800 max-h-44 overflow-y-auto">
                  {AVAILABLE_PHOTOS.map((photo, i) => {
                    const isSelected = formData.image === photo.path;
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, image: photo.path });
                          setUploadedFileInfo(null);
                        }}
                        className={`relative rounded-xl overflow-hidden aspect-square border-2 transition-all cursor-pointer group ${
                          isSelected ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/50 scale-95' : 'border-neutral-800 hover:border-neutral-600'
                        }`}
                        title={photo.label}
                      >
                        <img 
                          src={photo.path} 
                          alt={photo.label} 
                          className="w-full h-full object-cover" 
                        />
                        {isSelected && (
                          <div className="absolute inset-0 bg-[#D4AF37]/30 flex items-center justify-center">
                            <div className="w-5 h-5 rounded-full bg-[#D4AF37] text-black flex items-center justify-center shadow">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </div>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 3: DIRECT IMAGE URL INPUT */}
            {imageTab === 'url' && (
              <div>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => {
                    setFormData({ ...formData, image: e.target.value });
                    setUploadedFileInfo(null);
                  }}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-xs text-white placeholder-neutral-500 font-mono focus:outline-none focus:border-[#D4AF37]"
                  dir="ltr"
                />
              </div>
            )}

            {/* CURRENT SELECTED IMAGE PREVIEW BAR */}
            {formData.image && (
              <div className="p-3 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-14 h-14 rounded-xl object-cover border border-[#D4AF37]/40 shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="text-[11px] text-[#D4AF37] font-bold block flex items-center gap-1">
                      <Check className="w-3 h-3 text-emerald-400 stroke-[3]" />
                      <span>{lang === 'ar' ? 'الصورة المحددة جاهزة للحفظ' : 'Photo prête'}</span>
                    </span>
                    <span className="text-xs text-neutral-300 block truncate">
                      {uploadedFileInfo?.name 
                        ? `${uploadedFileInfo.name} (${uploadedFileInfo.size})`
                        : formData.image.startsWith('data:') 
                          ? (lang === 'ar' ? 'صورة مرفوعة من جهاز الكمبيوتر' : 'Image personnalisée') 
                          : formData.image}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs text-white transition-colors cursor-pointer shrink-0 flex items-center gap-1.5"
                >
                  <Upload className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{lang === 'ar' ? 'تغيير' : 'Changer'}</span>
                </button>
              </div>
            )}

            {errors.image && (
              <span className="text-[11px] text-rose-400 mt-1 block">{errors.image}</span>
            )}
          </div>

          {/* Descriptions (AR & FR) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold font-cairo text-white mb-1.5">
                {lang === 'ar' ? 'الوصف وقائمة المكونات (بالعربية)' : 'Description (Arabe)'}
              </label>
              <textarea
                rows={3}
                value={formData.descAr}
                onChange={(e) => setFormData({ ...formData, descAr: e.target.value })}
                placeholder={lang === 'ar' ? 'شاورما على الصاج تقدم مع بطاطس مقلية، ثومية، ومخللات...' : 'Description en arabe'}
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37]"
                dir="rtl"
              />
            </div>

            <div>
              <label className="block text-xs font-bold font-cairo text-white mb-1.5">
                {lang === 'ar' ? 'الوصف (بالفرنسية)' : 'Description (Français)'}
              </label>
              <textarea
                rows={3}
                value={formData.descFr}
                onChange={(e) => setFormData({ ...formData, descFr: e.target.value })}
                placeholder="Shawarma grillé au saj servi avec frites, toum et condiments..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37]"
                dir="ltr"
              />
            </div>
          </div>

          {/* Promotional Badges Checkboxes */}
          <div className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2.5">
            <label className="text-xs font-bold font-cairo text-[#D4AF37] block">
              {lang === 'ar' ? 'شارات الترويج والظهور:' : 'Badges promotionnels :'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              
              <label className="flex items-center gap-2 p-2 rounded-xl bg-neutral-900 border border-neutral-800 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={formData.popular}
                  onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
                  className="rounded text-[#E85D04] focus:ring-0"
                />
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span className="text-xs text-white">
                  {lang === 'ar' ? 'الأكثر طلباً' : 'Best-seller'}
                </span>
              </label>

              <label className="flex items-center gap-2 p-2 rounded-xl bg-neutral-900 border border-neutral-800 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={formData.isChefChoice}
                  onChange={(e) => setFormData({ ...formData, isChefChoice: e.target.checked })}
                  className="rounded text-[#D4AF37] focus:ring-0"
                />
                <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="text-xs text-white">
                  {lang === 'ar' ? 'توصية الشيف' : 'Choix du chef'}
                </span>
              </label>

              <label className="flex items-center gap-2 p-2 rounded-xl bg-neutral-900 border border-neutral-800 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={formData.isFamily}
                  onChange={(e) => setFormData({ ...formData, isFamily: e.target.checked })}
                  className="rounded text-amber-500 focus:ring-0"
                />
                <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                <span className="text-xs text-white">
                  {lang === 'ar' ? 'وجبة عائلية' : 'Format famille'}
                </span>
              </label>

            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#E85D04] via-[#F48C06] to-[#D4AF37] hover:from-[#f06810] hover:to-[#dfbb43] text-black font-cairo font-black text-base shadow-xl shadow-amber-600/25 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Save className="w-5 h-5" />
              <span>
                {isNew 
                  ? (lang === 'ar' ? 'حفظ وإضافة الوجبة فوراً للقائمة' : 'Ajouter le plat au menu') 
                  : (lang === 'ar' ? 'حفظ التعديلات وتحديث الأسعار' : 'Enregistrer les modifications')}
              </span>
            </button>
          </div>

        </form>

      </div>

    </div>
  );
};
