export async function submitDemoRequest(data) {
  const res = await fetch('/.netlify/functions/send-demo-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.error || 'Submission failed. Please try again.');
  return result;
}
