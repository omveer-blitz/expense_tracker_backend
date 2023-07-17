import UserModel from '@/models/users.model';

// typings
import { IUser, IUserOptions } from '@/typings/user';

class UserDao {
  private userModel = UserModel;

  public getUserByEmailOrContactNumber = async (email: string, contactNumber: number): Promise<IUserOptions> => {
    return await this.userModel.findOne({ email: email });
  };

  public async createUser(userData: IUser) {
    return await this.userModel.create(userData);
  }
}

export default UserDao;
