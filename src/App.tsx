import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Experience from './sections/Experience';
import Skills from './sections/SkillsSection';
import Projects from './sections/ProjectsSection';
import Contact from './sections/ContactSection';
import SiteFooter from './components/SiteFooter';
import ScrollToTop from './components/ScrollToTop';

import Admin from './pages/Admin';

const App = () => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="app">
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={
          <>
            <Navbar theme={theme} toggleTheme={toggleTheme} />
            <main>
              <Hero />
              <About />
              <Experience />
              <Skills />
              <Projects />
              <Contact />
            </main>
            <ScrollToTop />
            <SiteFooter />
          </>
        } />
      </Routes>
    </div>
  );
};

export default App;
