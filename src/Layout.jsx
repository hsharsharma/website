import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Menu, X, ArrowRight, ChevronDown, Calculator, Scale, Home as HomeIcon, Gem, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
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

const sectorLinks = [
  { label: 'Accountants', path: '/Sectors/Accountants', icon: Calculator },
  { label: 'Lawyers', path: '/Sectors/Lawyers', icon: Scale },
  { label: 'Conveyancers', path: '/Sectors/Conveyancers', icon: HomeIcon },
  { label: 'Jewellers & Bullion', path: '/Sectors/Jewellers', icon: Gem },
  { label: 'Real Estate Agents', path: '/Sectors/RealEstate', icon: Building2 },
];

export default function Layout({ children, currentPageName }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleMobileNav = (page) => {
    setMobileOpen(false);
    navigate(createPageUrl(page));
  };

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
              item.page === 'Industries' ? (
                <div key="Industries" className="relative group">
                  <Link
                    to={createPageUrl('Industries')}
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200 ${
                      currentPageName === 'Industries'
                        ? 'text-white bg-white/20'
                        : 'text-blue-100 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    Industries <ChevronDown className="h-3.5 w-3.5 opacity-70" />
                  </Link>
                  {/* Dropdown */}
                  <div className="absolute top-full left-0 mt-1 w-52 bg-[#2D4059]/90 backdrop-blur-md border border-white/10 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 py-2">
                    <Link to={createPageUrl('Industries')} className="block px-4 py-2 text-sm text-blue-200 hover:text-white hover:bg-white/10 font-medium border-b border-white/10 mb-1">
                      All Industries
                    </Link>
                    {sectorLinks.map((s) => (
                      <Link key={s.path} to={s.path} className="flex items-center gap-2.5 px-4 py-2 text-sm text-blue-200 hover:text-white hover:bg-white/10 transition-colors">
                        <s.icon className="h-3.5 w-3.5 flex-shrink-0" />
                        {s.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.page}
                  to={createPageUrl(item.page)}
                  className={`px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200 ${
                    currentPageName === item.page
                      ? 'text-white bg-white/20'
                      : 'text-blue-100 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="hidden lg:block">
            <Link to={createPageUrl('Contact')}>
              <Button className="bg-white text-[#2D4059] hover:bg-blue-50 rounded-full px-6 text-sm font-semibold">
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
        {mobileOpen && (
          <div className="lg:hidden bg-[#1e2d45] border-t border-white/10">
            <div className="px-6 py-4 space-y-1">
              {navItems.map((item) => (
                <React.Fragment key={item.page}>
                  <button
                    onClick={() => handleMobileNav(item.page)}
                    className={`w-full text-left block px-4 py-3 rounded-lg text-sm font-medium ${
                      currentPageName === item.page
                        ? 'text-white bg-white/20'
                        : 'text-blue-100 hover:bg-white/10'
                    }`}
                  >
                    {item.label}
                  </button>
                  {item.page === 'Industries' && (
                    <div className="pl-4 border-l border-white/10 ml-4 space-y-0.5">
                      {sectorLinks.map((s) => (
                        <Link
                          key={s.path}
                          to={s.path}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-blue-300 hover:text-white hover:bg-white/10 transition-colors"
                        >
                          <s.icon className="h-3 w-3 flex-shrink-0" />
                          {s.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </React.Fragment>
              ))}
              <button
                onClick={() => handleMobileNav('Contact')}
                className="w-full mt-2"
              >
                <Button className="w-full bg-[var(--brand-blue)] hover:bg-[var(--brand-blue-dark)] text-white rounded-full">
                  Book a Demo
                </Button>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-20">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>);
}
