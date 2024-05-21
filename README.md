# 패키지
## 종류
### 일반 의존성 모드
- `dayjs`
  - javaScript날짜 관련 라이브러리중 가장 가벼운 라이브러리
- `html-react-parser`
  - HTML 문자열을 React요소로 변환하는데 사용되는 라이브러리
  - API에서 받은 문자열을 안전하게 렌더링 또는 서버에서 렌더링한 HTML을 클라이언트로 전송 이를 React에서 사용할 수 있도록 도와준다.
- `@reduxjs/toolkit`
  - redux가 공식적으로 만든 라이브러리
  - 해당 툴킷을 사용하여 redux를 사용하는것을 권장한다.
- `react-quill`
  - 웹에디터 라이브러리 중 하나로 줄바꿈, 글꼴, 글자색, 사진 등을 쉽게 적용해 줄 수 있다.
- `uuid`
  - 고유한 문자열의 id를 생성해준다.
- `react-toastify`
  - 에러메세지나 알림 등을 보여줄 때 유용하게 쓰일 토스트 메세지에 대한 기록
- `styled-components`
  - JavaScript내부에서 css파일을 사용할 수 있게 해주는 대표적인 CSS-in-JS 라이브러리
  - 기존 돔을 만드는 방식인 css,scss를 외부 파일에 두어 id,class이름으로 가져와 사용하지 않고,
    동일한 컴포넌트에서 컴포넌트 이름을 쓰듯 스타일을 지정해준다.
- `react-icons`
  - React 프로젝트 작업을 할 때 아이콘을 손쉽게 사용할 수 있도록 도와주는 라이브러리
- `react-router-dom`
  - React 프로젝트에서 페이지를 이동할때 필요한 라이브러리
- `react-rerdux`
  - JavaScript상태관리 라이브러리
  - 본질은 Node.js의 모듈이다.
### 개발 의존성 모드
- @types/styled-components 
- @types/uuid
## npm을 통한 패키지 설치
```
$ npm install dayjs html-react-parser @reduxjs/toolkit react-quill uuid react-toastify styled-components react-icons react-router-dom react-redux
$ npm install -D @types/styled-components @types/uuid
```


# pages의 tsx파일 모아서 export 하기
## 장점
- 코드가 간결해지고 가독성이 높아진다.
  ```ts
  // tsx파일을 모아서 export 했을 때
  import {
    AllNotes,
    Archivenotes,
    TrashNotes,
    TagNotes,
    ErrorPage,
  } from "./pages";
  // tsx파일을 각각 export 했을 때
  import AllNotes from './pages/AllNotes/AllNotes'
  import ArchiveNotes from './pages/ArchiveNotes/ArchiveNotes'
  import ErrorPage from './pages/ErrorPage/ErrorPage'
  import TagNotes from './pages/TagNotes/TagNotes'
  import TrashNotes from './pages/TrashNotes/TrashNotes'
  ```
## 파일 구조및 코드
- pages폴더에 index.ts파일 생성
- pages/index.ts파일 코드 작성
  - default as name에서 name을 작성자 임의로 바꾸어도 상관없다.
    (export default로 내보낼 수 있는 데이터는 1개이기 때문)
  - export * as bar from 'foo'와 export {default as bar} from 'foo'의 차이
    - export * as bar from 'foo'         : export와 export default처리된 데이터를 내보낸다.
    - export {default as bar} from 'foo' : export default처리된 데이터만 내보낸다.
  ```ts
  // pages/index.ts
  export { default as AllNotes } from './AllNotes/AllNotes'
  export { default as ArchiveNotes } from "./ArchiveNotes/ArchiveNotes";
  export { default as ErrorPage } from "./ErrorPage/ErrorPage";
  export { default as TagNotes } from "./TagNotes/TagNotes";
  export { default as TrashNotes } from "./TrashNotes/TrashNotes";
  ```


# vite에서 에셋 가져오기
## URL을 통해 에셋 가져오기
```ts
import imgURL from '../../assets/errorImg.png'
<img src={imgURL} alt='pageNotFound'>
```
## public디렉터리를 이용
-


# TypeScript styled-component Props
- https://velog.io/@mintmin0320/styled-components-it-looks-like-an-unknown-prop-%EB%AC%B8%EC%A0%9C%EA%B0%80-%EB%90%98%EB%8A%94-props-is-being-sent-through-to-the-DOM-which-will-likely-trigger-a-React-console-error.-%EA%B2%BD%EA%B3%A0-%ED%95%B4%EA%B2%B0%EB%B2%95
- TypeScript에서 styled-component의 Props를 사용하기 위한 조치
  - $을 붙여주지 않으면 Error를 발생시킨다.
  ```ts
  //App.styles.ts
  import styled from 'styled-components';
  export const Container = styled.div<{$height:string}>`
    height:$height
  `
  //App.ts
  <Container $height='100px'/>
  ```


# react-toastify
- https://defineall.tistory.com/1021
- 에러메세지나 알림 등을 보여줄 때 유용하게 쓰일 토스트 메세지에 대한 기록
## 알람 종류 및 사용법
```ts
import {toast} from 'react-toastify'
toast.success('message');  // 성공 알람 ( 초록색 창 )
toast.error('message');    // 실패 알람 ( 빨간색 창 )
toast.warning('message');  // 경고 알람 ( 노란색 창 )
toast.info('message');     // 정보 알람 ( 파란색 창 )
```
## 알람 앱에 추가
```ts
//App.ts
import 'react-toastify/dist/ReactToastify.css'
const App = () => {
  return (
    <div className='App'>
      <ToastContainer
        position="bottom-right" // 알람 위치 지정
        theme="light"           // 
        pauseOnHover            // 마우스 올리면 알람 정지
        autoClose={1500}        // 자동 off시간
      />
      <BrowserRoutr>
        ...
      </BrowserRoutr>
    </div>
  )
}
export default App
```
## 스타일 커스텀
- 위의 링크에서 자세히 확인


# function 타입 단언
- 아래의 코드와 같이 props로 받는 function이 ?처리를 통해
  받아오거나 받아오지 않는 상태를 만든다면 1번 코드에서 
  '정의되지 않음'일 수 있는 개체를 호출할 수 없습니다. 에러가 발생한다.
  data === 'add'를 통해 addFunction을 받아온다는것을 사용자는 알지만 컴퓨터는 이를 알지 못하기 때문에 타입 단언을 통해 해결해주어야한다.
```ts
import {FC} from 'react'
interface AppProps {
  data:string;
  addFunction?: (num1:number,num2:number)=>number;
}
const App:FC<AppProps> = ({data,addFunction}) => {
  return (
    {data === 'add' (
      <div>{addFunction!(data,data)}</div>  //1번
    ) : (
      <div>{data}</div>
    )}
  )
}
export default App;
```


# react-quill
- 웹에디터 라이브러리 중 하나로 줄바꿈, 글꼴, 글자색, 사진 등을 쉽게 적용해 줄 수 있다.
## 코드 구조
```ts
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
```