import { z } from 'zod';

export type ValidationMessages = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  messageShort: string;
  tooLong: string;
};

export function contactSchema(t: ValidationMessages) {
  return z.object({
    firstName: z.string().trim().min(1, t.firstName).max(80, t.tooLong),
    lastName: z.string().trim().min(1, t.lastName).max(80, t.tooLong),
    email: z.string().trim().email(t.email).max(160, t.tooLong),
    phone: z.string().trim().min(5, t.phone).max(40, t.tooLong),
    subject: z.string().trim().max(160, t.tooLong).optional().or(z.literal('')),
    message: z.string().trim().min(10, t.messageShort).max(4000, t.tooLong),
    company: z.string().max(0).optional().or(z.literal('')),
  });
}

export type ContactInput = z.infer<ReturnType<typeof contactSchema>>;
