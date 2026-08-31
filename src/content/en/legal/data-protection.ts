import type { LegalPage } from '@/content/types';

export const dataProtection: LegalPage = {
  slug: 'data-protection',
  title: 'Personal Data Protection Policy',
  label: 'Data Protection',
  body: [
    {
      paragraphs: [
        'The protection of personal data matters to us. The company aims to process personal data responsibly, securely and in accordance with applicable law.',
      ],
    },
    {
      heading: 'Principles of data processing',
      paragraphs: [
        'When processing personal data, the company is guided by the following core principles:',
      ],
      list: [
        'data is processed for specific and lawful purposes;',
        'only necessary and relevant information is collected;',
        'data is stored using appropriate security measures;',
        'only authorised persons have access to the data;',
        'data is not used for purposes incompatible with the original purpose of collection.',
      ],
    },
    {
      heading: 'Data security',
      paragraphs: [
        'The company takes appropriate technical and organisational measures to reduce the risk of loss, unauthorised access, alteration, disclosure or other unlawful use of personal data.',
        'That said, the risks associated with using the internet and electronic systems cannot be ruled out entirely.',
      ],
    },
    {
      heading: 'Data sharing',
      paragraphs: [
        'Personal data may be processed by the company’s employees, contractors or service providers only within the scope of their authorisation and where necessary.',
        'Data is transferred to a third party only where an appropriate legal basis exists.',
      ],
    },
    {
      heading: 'Your rights',
      paragraphs: [
        'Within the limits of applicable law, you may have the right to request information about the data processed about you, and to have it corrected, updated or erased, to restrict its processing, or to take other appropriate action.',
        'To exercise these rights, you can reach us using the contact details given on the website.',
      ],
    },
    {
      heading: 'Contact about data protection',
      paragraphs: [
        'For any question, request or complaint relating to personal data, please use the contact information given on the website.',
      ],
    },
    {
      heading: 'Policy updates',
      paragraphs: [
        'This policy may be updated from time to time in line with changes in applicable law, the technological environment or the company’s processes. The updated version will be published on the website.',
      ],
    },
  ],
};
