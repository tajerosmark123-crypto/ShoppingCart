import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ToastProvider, useToast } from './context/ToastContext';
import ToastContainer from './components/ToastContainer';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import OrderConfirmation from './pages/OrderConfirmation';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuth = localStorage.getItem('isAuthenticated') === 'true';
  return isAuth ? <>{children}</> : <Navigate to="/login" replace />;
};

function AppContent() {
  const { toasts, removeToast } = useToast();
  return (
    <>
      <ToastContainer toasts={toasts} onClose={removeToast} />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/product/:id" element={
            <ProtectedRoute>
              <ProductDetail />
            </ProtectedRoute>
          } />
          
          <Route path="/cart" element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          } />
          
          <Route path="/order-confirmation/:id" element={
            <ProtectedRoute>
              <OrderConfirmation />
            </ProtectedRoute>
          } />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
