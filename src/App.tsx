import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Sidebar } from './layout'
import {
  AllNotes,
  ArchiveNotes,
  ErrorPage,
  TagNotes,
  TrashNotes
} from './pages/'
import {Navbar} from './layout'
import { Navigate } from 'react-router-dom'
import { CreateNoteModal, TagsModal } from './components'
import { useAppSelector } from './hooks/redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
function App() {
  const { viewEditTagsModal,viewCreateNoteModal} = useAppSelector(state=>state.modalSlice)
  return (
    <div className="app">
      {viewCreateNoteModal && <CreateNoteModal/>}
      {viewEditTagsModal && <TagsModal type="edit" />}
      <ToastContainer
        position="bottom-right"
        theme="light"
        pauseOnHover
        autoClose={1500}
      />
      <BrowserRouter>
        <Sidebar />
        <div className="app__container">
          <Navbar />
          <Routes>
            <Route path="/" element={<AllNotes />} />
            <Route path="/archive" element={<ArchiveNotes />} />
            <Route path="/trash" element={<TrashNotes />} />
            <Route path="/tag/:name" element={<TagNotes />} />
            <Route path="/404" element={<ErrorPage />} />
            <Route path="/*" element={<Navigate to={"/404"} />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App
