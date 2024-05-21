import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Note } from "../../types/note";
import notes from "../../notesData";
type NoteslistState = {
  mainNotes: Note[];
  archiveNotes: Note[];
  trashNotes: Note[];
  editNote: null | Note;
};
enum noteType {
  mainNotes = 'mainNotes',
  archiveNotes = 'archiveNotes',
  trashNotes = 'trashNotes'
}
const initialState:NoteslistState = {
  mainNotes: [...notes],
  archiveNotes: [],
  trashNotes: [],
  editNote:null,
};
export const notesListSlice = createSlice({
  name: "notesList",
  initialState,
  reducers: {
    setMainNotes: (state, { payload }: PayloadAction<Note>) => {
      if (state.mainNotes.find(({ id }) => id === payload.id)) {
        state.mainNotes = state.mainNotes.map((note) =>
          note.id === payload.id ? payload : note
        );
      } else {
        state.mainNotes.push(payload);
      }
    },
    setTrashNotes: (state, { payload }: PayloadAction<Note>) => {
      state.mainNotes = state.mainNotes.filter(({ id }) => id !== payload.id);
      state.archiveNotes = state.archiveNotes.filter(
        ({ id }) => id !== payload.id
      );
      state.trashNotes.push({ ...payload, isPinned: false });
    },
    unArchiveNote: (state, { payload }: PayloadAction<Note>) => {
      state.archiveNotes = state.archiveNotes.filter(
        ({ id }) => id !== payload.id
      );
      state.mainNotes.push(payload);
    },
    setArchiveNotes: (state, { payload }: PayloadAction<Note>) => {
      state.mainNotes = state.mainNotes.filter(({ id }) => id !== payload.id);
      state.archiveNotes.push({ ...payload, isPinned: false });
    },
    restoreNote: (state, { payload }: PayloadAction<Note>) => {
      state.trashNotes = state.trashNotes.filter(({ id }) => id !== payload.id);
      state.mainNotes.push(payload);
    },
    deleteNote: (state, { payload }: PayloadAction<Note>) => {
      state.trashNotes = state.trashNotes.filter(({ id }) => id !== payload.id);
    },
    setPinnedNotes: (state, { payload }: PayloadAction<{id:string}>) => {
      state.mainNotes = state.mainNotes.map((note) =>
        note.id === payload.id ? { ...note, isPinned: !note.isPinned } : note
      );
    },
    setEditNote: (state, { payload }: PayloadAction<Note|null>) => {
      state.editNote = payload;
    },
    readNote: (state, { payload }: PayloadAction<{ type: string, id: string }>) => {
      const { type , id } = payload;
      const setRead = (notes: noteType) => {
        state[notes] = state[notes].map((note: Note) =>
          note.id === id ? {...note,isRead:!note.isRead}:note)
      }
      if (type === 'archive') {
        setRead(noteType.archiveNotes)
      } else if (type === 'trach') {
        setRead(noteType.trashNotes)
      } else {
        setRead(noteType.mainNotes)
      }
    },
    removeTags: (state, { payload }) => {
      state.mainNotes = state.mainNotes.map((note) => ({
        ...note,
        tags: note.tags.filter(({ tag }) => tag !== payload.tag),
      }));
    },
  },
});
export default notesListSlice.reducer;
export const {
  removeTags,
  setTrashNotes,
  setMainNotes,
  unArchiveNote,
  restoreNote,
  deleteNote,
  setPinnedNotes,
  readNote,
  setEditNote,
  setArchiveNotes,
} = notesListSlice.actions;