import {  createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../models/User';

interface UsersState {
  users: User[];
}

const initialState: UsersState = {
  users: [
    { id: 1, name: 'John', surname: 'Doe', birthdate: new Date('1966-01-01'), gender: 'Male' },
    { id: 2, name: 'Jane', surname: 'Dooooooooo', birthdate: new Date('1999-01-01') , gender: 'Female' },
  ],
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push({ ...action.payload, id: Date.now() });
    },
    deleteUser: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
  },
});

export const { addUser, deleteUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
