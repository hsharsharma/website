import { Suspense, lazy } from 'react';
import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { pagesConfig } from './pages.config'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import AdminMedia from './pages/AdminMedia';
import ScrollToTop from './components/shared/ScrollToTop';

const AccountantsSector  = lazy(() => import('./pages/sectors/Accountants'));
const LawyersSector      = lazy(() => import('./pages/sectors/Lawyers'));
const ConveyancersSector = lazy(() => import('./pages/sectors/Conveyancers'));
const JewellersSector    = lazy(() => import('./pages/sectors/Jewellers'));
const RealEstateSector   = lazy(() => import('./pages/sectors/RealEstate'));

const { Pages, Layout, mainPage } = pagesConfig;
const mainPageKey = mainPage ?? Object.keys(Pages)[0];
const MainPage = mainPageKey ? Pages[mainPageKey] : <></>;

const LayoutWrapper = ({ children, currentPageName }) => Layout ?
  <Layout currentPageName={currentPageName}>{children}</Layout>
  : <>{children}</>;

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Suspense fallback={<div className="fixed inset-0 flex items-center justify-center"><div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin" /></div>}>
      <Routes>
        <Route path="/" element={
          <LayoutWrapper currentPageName={mainPageKey}>
            <MainPage />
          </LayoutWrapper>
        } />
        {Object.entries(Pages).map(([path, Page]) => (
          <Route
            key={path}
            path={`/${path}`}
            element={
              <LayoutWrapper currentPageName={path}>
                <Page />
              </LayoutWrapper>
            }
          />
        ))}
        <Route path="/AdminMedia" element={<LayoutWrapper currentPageName="AdminMedia"><AdminMedia /></LayoutWrapper>} />

        {/* Sector pages */}
        <Route path="/Sectors/Accountants"  element={<LayoutWrapper currentPageName="Sectors"><AccountantsSector /></LayoutWrapper>} />
        <Route path="/Sectors/Lawyers"      element={<LayoutWrapper currentPageName="Sectors"><LawyersSector /></LayoutWrapper>} />
        <Route path="/Sectors/Conveyancers" element={<LayoutWrapper currentPageName="Sectors"><ConveyancersSector /></LayoutWrapper>} />
        <Route path="/Sectors/Jewellers"    element={<LayoutWrapper currentPageName="Sectors"><JewellersSector /></LayoutWrapper>} />
        <Route path="/Sectors/RealEstate"   element={<LayoutWrapper currentPageName="Sectors"><RealEstateSector /></LayoutWrapper>} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App