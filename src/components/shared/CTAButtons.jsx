import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen } from 'lucide-react';
import { createPageUrl } from '@/utils';
import GuideRequestModal from './GuideRequestModal';

function scrollToBookDemo() {
  const el = document.getElementById('book-demo');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    el.classList.remove('demo-highlight');
    void el.offsetWidth; // reflow to restart animation
    el.classList.add('demo-highlight');
    setTimeout(() => el.classList.remove('demo-highlight'), 1600);
  }
}

export default function CTAButtons({ showDemo = true, showGuide = true, size = 'lg', className = '', guideName = 'Complete Tranche 2 AML Guide', guideKey = 'general', pageSource = 'Website' }) {
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const onContactPage = location.pathname === createPageUrl('Contact');

  return (
    <>
      <div className={`flex flex-wrap gap-4 ${className}`}>
        {showDemo && (
          onContactPage ? (
            <Button size={size} variant="outline" onClick={scrollToBookDemo} className="rounded-full px-8 border-gray-300 text-gray-900 hover:border-[var(--brand-blue)] hover:text-[var(--brand-blue)] transition-all duration-300">
              Book a Demo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Link to={createPageUrl('Contact')}>
              <Button size={size} variant="outline" className="rounded-full px-8 border-gray-300 text-gray-900 hover:border-[var(--brand-blue)] hover:text-[var(--brand-blue)] transition-all duration-300">
                Book a Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          )
        )}
        {showGuide &&
          <Button size={size} variant="outline" onClick={() => setShowModal(true)} className="rounded-full px-8 border-gray-300 text-gray-900 hover:border-[var(--brand-blue)] hover:text-[var(--brand-blue)] transition-all duration-300">
            <BookOpen className="mr-2 h-4 w-4" />
            Get the Complete AML Guide
          </Button>
        }
      </div>
      <GuideRequestModal
        open={showModal}
        onClose={() => setShowModal(false)}
        guideName={guideName}
        guideKey={guideKey}
        downloadUrl={null}
        pageSource={pageSource}
      />
    </>
  );
}