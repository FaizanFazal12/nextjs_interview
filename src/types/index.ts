export interface FormData {
    _id?: string; 
    personal: {
      fullName: string;
      email: string;
      password: string;
      confirmPassword: string;
      gender: 'Male' | 'Female' | 'Other';
      dateOfBirth: string; 
    };
    contact: {
      phoneNumber: string;
      alternatePhoneNumber?: string;
      addressLine1: string;
      addressLine2?: string;
      city: string;
      postalCode: string;
      country: string;
    };
    employment: {
      jobTitle: string;
      employmentStatus: 'Employed' | 'Unemployed' | 'Student';
      companyName?: string; 
      yearsOfExperience: number;
      resume: string | File | undefined | null; 
    };
    financial: {
      monthlyIncome: number;
      loanStatus: 'Yes' | 'No';
      loanAmount?: number;
      creditScore: number;
    };
    preferences: {
      contactMode: 'Email' | 'Phone' | 'SMS';
      hobbies: string[];
      newsletter: boolean;
    };
  }

  export interface GetAllFormData {
    forms: FormData[]
  }
  export interface getFormData {
    form: FormData
  }