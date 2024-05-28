import Content from './components/Content';
import Header from './components/Header';
import './App.css';
import { SideMenuProvider } from './Context/SideMenuOpen';

function App() {
  return (
    <div className="container">
      <Header />
      <SideMenuProvider>
        <Content />
      </SideMenuProvider>
    </div>
  );
}

export default App;
