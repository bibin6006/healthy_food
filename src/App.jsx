import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import About from './pages/About';
import Plans from './pages/Plans';
import PlanDetail from './pages/PlanDetail';
import HowItWorks from './pages/HowItWorks';
import Contact from './pages/Contact';
import Menu from './pages/Menu';
import CustomPlan from './pages/CustomPlan';
import AdminDashboard from './pages/AdminDashboard';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <DataProvider>
      <div className="min-h-screen flex flex-col">
        <ScrollToTop />
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/custom-plan" element={<CustomPlan />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/break-fast-plan" element={<PlanDetail planId="breakfast" />} />
            <Route path="/lunch-plan" element={<PlanDetail planId="lunch" />} />
            <Route path="/dinner-plan" element={<PlanDetail planId="dinner" />} />
            <Route path="/combo-plan" element={<PlanDetail planId="combo" />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </DataProvider>
  );
}

export default App;
