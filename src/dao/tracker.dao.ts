//model
import { ExpenseTracker } from '@/models/tracker.model';

//typing
import { IExpenseTracker } from '@/typings/expense';

export default class TrackerDao {
  //create expense
  public async createExpense(userData: IExpenseTracker) {
    return await ExpenseTracker.create(userData);
  }

  //get paginated data from db
  public async getPaginatedExpenses(id: string, pageNumber: number, pageSize: number, label: string, startDate: string, endDate: string) {
    console.log(startDate, endDate);
    if (pageNumber < 0) {
      pageNumber = 0;
    }
    if (pageNumber >= 1) {
      pageNumber = pageNumber - 1;
    }

    //check if lebel is provided
    const query = label === 'undefined' ? { userId: id, isActivated: true } : { $text: { $search: label }, userId: id, isActivated: true };
    const query1 = { userId: id, isActivated: true, date: { $gte: startDate, $lte: endDate } };

    //check if date is provided
    const query2 = startDate === 'undefined' || endDate === 'undefined' ? query : query1;

    const data = new Promise((resolve, reject) => {
      resolve(
        ExpenseTracker.find(query2)
          .limit(pageSize)
          .skip(pageNumber * pageSize),
      );
    });

    const count = new Promise((resolve, reject) => {
      resolve(ExpenseTracker.count(query2));
    });

    const res = await Promise.all([data, count]);

    return { data: res[0], count: res[1] };
  }

  //update expense
  public async updateExpense({
    date,
    _id,
    amount,
    category,
    description,
    action,
  }: {
    date: Date;
    _id: string;
    amount: number;
    category: string;
    description: string;
    action: string;
  }) {
    return await ExpenseTracker.updateOne({ _id }, { $set: { date, amount, category, description, action } });
  }

  //delete expense -- here no need to delete document from database for future purpose just update isActivated field
  public async deleteExpense(_id: string) {
    return await ExpenseTracker.findOneAndUpdate({ _id }, { isActivated: false });
  }
}
