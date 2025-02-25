import {FC} from 'react'
import { useAppDispatch } from '../../../hooks/redux';
import { DeleteBox, FixedContainer } from '../Modal.styles';
import { Box, Container, TopBox } from './FilltersModal.styles';
import { toggleFiltersModal } from '../../../store/modal/modalSlice';
import { FaTimes } from 'react-icons/fa';
interface FilltersModalProps {
  handleFilter: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClear: () => void;
  filter: string;
}
const FilltersModal: FC<FilltersModalProps> = ({ handleFilter, handleClear, filter }) => {
  const dispatch = useAppDispatch();

  return (
    <FixedContainer>
      <Container>
        <DeleteBox
          onClick={() => dispatch(toggleFiltersModal(false))}
          className="filters__close"
        >
          <FaTimes />
        </DeleteBox>
        <TopBox>
          <div className="filters__title">정렬</div>
          <small onClick={handleClear} className="filters__delete">
            CLEAR
          </small>
        </TopBox>
        <Box>
          <div className="filters__subtitle">PRIORITY</div>
          <div className="filters__check">
            <label htmlFor="low">Low to High</label>
            <input
              type="radio"
              name="filter"
              value="low"
              id="low"
              checked={filter === "low"}
              onChange={(e) => handleFilter(e)}
            />
          </div>
          <div className="filters__check">
            <label htmlFor="high">High to Low</label>
            <input
              type="radio"
              name="filter"
              value="high"
              id="high"
              checked={filter === "high"}
              onChange={(e) => handleFilter(e)}
            />
          </div>
        </Box>
        <Box>
          <div className="filters__subtitle">DATE</div>
          <div className="filters__check">
            <label htmlFor="latest">Sort by Latest</label>
            <input
              type="radio"
              name="filter"
              value="latest"
              id="latest"
              checked={filter === "latest"}
              onChange={(e) => handleFilter(e)}
            />
          </div>
          <div className="filters__check">
            <label htmlFor="creat">Sort by Created</label>
            <input
              type="radio"
              name="filter"
              value="created"
              id="creat"
              checked={filter === "created"}
              onChange={(e) => handleFilter(e)}
            />
          </div>
          <div className="filters__check">
            <label htmlFor="edit">Sort by Edited</label>
            <input
              type="radio"
              name="filter"
              value="edited"
              id="edit"
              checked={filter === "edited"}
              onChange={(e) => handleFilter(e)}
            />
          </div>
        </Box>
      </Container>
    </FixedContainer>
  );
};

export default FilltersModal