import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Mail, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { submitEnquiry } from '@/api/enquiryEmail';
import { siteConfig } from '@/lib/site-config';

const footerLinks = [
  {
    title: 'Services',
    links: [
      { label: 'AML Consulting', page: 'Services' },
      { label: 'KYC/CDD Implementation', page: 'Services' },
      { label: 'Risk Profiling', page: 'Services' },
      { label: 'AML App', page: 'AMLTool' },
    ],
  },
  {
    title: 'Industries',
    links: [
      { label: 'Accountants', page: 'Industries' },
      { label: 'Lawyers', page: 'Industries' },
      { label: 'Conveyancers', page: 'Industries' },
      { label: 'Jewelers & Bullion', page: 'Industries' },
      { label: 'Real Estate Agents', page: 'Industries' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Free Guides', page: 'Resources' },
      { label: 'FAQs', page: 'FAQs' },
      { label: 'Book a Consultation', page: 'Contact' },
      { label: 'Contact Us', page: 'Contact' },
    ],
  },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleContact = async (e) => {
    e.preventDefault();
    if (!email) return;
    setSending(true);
    try {
      await submitEnquiry({ name, email });
    } catch {
      // fail silently
    } finally {
      setSending(false);
      setSent(true);
    }
  };

  return (
    <footer className="bg-[#2D4059] text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Brand + Contact */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-5">
              <Link to={createPageUrl('Home')}>
                <img
                  src={siteConfig.logoFooter}
                  alt="Lead AML"
                  className="h-16 w-auto object-contain"
                />
              </Link>
            </div>
            <p className="text-sm leading-relaxed mb-5 max-w-sm text-gray-200">
              Professional AML consulting and compliance tools for accountants, lawyers, conveyancers, jewelers, bullion dealers, and real estate agents across Australia.
            </p>
            <a href="mailto:info@leadaml.com.au" className="flex items-center gap-2 text-sm text-[var(--brand-teal)] hover:text-[var(--brand-teal-dark)] transition-colors mb-6">
              <Mail className="h-4 w-4" />
              info@leadaml.com.au
            </a>

            {!sent ? (
              <form onSubmit={handleContact} className="space-y-2">
                <p className="text-xs text-gray-200 font-semibold uppercase tracking-wider mb-3">Quick Enquiry</p>
                <Input
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 text-sm h-9" />
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 text-sm h-9" />
                  <Button type="submit" size="sm" disabled={sending} className="bg-[var(--brand-teal)] hover:bg-[var(--brand-teal-dark)] text-white h-9 px-3 shrink-0">
                    {sending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <ArrowRight className="h-3.5 w-3.5" />}
                  </Button>
                </div>
              </form>
            ) : (
              <div className="flex items-center gap-2 text-sm text-[var(--brand-teal)]">
                <CheckCircle2 className="h-4 w-4" />
                Thanks! We'll be in touch soon.
              </div>
            )}
          </div>

          {/* Links */}
          {footerLinks.map((group) => (
            <div key={group.title} className="lg:col-span-1">
              <h4 className="text-white font-semibold text-sm mb-4">{group.title}</h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={createPageUrl(link.page)}
                      className="text-sm text-gray-300 hover:text-white transition-colors duration-200">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-300">© {new Date().getFullYear()} Lead AML. All rights reserved. <span className="text-white font-semibold">AML. Done Right.</span></p>
          <div className="flex items-center gap-6 text-xs">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
