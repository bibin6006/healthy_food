
# Healthy Food Cloud Kitchen

> **"More than meals, your wellness partner."**  
> A modern, responsive, multi-page healthy meal-delivery platform inspired by [Healthiqo](https://healthiqo.in/), operating in Kottayam, Kerala.

---

## 🥗 Highlights & Core Capabilities

- **Inspired by Healthiqo**:
  - Rotating breakfast, lunch, and dinner plans with exact delivery windows:
    - **Breakfast:** 7:00 AM – 9:00 AM (Greek yogurt muesli, egg veggie boxes, sprouted dosas, fruit boxes)
    - **Lunch:** 11:30 AM – 2:30 PM (Chicken millet noodles, palak paneer bowls, chickpea avocado salads, steamed banana leaf fish)
    - **Dinner:** 6:30 PM – 9:00 PM (Grilled chicken sweet potato mash, chicken coleslaw wraps, pumpkin lentil broths)
    - **Healthy Snacks / Cold-Pressed Juices:** 4:00 PM – 5:30 PM
- **Admin Dashboard (`/admin`)**:
  - Full CRUD operations for menu items: **Add**, **Remove**, **Modify** dishes.
  - Detailed macronutrient tracking:
    - **Calories** (e.g. 480 kcal)
    - **Protein** (e.g. 38g)
    - **Carbs** (e.g. 42g)
    - **FAT** (e.g. 10g)
    - **Key Ingredients** (e.g. skinless chicken breast, organic quinoa, cold-pressed coconut oil, moringa)
    - **Health Benefits** (e.g. stimulates muscle recovery, stabilizes blood sugar, zero sugar)
  - Subscription Plan Pricing Management (adjust weekly and monthly pricing live).
  - Inquiries & Custom Plan Submissions tracker (review customer submissions, call, or reply via WhatsApp directly).
  - LocalStorage persistence (`healthy_food_menu_items_v2`, `healthy_food_plans_v2`, `healthy_food_inquiries_v2`) with a "Reset Demo Data" option.
- **Custom Plan Builder (`/custom-plan`)**:
  - Multi-step interactive assessment:
    1. **Personal Information**: Name, WhatsApp phone, gender, age, height, current weight, target weight goal, delivery area in Kottayam.
    2. **Goals & Lifestyle**: Weight Loss (deficit), Muscle Gain (high protein), PCOS/PCOD, Diabetic-friendly, Keto/Low-Carb, Dietary Preference (Veg, Non-Veg, Vegan, Eggetarian), Activity Level, Allergies.
    3. **Meals Needed & Duration**: Breakfast, Lunch, Dinner, Snack/Juice; 1 Week Trial, 1 Month, or 3 Months.
    4. **Smart Mifflin-St Jeor Engine**: Real-time calculation of BMR, daily target calories, protein target, carbs, and healthy fats.
    5. **"Send Custom Plan to WhatsApp"**: Formats a message with all user metrics and triggers WhatsApp to order with our nutritionist in 1 click!
- **Daily Fresh Menu Explorer (`/menu`)**:
  - Visual menu with filter tabs (All, Breakfast, Lunch, Dinner, Snacks) and diet badges (Veg, Non-Veg, Vegan).
  - Complete macro pills on every dish and "Subscribe / Order Meal" modal.

---

## 📁 Project Structure

```text
healthy_food/
├── index.html                 # SEO tags, Open Graph, fonts
├── package.json
├── vite.config.js             # Vite + Tailwind plugin
├── vercel.json                # Vercel rewrite rule for React Router
├── public/
│   └── _redirects             # Netlify rewrite rule
└── src/
    ├── App.jsx                # Router & DataProvider setup
    ├── main.jsx
    ├── index.css              # Tailwind theme & animations
    ├── context/
    │   └── DataContext.jsx    # Central state & localStorage syncing for items, plans, and inquiries
    ├── data/
    │   ├── plans.js           # Core subscription plans & delivery windows
    │   ├── initialMenuItems.js# Default dishes with full macros, ingredients, and benefits
    │   └── siteData.js        # Team, testimonials, FAQs, and contact info
    ├── pages/
    │   ├── Home.jsx           # Landing page with Custom Plan Banner
    │   ├── Menu.jsx           # Daily Fresh Menu & Macro Explorer
    │   ├── CustomPlan.jsx     # Healthiqo-style Custom Plan Builder + WhatsApp order generator
    │   ├── AdminDashboard.jsx # Admin control panel for items, macros, plans & inquiries
    │   ├── Plans.jsx          # Subscription plans with weekly/monthly toggle
    │   ├── PlanDetail.jsx     # Individual plan detail pages (/break-fast-plan, etc.)
    │   ├── HowItWorks.jsx     # 4-step timeline & benefits
    │   ├── About.jsx          # Brand story, mission, and team
    │   └── Contact.jsx        # Contact form & Kottayam Google map
    └── components/
        ├── Navbar.jsx         # Sticky navigation with Custom Plan & Admin links
        ├── Footer.jsx         # Comprehensive footer with quick links
        ├── PlanCard.jsx       # Card showing delivery time, price & benefits
        ├── FeatureCard.jsx    # 3-pillar feature card
        ├── TeamCard.jsx       # Nutritionist & Chef cards
        ├── Modal.jsx          # Popup dialogs & enquiry form
        └── WhatsAppButton.jsx # Floating pulsed WhatsApp button
```

---

## 🚀 Running Locally

```bash
# 1. Start dev server
npm run dev

# 2. Production build
npm run build

# 3. Preview build
npm run preview
```

Access the app locally at: **[http://localhost:5173/](http://localhost:5173/)**

