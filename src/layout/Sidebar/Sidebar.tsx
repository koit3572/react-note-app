import { FC } from 'react'
import { FaTrash, FaArchive, FaLightbulb, FaTag } from 'react-icons/fa'
import { MdEdit } from 'react-icons/md'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { useLocation } from 'react-router-dom'
import { Container, ItemsBox, MainBox, StyledLogo } from './Sidebar.styles'
import { toggleMenu } from '../../store/menu/menuSlice'
import { NavLink } from 'react-router-dom'
import { toggleTagsModal } from '../../store/modal/modalSlice'
import { v4 } from 'uuid'

const items = [
  { icon: <FaArchive />, title: "Archive", id: v4() },
  { icon: <FaTrash />, title: "Trash", id: v4() },
];
const Sidebar: FC = () => {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector(state => state.menuSlice);
  const { tagsList } = useAppSelector(state => state.tagsSlice);
  const location = useLocation();
  const { pathname } = location;
  if (pathname === '/404') {
    return null;
  }
  return (
    <Container $openMenu={isOpen ? "open" : ""}>
      <MainBox $openMenu={isOpen ? "open" : ""}>
        <StyledLogo>
          <h1>Keep</h1>
        </StyledLogo>
        <ItemsBox>
          <li onClick={() => dispatch(toggleMenu(false))}>
            <NavLink
              to={"/"}
              state={"notes"}
              className={({ isActive }) =>
                isActive ? "active" : "inactive-item"
              }
            >
              <span>
                <FaLightbulb />
              </span>
              <span>Notes</span>
            </NavLink>
          </li>
          {tagsList?.map(({ tag, id }) => (
            <li key={id} onClick={() => dispatch(toggleMenu(false))}>
              <NavLink
                to={`/tag/${tag}`}
                state={`${tag}`}
                className={({ isActive }) =>
                  isActive ? "active-tiem" : "inactive-item"
                }
              >
                <span>
                  <FaTag />
                </span>
                <span>{tag}</span>
              </NavLink>
            </li>
          ))}
          <li
            className='sidebar__edit-item'
            onClick={()=>dispatch(toggleTagsModal({type:'edit',view:true}))}
          >
            <span>
              <MdEdit />
              <span>Edit Notes</span>
            </span>
          </li>
          {items.map(({ icon, title,id }) => (
            <li key={id} onClick={() => dispatch(toggleMenu(false))}>
              <NavLink
                to={`/${title.toLocaleLowerCase()}`}
                state={`${title}`}
                className={({isActive})=>isActive ? 'active-item' : 'inactive-item'}
              >
                <span>{icon}</span>
                <span>{title}</span>
              </NavLink>
            </li>
          ))}
        </ItemsBox>
      </MainBox>
    </Container>
  );
}

export default Sidebar