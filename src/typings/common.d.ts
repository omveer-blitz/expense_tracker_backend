import { Router } from 'express';

export interface Routes {
  path: string;
  router: Router;
}

export type CreateOptions<T> = {
  [Property in keyof T]+?: T[Property];
};
