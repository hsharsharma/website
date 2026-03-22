const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

exports.handler = async (event) => {
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

  const { name, email } = body;

  if (!email || !/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(email)) {
    return { statusCode: 400, headers: HEADERS, body: JSON.stringify({ error: 'Please provide a valid email address.' }) };
  }

  const timestamp = new Date().toLocaleString('en-AU', { timeZone: 'Australia/Sydney' });
  const displayName = (name && name.trim()) || 'Not provided';

  const adminHtml = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#1a1a1a;">
      <h2 style="color:#1e3a5f;margin-bottom:20px;">📩 New Website Enquiry</h2>
      <table style="width:100%;border-collapse:collapse;font-size:15px;">
        <tr style="background:#f8fafc;">
          <td style="padding:10px 14px;font-weight:600;width:38%;border-bottom:1px solid #e5e7eb;">Name</td>
          <td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;">${displayName}</td>
        </tr>
        <tr>
          <td style="padding:10px 14px;font-weight:600;border-bottom:1px solid #e5e7eb;">Email</td>
          <td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;">${email}</td>
        </tr>
        <tr style="background:#f8fafc;">
          <td style="padding:10px 14px;font-weight:600;">Submitted At</td>
          <td style="padding:10px 14px;">${timestamp}</td>
        </tr>
      </table>
      <p style="font-size:13px;color:#6b7280;margin-top:16px;">Source: Footer Quick Enquiry</p>
    </div>`;

  try {
    await resend.emails.send({
      from: 'Lead AML Website <info@leadaml.com.au>',
      to: 'info@leadaml.com.au',
      subject: `New Enquiry – ${displayName}`,
      html: adminHtml,
    });

    return {
      statusCode: 200,
      headers: HEADERS,
      body: JSON.stringify({ success: true }),
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
