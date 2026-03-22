export async function submitEnquiry(data) {
  const res = await fetch('/.netlify/functions/send-enquiry-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.error || 'Submission failed.');
  return result;
}
