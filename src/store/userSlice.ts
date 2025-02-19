import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserData } from '../types';

interface UserState {
  userData: UserData[];
  unsavedChanges: boolean;
}

const initialState: UserState = {
  userData: [],
  unsavedChanges: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<UserData>) => {
      state.userData.push(action.payload);
      state.unsavedChanges = false;
      localStorage.setItem('userData', JSON.stringify(state.userData));
    },
    setUnsavedChanges: (state, action: PayloadAction<boolean>) => {
      state.unsavedChanges = action.payload;
    },
    loadUsers: (state) => {
      const savedData = localStorage.getItem('userData');
      if (savedData) {
        state.userData = JSON.parse(savedData);
      }
    },
  },
});

export const { addUser, setUnsavedChanges, loadUsers } = userSlice.actions;
export default userSlice.reducer;