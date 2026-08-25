import type { ContactInput } from './schema';

export type Composed = {
  subject: string;
  text: string;
  replyTo: string;
};

export function composeMessage(input: ContactInput, siteName = 'Montavia'): Composed {
  const name = `${input.firstName} ${input.lastName}`.trim();
  const topic = input.subject?.trim() ? input.subject.trim() : 'Website enquiry';

  const lines = [
    `From:    ${name} <${input.email}>`,
    `Phone:   ${input.phone.trim()}`,
    `Subject: ${topic}`,
    '',
    input.message.trim(),
    '',
    `— sent from the ${siteName} contact form`,
  ];

  return {
    subject: `${siteName} — ${topic} — ${name}`,
    text: lines.join('\n'),
    replyTo: input.email,
  };
}
