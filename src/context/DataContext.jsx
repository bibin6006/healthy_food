import React, { createContext, useContext, useState, useEffect } from 'react';
import { plans as defaultPlans } from '../data/plans';
import { initialMenuItems } from '../data/initialMenuItems';

const DataContext = createContext(null);

const STORAGE_KEY_ITEMS = 'healthy_food_menu_items_v3';
const STORAGE_KEY_PLANS = 'healthy_food_plans_v3';
const STORAGE_KEY_INQUIRIES = 'healthy_food_inquiries_v3';

export function DataProvider({ children }) {
  // Menu items state with migration for isAvailable and showPrice
  const [menuItems, setMenuItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ITEMS);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.map((item) => ({
          ...item,
          isAvailable: item.isAvailable !== undefined ? item.isAvailable : true,
          showPrice: item.showPrice !== undefined ? item.showPrice : true,
        }));
      }
      return initialMenuItems;
    } catch (e) {
      console.error('Failed reading menu items from localStorage:', e);
      return initialMenuItems;
    }
  });

  // Plans state
  const [plans, setPlans] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PLANS);
      return saved ? JSON.parse(saved) : defaultPlans;
    } catch (e) {
      console.error('Failed reading plans from localStorage:', e);
      return defaultPlans;
    }
  });

  // Inquiries / Custom plan requests state
  const [inquiries, setInquiries] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_INQUIRIES);
      if (saved) return JSON.parse(saved);
      return [
        {
          id: 'inq-101',
          date: new Date().toISOString(),
          type: 'custom_plan',
          name: 'Suresh Babu',
          phone: '+91 98471 23456',
          age: 34,
          height: 175,
          weight: 84,
          targetWeight: 75,
          goal: 'Weight Loss',
          foodPreference: 'Non-Vegetarian',
          message: 'Office delivery in Kanjikuzhy by 12:45 PM.',
          status: 'New',
        },
      ];
    } catch (e) {
      return [];
    }
  });

  // Persist menu items
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ITEMS, JSON.stringify(menuItems));
    } catch (e) {
      console.error('Failed saving menu items to localStorage:', e);
    }
  }, [menuItems]);

  // Persist plans
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PLANS, JSON.stringify(plans));
    } catch (e) {
      console.error('Failed saving plans to localStorage:', e);
    }
  }, [plans]);

  // Persist inquiries
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_INQUIRIES, JSON.stringify(inquiries));
    } catch (e) {
      console.error('Failed saving inquiries to localStorage:', e);
    }
  }, [inquiries]);

  // Item operations
  const addMenuItem = (item) => {
    const newItem = {
      ...item,
      id: item.id || `item-${Date.now()}`,
      isAvailable: item.isAvailable !== undefined ? item.isAvailable : true,
      showPrice: item.showPrice !== undefined ? item.showPrice : true,
    };
    setMenuItems((prev) => [newItem, ...prev]);
    return newItem;
  };

  const updateMenuItem = (id, updatedFields) => {
    setMenuItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );
  };

  const deleteMenuItem = (id) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleItemAvailability = (id) => {
    setMenuItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isAvailable: !item.isAvailable } : item
      )
    );
  };

  const toggleItemShowPrice = (id) => {
    setMenuItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, showPrice: !item.showPrice } : item
      )
    );
  };

  // Plan operations
  const updatePlan = (id, updatedFields) => {
    setPlans((prev) =>
      prev.map((plan) => (plan.id === id ? { ...plan, ...updatedFields } : plan))
    );
  };

  // Inquiry operations
  const addInquiry = (inquiry) => {
    const newInquiry = {
      id: `inq-${Date.now()}`,
      date: new Date().toISOString(),
      status: 'New',
      ...inquiry,
    };
    setInquiries((prev) => [newInquiry, ...prev]);
    return newInquiry;
  };

  const deleteInquiry = (id) => {
    setInquiries((prev) => prev.filter((inq) => inq.id !== id));
  };

  const markInquiryStatus = (id, status) => {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status } : inq))
    );
  };

  // Reset to initial demo data
  const resetToDefaults = () => {
    setMenuItems(initialMenuItems);
    setPlans(defaultPlans);
    localStorage.removeItem(STORAGE_KEY_ITEMS);
    localStorage.removeItem(STORAGE_KEY_PLANS);
  };

  return (
    <DataContext.Provider
      value={{
        menuItems,
        plans,
        inquiries,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        toggleItemAvailability,
        toggleItemShowPrice,
        updatePlan,
        addInquiry,
        deleteInquiry,
        markInquiryStatus,
        resetToDefaults,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
