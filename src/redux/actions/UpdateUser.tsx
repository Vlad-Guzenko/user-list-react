import { createAction } from '@reduxjs/toolkit';
import { User } from '../../models/User';

export const updateUser = createAction<User>('users/updateUser');
