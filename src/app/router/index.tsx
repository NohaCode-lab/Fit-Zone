import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoadingFallback } from '../../components/ui/LoadingFallback';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

// Route-level code-splitting with React.lazy
const App = lazy(() => import('../../App'));
const DashboardView = lazy(() =>
  import('../../features/dashboard/DashboardView').then((m) => ({ default: m.DashboardView }))
);
const AiCoachChat = lazy(() =>
  import('../../features/ai-coach/components/AiCoachChat').then((m) => ({ default: m.AiCoachChat }))
);

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/dashboard" element={<DashboardView />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <AiCoachChat />
      </Suspense>
      <Footer />
    </BrowserRouter>
  );
};
