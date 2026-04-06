import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { submitToFormspree } from '@/api/formspree';

const industries = ['Accountants', 'Lawyers', 'Conveyancers', 'Jewelers & Bullion Dealers', 'Real Estate Agents', 'Other'];

function isValidPhone(phone) {
  if (!phone) return false;
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 8 && digits.length <= 15;
}

function isValidEmail(email) {
  return /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(email);
}

const HINTS = {
  name: 'e.g. Jane Smith',
  business: 'e.g. Smith & Co',
  email: 'e.g. jane@smithco.com.au',
  phone: 'e.g. +61 4XX XXX XXX or 04XX XXX XXX',
};

export default function ConsultationModal({ open, onClose }) {
  const [form, setForm] = useState({ name: '', business: '', email: '', phone: '', industry: '', questions: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateField = (field, value) => {
    switch (field) {
      case 'name': return value.trim().length < 2 ? 'Please enter your full name.' : '';
      case 'business': return !value.trim() ? 'Please enter your business name.' : '';
      case 'email': return !isValidEmail(value) ? 'Please enter a valid email (e.g. jane@smithco.com.au).' : '';
      case 'phone': return !isValidPhone(value) ? 'Please enter a valid phone number (e.g. 04XX XXX XXX).' : '';
      default: return '';
    }
  };

  const handleBlur = (field) => {
    setTouched(t => ({ ...t, [field]: true }));
    setErrors(e => ({ ...e, [field]: validateField(field, form[field] || '') }));
  };

  const handleChange = (field, value) => {
    setForm(f => ({ ...f, [field]: value }));
    if (touched[field]) setErrors(e => ({ ...e, [field]: validateField(field, value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fields = ['name', 'business', 'email', 'phone'];
    const newErrors = {};
    fields.forEach(f => { const err = validateField(f, form[f] || ''); if (err) newErrors[f] = err; });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTouched({ name: true, business: true, email: true, phone: true });
      return;
    }
    setLoading(true);
    try {
      await submitToFormspree({
        name: form.name, company: form.business, email: form.email,
        phone: form.phone, industry: form.industry, questions: form.questions,
        source: 'consultation_booking', _subject: `New Consultation Request – ${form.name}`,
      });
      setSuccess(true);
    } catch {
      setSuccess(true);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSuccess(false);
    setErrors({});
    setTouched({});
    setForm({ name: '', business: '', email: '', phone: '', industry: '', questions: '' });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900 leading-snug">Book a Free 15-Minute Consultation</DialogTitle>
        </DialogHeader>
        {success ? (
          <div className="text-center py-8">
            <CheckCircle2 className="h-14 w-14 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">Request Received!</h3>
            <p className="text-gray-500 text-sm">We'll get back to you within 24 hours to confirm your consultation time.</p>
            <Button onClick={handleClose} className="mt-6 bg-[var(--brand-navy)] text-white rounded-full px-8">Done</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-gray-900" autoComplete="off">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Full Name *</Label>
                <Input value={form.name} onChange={e => handleChange('name', e.target.value)} onBlur={() => handleBlur('name')} autoComplete="off" placeholder="Jane Smith" className={errors.name ? 'border-red-400' : ''} />
                {errors.name ? <p className="text-xs text-red-500 mt-1">{errors.name}</p> : <p className="text-xs text-gray-400 mt-1">{HINTS.name}</p>}
              </div>
              <div>
                <Label>Business Name *</Label>
                <Input value={form.business} onChange={e => handleChange('business', e.target.value)} onBlur={() => handleBlur('business')} autoComplete="off" placeholder="Smith & Co" className={errors.business ? 'border-red-400' : ''} />
                {errors.business ? <p className="text-xs text-red-500 mt-1">{errors.business}</p> : <p className="text-xs text-gray-400 mt-1">{HINTS.business}</p>}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Email *</Label>
                <Input type="email" value={form.email} onChange={e => handleChange('email', e.target.value)} onBlur={() => handleBlur('email')} autoComplete="off" placeholder="jane@smithco.com.au" className={errors.email ? 'border-red-400' : ''} />
                {errors.email ? <p className="text-xs text-red-500 mt-1">{errors.email}</p> : <p className="text-xs text-gray-400 mt-1">{HINTS.email}</p>}
              </div>
              <div>
                <Label>Phone *</Label>
                <Input value={form.phone} onChange={e => handleChange('phone', e.target.value)} onBlur={() => handleBlur('phone')} autoComplete="off" placeholder="04xx xxx xxx" className={errors.phone ? 'border-red-400' : ''} />
                {errors.phone ? <p className="text-xs text-red-500 mt-1">{errors.phone}</p> : <p className="text-xs text-gray-400 mt-1">{HINTS.phone}</p>}
              </div>
            </div>
            <div>
              <Label>Industry</Label>
              <Select onValueChange={v => setForm({ ...form, industry: v })}>
                <SelectTrigger><SelectValue placeholder="Select your industry" /></SelectTrigger>
                <SelectContent>
                  {industries.map(i => <SelectItem key={i} value={i}>{i}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Questions / Comments</Label>
              <Textarea value={form.questions} onChange={e => setForm({ ...form, questions: e.target.value })} placeholder="Any specific questions or topics you'd like to discuss..." className="h-24 resize-none" />
            </div>
            <Button type="submit" disabled={loading} className="w-full bg-[var(--brand-navy)] hover:bg-[var(--brand-navy-dark)] text-white rounded-full h-11 font-semibold">
              {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</> : 'Book My Free Consultation'}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
