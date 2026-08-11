'use server';

import { ContactSchema } from './schema';
import type { ContactField, ContactState } from './state';

export async function submitContact(
  _previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const parsed = ContactSchema.safeParse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message'),
    company: formData.get('company'),
  });

  if (!parsed.success) {
    const fieldErrors: NonNullable<ContactState['fieldErrors']> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as ContactField | undefined;
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }

    return { status: 'error', message: 'Please check the highlighted fields.', fieldErrors };
  }

  if (parsed.data.company) {
    return { status: 'success', message: 'Thank you — we’ll be in touch shortly.' };
  }

  try {
    await deliver(parsed.data);
  } catch (error) {
    console.error('[contact] delivery failed', error);
    return {
      status: 'error',
      message: 'Something went wrong sending that. Please email us directly.',
    };
  }

  return { status: 'success', message: 'Thank you — we’ll be in touch shortly.' };
}

async function deliver(payload: Record<string, unknown>): Promise<void> {
  const endpoint = process.env.CONTACT_WEBHOOK_URL;

  if (!endpoint) {
    console.info('[contact] no CONTACT_WEBHOOK_URL set — submission logged only', payload);
    return;
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Webhook responded ${response.status}`);
  }
}
