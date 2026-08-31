import type { LegalPage } from '@/content/types';

export const privacy: LegalPage = {
  slug: 'privacy',
  title: 'Privacy Policy',
  label: 'Privacy',
  body: [
    {
      paragraphs: [
        'We respect the confidentiality of your personal information and aim to ensure that it is properly protected.',
        'This privacy policy explains what kind of information may be collected when you use the website, how it may be used, and what measures we take to protect it.',
      ],
    },
    {
      heading: 'What information may be collected',
      paragraphs: [
        'When you use the website, we may collect information that you provide voluntarily, including:',
      ],
      list: [
        'first and last name;',
        'contact information;',
        'email address;',
        'telephone number;',
        'other information given in a message or enquiry;',
        'information relating to a project or service.',
      ],
    },
    {
      paragraphs: [
        'Technical information may also be collected automatically, such as device type, browser, IP address, time of visit and general usage data.',
      ],
    },
    {
      heading: 'Use of information',
      paragraphs: ['The information received may be used:'],
      list: [
        'to respond to your enquiries;',
        'to contact you;',
        'to communicate about services and projects;',
        'to improve the functionality of the website and the user experience;',
        'to identify and resolve technical problems;',
        'to ensure security;',
        'to meet applicable legal requirements.',
      ],
    },
    {
      heading: 'Sharing of information',
      paragraphs: [
        'Your personal information is not sold or unlawfully passed on to third parties.',
        'Information may be passed to relevant service partners or other authorised persons only where this is necessary to provide the service, to operate the website, for security, or to fulfil an obligation provided for by law.',
      ],
    },
    {
      heading: 'Data retention',
      paragraphs: [
        'Personal information is kept only for as long as is necessary to fulfil the purpose for which it was collected, to provide the relevant service, or to satisfy requirements under applicable law.',
      ],
    },
    {
      heading: 'Changes to this policy',
      paragraphs: [
        'The company has the right to update the privacy policy from time to time. Where changes are made, the updated version will be published on the website.',
        'If you have questions about the privacy policy, you can reach us using the contact details given on the website.',
      ],
    },
  ],
};
