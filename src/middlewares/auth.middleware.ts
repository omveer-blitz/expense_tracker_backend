import express from 'express';
import { get } from 'lodash';
import jwt from 'jsonwebtoken';
import { IUser } from '@/typings/user';
import { SECRET_KEY } from '@/constants/common';

export const isAuthenticated = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    //token extract from cookies
    const headerToken: string = get(req, 'cookies.token', null);

    if (!headerToken) {
      return res.status(401).json({ message: 'user is not authenticated' });
    }

    jwt.verify(headerToken, SECRET_KEY, (err, decoded: IUser) => {
      // console.log(decoded)
      req.body['user_id'] = decoded['_id'];
      next();
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'error occures in middleware' });
  }
};
