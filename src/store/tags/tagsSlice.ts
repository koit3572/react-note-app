import { createSlice } from "@reduxjs/toolkit";
import { v4 } from 'uuid'
import { Tag } from "../../types/tag";
import {toast} from 'react-toastify'
interface TagsState {
  tagsList: Tag[],
}
const initialState: TagsState = {
  tagsList: [
    { tag: "learnings", id: v4() },
    { tag: "work", id: v4() },
    { tag: "quotes", id: v4() },
  ],
};
export const tagsSlice = createSlice({
  name: "tage",
  initialState,
  reducers: {
    addTags: (state, { payload }) => {
      if (state.tagsList.find(({ tag }) => tag === payload.tag)) {
        toast.warning("이미 존재하는 태그입니다.");
      } else {
        //내부에서 immer모듈을 통해 불변성을 보호
        state.tagsList.push(payload);
        toast.info("새로운 태그가 등록되었습니다.");
      }
    },
    deleteTags: (state, { payload }) => {
      const filterData = state.tagsList.filter(
        ({ id }) => id !== payload
      );
      state.tagsList = filterData;
      toast.info("태그가 삭제되었습니다.");
    },
  },
});
export default tagsSlice.reducer;
export const {
  addTags,
  deleteTags
} = tagsSlice.actions
