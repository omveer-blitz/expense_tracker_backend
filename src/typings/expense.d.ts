import { CreateOptions } from './common';

export interface IExpenseTracker {
  date: Date;
  amount: number;
  category: string;
  action: string;
  description: string;
  userId: string;
  isActivated: boolean;
}

export type IExpenseOptions = CreateOptions<IExpenseTracker>;
