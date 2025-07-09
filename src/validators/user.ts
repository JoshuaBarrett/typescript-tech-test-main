import { z } from 'zod';

export const userSignupSchema = z.object({
  fullName: z
    .string({required_error: 'Full name is missing'})
    .nonempty("Full name is required"),
  password: z
    .string({required_error: 'Password is missing'})
    .nonempty('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(64, 'Password must be at most 64 characters')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter'),
  emailAddress: z
    .string({required_error: 'Email address is missing'})
    .nonempty('Email address is required')
    .email('Email address is invalid'),
  createdDate: z
    .string({required_error: 'Created date is missing'})
    .refine(
      (val) => {
        const date = new Date(val);
        return !isNaN(date.getTime());
      },
      {message: 'Created date is invalid'}
    )
    .refine(
      (val) => {
        const date = new Date(val);
        return date <= new Date();
      },
      {message: 'Created date cannot be in the future'}
    ),
  userType: z
    .string({required_error: 'User type is missing'})
    .nonempty('User type is missing')
    .refine(val => ['student', 'teacher', 'parent', 'privatetutor'].includes(val), { message: 'User type must be one of: student, teacher, parent, privatetutor'})
});
