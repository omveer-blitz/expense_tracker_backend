import { z } from 'zod';

import * as expenseValidator from '@/controllers/validators/expense.controller.validation';

export type CreateExpenseRequestBody = z.infer<typeof expenseValidator.createExpense>;
