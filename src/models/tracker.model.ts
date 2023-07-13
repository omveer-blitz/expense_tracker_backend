import mongoose from 'mongoose';
import { IExpenseOptions } from '@/typings/expense';

const expenseTrackerSchema = new mongoose.Schema<IExpenseOptions>(
  {
    date: {
      type: Date,
    },
    amount: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    action: {
      type: String,
      enum: ['add', 'subtract'],
    },
    userId: {
      type: String,
      required: true,
    },
    isActivated: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

// expenseTrackerSchema.index({ category: 'text' });
export const ExpenseTracker = mongoose.model('ExpenseTracker', expenseTrackerSchema);
