import { z } from 'zod';

export const createUser = z.object({
  first_name: z.string({
    invalid_type_error: 'firstName must be string',
    required_error: 'firstName required',
  }),
  last_name: z.string({
    invalid_type_error: 'lastName must be string',
    required_error: 'lastName required',
  }),
  contact_number: z.number({
    invalid_type_error: 'contactNumber must be number',
    required_error: 'contactNumber required',
  }),
  email: z.string({
    invalid_type_error: 'email must be string',
    required_error: 'email required',
  }),
  password: z.string({
    invalid_type_error: 'password must be string',
    required_error: 'password required',
  }),
});

export const loginUser = z.object({
  email: z.string({
    invalid_type_error: 'email must be string',
    required_error: 'email required',
  }),
  password: z.string({
    invalid_type_error: 'password must be string',
    required_error: 'password required',
  }),
});
