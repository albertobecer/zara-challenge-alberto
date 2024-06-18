import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; 
import Character from './components/Character';
import Characters from './components/Characters';
import './App.css';
import { useTheme } from './services/ThemeContext';

function App() {
  const { theme } = useTheme();

  return (
     <div className={theme === "dark" ? "dark-mode" : ""}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Characters />} />
            <Route path="/character/:id" element={<Character />} />
          </Routes>
      </div>
  );
}

export default App;
