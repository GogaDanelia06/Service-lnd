import { z } from 'zod';

export const ContactSchema = z.object({
  firstName: z.string().trim().min(1, 'Please add your first name.').max(80),
  lastName: z.string().trim().min(1, 'Please add your last name.').max(80),
  email: z.string().trim().email('Please use a valid email address.').max(160),
  subject: z.string().trim().max(160).optional().or(z.literal('')),
  message: z
    .string()
    .trim()
    .min(10, 'Please tell us a little more — 10 characters or so.')
    .max(4000),

  company: z.string().max(0).optional().or(z.literal('')),
});

export type ContactInput = z.infer<typeof ContactSchema>;
