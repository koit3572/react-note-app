import { FC } from 'react'
import { Note } from '../../types/note';
import { Card, ContentBox, FooterBox, TagsBox, TopBox } from './NotesCard.styles';
import { NotesIconBox } from '../../styles/styles';
import {BsFillPinFill} from 'react-icons/bs'
import getRelevanBtns from '../../utils/getRelevantBtns';
import { useAppDispatch } from '../../hooks/redux';
import { readNote, setPinnedNotes } from '../../store/notesList/notesListSlice';
import parse from "html-react-parser";
import { ReadNoteModal } from '..';
interface NoteCartProps {
  note: Note;
  type: string;
}
const NoteCard: FC<NoteCartProps> = ({ note, type }) => {
  const { title, content, tags, color, priority, date, isPinned, isRead, id } = note;
  const dispatch = useAppDispatch();
  const func = () => {
    const imgContent = content.includes('img');
    if (imgContent) {
      return content;
    } else {
      return content.length > 75 ? content.slice(0,75) + '...' : content
    }
  }
  return (
    <>
      {isRead && (<ReadNoteModal note={note} type={type} />)}
      <Card style={{ background: color }}>
        <TopBox>
          <div className="noteCard__title">
            {title.length > 10 ? title.slice(0, 10) + "..." : title}
          </div>
          <div className="noteCard__top-options">
            <span className="noteCard__priority">{priority}</span>
            {type !== "archive" && type !== "trash" && (
              <NotesIconBox
                className="noteCard__pin"
                onClick={() => dispatch(setPinnedNotes({ id }))}
              >
                <BsFillPinFill style={{ color: isPinned ? "red" : "" }} />
              </NotesIconBox>
            )}
          </div>
        </TopBox>
        <ContentBox onClick={() => dispatch(readNote({ type, id }))}>
          {parse(func())}
        </ContentBox>
        <TagsBox>
          {tags.map(({ tag, id }) => (
            <span key={id}>{tag}</span>
          ))}
        </TagsBox>

        <FooterBox>
          <div className="noteCard__date">{date}</div>
          <div>{getRelevanBtns(type, note, dispatch)}</div>
        </FooterBox>
      </Card>
    </>
  );
}

export default NoteCard