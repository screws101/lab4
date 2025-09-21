import './App.css';
import Card1 from './components/Card1'
import Card2 from './components/Card2'
import About from './components/About'
import Header from './components/Header'
import Card from './components/Card'
import Wrapper from './components/Wrapper'
// import imgMan from './assets/headshot-man.jpg'
// import imgWoman from './assets/headshot-woman.jpg'
import Filters from './components/Filters'
import {useState, useEffect} from "react"
import styles from "./components/header.module.css"
import cardStyles from "./components/card.module.css";
import {Toggle} from "./components/Toggle.jsx";
import AddProfile from './components/AddProfile';
import addStyles from './components/addProfile.module.css';


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
    <div className='App' theme={isDark ? "dark" : "light"}>
      <header className={styles["app-header"]}>
        <Header/>
      </header>
      <main>
        <div id="header-title">
          <h1>Profile App</h1>
        </div>
        <Toggle
        isChecked={isDark}
        handleChange={() => setIsDark(!isDark)}
        />
        <Wrapper id="about">
          <About/>
        </Wrapper>
        <Wrapper id="add-profile">
          <AddProfile onAddProfile={handleAddProfile}/>
        </Wrapper>
        <Wrapper id="filters">
            <Filters
            className = "filters-line"
            titles={titles}
            onChange={handleChange}
            searchName={handleSearch}
            clear={handleClick}
            search = {search}
            title = {title}
          />
        </Wrapper>

        <Wrapper id="profiles">
          {error && <p style={{ color: "red" }}>{error}</p>}

          <div className={cardStyles["flex-container"]}>
            {profiles.length === 0 && <p>No profiles found.</p>}
            {
              profiles.map((profile)=>(
                <Card
                  key={profile.id}
                  name={profile.name}
                  title={profile.title}
                  email={profile.email}
                  img={profile.image_url}  
                />
              ))
            }
          </div>
          <div className={cardStyles["pagination"]}>
            <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
            <span>Page {page}</span>
            <button onClick={() => setPage(page + 1)}>Next</button>
          </div>
        </Wrapper>

      </main>

    </div>
      
    </>
  )
}

export default App;

