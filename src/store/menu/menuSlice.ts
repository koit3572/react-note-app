import { PayloadAction, createSlice } from "@reduxjs/toolkit";
type MenuState = {
  isOpen: boolean;
}
const initialState:MenuState = {
  isOpen: false,
}
export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    toggleMenu: (state, action:PayloadAction<boolean>) => {
      state.isOpen = action.payload
    }
  },
});
export default menuSlice.reducer;
export const {
  toggleMenu } =
  menuSlice.actions;