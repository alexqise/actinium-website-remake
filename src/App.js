import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Agentation } from 'agentation';
import GlobalStyles from './assets/styles/global';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import PipelineOverview from './pages/Pipeline';
import PipelineDetail from './pages/PipelineDetail';
import Technology from './pages/Technology';
import RDPlatform from './pages/RDPlatform';
import Investors from './pages/Investors';
import Contact from './pages/Contact';
import Careers from './pages/Careers';

const Dashboard = lazy(() => import('./pages/Dashboard'));

export default function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Suspense fallback={null}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="pipeline" element={<PipelineOverview />} />
            <Route path="pipeline/:slug" element={<PipelineDetail />} />
            <Route path="technology" element={<Technology />} />
            <Route path="rd-platform" element={<RDPlatform />} />
            <Route path="investors" element={<Investors />} />
            <Route path="contact" element={<Contact />} />
            <Route path="careers" element={<Careers />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Suspense>
      {process.env.NODE_ENV === 'development' && <Agentation />}
    </BrowserRouter>
  );
}
