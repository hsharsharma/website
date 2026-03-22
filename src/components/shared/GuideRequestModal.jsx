import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle2, Loader2, Download, Mail } from 'lucide-react';
import { submitGuideRequest } from '@/api/guideEmail';

const INDUSTRY_OPTIONS = [
  { value: 'accountants',     label: 'Accountants' },
  { value: 'lawyers',         label: 'Lawyers' },
  { value: 'conveyancers',    label: 'Conveyancers' },
  { value: 'jewelers_bullion',label: 'Jewellers & Bullion Dealers' },
  { value: 'real_estate',     label: 'Real Estate Agents' },
  { value: 'other',           label: 'Other' },
];

// Blocked disposable domains (mirrors server-side list for instant frontend feedback)
const BLOCKED_DOMAINS = [
  'mailinator.com','guerrillamail.com','temp-mail.org','throwaway.email',
  '10minutemail.com','yopmail.com','maildrop.cc','dispostable.com',
  'trashmail.com','trashmail.me','trashmail.net','spamgourmet.com',
  'discard.email','fakeinbox.com','getairmail.com','filzmail.com',
];

function isValidEmail(email) {
  if (!email) return false;
  const ok = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(email);
  if (!ok) return false;
  const domain = email.split('@')[1]?.toLowerCase();
  if (BLOCKED_DOMAINS.includes(domain)) return false;
  const local = email.split('@')[0]?.toLowerCase();
  if (['test','fake','asdf','qwerty','noemail','noreply'].includes(local)) return false;
  return true;
}

export default function GuideRequestModal({ open, onClose, guideName, guideKey, pageSource }) {
  const [form, setForm] = useState({ name: '', email: '', company: '', industry: '', phone: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);   // { downloadUrl, hasAttachment }
  const [serverError, setServerError] = useState('');

  const validate = () => {
    const e = {};
    if (!form.name || form.name.trim().length < 2)
      e.name = 'Please enter your full name (min 2 characters).';
    if (!isValidEmail(form.email))
      e.email = 'Please enter a valid business email address.';
    if (!form.company || !form.company.trim())
      e.company = 'Please enter your company name.';
    if (!form.industry)
      e.industry = 'Please select your industry.';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setServerError('');
    setLoading(true);

    try {
      const res = await submitGuideRequest({
        name:      form.name.trim(),
        email:     form.email.trim().toLowerCase(),
        company:   form.company.trim(),
        industry:  form.industry,
        phone:     form.phone.trim() || null,
        guideKey,
        guideName,
        pageSource,
      });
      setResult(res);
    } catch (err) {
      setServerError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setForm({ name: '', email: '', company: '', industry: '', phone: '' });
    setErrors({});
    setServerError('');
    setResult(null);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg w-full">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">Get Your Free Guide</DialogTitle>
          {!result && (
            <p className="text-sm text-gray-500 mt-1">
              Requesting: <span className="font-medium text-[var(--brand-blue)]">{guideName}</span>
            </p>
          )}
        </DialogHeader>

        {/* ── Success state ──────────────────────────────────────────────── */}
        {result ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto">
              <CheckCircle2 className="h-8 w-8 text-green-500" />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Request Received!</h3>

              {/* Exact message as specified */}
              <p className="text-gray-600 text-sm leading-relaxed">
                The PDF will be shared to your email shortly. If you do not receive it, please{' '}
                <a
                  href={result.downloadUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[var(--brand-blue)] underline underline-offset-2 hover:text-[var(--brand-blue-dark)] inline-flex items-center gap-1"
                >
                  download it from here
                  <Download className="h-3.5 w-3.5" />
                </a>
                .
              </p>
            </div>

            {/* Visual download fallback card */}
            <div className="flex items-center gap-3 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-left">
              <div className="w-9 h-9 rounded-lg bg-[var(--brand-blue)] flex items-center justify-center flex-shrink-0">
                <Mail className="h-4 w-4 text-white" />
              </div>
              <div className="text-sm">
                <p className="font-medium text-gray-900">Check your inbox</p>
                <p className="text-gray-500 text-xs">Sent to {form.email} — check spam if needed</p>
              </div>
            </div>

            <Button onClick={handleClose} variant="outline" className="rounded-full px-8 mt-2">
              Close
            </Button>
          </div>

        ) : (
          /* ── Form state ─────────────────────────────────────────────────── */
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">

            {serverError && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
                {serverError}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-1 block">Full Name *</Label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Jane Smith"
                  className={`h-11 ${errors.name ? 'border-red-400' : ''}`}
                />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-1 block">Work Email *</Label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="jane@company.com"
                  className={`h-11 ${errors.email ? 'border-red-400' : ''}`}
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-1 block">Company Name *</Label>
                <Input
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  placeholder="Acme Accounting"
                  className={`h-11 ${errors.company ? 'border-red-400' : ''}`}
                />
                {errors.company && <p className="text-xs text-red-500 mt-1">{errors.company}</p>}
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-1 block">Phone (optional)</Label>
                <Input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+61 4XX XXX XXX"
                  className="h-11"
                />
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-1 block">Industry *</Label>
              <Select value={form.industry} onValueChange={(v) => setForm({ ...form, industry: v })}>
                <SelectTrigger className={`h-11 ${errors.industry ? 'border-red-400' : ''}`}>
                  <SelectValue placeholder="Select your industry" />
                </SelectTrigger>
                <SelectContent>
                  {INDUSTRY_OPTIONS.map((ind) => (
                    <SelectItem key={ind.value} value={ind.value}>{ind.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.industry && <p className="text-xs text-red-500 mt-1">{errors.industry}</p>}
            </div>

            <Button
              type="submit"
              disabled={loading}
              variant="outline"
              className="w-full h-12 rounded-full border-[var(--brand-blue)] text-[var(--brand-blue)] hover:bg-[var(--brand-blue)] hover:text-white transition-all duration-300 font-semibold text-base"
            >
              {loading
                ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Sending your guide…</>
                : <><Download className="h-4 w-4 mr-2" /> Get Your Free Guide</>
              }
            </Button>

            <p className="text-center text-xs text-gray-400">
              Your guide will be emailed to you instantly. No spam, ever.
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
