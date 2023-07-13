import { CreateOptions } from './common';

export interface IUser {
  _id?: string;
  first_name: string;
  last_name: string;
  contact_number: number;
  email: string;
  password: string;
  token?: string;
}

export type IUserOptions = CreateOptions<IUser>;
