import { Request, Response, NextFunction } from 'express';

//service
import TrackerService from '@/services/tracker.service';

//typing
import { CreateExpenseRequestBody } from './typings/expense.controller';

export default class TrackerController {
  public tracker = new TrackerService();

  //create expense
  public createExpense = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { date, amount, category, description, action }: CreateExpenseRequestBody = req.body;

      const { user_id } = req.body;

      if (!amount || !category || !description) {
        return res.status(400).json({ message: 'please enter all the fields' });
      }

      const expense = await this.tracker.createExpense({
        date: date,
        amount: Number(amount),
        category,
        description,
        action,
        userId: user_id,
        isActivated: true,
      });

      return res.status(200).json({ message: 'expense created successfully', expense });
    } catch (error) {
      next(error);
    }
  };

  //find all expenses related to a particular user
  public getPaginatedExpenses = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user_id } = req.body;
      const { page_size = 5, page_number = 1, label, start_date, end_date } = req.query;

      // console.log(_id);
      const expenses = await this.tracker.getPaginatedExpenses(
        user_id,
        Number(page_number),
        Number(page_size),
        String(label),
        String(start_date),
        String(end_date),
      );

      if (!expenses) {
        return res.status(404).json({ message: 'expense not found' });
      }
      return res.status(200).json(expenses);
    } catch (error) {
      next(error);
    }
  };

  //update expense
  public updateExpense = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        date,
        _id,
        amount,
        category,
        action,
        description,
      }: { date: Date; _id: string; amount: number; category: string; action: string; description: string } = req.body;
      const updatedExpense = await this.tracker.updateExpense({ date, _id, amount, category, description, action });
      if (!updatedExpense) {
        return res.status(404).json({ message: 'something wrong in updating expense' });
      }
      return res.status(200).json({ message: 'expense updated successfully', updatedExpense });
    } catch (error) {
      next(error);
    }
  };

  //delete expense
  public deleteExpense = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { _id }: { _id: string } = req.body;
      const deletedExpense = await this.tracker.deleteExpense(_id);
      if (!deletedExpense) {
        return res.status(404).json({ message: 'something wrong in deleting expense' });
      }
      return res.status(404).json({ message: 'expense deleted successfully', deletedExpense });
    } catch (error) {
      next(error);
    }
  };
}
