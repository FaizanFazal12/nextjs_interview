import * as z from 'zod';



export const step1Schema = z
  .object({
    fullName: z.string().min(1, 'Full Name is required'),
    email: z.string().email('Invalid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      ),
    confirmPassword: z.string(),
    gender: z.enum(['Male', 'Female', 'Other'], {
      errorMap: () => ({ message: 'Gender is required' }),
    }),
    dateOfBirth: z.string().min(1, 'Date of Birth is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const step2Schema = z.object({
  phoneNumber: z
    .string()
    .regex(/^\+923[0-4][0-9]{8}$/, 'Phone Number must be a valid Pakistan number (e.g., +923001234567)'),
  alternatePhoneNumber: z
    .string()
    .optional(),
  addressLine1: z.string().min(1, 'Address Line 1 is required'),
  addressLine2: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  postalCode: z.string().min(1, 'Postal Code is required'),
  country: z.string().min(1, 'Country is required'),
});

export const step3Schema = z
  .object({
    jobTitle: z.string().min(1, 'Job Title is required'),
    employmentStatus: z.enum(['Employed', 'Unemployed', 'Student'], {
      errorMap: () => ({ message: 'Employment Status is required' }),
    }),
    companyName: z.string().optional(),
    yearsOfExperience: z.number().min(0, 'Years of Experience cannot be negative'),
    resume: z
      .any()
      .refine((file) => file instanceof File, 'Resume is required')
      .refine(
        (file) => file && file.size <= 5 * 1024 * 1024,
        'Resume must be less than 5MB'
      )
      .refine(
        (file) => file && ['application/pdf'].includes(file.type),
        'Resume must be a PDF'
      ),
  })
  .refine(
    (data) => (data.employmentStatus === 'Employed' ? !!data.companyName : true),
    {
      message: 'Company Name is required when Employed',
      path: ['companyName'],
    }
  );

export const step4Schema = z
  .object({
    monthlyIncome: z.number().min(0, 'Monthly Income cannot be negative'),
    loanStatus: z.enum(['Yes', 'No'], {
      errorMap: () => ({ message: 'Loan Status is required' }),
    }),
    loanAmount: z.number().min(0, 'Loan Amount cannot be negative').optional(),
    creditScore: z
      .number()
      .min(300, 'Credit Score must be at least 300')
      .max(850, 'Credit Score cannot exceed 850'),
  })
  .refine(
    (data) => (data.loanStatus === 'Yes' ? !!data.loanAmount : true),
    {
      message: 'Loan Amount is required when Loan Status is Yes',
      path: ['loanAmount'],
    }
  );

export const step5Schema = z.object({
  contactMode: z.enum(['Email', 'Phone', 'SMS'], {
    errorMap: () => ({ message: 'Preferred Mode of Contact is required' }),
  }),
  hobbies: z.array(z.string()).optional(),
  newsletter: z.boolean().optional(),
});

export const fullSchema = z.object({
  personal: step1Schema,
  contact: step2Schema,
  employment: step3Schema,
  financial: step4Schema,
  preferences: step5Schema,
});