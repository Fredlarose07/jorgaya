import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext, useAuthProvider } from '@/hooks/useAuth';
import { ROUTES } from '@/constants';

// Pages 
import EmailCheckPage from '@/pages/EmailCheckPage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import DashboardPage from '@/pages/DashboardPage';

// Composant pour protéger les routes
import ProtectedRoute from '@/components/auth/ProtectedRoute';

function App() {
  const auth = useAuthProvider();

  return (
    <AuthContext.Provider value={auth}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* Route par défaut - redirection vers email check */}
            <Route 
              path="/" 
              element={<Navigate to={ROUTES.EMAIL_CHECK} replace />} 
            />
            
            {/* Routes d'authentification */}
            <Route 
              path={ROUTES.EMAIL_CHECK} 
              element={<EmailCheckPage />} 
            />
            <Route 
              path={ROUTES.LOGIN} 
              element={<LoginPage />} 
            />
            <Route 
              path={ROUTES.REGISTER} 
              element={<RegisterPage />} 
            />
            
            {/* Routes protégées */}
            <Route 
              path={ROUTES.DASHBOARD} 
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } 
            />
            
            {/* Route 404 */}
            <Route 
              path="*" 
              element={<Navigate to={ROUTES.EMAIL_CHECK} replace />} 
            />
          </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;