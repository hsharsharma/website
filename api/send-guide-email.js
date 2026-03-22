const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const BLOCKED_DOMAINS = [
  'mailinator.com', 'guerrillamail.com', 'guerrillamail.info', 'guerrillamail.net',
  'guerrillamail.org', 'guerrillamail.de', 'guerrillamailblock.com', 'grr.la',
  'sharklasers.com', 'spam4.me', 'trashmail.com', 'trashmail.me', 'trashmail.net',
  'trashmail.org', 'trashmail.at', 'trashmail.io', 'trashmail.xyz',
  'temp-mail.org', 'temp-mail.io', 'tempmail.com', 'tempmail.net', 'tempmail.org',
  'throwaway.email', 'throwam.com', '10minutemail.com', '10minutemail.net',
  'yopmail.com', 'yopmail.fr', 'cool.fr.nf', 'jetable.fr.nf', 'nospam.ze.tc',
  'maildrop.cc', 'dispostable.com', 'discard.email', 'mailnull.com',
  'mail-temp.com', 'mohmal.com', 'spamgourmet.com', 'spamgourmet.net',
  'spamspot.com', 'spamfree24.org', 'cfl.fr', 'gowikipedia.org',
  'fakeinbox.com', 'mailismagic.com', 'getairmail.com', 'filzmail.com',
  'wegwerfmail.de', 'sogetthis.com', 'meltmail.com', 'binkmail.com',
];

const PDF_MAP = {
  accountants:     'guide-accountants.pdf',
  lawyers:         'guide-lawyers.pdf',
  conveyancers:    'guide-conveyancers.pdf',
  jewelers_bullion:'guide-jewelers.pdf',
  real_estate:     'guide-real-estate.pdf',
  general:         'guide-complete.pdf',
};

const GUIDE_LABELS = {
  accountants:     'Accountants AML Guide',
  lawyers:         'Lawyers AML Guide',
  conveyancers:    'Conveyancers AML Guide',
  jewelers_bullion:'Jewellers & Bullion AML Guide',
  real_estate:     'Real Estate Agents AML Guide',
  general:         'Complete Tranche 2 AML Guide',
};

function isValidEmail(email) {
  if (!email) return false;
  const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) return false;
  const domain = email.split('@')[1].toLowerCase();
  if (BLOCKED_DOMAINS.includes(domain)) return false;
  const local = email.split('@')[0].toLowerCase();
  if (['test', 'fake', 'asdf', 'qwerty', 'noemail', 'noreply'].includes(local)) return false;
  return true;
}

module.exports = async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    return res.status(204).setHeader('Access-Control-Allow-Origin', '*').setHeader('Access-Control-Allow-Headers', 'Content-Type').end();
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, company, industry, phone, guideKey, guideName, pageSource } = req.body;

  if (!name || !name.trim() || name.trim().length < 2) {
    return res.status(400).json({ error: 'Please provide your full name.' });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Please provide a valid business email address.' });
  }
  if (!guideKey || !PDF_MAP[guideKey]) {
    return res.status(400).json({ error: 'Invalid guide selection.' });
  }

  const pdfFilename  = PDF_MAP[guideKey];
  const guideLabel   = GUIDE_LABELS[guideKey] || guideName || 'AML Guide';
  const siteUrl      = 'https://leadaml.com.au';
  const pdfPublicUrl = `${siteUrl}/pdfs/${pdfFilename}`;
  const timestamp    = new Date().toLocaleString('en-AU', { timeZone: 'Australia/Sydney' });

  let attachment = null;
  try {
    const pdfRes = await fetch(pdfPublicUrl);
    if (pdfRes.ok) {
      const buf = await pdfRes.arrayBuffer();
      attachment = {
        filename: pdfFilename,
        content: Buffer.from(buf).toString('base64'),
      };
    }
  } catch (err) {
    console.warn('PDF fetch failed – will send link only:', err.message);
  }

  const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent((company || '') + ' ' + (industry || ''))}`;
  const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent('Following up on the ' + guideLabel)}`;

  const userHtml = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#1a1a1a;">
      <img src="https://leadaml.com.au/logo.png" alt="Lead AML" style="height:56px;margin-bottom:28px;" />
      <p style="font-size:16px;">Hi ${name},</p>
      <p style="font-size:15px;line-height:1.7;">
        Thank you for downloading the <strong>${guideLabel}</strong>.
      </p>
      <p style="font-size:15px;line-height:1.7;">
        At Lead AML, we know that navigating compliance obligations can be complex. We put together this guide to give you absolute clarity and help you get your AML done right from the start.
      </p>
      <p style="font-size:15px;line-height:1.7;">
        📥 <strong>Download your guide:</strong> ${attachment
          ? `Your PDF is attached to this email. If you have trouble viewing the attachment, <a href="${pdfPublicUrl}" style="color:#2563eb;">click here to download it directly</a>.`
          : `<a href="${pdfPublicUrl}" style="display:inline-block;background:#2563eb;color:#fff;padding:12px 24px;border-radius:999px;text-decoration:none;font-weight:600;margin-top:8px;">Download Your Guide</a>`
        }
      </p>
      <p style="font-size:15px;line-height:1.7;margin-top:20px;">
        <strong>What's next?</strong> If you have questions after reading through the guide, or if you want to find out exactly how these regulations apply to ${company ? `<strong>${company}</strong>` : 'your business'}, we're here to help.
      </p>
      <p style="font-size:15px;line-height:1.7;">
        Simply reply to this email to start a conversation, or reach out to us at
        <a href="mailto:info@leadaml.com.au" style="color:#2563eb;">info@leadaml.com.au</a>.
      </p>
      <hr style="border:none;border-top:1px solid #e5e7eb;margin:28px 0;" />
      <p style="font-size:13px;color:#6b7280;">
        Best regards,<br/>
        <strong>The Team at Lead AML</strong> &mdash; <em>AML Done Right</em><br/>
        <a href="mailto:info@leadaml.com.au" style="color:#2563eb;">info@leadaml.com.au</a> &nbsp;|&nbsp;
        <a href="https://leadaml.com.au" style="color:#2563eb;">leadaml.com.au</a>
      </p>
    </div>`;

  const adminHtml = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#1a1a1a;">
      <h2 style="color:#1e3a5f;margin-bottom:4px;">🚨 New Lead Alert</h2>
      <p style="font-size:15px;color:#6b7280;margin-top:0;margin-bottom:20px;">
        <strong>${name}</strong> from <strong>${company || 'Unknown Company'}</strong> downloaded <strong>${guideLabel}</strong>
      </p>
      <p style="font-size:14px;color:#374151;margin-bottom:4px;">You have a new inbound lead from the website.</p>

      <h3 style="color:#1e3a5f;margin-top:24px;margin-bottom:10px;">👤 Lead Details</h3>
      <table style="width:100%;border-collapse:collapse;font-size:15px;">
        <tr style="background:#f8fafc;">
          <td style="padding:10px 14px;font-weight:600;width:38%;border-bottom:1px solid #e5e7eb;">Name</td>
          <td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;">${name}</td>
        </tr>
        <tr>
          <td style="padding:10px 14px;font-weight:600;border-bottom:1px solid #e5e7eb;">Company</td>
          <td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;">${company || '—'}</td>
        </tr>
        <tr style="background:#f8fafc;">
          <td style="padding:10px 14px;font-weight:600;border-bottom:1px solid #e5e7eb;">Industry</td>
          <td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;">${industry || '—'}</td>
        </tr>
        <tr>
          <td style="padding:10px 14px;font-weight:600;border-bottom:1px solid #e5e7eb;">Email</td>
          <td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;">${email}</td>
        </tr>
        <tr style="background:#f8fafc;">
          <td style="padding:10px 14px;font-weight:600;">Phone</td>
          <td style="padding:10px 14px;">${phone || '—'}</td>
        </tr>
      </table>

      <h3 style="color:#1e3a5f;margin-top:24px;margin-bottom:10px;">📄 Activity Details</h3>
      <table style="width:100%;border-collapse:collapse;font-size:15px;">
        <tr style="background:#f8fafc;">
          <td style="padding:10px 14px;font-weight:600;width:38%;border-bottom:1px solid #e5e7eb;">Guide Requested</td>
          <td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;color:#2563eb;font-weight:600;">${guideLabel}</td>
        </tr>
        <tr>
          <td style="padding:10px 14px;font-weight:600;border-bottom:1px solid #e5e7eb;">Source Page</td>
          <td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;">${pageSource || '—'}</td>
        </tr>
        <tr style="background:#f8fafc;">
          <td style="padding:10px 14px;font-weight:600;">Time Submitted</td>
          <td style="padding:10px 14px;">${timestamp}</td>
        </tr>
      </table>

      <h3 style="color:#1e3a5f;margin-top:24px;margin-bottom:10px;">⚡ Quick Actions</h3>
      <p style="font-size:15px;margin:8px 0;">
        ✉️ <a href="${mailtoUrl}" style="color:#2563eb;font-weight:600;">Click here to email ${name}</a>
        <span style="color:#6b7280;font-size:13px;"> — auto-drafts a follow-up email</span>
      </p>
      <p style="font-size:15px;margin:8px 0;">
        🔍 <a href="${googleSearchUrl}" style="color:#2563eb;font-weight:600;">Search ${company || name} on Google</a>
      </p>
    </div>`;

  try {
    await Promise.all([
      resend.emails.send({
        from: 'Lead AML <info@leadaml.com.au>',
        to: email,
        subject: `Here is your guide to AML compliance: ${guideLabel}`,
        html: userHtml,
        ...(attachment ? { attachments: [attachment] } : {}),
      }),
      resend.emails.send({
        from: 'Lead AML Website <info@leadaml.com.au>',
        to: 'info@leadaml.com.au',
        subject: `🚨 New Lead Alert: ${name} from ${company || 'Unknown'} downloaded ${guideLabel}`,
        html: adminHtml,
      }),
    ]);

    return res.status(200).json({
      success: true,
      downloadUrl: pdfPublicUrl,
      hasAttachment: !!attachment,
    });
  } catch (err) {
    console.error('Resend error:', err);
    return res.status(500).json({ error: 'Failed to send email. Please try again.' });
  }
}
