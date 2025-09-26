import './App.css';
import Header from './components/Header'
import {useState} from "react"
import styles from "./components/header.module.css"
import {Toggle} from "./components/Toggle.jsx";
import {HashRouter} from "react-router-dom";
import AppRoutes from "./routes/AppRoutes.jsx";
import { ProfileProvider } from './context/ProfileContext.jsx';


function App() {
  const [isDark, setIsDark] = useState(false);




  return (
    <>
    <HashRouter>
    <ProfileProvider>
    <div className='App' theme={isDark ? "dark" : "light"}>
      <header className={styles["app-header"]}>
        <Header/>
        <Toggle
        isChecked={isDark}
        handleChange={() => setIsDark(!isDark)}
        />
      </header>
      <main>
        <AppRoutes />
        

      </main>

    </div>
    </ProfileProvider>
    </HashRouter>
      
    </>
  )
}

export default App;

