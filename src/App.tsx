import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; 
import Character from './components/pages/Character';
import Characters from './components/pages/Characters';
import './App.css';
import { useTheme } from './services/ThemeContext';

function App() {
  const vitevar = import.meta.env.VITE_VAR;
  const { theme } = useTheme();

  return (
     <div className={theme === "dark" ? "dark-mode" : ""}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Characters />} />
            <Route path="/character/:id" element={<Character />} />
          </Routes>
        {vitevar}
      </div>
  );
}

export default App;
