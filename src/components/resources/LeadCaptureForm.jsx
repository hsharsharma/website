import React, { useState } from 'react';
import { submitGuideRequest } from '@/api/guideEmail';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, Loader2, CheckCircle2, Mail } from 'lucide-react';

const INDUSTRY_OPTIONS = [
  { value: 'accountants',     label: 'Accountants' },
  { value: 'lawyers',         label: 'Lawyers' },
  { value: 'conveyancers',    label: 'Conveyancers' },
  { value: 'jewelers_bullion',label: 'Jewelers & Bullion Dealers' },
  { value: 'real_estate',     label: 'Real Estate Agents' },
  { value: 'general',         label: 'General / Other' },
];

const BLOCKED_DOMAINS = [
  'mailinator.com','guerrillamail.com','temp-mail.org','throwaway.email',
  '10minutemail.com','yopmail.com','maildrop.cc','trashmail.com','discard.email',
];

function isValidEmail(email) {
  if (!email) return false;
  if (!/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(email)) return false;
  const domain = email.split('@')[1]?.toLowerCase();
  return !BLOCKED_DOMAINS.includes(domain);
}

export default function LeadCaptureForm() {
  const [form, setForm] = useState({ name: '', email: '', company: '', industry: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [serverError, setServerError] = useState('');

  const validate = () => {
    const e = {};
    if (!form.name || form.name.trim().length < 2) e.name = 'Please enter your full name.';
    if (!isValidEmail(form.email)) e.email = 'Please enter a valid business email.';
    if (!form.industry) e.industry = 'Please select your industry.';
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
        company:   form.company.trim() || null,
        industry:  form.industry,
        guideKey:  form.industry,
        guideName: INDUSTRY_OPTIONS.find(i => i.value === form.industry)?.label || 'AML Guide',
        pageSource:'Resources Page',
      });
      setResult(res);
    } catch (err) {
      setServerError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (result) {
    return (
      <div className="space-y-4">
        <div className="flex flex-col items-center text-center py-6 space-y-3">
          <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center">
            <CheckCircle2 className="h-7 w-7 text-green-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Guide on its way!</h3>
          <p className="text-gray-600 text-sm leading-relaxed max-w-sm">
            The PDF will be shared to your email shortly. If you do not receive it, please{' '}
            <a
              href={result.downloadUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[var(--brand-blue)] underline underline-offset-2 inline-flex items-center gap-1"
            >
              download it from here <Download className="h-3.5 w-3.5" />
            </a>
            .
          </p>
          <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-xl px-4 py-2.5 text-sm w-full max-w-sm">
            <Mail className="h-4 w-4 text-[var(--brand-blue)] flex-shrink-0" />
            <span className="text-gray-600 text-xs">Sent to <strong>{form.email}</strong> — check spam if needed</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {serverError && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
          {serverError}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Full Name *</Label>
          <Input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="John Smith"
            className={`h-11 ${errors.name ? 'border-red-400' : ''}`}
          />
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
        </div>
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Work Email *</Label>
          <Input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="john@company.com"
            className={`h-11 ${errors.email ? 'border-red-400' : ''}`}
          />
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Company</Label>
          <Input
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            placeholder="e.g. Accounting Firm"
            className="h-11"
          />
        </div>
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Industry *</Label>
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
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="bg-[var(--brand-blue)] text-white px-4 py-2 text-base font-medium rounded-full inline-flex items-center justify-center gap-2 shadow w-full h-12 hover:bg-[var(--brand-blue-dark)] disabled:opacity-50"
      >
        {loading
          ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</>
          : <><Download className="h-4 w-4" /> Download Your Guide</>
        }
      </Button>
    </form>
  );
}
