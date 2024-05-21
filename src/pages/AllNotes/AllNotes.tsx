import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { ButtonOutline, Container, EmptyMsgBox } from '../../styles/styles';
import { Box, InputBox, TopBox } from './AllNotes.styles';
import { toggleFiltersModal } from '../../store/modal/modalSlice';
import getAllNotes from '../../utils/getAllNotes';
import { FilltersModal } from '../../components';

const AllNotes = () => {
  const dispatch = useAppDispatch();
  const { mainNotes } = useAppSelector(state => state.notesListSlice);
  const { viewFiltersModal } = useAppSelector((state) => state.modalSlice);
  const [filter, setFilter] = useState<string>('');
  const [searchInput, setSearchInput] = useState<string>('');
  const filterHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.currentTarget.value)
  }
  const clearHandler = () => {
    setFilter('')
  }
  return (
    <Container>
      {viewFiltersModal && (
        <FilltersModal
          handleFilter={filterHandler}
          handleClear={clearHandler}
          filter={filter}
        />
      )}
      {mainNotes.length === 0 ? (
        <EmptyMsgBox>노트가 없습니다.</EmptyMsgBox>
      ) : (
        <TopBox>
          <InputBox>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="노트의 제목을 입력해주세요."
            />
          </InputBox>
          <div className="notes__filter-btn">
            <ButtonOutline
              onClick={() => dispatch(toggleFiltersModal(true))}
              className="nav__btn"
            >
              <span>정렬</span>
            </ButtonOutline>
          </div>
        </TopBox>
      )}
      <Box>{getAllNotes(mainNotes, filter)}</Box>
    </Container>
  );
}

export default AllNotes