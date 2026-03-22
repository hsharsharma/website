/**
 * Calls the Netlify serverless function to:
 *  1. Validate the user's email (format + blocked domain check)
 *  2. Send the requested PDF to the user via Resend
 *  3. Send an admin notification to info@leadaml.com.au
 */
export async function submitGuideRequest(data) {
  const res = await fetch('/api/send-guide-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.error || 'Submission failed. Please try again.');
  }

  return result; // { success, downloadUrl, hasAttachment }
}
