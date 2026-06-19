import React, { Suspense } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';

// Lazy load components that are below the fold
const About = React.lazy(() => import('./components/About').then(module => ({ default: module.About })));
const Skills = React.lazy(() => import('./components/Skills').then(module => ({ default: module.Skills })));
const Projects = React.lazy(() => import('./components/Projects').then(module => ({ default: module.Projects })));
const Experience = React.lazy(() => import('./components/Experience').then(module => ({ default: module.Experience })));
const Contact = React.lazy(() => import('./components/Contact').then(module => ({ default: module.Contact })));
const Footer = React.lazy(() => import('./components/Footer').then(module => ({ default: module.Footer })));

function App() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <Navbar />
      <main id="main-content">
        <Hero />
        <Suspense fallback={<div className="h-screen flex items-center justify-center text-zinc-500">Loading...</div>}>
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
