import { createSlice,PayloadAction } from "@reduxjs/toolkit";
interface ModalState {
  viewEditTagsModal: boolean;
  viewAddTagsModal: boolean;
  viewCreateNoteModal: boolean;
  viewFiltersModal: boolean;
}
interface Payload {
  payload: {
    type: string;
    view: boolean;
  };
}
const initialState: ModalState = {
  viewEditTagsModal: false,
  viewAddTagsModal: false,
  viewCreateNoteModal: false,
  viewFiltersModal: false,
};
export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleTagsModal: (state, { payload }: Payload) => {
      const { type, view } = payload;
      if (type === "add") {
        state.viewAddTagsModal = view;
      } else {
        state.viewEditTagsModal = view;
      }
    },
    toggleCreateNoteModal: (state, action: PayloadAction<boolean>) => {
      state.viewCreateNoteModal = action.payload;
    },
    toggleFiltersModal: (state, action: PayloadAction<boolean>) => {
      state.viewFiltersModal = action.payload;
    },
  },
});
export default modalSlice.reducer;
export const {
  toggleTagsModal,
  toggleCreateNoteModal,
  toggleFiltersModal } = modalSlice.actions;
