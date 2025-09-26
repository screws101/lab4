import './App.css';
import Card1 from './components/Card1'
import Card2 from './components/Card2'
import About from './components/About'
import Header from './components/Header'
import Card from "./components/Card.jsx"
import Wrapper from './components/Wrapper';

import Filters from './components/Filters'
import {useState, useEffect} from "react"
import styles from "./components/header.module.css"
import cardStyles from "./components/card.module.css";
import {Toggle} from "./components/Toggle.jsx";
import AddProfile from './components/AddProfile';
import addStyles from './components/addProfile.module.css';
import {HashRouter, Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx"
import AboutPage from './pages/AboutPage.jsx';
import AddProfilePage from "./pages/AddProfilePage.jsx";


const LIMIT = 10;

function App() {
  const [isDark, setIsDark] = useState(false);

  const [profiles, setProfiles] = useState([]);
  // const titles = [...new Set(profiles.map(profile => profile.title))]
  const[titles, setTitles] = useState([])

  // const handleChange = (event) => {
  //   setTitle(event.target.value)
  //   console.log(title)
  // }

  // const [search, setSearch] = useState("")
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);


  const [error, setError] = useState("");



 useEffect(() => {
  const controller = new AbortController();

  const fetchProfiles = async () => {

    setError("");

    try {
      const url = `https://web.ics.purdue.edu/~zong6/profile-app/fetch-data-with-filter.php?title=${title}&name=${search}&page=${page}&limit=${LIMIT}`;
      console.log("Fetching profiles from:", url);

      const response = await fetch(url, { signal: controller.signal });
      const text = await response.text();
      console.log("Raw profiles API response:", text);

      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        console.error("Failed to parse profiles JSON:", err);
        setProfiles([]);
        return;
      }


      if (data && Array.isArray(data.profiles)) {
        setProfiles(data.profiles);
        console.log("Profiles set successfully:", data.profiles);
      } else {
        console.warn("Profiles key missing or not an array. Setting empty profiles list.");
        setProfiles([]);
      }

    } catch (err) {
      if (err.name !== "AbortError") {
        console.error("Error fetching profiles:", err);
        setError("Failed to fetch profiles");
      }
    } finally {

    }
  };

  fetchProfiles();

  return () => controller.abort();
}, [title, search, page]);



  
  const handleChange = (event) => {
    setTitle(event.target.value);
    setPage(1);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setPage(1);
  }


  // const filteredProfiles = profiles.filter(profile =>
  //   (!title || profile.title  == title) && (profile.name.toLowerCase().includes(search.toLowerCase()))
  // )

  const handleClick = () => {
    setTitle("")
    setSearch("")
    setPage(1);
  }

  const handleAddProfile = (newProfile) => {
    setProfiles((prevProfiles) => [...prevProfiles, newProfile]);
  };


  return (
    <>
    <HashRouter>
    <div className='App' theme={isDark ? "dark" : "light"}>
      <header className={styles["app-header"]}>
        <Header/>
      </header>
      <main>
        <Toggle
        isChecked={isDark}
        handleChange={() => setIsDark(!isDark)}
        />
        <Routes>
          <Route path="/" element={
            <HomePage 
              titles={titles}
              handleChange={handleChange}
              handleSearch={handleSearch}
              handleClick={handleClick}
              search={search}
              title={title}
              error={error}
              profiles={profiles}
              page={page}
              setPage={setPage}
            />
          }/>
          <Route path="/about" element={<AboutPage/>}/>
          <Route path="/addprofile" element={<AddProfilePage/>}/>
        </Routes>
        

      </main>

    </div>
    </HashRouter>
      
    </>
  )
}

export default App;

