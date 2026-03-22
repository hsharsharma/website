const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

const INDUSTRY_LABELS = {
  accountants:     'Accountants',
  lawyers:         'Lawyers',
  conveyancers:    'Conveyancers',
  jewelers_bullion:'Jewellers & Bullion Dealers',
  real_estate:     'Real Estate Agents',
  other:           'Other',
};

module.exports = async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    return res.status(204).setHeader('Access-Control-Allow-Origin', '*').setHeader('Access-Control-Allow-Headers', 'Content-Type').end();
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, company, industry, preferred_date } = req.body;

  if (!name || !name.trim() || name.trim().length < 2) {
    return res.status(400).json({ error: 'Please provide your full name.' });
  }
  if (!email || !/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(email)) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }
  if (!company || !company.trim()) {
    return res.status(400).json({ error: 'Please provide your company name.' });
  }
  if (!industry) {
    return res.status(400).json({ error: 'Please select your industry.' });
  }

  const industryLabel = INDUSTRY_LABELS[industry] || industry;
  const timestamp = new Date().toLocaleString('en-AU', { timeZone: 'Australia/Sydney' });
  const siteUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://leadaml.com.au';

  const userHtml = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#1a1a1a;">
      <img src="https://leadaml.com.au/logo.png" alt="Lead AML" style="height:56px;margin-bottom:28px;" />
      <p style="font-size:16px;">Hi ${name},</p>
      <p style="font-size:15px;line-height:1.7;">
        Thank you for requesting a demo with Lead AML! We've received your request and our team will be in touch shortly to confirm your session.
      </p>
      ${preferred_date ? `<p style="font-size:15px;"><strong>Preferred Date:</strong> ${preferred_date}</p>` : ''}
      <p style="font-size:15px;line-height:1.7;margin-top:16px;">
        In the meantime, if you have any questions feel free to reply directly to this email.
      </p>
      <hr style="border:none;border-top:1px solid #e5e7eb;margin:28px 0;" />
      <p style="font-size:13px;color:#6b7280;">
        Best regards,<br/>
        <strong>The Team at Lead AML</strong><br/>
        <a href="mailto:info@leadaml.com.au" style="color:#2563eb;">info@leadaml.com.au</a>
      </p>
    </div>`;

  const adminHtml = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#1a1a1a;">
      <h2 style="color:#1e3a5f;margin-bottom:20px;">📅 New Demo Request</h2>
      <table style="width:100%;border-collapse:collapse;font-size:15px;">
        <tr style="background:#f8fafc;">
          <td style="padding:10px 14px;font-weight:600;width:38%;border-bottom:1px solid #e5e7eb;">Name</td>
          <td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;">${name}</td>
        </tr>
        <tr>
          <td style="padding:10px 14px;font-weight:600;border-bottom:1px solid #e5e7eb;">Email</td>
          <td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;">${email}</td>
        </tr>
        <tr style="background:#f8fafc;">
          <td style="padding:10px 14px;font-weight:600;border-bottom:1px solid #e5e7eb;">Company</td>
          <td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;">${company}</td>
        </tr>
        <tr>
          <td style="padding:10px 14px;font-weight:600;border-bottom:1px solid #e5e7eb;">Industry</td>
          <td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;">${industryLabel}</td>
        </tr>
        <tr style="background:#f8fafc;">
          <td style="padding:10px 14px;font-weight:600;border-bottom:1px solid #e5e7eb;">Preferred Date</td>
          <td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;">${preferred_date || '—'}</td>
        </tr>
        <tr>
          <td style="padding:10px 14px;font-weight:600;">Submitted At</td>
          <td style="padding:10px 14px;">${timestamp}</td>
        </tr>
      </table>
    </div>`;

  try {
    await Promise.all([
      resend.emails.send({
        from: 'Lead AML <info@leadaml.com.au>',
        to: email,
        subject: 'Demo Request Confirmed – Lead AML',
        html: userHtml,
      }),
      resend.emails.send({
        from: 'Lead AML Website <info@leadaml.com.au>',
        to: 'info@leadaml.com.au',
        subject: `New Demo Request – ${name}`,
        html: adminHtml,
      }),
    ]);

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Resend error:', err);
    return res.status(500).json({ error: 'Failed to send email. Please try again.' });
  }
}
