import { createAction } from '@reduxjs/toolkit';
import { User } from '../../models/User';

export const addUser = createAction<User>('users/addUser');
