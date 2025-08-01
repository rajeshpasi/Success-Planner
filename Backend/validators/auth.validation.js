import {z} from 'zod';

// Validation schema for user registration
export const registerSchema = z.object ({
  fullName: z.object({
    firstName: z.string({
      required_error: "First name is required",
    }).min(1, "First name is required"),
    lastName: z.string({
      required_error: "Last name is required",
    }), // Last name can be optional depending on your requirements
  }),
  email: z.string({
    required_error: "Email is required",
  }).email({ message: "Invalid email address" }),
  password: z.string({
    required_error: "Password is required",
  }).min(8, "Password must be at least 8 characters long").max(24, "Password must be at most 24 characters long"),
  confirmPassword: z.string({
    required_error: "Confirm password is required",
    }).min(8, "Password must be at least 8 characters long").max(24, "Password must be at most 24 characters long"),
  terms: z.boolean({
    required_error: "You must accept the terms and conditions",
  }),
});

// Validation schema for user login
export const loginSchema = z.object ({
  email: z.string({
    required_error: "Email is required",
  }).email({ message: "Invalid email address" }),
  password: z.string({
    required_error: "Password is required",
  }),
});
