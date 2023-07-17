// Modules
import bcrypt, { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';

// Dao
import UserDao from '@/dao/user.dao';

// Constants
import { SECRET_KEY } from '@/constants/common';

// Error handlers and Exceptions
import { HttpException } from '@exceptions/httpException';
import { IUser } from '@/typings/user';

// Typings

export default class UserService {
  public userDao = new UserDao();

  public async createUser({
    firstName,
    lastName,
    contactNumber,
    email,
    password,
  }: {
    firstName: string;
    lastName: string;
    contactNumber: number;
    email: string;
    password: string;
  }) {
    // 1. check user is prsent by email and contact number
    const exsitingUser = await this.userDao.getUserByEmailOrContactNumber(email, contactNumber);
    if (exsitingUser) throw new Error(`User already exisits`);
    // 2. password hash convert
    const hashedPassword = await bcrypt.hash(password, 10);
    // 3. create user
    return await this.userDao.createUser({
      first_name: firstName,
      last_name: lastName,
      contact_number: contactNumber,
      email,
      password: hashedPassword,
    });
  }

  public async loginUser(contact_number: number, email: string, password: string) {
    console.log(email, password);

    const findUser = await this.userDao.getUserByEmailOrContactNumber(email, contact_number);

    if (!findUser) throw new Error(`This email ${email} was not found`);

    const isPasswordMatching: boolean = await compare(password, findUser.password);
    if (!isPasswordMatching) throw new Error('Password is not matching');

    const token = jwt.sign({ _id: findUser._id?.toString() }, SECRET_KEY, {
      expiresIn: '2h',
    });

    return {
      token,
      findUser,
    };
  }

  // public async updateUser(userId: string, userData: User): Promise<User> {
  //   if (userData.email) {
  //     const findUser: User = await UserModel.findOne({ email: userData.email });
  //     if (findUser && findUser._id != userId) throw new HttpException(409, `This email ${userData.email} already exists`);
  //   }

  //   if (userData.password) {
  //     const hashedPassword = await hash(userData.password, 10);
  //     userData = { ...userData, password: hashedPassword };
  //   }

  //   const updateUserById: User = await UserModel.findByIdAndUpdate(userId, { userData });
  //   if (!updateUserById) throw new HttpException(409, "User doesn't exist");

  //   return updateUserById;
  // }

  // public async deleteUser(userId: string): Promise<User> {
  //   const deleteUserById: User = await UserModel.findByIdAndDelete(userId);
  //   if (!deleteUserById) throw new HttpException(409, "User doesn't exist");

  //   return deleteUserById;
  // }
}
