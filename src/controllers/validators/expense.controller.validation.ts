import { z } from 'zod';

export const createExpense = z.object({
  date: z.date({
    invalid_type_error: 'date must be date',
    required_error: 'amount required',
  }),
  amount: z.string({
    invalid_type_error: 'amount must be number',
    required_error: 'amount required',
  }),
  category: z.string({
    invalid_type_error: 'category must be string',
    required_error: 'category required',
  }),
  description: z.string({
    invalid_type_error: 'description must be string',
    required_error: 'description required',
  }),
  action: z.string({
    invalid_type_error: 'action must be string',
    required_error: 'action required',
  }),
  userId: z.string({
    invalid_type_error: 'userId must be string',
  }),
  isActivated: z.boolean({
    invalid_type_error: 'isActivated must be boolean',
  }),
});
