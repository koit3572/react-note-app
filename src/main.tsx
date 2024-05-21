import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './store/index.ts'
import GlobalStyles from './styles/globalStyles.styles.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <GlobalStyles/>
    <App />,
  </Provider>
)
