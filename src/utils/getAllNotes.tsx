import { v4 } from 'uuid';
import { NoteCard } from '../components';
import { NotesContainer } from '../styles/styles';
import { Note } from '../types/note'
const filteredNotes = (notes: Note[], filter: string) => {
  const lowPriority = notes.filter(({ priority }) => priority === "low");
  const highPriority = notes.filter(({ priority }) => priority === "high");
  let filterNotes: Note[] = [];
  if (filter === "low") {
    filterNotes = [...lowPriority, ...highPriority];
  } else if (filter === "high") {
    filterNotes = [...highPriority, ...lowPriority];
  } else if (filter === "latest") {
    filterNotes = [...notes].sort((a, b) => b.createdTime - a.createdTime);
  } else if (filter === "created") {
    filterNotes = [...notes].sort((a, b) => a.createdTime - b.createdTime);
  } else if (filter === "edited") {
    const editedNotes = notes.filter(({ editedTime }) => editedTime);
    const normalNotes = notes.filter(({ editedTime }) => !editedTime);
    const sortEdited = editedNotes.sort(
      (a, b) => (b.editedTime as number) - (a.editedTime as number)
    );
    filterNotes = [...sortEdited, ...normalNotes];
  } else {
    filterNotes = [...notes];
  }

  const pinned = filterNotes.filter(({ isPinned }) => isPinned);
  const normal = filterNotes.filter(({ isPinned }) => !isPinned);
  
  return [[...pinned], [...normal]];
};

const getAllNotes = (mainNotes: Note[], filter: string) => {
  const formatNotes = filteredNotes(mainNotes, filter)
  
  const getNoteCardGather = (cardData: Note[]) => {
    const title = cardData[0].isPinned ? 'Pinned Notes' : 'All Notes'
    return (
      <div key={v4()}>
        <div className="allNotes__notes-type">
          {title} <span>({cardData.length})</span>
        </div>
        <NotesContainer>
          {cardData.map((note) => (
            <NoteCard key={note.id} note={note} type="notes" />
          ))}
        </NotesContainer>
      </div>
    );
  }
  return (
    <>
      {formatNotes.map((note) => {
        if (note.length !== 0) {
          return getNoteCardGather(note);
        }
      })}
    </>
  );
}
export default getAllNotes