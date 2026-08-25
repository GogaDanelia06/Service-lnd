'use server';

import { getContent } from '@/content';
import { defaultLocale, isLocale } from '@/i18n/config';

import { deliver } from './deliver';
import { contactSchema } from './schema';
import type { ContactField, ContactState } from './state';

export async function submitContact(
  _previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const raw = formData.get('locale');
  const locale = typeof raw === 'string' && isLocale(raw) ? raw : defaultLocale;
  const t = getContent(locale).ui.form;

  const text = (key: ContactField) => {
    const value = formData.get(key);
    return typeof value === 'string' ? value : '';
  };
  const values: NonNullable<ContactState['values']> = {
    firstName: text('firstName'),
    lastName: text('lastName'),
    email: text('email'),
    phone: text('phone'),
    subject: text('subject'),
    message: text('message'),
  };

  const parsed = contactSchema(t.errors).safeParse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    phone: formData.get('phone'),
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
    return { status: 'error', message: t.checkFields, fieldErrors, values };
  }

  if (parsed.data.company) {
    return { status: 'success', message: t.thanks };
  }

  try {
    await deliver(parsed.data);
  } catch (error) {
    console.error('[contact] delivery failed', error);
    return { status: 'error', message: t.deliveryFailed, values };
  }

  return { status: 'success', message: t.thanks };
}
