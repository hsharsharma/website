const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

// ── Blocked disposable/fake email domains ──────────────────────────────────
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

// ── PDF filename map (keys match guideKey from the frontend) ──────────────
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

// ── Email validation ───────────────────────────────────────────────────────
function isValidEmail(email) {
  if (!email) return false;
  const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) return false;
  const domain = email.split('@')[1].toLowerCase();
  if (BLOCKED_DOMAINS.includes(domain)) return false;
  // Block obviously fake local parts
  const local = email.split('@')[0].toLowerCase();
  if (['test', 'fake', 'asdf', 'qwerty', 'noemail', 'noreply'].includes(local)) return false;
  return true;
}

// ── CORS headers ───────────────────────────────────────────────────────────
const HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

// ── Main handler ───────────────────────────────────────────────────────────
exports.handler = async (event) => {
  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: HEADERS, body: '' };
  }
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: HEADERS, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, headers: HEADERS, body: JSON.stringify({ error: 'Invalid request body.' }) };
  }

  const { name, email, company, industry, phone, guideKey, guideName, pageSource } = body;

  // ── Validate required fields ─────────────────────────────────────────────
  if (!name || !name.trim() || name.trim().length < 2) {
    return { statusCode: 400, headers: HEADERS, body: JSON.stringify({ error: 'Please provide your full name.' }) };
  }
  if (!isValidEmail(email)) {
    return { statusCode: 400, headers: HEADERS, body: JSON.stringify({ error: 'Please provide a valid business email address.' }) };
  }
  if (!guideKey || !PDF_MAP[guideKey]) {
    return { statusCode: 400, headers: HEADERS, body: JSON.stringify({ error: 'Invalid guide selection.' }) };
  }

  const pdfFilename  = PDF_MAP[guideKey];
  const guideLabel   = GUIDE_LABELS[guideKey] || guideName || 'AML Guide';
  const siteUrl      = process.env.URL || 'https://leadaml.com.au';
  const pdfPublicUrl = `${siteUrl}/pdfs/${pdfFilename}`;
  const timestamp    = new Date().toLocaleString('en-AU', { timeZone: 'Australia/Sydney' });

  // ── Fetch PDF for attachment ─────────────────────────────────────────────
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

  // ── Build email to USER ──────────────────────────────────────────────────
  const userHtml = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#1a1a1a;">
      <img src="${siteUrl}/logo.png" alt="Lead AML" style="height:56px;margin-bottom:28px;" />
      <p style="font-size:16px;">Hi ${name},</p>
      <p style="font-size:15px;line-height:1.7;">
        Thank you for your interest! As requested, please find your PDF attached to this email.
      </p>
      <p style="font-size:15px;"><strong>Guide:</strong> ${guideLabel}</p>
      ${!attachment ? `
      <p style="font-size:15px;">
        <a href="${pdfPublicUrl}"
           style="display:inline-block;background:#2563eb;color:#fff;padding:12px 24px;
                  border-radius:999px;text-decoration:none;font-weight:600;margin-top:8px;">
          Download Your Guide
        </a>
      </p>` : ''}
      <p style="font-size:15px;line-height:1.7;margin-top:24px;">
        If you have any questions or would like to discuss this further, feel free to reply directly to this email.
      </p>
      <hr style="border:none;border-top:1px solid #e5e7eb;margin:28px 0;" />
      <p style="font-size:13px;color:#6b7280;">
        Best regards,<br/>
        <strong>The Team at Lead AML</strong><br/>
        <a href="mailto:info@leadaml.com.au" style="color:#2563eb;">info@leadaml.com.au</a>
      </p>
    </div>`;

  // ── Build admin notification ─────────────────────────────────────────────
  const adminHtml = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#1a1a1a;">
      <h2 style="color:#1e3a5f;margin-bottom:20px;">📥 New Guide Download Request</h2>
      <table style="width:100%;border-collapse:collapse;font-size:15px;">
        <tr style="background:#f8fafc;">
          <td style="padding:10px 14px;font-weight:600;width:38%;border-bottom:1px solid #e5e7eb;">Guide Requested</td>
          <td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;color:#2563eb;font-weight:600;">${guideLabel}</td>
        </tr>
        <tr>
          <td style="padding:10px 14px;font-weight:600;border-bottom:1px solid #e5e7eb;">Name</td>
          <td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;">${name}</td>
        </tr>
        <tr style="background:#f8fafc;">
          <td style="padding:10px 14px;font-weight:600;border-bottom:1px solid #e5e7eb;">Email</td>
          <td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;">${email}</td>
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
          <td style="padding:10px 14px;font-weight:600;border-bottom:1px solid #e5e7eb;">Phone</td>
          <td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;">${phone || '—'}</td>
        </tr>
        <tr style="background:#f8fafc;">
          <td style="padding:10px 14px;font-weight:600;border-bottom:1px solid #e5e7eb;">Source Page</td>
          <td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;">${pageSource || '—'}</td>
        </tr>
        <tr>
          <td style="padding:10px 14px;font-weight:600;">Submitted At</td>
          <td style="padding:10px 14px;">${timestamp}</td>
        </tr>
      </table>
    </div>`;

  try {
    // Send both emails simultaneously
    await Promise.all([
      resend.emails.send({
        from: 'Lead AML <info@leadaml.com.au>',
        to: email,
        subject: `Here is your requested PDF from Lead AML`,
        html: userHtml,
        ...(attachment ? { attachments: [attachment] } : {}),
      }),
      resend.emails.send({
        from: 'Lead AML Website <info@leadaml.com.au>',
        to: 'info@leadaml.com.au',
        subject: `New Lead – Guide Download: ${guideLabel}`,
        html: adminHtml,
      }),
    ]);

    return {
      statusCode: 200,
      headers: HEADERS,
      body: JSON.stringify({
        success: true,
        downloadUrl: pdfPublicUrl,
        hasAttachment: !!attachment,
      }),
    };
  } catch (err) {
    console.error('Resend error:', err);
    return {
      statusCode: 500,
      headers: HEADERS,
      body: JSON.stringify({ error: 'Failed to send email. Please try again.' }),
    };
  }
};
