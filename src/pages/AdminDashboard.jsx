import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';

export default function AdminDashboard() {
  const {
    menuItems,
    plans,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    toggleItemAvailability,
    toggleItemShowPrice,
    updatePlan,
    resetToDefaults,
  } = useData();

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return sessionStorage.getItem('fitfuel_admin_auth') === 'true';
    } catch {
      return false;
    }
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const clean = passwordInput.trim().toLowerCase();
    if (clean === 'admin' || clean === 'admin123' || clean === 'fitfuel') {
      try {
        sessionStorage.setItem('fitfuel_admin_auth', 'true');
      } catch (err) {
        console.error(err);
      }
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect administrator password.');
    }
  };

  const handleLogout = () => {
    try {
      sessionStorage.removeItem('fitfuel_admin_auth');
    } catch (err) {
      console.error(err);
    }
    setIsAuthenticated(false);
  };

  const [activeTab, setActiveTab] = useState('items'); // 'items' | 'plans' | 'inquiries'
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  // Modal / Form state for Adding / Editing items
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Form fields
  const [formData, setFormData] = useState({
    name: '',
    category: 'lunch',
    dietType: 'Veg',
    price: '',
    showPrice: true,
    isAvailable: true,
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
    keyIngredients: '',
    healthBenefits: '',
    image: '',
    description: '',
  });

  // Modal state for Editing a Plan
  const [editingPlan, setEditingPlan] = useState(null);
  const [planFormData, setPlanFormData] = useState({
    title: '',
    weeklyPrice: '',
    monthlyPrice: '',
    shortDescription: '',
    description: '',
  });

  // Notification toast
  const [toastMessage, setToastMessage] = useState('');
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Open modal for new item
  const handleOpenAddModal = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      category: 'lunch',
      dietType: 'Veg',
      price: '250',
      showPrice: true,
      isAvailable: true,
      calories: '450',
      protein: '25g',
      carbs: '45g',
      fat: '10g',
      keyIngredients: '',
      healthBenefits: '',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop',
      description: '',
    });
    setIsItemModalOpen(true);
  };

  // Open modal for edit item
  const handleOpenEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name || '',
      category: item.category || 'lunch',
      dietType: item.dietType || 'Veg',
      price: item.price !== undefined ? item.price : '',
      showPrice: item.showPrice !== undefined ? item.showPrice : true,
      isAvailable: item.isAvailable !== undefined ? item.isAvailable : true,
      calories: item.calories || '',
      protein: item.protein || '',
      carbs: item.carbs || '',
      fat: item.fat || '',
      keyIngredients: item.keyIngredients || '',
      healthBenefits: item.healthBenefits || '',
      image: item.image || '',
      description: item.description || '',
    });
    setIsItemModalOpen(true);
  };

  // Save Item
  const handleSaveItem = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Please enter a meal or dish name.');
      return;
    }

    const payload = {
      ...formData,
      price: Number(formData.price) || 0,
      calories: Number(formData.calories) || 0,
    };

    if (editingItem) {
      updateMenuItem(editingItem.id, payload);
      showToast(`Updated "${formData.name}" successfully.`);
    } else {
      addMenuItem(payload);
      showToast(`Added new item "${formData.name}".`);
    }

    setIsItemModalOpen(false);
  };

  // Delete item with confirm
  const handleDeleteItem = (item) => {
    if (window.confirm(`Are you sure you want to remove "${item.name}" from the menu?`)) {
      deleteMenuItem(item.id);
      showToast(`Removed "${item.name}".`);
    }
  };

  // Plan Edit handlers
  const handleOpenEditPlan = (plan) => {
    setEditingPlan(plan);
    setPlanFormData({
      title: plan.title,
      weeklyPrice: plan.pricing?.weekly || '',
      monthlyPrice: plan.pricing?.monthly || '',
      shortDescription: plan.shortDescription || '',
      description: plan.description || '',
    });
  };

  const handleSavePlan = (e) => {
    e.preventDefault();
    if (!editingPlan) return;
    updatePlan(editingPlan.id, {
      title: planFormData.title,
      shortDescription: planFormData.shortDescription,
      description: planFormData.description,
      pricing: {
        weekly: Number(planFormData.weeklyPrice) || editingPlan.pricing.weekly,
        monthly: Number(planFormData.monthlyPrice) || editingPlan.pricing.monthly,
      },
    });
    showToast(`Updated ${planFormData.title} successfully.`);
    setEditingPlan(null);
  };

  // Filter items
  const filteredItems = menuItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.keyIngredients && item.keyIngredients.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-paper px-4 py-16">
        <div className="w-full max-w-md bg-card rounded-card border border-rule p-8 shadow-card text-center">
          <div className="flex justify-center mb-4">
            <img
              src="/logo.jpg"
              alt="FitFuel Nutrition Logo"
              className="h-14 w-14 object-cover rounded-control border border-primary/20 shadow-xs"
            />
          </div>
          <span className="inline-block text-2xs font-semibold text-accent border border-rule rounded-pill px-3 py-0.5 mb-2">
            Restricted portal
          </span>
          <h1 className="text-2xl font-display font-semibold text-ink mb-1">
            Kitchen Administration
          </h1>
          <p className="text-xs text-muted mb-6 leading-relaxed">
            Please enter your administrator password to manage daily menus, pricing visibility, and customer plans.
          </p>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label htmlFor="admin-pass" className="block text-xs font-semibold text-ink mb-1.5">
                Administrator password
              </label>
              <input
                id="admin-pass"
                type="password"
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  if (authError) setAuthError('');
                }}
                placeholder="Enter password"
                autoFocus
                className="w-full px-3.5 py-2.5 rounded-control border border-rule bg-paper text-xs text-ink focus:outline-none focus:ring-2 focus:ring-accent"
              />
              {authError && <p className="text-xs text-error mt-1.5">{authError}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-accent hover:bg-primary-dark text-accent-ink font-medium text-xs py-3 rounded-pill transition-colors cursor-pointer shadow-sm"
            >
              Access Dashboard
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-rule text-center">
            <Link to="/" className="text-xs text-muted hover:text-ink transition-colors">
              Return to public website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper pb-20">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-ink text-paper px-4 py-2.5 rounded-control shadow-elevated flex items-center gap-2 border border-rule text-sm">
          <svg className="w-4 h-4 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Admin Top Header */}
      <div className="bg-card border-b border-rule">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-pill text-xs font-medium bg-paper-2 text-accent border border-rule">
                  Kitchen control panel
                </span>
                <span className="text-xs text-muted">Kottayam central kitchen</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-display font-semibold text-ink mt-1">
                Meal & Nutrition Management
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Reset all items and plans back to factory initial data?')) {
                    resetToDefaults();
                    showToast('Data reset to original defaults.');
                  }
                }}
                className="text-xs text-muted hover:text-error px-3 py-2 border border-rule rounded-pill hover:bg-paper-2 transition-colors cursor-pointer"
              >
                Reset demo data
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="text-xs text-error font-medium px-3.5 py-2 border border-error/30 rounded-pill hover:bg-error/10 transition-colors cursor-pointer"
              >
                Sign out
              </button>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-6">
            <div className="bg-paper rounded-control p-4 border border-rule">
              <span className="text-xs text-muted font-medium">Active menu items</span>
              <p className="text-2xl font-display font-semibold text-ink mt-1">{menuItems.length}</p>
            </div>
            <div className="bg-paper rounded-control p-4 border border-rule">
              <span className="text-xs text-muted font-medium">Subscription plans</span>
              <p className="text-2xl font-display font-semibold text-ink mt-1">{plans.length}</p>
            </div>
            <div className="bg-paper rounded-control p-4 border border-rule">
              <span className="text-xs text-muted font-medium">Kitchen location</span>
              <p className="text-2xl font-display font-semibold text-ink mt-1">Kottayam</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 border-b border-rule mt-8 overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab('items')}
              className={`pb-3 px-4 font-medium text-sm transition-colors relative cursor-pointer whitespace-nowrap ${
                activeTab === 'items'
                  ? 'text-accent border-b-2 border-accent font-semibold'
                  : 'text-muted hover:text-ink'
              }`}
            >
              Menu items & nutrition ({menuItems.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('plans')}
              className={`pb-3 px-4 font-medium text-sm transition-colors relative cursor-pointer whitespace-nowrap ${
                activeTab === 'plans'
                  ? 'text-accent border-b-2 border-accent font-semibold'
                  : 'text-muted hover:text-ink'
              }`}
            >
              Subscription plans ({plans.length})
            </button>
          </div>
        </div>
      </div>

      {/* Main Body Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* ────────────────────────────────────────────────────────
            TAB 1: MENU ITEMS & NUTRITIONAL DETAILS
           ──────────────────────────────────────────────────────── */}
        {activeTab === 'items' && (
          <div>
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
              <div className="flex flex-wrap items-center gap-3 flex-1">
                {/* Search */}
                <div className="relative flex-1 min-w-[200px] max-w-md">
                  <input
                    type="text"
                    placeholder="Search by meal name or ingredients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-control border border-rule bg-card text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  <svg className="w-4 h-4 text-muted absolute left-3 top-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </div>

                {/* Category Filter */}
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-3.5 py-2 rounded-control border border-rule bg-card text-sm focus:outline-none focus:ring-2 focus:ring-accent text-ink"
                >
                  <option value="all">All categories</option>
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                  <option value="snack">Healthy snacks</option>
                </select>
              </div>

              {/* Add New Item Button */}
              <button
                type="button"
                onClick={handleOpenAddModal}
                className="bg-accent hover:bg-primary-dark text-accent-ink font-medium px-4 py-2 rounded-pill transition-colors flex items-center justify-center gap-2 cursor-pointer text-sm shadow-sm"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                <span>Add new meal</span>
              </button>
            </div>

            {/* Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className={`bg-card rounded-card border transition-transform duration-200 hover:-translate-y-0.5 shadow-card overflow-hidden flex flex-col justify-between ${
                    item.isAvailable === false ? 'border-rule-2 opacity-85' : 'border-rule'
                  }`}
                >
                  <div>
                    {/* Image & Badges */}
                    <div className="relative aspect-[16/10] bg-paper-2 overflow-hidden">
                      <img
                        src={item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop'}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
                        <span className="bg-ink/80 text-paper text-xs font-medium px-2.5 py-0.5 rounded-pill">
                          {item.category}
                        </span>
                        <span className="bg-paper text-ink text-xs font-medium px-2.5 py-0.5 rounded-pill border border-rule">
                          {item.dietType}
                        </span>
                      </div>

                      {/* Status Badges on Image */}
                      <div className="absolute top-3 right-3 flex flex-col items-end gap-1">
                        <span
                          className={`text-xs font-medium px-2.5 py-0.5 rounded-pill ${
                            item.isAvailable !== false
                              ? 'bg-primary text-white'
                              : 'bg-error text-white'
                          }`}
                        >
                          {item.isAvailable !== false ? 'Available' : 'Unavailable'}
                        </span>
                        {item.showPrice !== false ? (
                          <span className="bg-paper text-ink font-semibold px-2.5 py-0.5 rounded-pill text-xs">
                            ₹{item.price}
                          </span>
                        ) : (
                          <span className="bg-paper-2 text-muted text-xs px-2 py-0.5 rounded-pill border border-rule">
                            Price hidden
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="text-base font-display font-semibold text-ink">{item.name}</h3>
                      {item.description && (
                        <p className="text-xs text-muted mt-1 line-clamp-2">{item.description}</p>
                      )}

                      {/* 4 Macros Strip */}
                      <div className="grid grid-cols-4 gap-1.5 bg-paper rounded-control p-2.5 mt-3 text-center border border-rule">
                        <div>
                          <p className="text-xs text-muted font-medium">Calories</p>
                          <p className="text-xs font-semibold text-ink mt-0.5">{item.calories} kcal</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted font-medium">Protein</p>
                          <p className="text-xs font-semibold text-accent mt-0.5">{item.protein}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted font-medium">Carbs</p>
                          <p className="text-xs font-semibold text-ink mt-0.5">{item.carbs}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted font-medium">Fat</p>
                          <p className="text-xs font-semibold text-ink mt-0.5">{item.fat}</p>
                        </div>
                      </div>

                      {/* Key Ingredients */}
                      {item.keyIngredients && (
                        <div className="mt-3">
                          <p className="text-xs font-semibold text-ink">Key ingredients:</p>
                          <p className="text-xs text-muted mt-0.5 line-clamp-2">
                            {item.keyIngredients}
                          </p>
                        </div>
                      )}

                      {/* Health Benefits */}
                      {item.healthBenefits && (
                        <div className="mt-2.5 bg-paper p-2.5 rounded-control border border-rule">
                          <p className="text-xs font-semibold text-accent">Health benefits:</p>
                          <p className="text-xs text-ink mt-0.5 leading-snug">
                            {item.healthBenefits}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Admin Controls: Availability, Show Price, Edit, Delete */}
                  <div className="px-5 py-3 border-t border-rule bg-paper/50 flex flex-col gap-2">
                    {/* Live Toggles */}
                    <div className="flex items-center justify-between text-xs pt-1">
                      {/* Availability Toggle */}
                      <button
                        type="button"
                        onClick={() => toggleItemAvailability(item.id)}
                        className={`px-2.5 py-1 rounded-pill border font-medium transition-colors cursor-pointer ${
                          item.isAvailable !== false
                            ? 'border-accent text-accent bg-paper hover:bg-paper-2'
                            : 'border-error text-error bg-paper hover:bg-paper-2'
                        }`}
                        title="Click to toggle availability status"
                      >
                        Status: {item.isAvailable !== false ? 'Available' : 'Unavailable'}
                      </button>

                      {/* Show/Hide Price Toggle */}
                      <button
                        type="button"
                        onClick={() => toggleItemShowPrice(item.id)}
                        className={`px-2.5 py-1 rounded-pill border font-medium transition-colors cursor-pointer ${
                          item.showPrice !== false
                            ? 'border-rule-2 text-ink bg-paper hover:bg-paper-2'
                            : 'border-rule text-muted bg-paper-2 hover:bg-paper-3'
                        }`}
                        title="Click to toggle price visibility for users"
                      >
                        Price: {item.showPrice !== false ? 'Shown' : 'Hidden'}
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-rule/50">
                      <button
                        type="button"
                        onClick={() => handleOpenEditModal(item)}
                        className="text-xs font-medium text-accent hover:text-primary-dark transition-colors cursor-pointer"
                      >
                        Edit details & macros
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteItem(item)}
                        className="text-xs font-medium text-error hover:underline transition-colors cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-16 bg-card rounded-card border border-rule mt-4">
                <h3 className="text-base font-display font-semibold text-ink">No meals found</h3>
                <p className="text-xs text-muted mt-1">Try another search term or add a new meal to the menu.</p>
                <button
                  type="button"
                  onClick={handleOpenAddModal}
                  className="mt-4 bg-accent text-accent-ink text-xs font-medium px-4 py-2 rounded-pill"
                >
                  Add meal now
                </button>
              </div>
            )}
          </div>
        )}

        {/* ────────────────────────────────────────────────────────
            TAB 2: PLANS MANAGEMENT
           ──────────────────────────────────────────────────────── */}
        {activeTab === 'plans' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className="bg-card rounded-card border border-rule p-6 shadow-card flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium px-2.5 py-0.5 bg-paper-2 text-accent rounded-pill border border-rule">
                      /{plan.slug}
                    </span>
                    {plan.deliveryTime && (
                      <span className="text-xs text-muted font-medium">
                        {plan.deliveryTime}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-display font-semibold text-ink mt-3">{plan.title}</h3>
                  <p className="text-xs text-muted mt-1">{plan.shortDescription}</p>

                  <div className="grid grid-cols-2 gap-3 bg-paper p-3.5 rounded-control border border-rule mt-4">
                    <div>
                      <span className="text-xs text-muted">Weekly price</span>
                      <p className="text-lg font-display font-semibold text-ink">₹{plan.pricing?.weekly}</p>
                    </div>
                    <div>
                      <span className="text-xs text-muted">Monthly price</span>
                      <p className="text-lg font-display font-semibold text-ink">₹{plan.pricing?.monthly}</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-xs font-medium text-muted mb-2">What is included:</p>
                    <ul className="text-xs text-ink space-y-1">
                      {plan.includes?.map((inc, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <span className="text-accent font-semibold">✓</span> {inc}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 mt-5 border-t border-rule flex items-center justify-between">
                  <Link
                    to={`/${plan.slug}`}
                    className="text-xs text-muted hover:text-ink transition-colors"
                  >
                    View plan details
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleOpenEditPlan(plan)}
                    className="bg-accent hover:bg-primary-dark text-accent-ink font-medium text-xs px-3.5 py-1.5 rounded-pill transition-colors cursor-pointer"
                  >
                    Edit pricing & info
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ────────────────────────────────────────────────────────
          MODAL: ADD / EDIT MENU ITEM (Calories, Protein, Carbs, FAT, Key Ingredients, Health Benefits, Availability, Show Price)
         ──────────────────────────────────────────────────────── */}
      {isItemModalOpen && (
        <div className="fixed inset-0 z-50 bg-ink/50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-card rounded-card border border-rule max-w-2xl w-full p-6 sm:p-8 shadow-elevated max-h-[90vh] overflow-y-auto my-8">
            <div className="flex items-center justify-between pb-4 border-b border-rule">
              <h2 className="text-lg font-display font-semibold text-ink">
                {editingItem ? `Edit: ${editingItem.name}` : 'Add New Meal'}
              </h2>
              <button
                type="button"
                onClick={() => setIsItemModalOpen(false)}
                className="w-8 h-8 rounded-pill bg-paper-2 text-muted hover:text-ink flex items-center justify-center text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveItem} className="space-y-4 mt-6">
              {/* Item Name */}
              <div>
                <label className="block text-xs font-semibold text-ink mb-1">
                  Meal or dish name <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Herb Grilled Salmon with Millet Bowl"
                  className="w-full px-4 py-2.5 rounded-control border border-rule bg-paper text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              {/* Category, Diet, Price */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-ink mb-1">
                    Meal category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-control border border-rule bg-paper text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                    <option value="snack">Healthy snack</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink mb-1">
                    Dietary type
                  </label>
                  <select
                    value={formData.dietType}
                    onChange={(e) => setFormData({ ...formData, dietType: e.target.value })}
                    className="w-full px-3 py-2 rounded-control border border-rule bg-paper text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="Veg">Vegetarian</option>
                    <option value="Non-Veg">Non-Vegetarian</option>
                    <option value="Vegan">Vegan</option>
                    <option value="Eggetarian">Eggetarian</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink mb-1">
                    Serving price (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="240"
                    className="w-full px-3 py-2 rounded-control border border-rule bg-paper text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
              </div>

              {/* Availability & Show Price Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 bg-paper rounded-control border border-rule">
                <div>
                  <label className="block text-xs font-semibold text-ink mb-1">
                    Availability status
                  </label>
                  <select
                    value={formData.isAvailable ? 'available' : 'unavailable'}
                    onChange={(e) => setFormData({ ...formData, isAvailable: e.target.value === 'available' })}
                    className="w-full px-3 py-1.5 rounded-control border border-rule bg-paper text-xs text-ink focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="available">Available for ordering</option>
                    <option value="unavailable">Unavailable (sold out)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink mb-1">
                    Price visibility to users
                  </label>
                  <select
                    value={formData.showPrice ? 'show' : 'hide'}
                    onChange={(e) => setFormData({ ...formData, showPrice: e.target.value === 'show' })}
                    className="w-full px-3 py-1.5 rounded-control border border-rule bg-paper text-xs text-ink focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="show">Show price to users</option>
                    <option value="hide">Hide price from users</option>
                  </select>
                </div>
              </div>

              {/* NUTRITIONAL MACROS (Calories, Protein, Carbs, FAT) */}
              <div className="bg-paper p-4 rounded-control border border-rule">
                <p className="text-xs font-semibold text-ink mb-2">
                  Nutritional breakdown per portion
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-xs text-muted mb-1">Calories (kcal)</label>
                    <input
                      type="number"
                      value={formData.calories}
                      onChange={(e) => setFormData({ ...formData, calories: e.target.value })}
                      placeholder="420"
                      className="w-full px-3 py-1.5 bg-card rounded-control border border-rule text-xs font-medium text-ink"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-muted mb-1">Protein</label>
                    <input
                      type="text"
                      value={formData.protein}
                      onChange={(e) => setFormData({ ...formData, protein: e.target.value })}
                      placeholder="e.g. 28g"
                      className="w-full px-3 py-1.5 bg-card rounded-control border border-rule text-xs font-medium text-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-muted mb-1">Carbs</label>
                    <input
                      type="text"
                      value={formData.carbs}
                      onChange={(e) => setFormData({ ...formData, carbs: e.target.value })}
                      placeholder="e.g. 42g"
                      className="w-full px-3 py-1.5 bg-card rounded-control border border-rule text-xs font-medium text-ink"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-muted mb-1">Fat</label>
                    <input
                      type="text"
                      value={formData.fat}
                      onChange={(e) => setFormData({ ...formData, fat: e.target.value })}
                      placeholder="e.g. 11g"
                      className="w-full px-3 py-1.5 bg-card rounded-control border border-rule text-xs font-medium text-ink"
                    />
                  </div>
                </div>
              </div>

              {/* Key Ingredients */}
              <div>
                <label className="block text-xs font-semibold text-ink mb-1">
                  Key ingredients
                </label>
                <textarea
                  rows={2}
                  value={formData.keyIngredients}
                  onChange={(e) => setFormData({ ...formData, keyIngredients: e.target.value })}
                  placeholder="e.g. Organic rolled oats, fresh coconut milk, chia seeds, almonds, cinnamon"
                  className="w-full px-4 py-2 rounded-control border border-rule bg-paper text-xs text-ink focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                />
              </div>

              {/* Health Benefits */}
              <div>
                <label className="block text-xs font-semibold text-ink mb-1">
                  Health benefits
                </label>
                <textarea
                  rows={2}
                  value={formData.healthBenefits}
                  onChange={(e) => setFormData({ ...formData, healthBenefits: e.target.value })}
                  placeholder="e.g. Supports muscle recovery, aids digestion, rich in healthy omega fats"
                  className="w-full px-4 py-2 rounded-control border border-rule bg-paper text-xs text-ink focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                />
              </div>

              {/* Image URL & Description */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-ink mb-1">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3 py-2 rounded-control border border-rule bg-paper text-xs text-ink focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink mb-1">
                    Short description
                  </label>
                  <input
                    type="text"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Short description of taste and prep"
                    className="w-full px-3 py-2 rounded-control border border-rule bg-paper text-xs text-ink focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-rule flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsItemModalOpen(false)}
                  className="px-4 py-2 rounded-pill text-muted hover:bg-paper text-xs font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-pill bg-accent hover:bg-primary-dark text-accent-ink text-xs font-medium shadow-sm transition-colors cursor-pointer"
                >
                  {editingItem ? 'Save changes' : 'Add to menu'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ────────────────────────────────────────────────────────
          MODAL: EDIT SUBSCRIPTION PLAN
         ──────────────────────────────────────────────────────── */}
      {editingPlan && (
        <div className="fixed inset-0 z-50 bg-ink/50 flex items-center justify-center p-4">
          <div className="bg-card rounded-card border border-rule max-w-lg w-full p-6 sm:p-8 shadow-elevated">
            <div className="flex items-center justify-between pb-4 border-b border-rule">
              <h2 className="text-lg font-display font-semibold text-ink">
                Edit {editingPlan.title}
              </h2>
              <button
                type="button"
                onClick={() => setEditingPlan(null)}
                className="w-8 h-8 rounded-pill bg-paper-2 text-muted hover:text-ink flex items-center justify-center text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSavePlan} className="space-y-4 mt-6">
              <div>
                <label className="block text-xs font-semibold text-ink mb-1">
                  Plan title
                </label>
                <input
                  type="text"
                  value={planFormData.title}
                  onChange={(e) => setPlanFormData({ ...planFormData, title: e.target.value })}
                  className="w-full px-4 py-2 rounded-control border border-rule bg-paper text-xs text-ink"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-ink mb-1">
                    Weekly price (₹)
                  </label>
                  <input
                    type="number"
                    value={planFormData.weeklyPrice}
                    onChange={(e) => setPlanFormData({ ...planFormData, weeklyPrice: e.target.value })}
                    className="w-full px-3 py-2 rounded-control border border-rule bg-paper text-xs text-ink"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink mb-1">
                    Monthly price (₹)
                  </label>
                  <input
                    type="number"
                    value={planFormData.monthlyPrice}
                    onChange={(e) => setPlanFormData({ ...planFormData, monthlyPrice: e.target.value })}
                    className="w-full px-3 py-2 rounded-control border border-rule bg-paper text-xs text-ink"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={planFormData.description}
                  onChange={(e) => setPlanFormData({ ...planFormData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-control border border-rule bg-paper text-xs text-ink resize-none"
                />
              </div>

              <div className="pt-4 border-t border-rule flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingPlan(null)}
                  className="px-4 py-2 rounded-pill text-muted hover:bg-paper text-xs font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-pill bg-accent hover:bg-primary-dark text-accent-ink text-xs font-medium shadow-sm transition-colors cursor-pointer"
                >
                  Save plan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
