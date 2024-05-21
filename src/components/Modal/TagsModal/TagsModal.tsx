import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import {useState} from 'react'
import { DeleteBox, FixedContainer } from "../Modal.styles";
import { Box, StyledInput, TagsBox } from "./TagesModal.styles";
import {FC} from 'react'
import { toggleTagsModal } from "../../../store/modal/modalSlice";
import { FaMinus, FaPlus, FaTimes } from 'react-icons/fa'
import getStandardName from "../../../utils/getStandardName";
import { v4 } from "uuid";
import { addTags, deleteTags } from "../../../store/tags/tagsSlice";
import { removeTags } from "../../../store/notesList/notesListSlice";
import { Tag } from "../../../types/tag";
interface TagsModalProps {
  type: string;
  addedTags?: Tag[];
  handleTags?: (tag: string, type: string) => void; 
}
const TagsModal:FC<TagsModalProps> = ({type,addedTags,handleTags}) => {
  const dispatch = useAppDispatch();
  const { tagsList } = useAppSelector(state => state.tagsSlice);
  const [inputValue, setInputValue] = useState('')
  const deleteTagsHandler = (tag: string, id: string) => {
    dispatch(deleteTags(id));
    dispatch(removeTags({ tag }));
  }
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue) {
      return;
    }
    dispatch(addTags({ tag: inputValue.toLocaleLowerCase(), id: v4() }))
    setInputValue('')
  }
  return (
    <FixedContainer>
      <Box>
        <div className="editTags__header">
          <div className="editTage__title">
            {type === "add" ? "Add" : "Edit"} Tags
          </div>
          <DeleteBox
            className="editTags__close"
            onClick={() => dispatch(toggleTagsModal({ type, view: false }))}
          >
            <FaTimes />
          </DeleteBox>
        </div>
        <form onSubmit={submitHandler}>
          <StyledInput
            type="text"
            value={inputValue}
            placeholder="new tag..."
            onChange={(e) => setInputValue(e.target.value)}
          />
        </form>
        <TagsBox>
          {tagsList.map(({ tag, id }) => (
            <li key={id}>
              <div className="editTags__tag">{getStandardName(tag)}</div>
              {type === 'edit' ? (
                <DeleteBox onClick={() => deleteTagsHandler(tag, id)}>
                  <FaTimes />
                </DeleteBox>
              ) : (
                <DeleteBox>
                  {addedTags?.find(
                    (addedTags: Tag) => addedTags.tag === tag.toLowerCase()
                    ) ? (
                      <FaMinus onClick={()=>handleTags!(tag,'remove')}/>
                    ) : (
                      <FaPlus onClick={() => handleTags!(tag, 'add')} />
                  )}    
                </DeleteBox>
              )}
            </li>
          ))}
        </TagsBox>
      </Box>
    </FixedContainer>
  );
}

export default TagsModal