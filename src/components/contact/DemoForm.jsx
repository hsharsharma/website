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

export default function DemoForm() {
  const [form, setForm] = useState({
    name: '', email: '', company: '', industry: '', preferred_date: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.company || !form.industry) {
      toast.error('Please fill in all required fields.');
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
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Full Name *</Label>
          <Input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="John Smith"
            className="h-11" />
        </div>
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Email *</Label>
          <Input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="john@company.com"
            className="h-11" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Company *</Label>
          <Input
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            placeholder="Your company name"
            className="h-11" />
        </div>
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Industry *</Label>
          <Select value={form.industry} onValueChange={(v) => setForm({ ...form, industry: v })}>
            <SelectTrigger className="h-11">
              <SelectValue placeholder="Select your industry" />
            </SelectTrigger>
            <SelectContent>
              {industries.map((ind) =>
                <SelectItem key={ind.value} value={ind.value}>{ind.label}</SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Preferred Date</Label>
        <Input
          type="date"
          value={form.preferred_date}
          onChange={(e) => setForm({ ...form, preferred_date: e.target.value })}
          className="h-11" />
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
    </form>
  );
}
