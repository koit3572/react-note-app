import React, {FC} from 'react'
import { Container } from './TextEditor.styles'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
interface TextEditorProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  color: string;
}
const formats = [
  'bold',
  'italic',
  'underline',
  'strike',
  'list',

  'color',
  'background',

  'image',
  'blockquote',
  'code-block',
];
const modules = {
  toolbar: [
    [{ list: 'ordered' }, { list: 'bullet' }],
    [],
    ['italic', 'underline', 'strike'],
    [],
    [{ color: [] }, { background: [] }],
    [],
    ['image','blockquote','code-block'],
  ],
}
const TextEditor:FC<TextEditorProps> = ({value,setValue,color}) => {
  return (
    <Container $noteColor={color}>
      <ReactQuill
        formats={formats}
        modules={modules}
        theme='snow'
        value={value}
        onChange={setValue}
      />
    </Container>
  );
}

export default TextEditor