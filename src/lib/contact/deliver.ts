import { composeMessage } from './message';
import type { ContactInput } from './schema';

const RESEND_ENDPOINT = 'https://api.resend.com/emails';

async function viaResend(input: ContactInput): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  const from = process.env.CONTACT_FROM;
  if (!key || !to || !from) return false;

  const { subject, text, replyTo } = composeMessage(input);

  const response = await fetch(RESEND_ENDPOINT, {
    method: 'POST',
    headers: { authorization: `Bearer ${key}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      from,
      to: to.split(',').map((address) => address.trim()),
      reply_to: replyTo,
      subject,
      text,
    }),
  });

  if (!response.ok) {
    throw new Error(`Resend responded ${response.status}: ${await response.text()}`);
  }
  return true;
}

async function viaWebhook(input: ContactInput): Promise<boolean> {
  const endpoint = process.env.CONTACT_WEBHOOK_URL;
  if (!endpoint) return false;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(input),
  });

  if (!response.ok) throw new Error(`Webhook responded ${response.status}`);
  return true;
}

export async function deliver(input: ContactInput): Promise<void> {
  if (await viaResend(input)) return;
  if (await viaWebhook(input)) return;

  if (process.env.NODE_ENV === 'production') {
    throw new Error(
      'No contact transport configured. Set RESEND_API_KEY + CONTACT_TO + CONTACT_FROM, or CONTACT_WEBHOOK_URL.',
    );
  }

  console.info('[contact] no transport configured — logged only', composeMessage(input).text);
}
