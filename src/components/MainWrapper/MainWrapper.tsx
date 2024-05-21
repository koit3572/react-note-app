import { FC } from 'react'
import {Note} from '../../types/note'
import { NotesContainer } from '../../styles/styles';
import { NoteCard } from '..';
interface MainwrapperProps {
  notes: Note[];
  type: string;
}
const MainWrapper:FC<MainwrapperProps> = ({ notes,type}) => {
  return (
    <NotesContainer>
      {notes.map(note => (
        <NoteCard key={note.id} note={note} type={type} />
      ))}
    </NotesContainer>
  )
}

export default MainWrapper