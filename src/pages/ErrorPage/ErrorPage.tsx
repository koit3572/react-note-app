import { Container } from './ErrorPage.styles'
import { ButtonFill } from '../../styles/styles'
import imgURL from '../../assets/errorImg.png'
import { useNavigate } from 'react-router-dom'
const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <div className="error__img">
        <img src={imgURL} alt="notFoundPage" />
      </div>
      <div className='error__text'>
        <h1>404</h1>
        <div>에러가 발견되었습니다.</div>
        <ButtonFill onClick={()=>navigate('/')}>
          <span>메인 페이지로 돌아가기</span>
        </ButtonFill>
      </div>
    </Container>
  );
}

export default ErrorPage