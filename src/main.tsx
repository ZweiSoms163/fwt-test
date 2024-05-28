import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Provider } from 'react-redux';
import store from './redux/store/index.ts';
import './styles/selectmenu.css';
import './index.css';
import { ThemeProvider } from './Context/ChangeTheme.tsx';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>,
);
