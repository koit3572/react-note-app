import { Container, EmptyMsgBox } from '../../styles/styles'
import { MainWrapper } from '../../components'
import {useAppSelector} from '../../hooks/redux'
const ArchiveNotes = () => {
  const {archiveNotes}  = useAppSelector(state=>state.notesListSlice)
  return (
    <Container>
      {archiveNotes.length === 0 ? (
        <EmptyMsgBox>노트가 없습니다.</EmptyMsgBox>
      ) : (
        <MainWrapper notes={archiveNotes} type="archive" />
      )}
    </Container>
  );
}

export default ArchiveNotes