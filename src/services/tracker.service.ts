//Dao
import TrackerDao from '@/dao/tracker.dao';

export default class TrackerService {
  public trackerDao = new TrackerDao();

  //create expense -- logic
  public async createExpense({
    date,
    amount,
    category,
    description,
    action,
    userId,
    isActivated,
  }: {
    date: Date;
    amount: number;
    category: string;
    description: string;
    action: string;
    userId: string;
    isActivated: boolean;
  }) {
    const createdTracker = await this.trackerDao.createExpense({ amount, category, description, action, userId, date, isActivated });
    return createdTracker;
  }

  //get paginated data -- logic
  public async getPaginatedExpenses(id: string, pageNumber: number, pageSize: number, label: string, startDate: string, endDate: string) {
    const { data, count } = await this.trackerDao.getPaginatedExpenses(id, pageNumber, pageSize, label, startDate, endDate);
    return {
      data,
      meta: {
        page_no: pageNumber,
        page_size: pageSize,
        total_count: count,
      },
    };
  }

  //update data in db -- logic
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
    const updated = await this.trackerDao.updateExpense({ date, _id, amount, category, description, action });
    return updated;
  }

  //delete expense -- logic
  public async deleteExpense(_id: string) {
    return await this.trackerDao.deleteExpense(_id);
  }
}
