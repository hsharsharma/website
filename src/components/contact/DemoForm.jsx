import React, { useState } from 'react';
import { submitDemoRequest } from '@/api/demoEmail';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

const industries = [
  { value: 'accountants', label: 'Accountants' },
  { value: 'lawyers', label: 'Lawyers' },
  { value: 'conveyancers', label: 'Conveyancers' },
  { value: 'jewelers_bullion', label: 'Jewelers & Bullion Dealers' },
  { value: 'other', label: 'Other' },
];

function isValidEmail(email) {
  return /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(email);
}

const FIELD_HINTS = {
  name: 'e.g. John Smith',
  email: 'e.g. john@company.com.au',
  company: 'e.g. Smith & Associates',
  preferred_date: 'Select a future date (optional)',
};

export default function DemoForm() {
  const [form, setForm] = useState({ name: '', email: '', company: '', industry: '', preferred_date: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validateField = (field, value) => {
    switch (field) {
      case 'name':
        return value.trim().length < 2 ? 'Please enter your full name (min 2 characters).' : '';
      case 'email':
        return !isValidEmail(value) ? 'Please enter a valid email address (e.g. john@company.com.au).' : '';
      case 'company':
        return !value.trim() ? 'Please enter your company name.' : '';
      case 'industry':
        return !value ? 'Please select your industry.' : '';
      default:
        return '';
    }
  };

  const handleBlur = (field) => {
    setTouched(t => ({ ...t, [field]: true }));
    const error = validateField(field, form[field] || '');
    setErrors(e => ({ ...e, [field]: error }));
  };

  const handleChange = (field, value) => {
    setForm(f => ({ ...f, [field]: value }));
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors(e => ({ ...e, [field]: error }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate all required fields
    const requiredFields = ['name', 'email', 'company', 'industry'];
    const newErrors = {};
    requiredFields.forEach(field => {
      const error = validateField(field, form[field] || '');
      if (error) newErrors[field] = error;
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTouched({ name: true, email: true, company: true, industry: true });
      return;
    }
    setLoading(true);
    try {
      await submitDemoRequest(form);
      setSubmitted(true);
      toast.success('Demo request submitted! We will be in touch shortly.');
    } catch {
      toast.error('Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="h-8 w-8 text-green-500" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Demo Requested!</h3>
        <p className="text-[var(--brand-slate-light)]">Our team will contact you shortly to schedule your consultation.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" autoComplete="off">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Full Name *</Label>
          <Input
            value={form.name}
            onChange={(e) => handleChange('name', e.target.value)}
            onBlur={() => handleBlur('name')}
            placeholder="John Smith"
            autoComplete="off"
            className={`h-11 ${errors.name ? 'border-red-400' : ''}`}
          />
          {errors.name
            ? <p className="text-xs text-red-500 mt-1">{errors.name}</p>
            : <p className="text-xs text-gray-400 mt-1">{FIELD_HINTS.name}</p>
          }
        </div>
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Email *</Label>
          <Input
            type="email"
            value={form.email}
            onChange={(e) => handleChange('email', e.target.value)}
            onBlur={() => handleBlur('email')}
            placeholder="john@company.com"
            autoComplete="off"
            className={`h-11 ${errors.email ? 'border-red-400' : ''}`}
          />
          {errors.email
            ? <p className="text-xs text-red-500 mt-1">{errors.email}</p>
            : <p className="text-xs text-gray-400 mt-1">{FIELD_HINTS.email}</p>
          }
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Company *</Label>
          <Input
            value={form.company}
            onChange={(e) => handleChange('company', e.target.value)}
            onBlur={() => handleBlur('company')}
            placeholder="Your company name"
            autoComplete="off"
            className={`h-11 ${errors.company ? 'border-red-400' : ''}`}
          />
          {errors.company
            ? <p className="text-xs text-red-500 mt-1">{errors.company}</p>
            : <p className="text-xs text-gray-400 mt-1">{FIELD_HINTS.company}</p>
          }
        </div>
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Industry *</Label>
          <Select value={form.industry} onValueChange={(v) => { handleChange('industry', v); setTouched(t => ({ ...t, industry: true })); }}>
            <SelectTrigger className={`h-11 ${errors.industry ? 'border-red-400' : ''}`}>
              <SelectValue placeholder="Select your industry" />
            </SelectTrigger>
            <SelectContent>
              {industries.map((ind) =>
                <SelectItem key={ind.value} value={ind.value}>{ind.label}</SelectItem>
              )}
            </SelectContent>
          </Select>
          {errors.industry && <p className="text-xs text-red-500 mt-1">{errors.industry}</p>}
        </div>
      </div>
      <div>
        <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Preferred Date</Label>
        <Input
          type="date"
          value={form.preferred_date}
          min={new Date().toISOString().split('T')[0]}
          onChange={(e) => handleChange('preferred_date', e.target.value)}
          className="h-11"
        />
        <p className="text-xs text-gray-400 mt-1">{FIELD_HINTS.preferred_date}</p>
      </div>
      <Button
        type="submit"
        disabled={loading}
        className="bg-[var(--brand-blue)] text-slate-700 px-4 py-2 text-base font-medium rounded-full inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow w-full h-12 hover:bg-[var(--brand-blue-dark)]">
        {loading
          ? <Loader2 className="h-4 w-4 animate-spin" />
          : <>Schedule My Demo <ArrowRight className="ml-2 h-4 w-4" /></>
        }
      </Button>
      <p className="text-center text-sm text-gray-400 mt-3">
        Not ready for a demo yet? Send us your query at{' '}
        <a href="mailto:info@leadaml.com.au" className="text-[var(--brand-blue)] underline font-medium">
          info@leadaml.com.au
        </a>
        {' '}or call us at{' '}
        <a href="tel:+61416418176" className="text-[var(--brand-blue)] underline font-medium">
          +61 416 418 176
        </a>
      </p>
    </form>
  );
}
