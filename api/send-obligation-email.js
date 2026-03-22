import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    return res.status(204).setHeader('Access-Control-Allow-Origin', '*').setHeader('Access-Control-Allow-Headers', 'Content-Type').end();
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, business, email, phone, businessType, otherInfo } = req.body;

  if (!name || !email || !businessType) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const timestamp = new Date().toLocaleString('en-AU', { timeZone: 'Australia/Sydney' });
  const siteUrl = 'https://leadaml.com.au';
  const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent('Following up on your Tranche 2 AML Obligation Check')}`;

  const userHtml = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#1a1a1a;">
      <img src="${siteUrl}/logo.png" alt="Lead AML" style="height:56px;margin-bottom:28px;" />
      <p style="font-size:16px;">Hi ${name},</p>
      <p style="font-size:15px;line-height:1.7;">
        Thank you for checking your Tranche 2 AML obligations with Lead AML.
      </p>
      <p style="font-size:15px;line-height:1.7;">
        Our AML experts will review your details and get back to you within <strong>24 hours</strong> with a personalised assessment of your obligations under Australia's Tranche 2 reforms.
      </p>
      <p style="font-size:15px;line-height:1.7;">
        In the meantime, feel free to explore our free industry guides at <a href="${siteUrl}/resources" style="color:#2C3E5D;">${siteUrl}/resources</a>.
      </p>
      <hr style="border:none;border-top:1px solid #e5e7eb;margin:28px 0;" />
      <p style="font-size:13px;color:#6b7280;">
        Best regards,<br/>
        <strong>The Team at Lead AML</strong> — <em>AML Done Right</em><br/>
        <a href="mailto:info@leadaml.com.au" style="color:#2C3E5D;">info@leadaml.com.au</a> &nbsp;|&nbsp;
        <a href="${siteUrl}" style="color:#2C3E5D;">leadaml.com.au</a>
      </p>
    </div>`;

  const adminHtml = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#1a1a1a;">
      <h2 style="color:#2C3E5D;margin-bottom:4px;">🚨 New Obligation Check Submission</h2>
      <p style="font-size:14px;color:#6b7280;margin-top:0;margin-bottom:20px;">
        <strong>${name}</strong> from <strong>${business || 'Unknown'}</strong> submitted an obligation check.
      </p>

      <h3 style="color:#2C3E5D;margin-top:24px;margin-bottom:10px;">👤 Lead Details</h3>
      <table style="width:100%;border-collapse:collapse;font-size:15px;">
        <tr style="background:#f8fafc;"><td style="padding:10px 14px;font-weight:600;width:38%;border-bottom:1px solid #e5e7eb;">Name</td><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;">${name}</td></tr>
        <tr><td style="padding:10px 14px;font-weight:600;border-bottom:1px solid #e5e7eb;">Business</td><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;">${business || '—'}</td></tr>
        <tr style="background:#f8fafc;"><td style="padding:10px 14px;font-weight:600;border-bottom:1px solid #e5e7eb;">Business Type</td><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;font-weight:600;color:#2C3E5D;">${businessType}</td></tr>
        <tr><td style="padding:10px 14px;font-weight:600;border-bottom:1px solid #e5e7eb;">Email</td><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;">${email}</td></tr>
        <tr style="background:#f8fafc;"><td style="padding:10px 14px;font-weight:600;border-bottom:1px solid #e5e7eb;">Phone</td><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;">${phone || '—'}</td></tr>
        <tr><td style="padding:10px 14px;font-weight:600;">Other Info</td><td style="padding:10px 14px;">${otherInfo || '—'}</td></tr>
      </table>

      <p style="font-size:14px;color:#6b7280;margin-top:16px;">Submitted: ${timestamp}</p>

      <h3 style="color:#2C3E5D;margin-top:24px;margin-bottom:10px;">⚡ Quick Actions</h3>
      <p style="font-size:15px;margin:8px 0;">✉️ <a href="${mailtoUrl}" style="color:#2C3E5D;font-weight:600;">Click here to email ${name}</a></p>
    </div>`;

  try {
    await Promise.all([
      resend.emails.send({
        from: 'Lead AML <info@leadaml.com.au>',
        to: email,
        subject: 'Your AML Obligation Check — Lead AML',
        html: userHtml,
      }),
      resend.emails.send({
        from: 'Lead AML Website <info@leadaml.com.au>',
        to: 'info@leadaml.com.au',
        subject: `🚨 Obligation Check: ${name} from ${business || 'Unknown'} — ${businessType}`,
        html: adminHtml,
      }),
    ]);

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Resend error:', err);
    return res.status(500).json({ error: 'Failed to send email.' });
  }
}
