import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { LoadingSpinner } from './components/LoadingSpinner';
import ChatBot from './components/chatbot/ChatBot';

// Pages
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

// Static Pages
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import FAQPage from './pages/FAQPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import HelpPage from './pages/HelpPage';
import ReturnsPage from './pages/ReturnsPage';
import ShippingPage from './pages/ShippingPage';

// Info Pages
import CareersPage from './pages/CareersPage';
import PressReleasesPage from './pages/PressReleasesPage';
import OdionCaresPage from './pages/OdionCaresPage';
import SellPage from './pages/SellPage';
import AffiliatePage from './pages/AffiliatePage';
import AdvertisePage from './pages/AdvertisePage';
import BusinessCardPage from './pages/BusinessCardPage';
import GiftCardsPage from './pages/GiftCardsPage';
import PaymentMethodsPage from './pages/PaymentMethodsPage';

// Dashboard Pages
import ProfileDashboard from './pages/ProfileDashboard';
import OrderHistoryPage from './pages/OrderHistoryPage';
import WishlistPage from './pages/WishlistPage';

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) return <div className="min-h-screen flex items-center justify-center"><LoadingSpinner /></div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  
  return children;
};

// Auth Route Wrapper (redirect to home if already logged in)
const AuthRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) return <div className="min-h-screen flex items-center justify-center"><LoadingSpinner /></div>;
  if (isAuthenticated) return <Navigate to="/" replace />;
  
  return children;
};

const AppContent = () => {
  const location = useLocation();
  const hideHeaderFooter = ['/login', '/register', '/forgot-password'].includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen font-sans">
      {!hideHeaderFooter && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          
          <Route path="/cart" element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          } />
          
          <Route path="/checkout" element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          } />
          
          <Route path="/login" element={
            <AuthRoute>
              <LoginPage />
            </AuthRoute>
          } />
          
          <Route path="/register" element={
            <AuthRoute>
              <RegisterPage />
            </AuthRoute>
          } />

          <Route path="/forgot-password" element={
            <AuthRoute>
              <ForgotPasswordPage />
            </AuthRoute>
          } />
          
          {/* Static Pages */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/returns" element={<ReturnsPage />} />
          <Route path="/shipping" element={<ShippingPage />} />

          {/* Info Pages */}
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/press-releases" element={<PressReleasesPage />} />
          <Route path="/odion-cares" element={<OdionCaresPage />} />
          <Route path="/sell" element={<SellPage />} />
          <Route path="/affiliate" element={<AffiliatePage />} />
          <Route path="/advertise" element={<AdvertisePage />} />
          <Route path="/business-card" element={<BusinessCardPage />} />
          <Route path="/gift-cards" element={<GiftCardsPage />} />
          <Route path="/payment-methods" element={<PaymentMethodsPage />} />
          
          {/* Dashboard Pages */}
          <Route path="/profile" element={
            <ProtectedRoute>
              <ProfileDashboard />
            </ProtectedRoute>
          } />
          <Route path="/orders" element={
            <ProtectedRoute>
              <OrderHistoryPage />
            </ProtectedRoute>
          } />
          <Route path="/wishlist" element={
            <ProtectedRoute>
              <WishlistPage />
            </ProtectedRoute>
          } />
          
          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <ChatBot />
      {!hideHeaderFooter && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
