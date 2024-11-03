import { createAction } from "@reduxjs/toolkit";
import { User } from "../models/User";

export const addUser = createAction<User>('users/addUser');
export const deleteUser = createAction<number>('users/deleteUser');
export const updateUser = createAction<User>('users/updateUser');