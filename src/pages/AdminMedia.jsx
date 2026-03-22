import React from 'react';

export default function AdminMedia() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="max-w-md w-full bg-white rounded-xl border border-gray-200 p-8 text-center shadow-sm">
        <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center mx-auto mb-4">
          <svg className="h-6 w-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Media Manager Unavailable</h2>
        <p className="text-gray-500 text-sm leading-relaxed">
          The media management system previously relied on Base44, which has been removed.
          To re-enable media uploads, configure Firebase Storage and update this page accordingly.
        </p>
      </div>
    </div>
  );
}
