import { NextFunction, Request, Response } from 'express';

// Services
import UserService from '@/services/users.service';

// typings
import { CreateUserRequestBody } from './typings/user.controller';

export default class UserController {
  private userService = new UserService();

  //create user
  public createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { first_name: firstName, last_name: lastName, contact_number: contactNumber, email, password }: CreateUserRequestBody = req.body;

      const user = await this.userService.createUser({ firstName, lastName, contactNumber, email, password });

      return res.status(201).json({ message: 'success', user });
    } catch (error) {
      next(error);
    }
  };

  //login user
  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { contact_number, email, password }: { contact_number: number; email: string; password: string } = req.body;

      const { token, findUser } = await this.userService.loginUser(contact_number, email, password);

      if (!findUser) {
        return res.status(201).json({ message: 'user is not found' });
      } else {
        //save token
        findUser.token = token;
        res.cookie('token', token, {
          expires: new Date(Date.now() + 172800000),
        });
        return res.status(201).json({ findUser });
      }
    } catch (error) {
      next(error);
    }
  };
}
