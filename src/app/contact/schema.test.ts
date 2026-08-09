import { describe, expect, it } from 'vitest';

import { ContactSchema } from './schema';

const valid = {
  firstName: 'Ada',
  lastName: 'Lovelace',
  email: 'ada@example.com',
  subject: 'New commission',
  message: 'We are planning a small civic building in Aarhus and would like to talk.',
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
