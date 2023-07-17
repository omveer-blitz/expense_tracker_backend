import { Router } from 'express';
import { Routes } from '../typings/common';

// Controllers
import TrackerController from '@/controllers/tracker.controller';
import UserController from '@/controllers/users.controller';

// Middlewares
import { isAuthenticated } from '@/middlewares/auth.middleware';
import ValidatorMiddleware from '@/middlewares/validation.middleware';

// Validation types
import { createUser, loginUser } from '@/controllers/validators/user.controller.validation';

export default class ExternalRoutes implements Routes {
  public path = '/api/v1/platform';
  public router = Router();
  public trackerController = new TrackerController();
  private userController = new UserController();

  // Validator
  private validator = new ValidatorMiddleware();

  constructor() {
    this.initializeTrackerRoutes(`${this.path}/tracker`);
    this.initialiseUserRoutes(`${this.path}/user`);
  }

  private initializeTrackerRoutes(prefix: string) {
    this.router.post(`${prefix}/create`, isAuthenticated, this.trackerController.createExpense);
    this.router.get(`${prefix}/get`, isAuthenticated, this.trackerController.getPaginatedExpenses);
    this.router.put(`${prefix}/update`, isAuthenticated, this.trackerController.updateExpense);
    this.router.put(`${prefix}/delete`, isAuthenticated, this.trackerController.deleteExpense);
  }

  private initialiseUserRoutes(prefix: string) {
    this.router.post(`${prefix}/create`, this.validator.validateRequestBody(createUser), this.userController.createUser);
    this.router.put(`${prefix}/login`, this.validator.validateRequestBody(loginUser), this.userController.login);
  }
}
