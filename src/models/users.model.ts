import { model, Schema } from 'mongoose';
import { IUserOptions } from '../typings/user';

const userSchema = new Schema<IUserOptions>(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    contact_number: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const UserModel = model('User', userSchema);

export default UserModel;
