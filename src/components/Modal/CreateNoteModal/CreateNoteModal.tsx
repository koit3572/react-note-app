import {useState} from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { DeleteBox, FixedContainer } from '../Modal.styles';
import { AddedTagsBox, Box, OptionsBox, StyledInput, TopBox } from './CreateNoteModal.styles';
import { toggleCreateNoteModal, toggleTagsModal } from '../../../store/modal/modalSlice';
import { removeTags, setEditNote, setMainNotes } from '../../../store/notesList/notesListSlice';
import { ButtonFill, ButtonOutline } from '../../../styles/styles';
import {FaPlus,FaTimes} from 'react-icons/fa'
import { TagsModal, TextEditor } from '../..';
import { v4 } from 'uuid';
import {toast} from 'react-toastify'
import dayjs from 'dayjs';
import { Note } from '../../../types/note';

const CreateNoteModal = () => {
  const dispatch = useAppDispatch();
  const { editNote } = useAppSelector(state => state.notesListSlice)
  const {viewAddTagsModal} = useAppSelector(state=>state.modalSlice)
  const [noteTitle, setNoteTitle] = useState(editNote?.title || '');
  const [value, setValue] = useState(editNote?.content || '');
  const [addedTags, setAddedTags] = useState(editNote?.tags || []);
  const [noteColor, setNoteColor] = useState(editNote?.color || '');
  const [priority, setPriority] = useState(editNote?.priority || 'low');
  const closeCreateNoteMobal = () => {
    dispatch(toggleCreateNoteModal(false))
    dispatch(setEditNote(null));
  }
  const tagsHandler = (tag: string, type: string) => {
    const newTag = tag.toLowerCase();
    if (type === 'add') {
      setAddedTags(prev=>[...prev,{tag:newTag,id:v4()}])
    } else {
      setAddedTags(addedTags.filter(({tag})=>tag !== newTag))
    }
  }
  const createNoteHandler = () => {
    if (!noteTitle) {
      toast.error('You must add title');
      return;
    } else if (value === '<p><br></p>') {
      toast.error('You must write note');
      return;
    }
    const date = dayjs().format('DD/MM/YY h:mm A');
    let note: Partial<Note> = {
      title: noteTitle,
      content: value,
      tags: addedTags,
      color: noteColor,
      priority,
      editedTime: new Date().getTime(),
    };
    if (editNote) {
      note = { ...editNote,...note };
    } else {
      note = {
        ...note,
        date,
        createdTime: new Date().getTime(),
        editedTime: null,
        isPinned: false,
        isRead: false,
        id: v4(),
      };
    }
    dispatch(setMainNotes(note as Note));
    dispatch(toggleCreateNoteModal(false));
    dispatch(setEditNote(null));
  }
  return (
    <FixedContainer>
      {viewAddTagsModal && (
        <TagsModal type="add" addedTags={addedTags} handleTags={tagsHandler} />
      )}
      <Box>
        <TopBox>
          <div className="createNote_title">노트 생성하기</div>
          <DeleteBox
            className="createNote__close-btn"
            onClick={() => closeCreateNoteMobal()}
          >
            <FaTimes />
          </DeleteBox>
        </TopBox>
        <StyledInput
          type="text"
          value={noteTitle}
          name="title"
          placeholder="제목..."
          onChange={(e) => setNoteTitle(e.target.value)}
        />
        <div>
          <TextEditor value={value} setValue={setValue} color={noteColor} />
        </div>
        <div className="createNote__create-btn">
          <ButtonFill onClick={createNoteHandler}>
            {editNote ? (
              <span>저장하기</span>
            ) : (
              <>
                <FaPlus />
                <span>생성하기</span>
              </>
            )}
          </ButtonFill>
        </div>
        <AddedTagsBox>
          {addedTags.map(({ tag, id }) => (
            <div key={id}>
              <span className="createNote__tag">{tag}</span>
              <span
                className="createNote__tag-remove"
                onClick={() => tagsHandler(tag, "remove")}
              >
                <FaTimes />
              </span>
            </div>
          ))}
        </AddedTagsBox>
        <OptionsBox>
          <ButtonOutline
            onClick={() =>
              dispatch(toggleTagsModal({ type: "add", view: true }))
            }
          >
            Add Tag
          </ButtonOutline>
          <div>
            <label htmlFor="color">배경색 : </label>
            <select
              id="color"
              value={noteColor}
              onChange={(e) => setNoteColor(e.target.value)}
            >
              <option value="">White</option>
              <option value="#ffcccc">Red</option>
              <option value="#ccffcc">Green</option>
              <option value="#cce0ff">Blue</option>
              <option value="#ffffcc">Yellow</option>
            </select>
          </div>
          <div>
            <label htmlFor="priority">우선순위 : </label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="low">Low</option>
              <option value="high">High</option>
            </select>
          </div>
        </OptionsBox>
      </Box>
    </FixedContainer>
  );
}

export default CreateNoteModal