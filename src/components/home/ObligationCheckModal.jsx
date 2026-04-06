import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle2, Loader2, ArrowRight, ArrowLeft } from 'lucide-react';

const businessTypes = [
  'Accounting', 'Financial Audits', 'Trading', 'Crypto',
  'Jewellery trading', 'Precious stone trading', 'Bullion trading',
  'Real estate', 'Conveyancers', 'Lawyers', 'None of the above',
];

const navyBtn = {
  base: { display:'inline-flex', alignItems:'center', justifyContent:'center', gap:'0.4rem', borderRadius:'9999px', border:'1.5px solid #2C3E5D', background:'#2C3E5D', color:'#fff', padding:'0 1.5rem', height:'2.75rem', fontSize:'0.875rem', fontWeight:600, cursor:'pointer', transition:'opacity 0.2s', width:'100%' },
  disabled: { opacity:0.75, cursor:'not-allowed' },
};
const outlineNavyBtn = {
  base: { display:'inline-flex', alignItems:'center', justifyContent:'center', gap:'0.4rem', borderRadius:'9999px', border:'1.5px solid #2C3E5D', background:'transparent', color:'#2C3E5D', padding:'0 1.5rem', height:'2.75rem', fontSize:'0.875rem', fontWeight:600, cursor:'pointer', transition:'background 0.2s, color 0.2s' },
  hover: { background:'#2C3E5D', color:'#fff' },
};

function NavyButton({ onClick, disabled, children, style: extraStyle = {} }) {
  return <button onClick={onClick} disabled={disabled} style={{ ...navyBtn.base, ...(disabled ? navyBtn.disabled : {}), ...extraStyle }}>{children}</button>;
}
function OutlineNavyButton({ onClick, children }) {
  const [hovered, setHovered] = React.useState(false);
  return <button onClick={onClick} style={{ ...outlineNavyBtn.base, ...(hovered ? outlineNavyBtn.hover : {}) }} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>{children}</button>;
}

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

export default function ObligationCheckModal({ open, onClose }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', business: '', email: '', phone: '', businessType: '', otherInfo: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateField = (field, value) => {
    switch (field) {
      case 'name': return value.trim().length < 2 ? 'Please enter your full name.' : '';
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

  const handleNext = () => {
    const fields = ['name', 'email', 'phone'];
    const newErrors = {};
    fields.forEach(f => { const err = validateField(f, form[f] || ''); if (err) newErrors[f] = err; });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTouched({ name: true, email: true, phone: true });
      return;
    }
    setStep(2);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await fetch('/api/send-obligation-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, business: form.business, email: form.email, phone: form.phone, businessType: form.businessType, otherInfo: form.otherInfo }),
      });
    } catch {
      // fail silently
    } finally {
      setLoading(false);
      setSuccess(true);
    }
  };

  const handleClose = () => {
    setSuccess(false);
    setStep(1);
    setErrors({});
    setTouched({});
    setForm({ name: '', business: '', email: '', phone: '', businessType: '', otherInfo: '' });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">Check Your Tranche 2 Obligation</DialogTitle>
        </DialogHeader>

        {success ? (
          <div className="text-center py-8">
            <CheckCircle2 className="h-14 w-14 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">Thanks! We'll be in touch.</h3>
            <p className="text-gray-500 text-sm">Our AML experts will review your details and get back to you within 24 hours.</p>
            <NavyButton onClick={handleClose} style={{ width:'auto', marginTop:'1.5rem', padding:'0 2rem' }}>Done</NavyButton>
          </div>
        ) : (
          <>
            <div className="flex gap-2 mb-4">
              {[1, 2].map(s => (
                <div key={s} className={`h-1.5 flex-1 rounded-full transition-colors ${step >= s ? 'bg-[var(--brand-navy)]' : 'bg-gray-100'}`} />
              ))}
            </div>
            <p className="text-xs text-gray-400 mb-4">Step {step} of 2</p>

            {step === 1 && (
              <div className="space-y-4" autoComplete="off">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Full Name *</Label>
                    <Input value={form.name} onChange={e => handleChange('name', e.target.value)} onBlur={() => handleBlur('name')} autoComplete="off" placeholder="Jane Smith" className={errors.name ? 'border-red-400' : ''} />
                    {errors.name ? <p className="text-xs text-red-500 mt-1">{errors.name}</p> : <p className="text-xs text-gray-400 mt-1">{HINTS.name}</p>}
                  </div>
                  <div>
                    <Label>Business Name</Label>
                    <Input value={form.business} onChange={e => handleChange('business', e.target.value)} autoComplete="off" placeholder="Smith & Co" />
                    <p className="text-xs text-gray-400 mt-1">{HINTS.business}</p>
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
                <NavyButton onClick={handleNext}>
                  Next <ArrowRight className="h-4 w-4" />
                </NavyButton>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <p className="text-sm font-medium text-gray-700">Select your business type:</p>
                <div className="grid grid-cols-2 gap-2">
                  {businessTypes.map(bt => {
                    const selected = form.businessType === bt;
                    return (
                      <button
                        key={bt}
                        onClick={() => setForm({ ...form, businessType: bt })}
                        style={{
                          textAlign: 'left', padding: '0.625rem 1rem', borderRadius: '0.75rem',
                          fontSize: '0.875rem', border: `1.5px solid ${selected ? '#2C3E5D' : '#e5e7eb'}`,
                          background: selected ? '#2C3E5D' : '#fff',
                          color: selected ? '#fff' : '#374151',
                          cursor: 'pointer', transition: 'all 0.15s',
                        }}
                      >
                        {bt}
                      </button>
                    );
                  })}
                </div>

                {form.businessType === 'None of the above' && (
                  <div>
                    <Label>Tell us more about your business</Label>
                    <Textarea value={form.otherInfo} onChange={e => setForm({ ...form, otherInfo: e.target.value })} placeholder="Describe your business and we'll get back to you..." className="h-20 resize-none" />
                  </div>
                )}

                <div className="flex gap-3">
                  <OutlineNavyButton onClick={() => setStep(1)}>
                    <ArrowLeft className="h-4 w-4" /> Back
                  </OutlineNavyButton>
                  <NavyButton onClick={handleSubmit} disabled={loading || !form.businessType} style={{ flex:1 }}>
                    {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Checking...</> : 'Submit & Check Obligation'}
                  </NavyButton>
                </div>
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
