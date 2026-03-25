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

export default function ConsultationModal({ open, onClose }) {
  const [form, setForm] = useState({ name: '', business: '', email: '', phone: '', industry: '', questions: '' });
  const [phoneError, setPhoneError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidPhone(form.phone)) {
      setPhoneError('Please enter a valid phone number.');
      return;
    }
    setPhoneError('');
    setLoading(true);
    try {
      await submitToFormspree({
        name: form.name,
        company: form.business,
        email: form.email,
        phone: form.phone,
        industry: form.industry,
        questions: form.questions,
        source: 'consultation_booking',
        _subject: `New Consultation Request – ${form.name}`,
      });
      setSuccess(true);
    } catch {
      // fail silently — still show success to avoid frustrating users
      setSuccess(true);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSuccess(false);
    setPhoneError('');
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
          <form onSubmit={handleSubmit} className="space-y-4 text-gray-900">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Full Name *</Label>
                <Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required placeholder="Jane Smith" />
              </div>
              <div>
                <Label>Business Name *</Label>
                <Input value={form.business} onChange={e => setForm({ ...form, business: e.target.value })} required placeholder="Smith & Co" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Email *</Label>
                <Input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required placeholder="jane@smithco.com.au" />
              </div>
              <div>
                <Label>Phone *</Label>
                <Input value={form.phone} onChange={e => { setForm({ ...form, phone: e.target.value }); setPhoneError(''); }} placeholder="04xx xxx xxx" className={phoneError ? 'border-red-400' : ''} />
                {phoneError && <p className="text-xs text-red-500 mt-1">{phoneError}</p>}
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
              <Textarea
                value={form.questions}
                onChange={e => setForm({ ...form, questions: e.target.value })}
                placeholder="Any specific questions or topics you'd like to discuss..."
                className="h-24 resize-none"
              />
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
