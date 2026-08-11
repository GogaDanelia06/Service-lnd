import { describe, expect, it } from 'vitest';

import { composeMessage } from './message';

const input = {
  firstName: 'Ada',
  lastName: 'Lovelace',
  email: 'ada@example.com',
  subject: 'New commission',
  message: '  We are planning a civic building in Kutaisi.  ',
  company: '',
};

describe('composeMessage', () => {
  it('puts the sender and topic in the subject', () => {
    expect(composeMessage(input).subject).toBe('Montavia — New commission — Ada Lovelace');
  });

  it('replies to the sender, not the site', () => {
    expect(composeMessage(input).replyTo).toBe('ada@example.com');
  });

  it('trims the message body', () => {
    expect(composeMessage(input).text).toContain('We are planning a civic building in Kutaisi.');
    expect(composeMessage(input).text).not.toContain('  We are planning');
  });

  it('falls back to a generic topic when no subject is given', () => {
    const { subject } = composeMessage({ ...input, subject: '' });
    expect(subject).toBe('Montavia — Website enquiry — Ada Lovelace');
  });
});
