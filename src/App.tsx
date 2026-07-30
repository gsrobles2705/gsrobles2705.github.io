
import { Suspense, lazy } from 'react';
import { LangProvider } from '@/context/LangContext';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { ErrorBoundary } from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import CustomCursor from './components/CustomCursor';

const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Certificates = lazy(() => import('./components/Certificates'));
const OpenSource = lazy(() => import('./components/OpenSource'));
const Journey = lazy(() => import('./components/Journey'));
const Contact = lazy(() => import('./components/Contact'));

function SectionFallback() {
  return (
    <div className="px-6 md:px-10 py-32 max-w-[1100px] mx-auto">
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-white/5 rounded w-24" />
        <div className="h-8 bg-white/5 rounded w-64" />
        <div className="h-32 bg-white/5 rounded" />
      </div>
    </div>
  );
}

function AppContent() {
  useSmoothScroll();
  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <ErrorBoundary>
          <Suspense fallback={<SectionFallback />}>
            <About />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary>
          <Suspense fallback={<SectionFallback />}>
            <Skills />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary>
          <Suspense fallback={<SectionFallback />}>
            <Projects />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary>
          <Suspense fallback={<SectionFallback />}>
            <Certificates />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary>
          <Suspense fallback={<SectionFallback />}>
            <OpenSource />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary>
          <Suspense fallback={<SectionFallback />}>
            <Journey />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary>
          <Suspense fallback={<SectionFallback />}>
            <Contact />
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}

export default function App() {
  return (
    <LangProvider>
      <div className="bg-background text-white min-h-screen">
        <AppContent />
      </div>
    </LangProvider>
  );
}
