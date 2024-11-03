import { createAction } from '@reduxjs/toolkit';

export const deleteUser = createAction<number>('users/deleteUser');
