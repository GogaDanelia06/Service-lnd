import { describe, expect, it } from 'vitest';

import { contactSchema } from './schema';

const ContactSchema = contactSchema({
  firstName: 'Required',
  lastName: 'Required',
  email: 'Enter a valid email address',
  phone: 'Enter a phone number',
  messageShort: 'At least 10 characters',
  tooLong: 'Too long',
});

const valid = {
  firstName: 'Ada',
  lastName: 'Lovelace',
  email: 'ada@example.com',
  phone: '+995 599 12 34 56',
  subject: 'New commission',
  message: 'We are planning a small civic building in Kutaisi and would like to talk.',
  company: '',
};

describe('ContactSchema', () => {
  it('accepts a complete submission', () => {
    expect(ContactSchema.safeParse(valid).success).toBe(true);
  });

  it('treats the subject as optional', () => {
    const { subject: _subject, ...rest } = valid;
    expect(ContactSchema.safeParse(rest).success).toBe(true);
  });

  it('requires a phone number', () => {
    const { phone: _phone, ...rest } = valid;
    expect(ContactSchema.safeParse(rest).success).toBe(false);
    expect(ContactSchema.safeParse({ ...valid, phone: '' }).success).toBe(false);
    expect(ContactSchema.safeParse({ ...valid, phone: '   ' }).success).toBe(false);
  });

  it('rejects a phone number too short to dial', () => {
    const result = ContactSchema.safeParse({ ...valid, phone: '123' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toMatch(/phone/i);
    }
  });

  it('rejects a malformed email', () => {
    const result = ContactSchema.safeParse({ ...valid, email: 'not-an-email' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toMatch(/valid email/);
    }
  });

  it('rejects a message that is too short to act on', () => {
    expect(ContactSchema.safeParse({ ...valid, message: 'Hi' }).success).toBe(false);
  });

  it('rejects whitespace-only names after trimming', () => {
    expect(ContactSchema.safeParse({ ...valid, firstName: '   ' }).success).toBe(false);
  });

  it('flags a filled honeypot', () => {
    expect(ContactSchema.safeParse({ ...valid, company: 'Spam Co' }).success).toBe(false);
  });

  it('caps oversized input rather than accepting it', () => {
    expect(ContactSchema.safeParse({ ...valid, message: 'x'.repeat(4001) }).success).toBe(false);
  });
});
