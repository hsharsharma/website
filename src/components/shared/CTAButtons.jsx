import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen } from 'lucide-react';
import { createPageUrl } from '@/utils';
import GuideRequestModal from './GuideRequestModal';

export default function CTAButtons({ showDemo = true, showGuide = true, size = 'lg', className = '', guideName = 'Complete Tranche 2 AML Guide', guideKey = 'general', pageSource = 'Website' }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className={`flex flex-wrap gap-4 ${className}`}>
        {showDemo &&
        <Link to={createPageUrl('Contact')}>
            <Button size={size} className="bg-zinc-50 text-[#2D4059] px-8 text-sm font-medium rounded-full inline-flex items-center justify-center gap-2 whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 hover:bg-[var(--brand-blue-dark)] shadow-lg shadow-blue-200/50 hover:shadow-blue-300/50 transition-all duration-300">
              Book a Demo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        }
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