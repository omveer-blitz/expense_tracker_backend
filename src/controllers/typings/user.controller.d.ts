import { z } from 'zod';

import * as userValidator from '@/controllers/validators/user.controller.validation';

export type CreateUserRequestBody = z.infer<typeof userValidator.createUser>;
