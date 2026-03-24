import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from './components/shared/Footer';
import { siteConfig } from '@/lib/site-config';

const navItems = [
{ label: 'Home', page: 'Home' },
{ label: 'Services', page: 'Services' },
{ label: 'Industries', page: 'Industries' },
{ label: 'AML App', page: 'AMLTool' },
{ label: 'Resources', page: 'Resources' },
{ label: 'FAQs', page: 'FAQs' },
{ label: 'Contact', page: 'Contact' }];


export default function Layout({ children, currentPageName }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="bg-[#2D4059] text-zinc-50 fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to={createPageUrl('Home')} className="flex items-center gap-2">
            <img src={siteConfig.logoNavbar} alt="Lead AML logo" className="h-12 md:h-20 w-auto object-contain" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) =>
            <Link
              key={item.page}
              to={createPageUrl(item.page)}
              className={`px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200 ${
              currentPageName === item.page ?
              'text-white bg-white/20' :
              'text-blue-100 hover:text-white hover:bg-white/10'}`
              }>

                {item.label}
              </Link>
            )}
          </nav>

          <div className="hidden lg:block">
            <Link to={createPageUrl('Contact')}>
              <Button className="bg-[var(--brand-blue)] hover:bg-[var(--brand-blue-dark)] text-white rounded-full px-6 text-sm">
                Book a Demo <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-white/10"
            onClick={() => setMobileOpen(!mobileOpen)}>

            {mobileOpen ? <X className="h-5 w-5 text-white" /> : <Menu className="h-5 w-5 text-white" />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileOpen &&
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[var(--brand-navy-dark)] border-t border-white/10 overflow-hidden">

              <div className="px-6 py-4 space-y-1">
                {navItems.map((item) =>
              <Link
                key={item.page}
                to={createPageUrl(item.page)}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-3 rounded-lg text-sm font-medium ${
                currentPageName === item.page ?
                'text-white bg-white/20' :
                'text-blue-100 hover:bg-white/10'}`
                }>

                    {item.label}
                  </Link>
              )}
                <Link to={createPageUrl('Contact')} onClick={() => setMobileOpen(false)}>
                  <Button className="w-full mt-2 bg-[var(--brand-blue)] hover:bg-[var(--brand-blue-dark)] text-white rounded-full">
                    Book a Demo
                  </Button>
                </Link>
              </div>
            </motion.div>
          }
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-20">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>);

}