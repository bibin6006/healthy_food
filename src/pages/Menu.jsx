import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import Modal, { EnquiryForm } from '../components/Modal';

export default function Menu() {
  const { menuItems } = useData();

  const [activeCategory, setActiveCategory] = useState('all');
  const [activeDiet, setActiveDiet] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  // Filter items
  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesDiet = activeDiet === 'all' || item.dietType === activeDiet;
    return matchesCategory && matchesDiet;
  });

  return (
    <div className="bg-paper min-h-screen">
      {/* Hero */}
      <section className="bg-paper-2 border-b border-rule py-14 md:py-20 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <nav className="flex justify-center items-center gap-2 text-xs text-muted mb-4" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span aria-hidden="true">/</span>
            <span className="text-ink font-medium">Daily fresh menu</span>
          </nav>
          <span className="inline-block text-xs font-semibold text-accent border border-rule-2 rounded-pill px-3 py-1 mb-3">
            Freshly prepared in Kottayam
          </span>
          <h1 className="text-display-s sm:text-display font-display font-semibold text-ink tracking-tight mb-3">
            Daily Nutritious Meals
          </h1>
          <p className="lead text-muted max-w-2xl mx-auto">
            Every meal is balanced with verified calories, protein, and clean ingredients.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-6 bg-card border-b border-rule">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All meals' },
              { id: 'breakfast', label: 'Breakfast' },
              { id: 'lunch', label: 'Lunch' },
              { id: 'dinner', label: 'Dinner' },
              { id: 'snack', label: 'Healthy snacks' },
            ].map((cat) => (
              <button
                type="button"
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-pill text-xs font-medium transition-colors cursor-pointer border ${
                  activeCategory === cat.id
                    ? 'bg-accent text-accent-ink border-accent font-semibold shadow-xs'
                    : 'bg-paper text-ink hover:bg-paper-2 border-rule'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Dietary Filters */}
          <div className="flex items-center gap-2">
            {[
              { id: 'all', label: 'All diets' },
              { id: 'Veg', label: 'Vegetarian' },
              { id: 'Non-Veg', label: 'Non-Vegetarian' },
              { id: 'Vegan', label: 'Vegan' },
            ].map((diet) => (
              <button
                type="button"
                key={diet.id}
                onClick={() => setActiveDiet(diet.id)}
                className={`px-3 py-1.5 rounded-pill text-xs font-medium transition-colors cursor-pointer border ${
                  activeDiet === diet.id
                    ? 'bg-paper-3 text-ink border-rule-2 font-semibold'
                    : 'bg-paper text-muted hover:text-ink border-rule'
                }`}
              >
                {diet.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Meals Grid */}
      <section className="py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className={`bg-card rounded-card border transition-transform duration-200 hover:-translate-y-0.5 shadow-card overflow-hidden flex flex-col justify-between ${
                  item.isAvailable === false ? 'opacity-80 border-rule-2' : 'border-rule'
                }`}
              >
                <div>
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-paper-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="bg-ink/85 text-paper text-xs font-medium px-2.5 py-0.5 rounded-pill">
                        {item.category}
                      </span>
                      <span className="bg-paper text-ink text-xs font-medium px-2.5 py-0.5 rounded-pill border border-rule">
                        {item.dietType}
                      </span>
                    </div>

                    {/* Status & Price Badges */}
                    <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5">
                      {item.isAvailable === false ? (
                        <span className="bg-error text-white font-medium text-xs px-2.5 py-0.5 rounded-pill shadow-sm">
                          Unavailable today
                        </span>
                      ) : null}

                      {/* Show Price only when admin enabled showPrice !== false */}
                      {item.showPrice !== false && (
                        <span className="bg-paper text-ink font-semibold px-2.5 py-0.5 rounded-pill text-xs">
                          ₹{item.price}
                        </span>
                      )}
                    </div>

                    {item.deliveryTime && (
                      <div className="absolute bottom-3 left-3 bg-paper/90 text-ink text-xs font-medium px-2.5 py-0.5 rounded-pill">
                        Delivery: {item.deliveryTime}
                      </div>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    <h3 className="text-lg font-display font-semibold text-ink">
                      {item.name}
                    </h3>
                    {item.description && (
                      <p className="text-xs text-muted mt-1 leading-relaxed">{item.description}</p>
                    )}

                    {/* Macro Strip */}
                    <div className="grid grid-cols-4 gap-2 bg-paper rounded-control p-3 mt-4 text-center border border-rule">
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
                      <div className="mt-4">
                        <p className="text-xs font-semibold text-ink">
                          Key ingredients:
                        </p>
                        <p className="text-xs text-muted mt-1 line-clamp-2">
                          {item.keyIngredients}
                        </p>
                      </div>
                    )}

                    {/* Health Benefits */}
                    {item.healthBenefits && (
                      <div className="mt-3 bg-paper p-3 rounded-control border border-rule">
                        <p className="text-xs font-semibold text-accent">
                          Health benefits:
                        </p>
                        <p className="text-xs text-ink mt-1 leading-relaxed">
                          {item.healthBenefits}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="px-6 pb-6 pt-2">
                  {item.isAvailable !== false ? (
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedItem(item);
                        setIsOrderModalOpen(true);
                      }}
                      className="w-full bg-accent hover:bg-primary-dark text-accent-ink font-medium text-xs py-3 rounded-pill transition-colors cursor-pointer shadow-sm whitespace-nowrap"
                    >
                      Subscribe or order
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled
                      className="w-full bg-paper-2 text-muted border border-rule text-xs py-3 rounded-pill cursor-not-allowed font-medium"
                    >
                      Currently unavailable
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-16 bg-card rounded-card border border-rule">
              <h3 className="text-base font-display font-semibold text-ink">No meals found in this category</h3>
              <p className="text-xs text-muted mt-1">Try switching categories or view our complete weekly subscription plans.</p>
              <div className="mt-4">
                <Link
                  to="/plans"
                  className="inline-block bg-accent text-accent-ink text-xs font-medium px-5 py-2.5 rounded-pill"
                >
                  View subscription plans
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Modal for Inquiring on a specific meal */}
      <Modal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        title={selectedItem ? `Order ${selectedItem.name}` : 'Order Meal'}
      >
        <p className="text-xs text-muted mb-4">
          Provide your delivery details and our Kottayam kitchen will confirm order timing and dietary adjustments.
        </p>
        <EnquiryForm onSuccess={() => setIsOrderModalOpen(false)} />
      </Modal>
    </div>
  );
}
