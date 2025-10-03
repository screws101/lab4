import './App.css';
import Header from './components/Header'
import styles from "./components/header.module.css"
import {Toggle} from "./components/Toggle.jsx";
import {HashRouter} from "react-router-dom";
import AppRoutes from "./routes/AppRoutes.jsx";
import { ProfileProvider } from './context/ProfileContext.jsx';
import { ModeProvider, ModeContext } from './context/ModeContext.jsx';
import { useContext } from 'react';


function AppContent() {
  const { mode, toggleMode } = useContext(ModeContext);

  return (
    <div className='App' theme={mode}>
      <header className={styles["app-header"]}>
        <Header/>
        <Toggle
        isChecked={mode === 'dark'}
        handleChange={toggleMode}
        />
      </header>
      <main>
        <AppRoutes />
      </main>
    </div>
  );
}

function App() {
  return (
    <>
    <HashRouter>
    <ModeProvider>
    <ProfileProvider>
      <AppContent />
    </ProfileProvider>
    </ModeProvider>
    </HashRouter>
    </>
  )
}

export default App;

