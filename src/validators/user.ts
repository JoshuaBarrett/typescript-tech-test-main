import { z } from 'zod';

export const userSignupSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(64, 'Password must be at most 64 characters')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter'),
  emailAddress: z.string().email('Email address is invalid'),
  createdDate: z.coerce.date().refine(date => date <= new Date(), { message: 'Created date cannot be in the future' }),
  userType: z.enum(['student', 'teacher', 'parent', 'privatetutor'], { errorMap: () => ({ message: 'User Type must be one of: student, teacher, parent, privatetutor'})})
});