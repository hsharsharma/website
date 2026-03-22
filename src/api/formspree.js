const FORMSPREE_URL = 'https://formspree.io/f/xkoqenqe4';

export async function submitToFormspree(data) {
  const response = await fetch(FORMSPREE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Form submission failed. Please try again.');
  }
  return response.json();
}
