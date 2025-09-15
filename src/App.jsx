import './App.css';
import Card1 from './components/Card1'
import Card2 from './components/Card2'
import About from './components/About'
import Header from './components/Header'
import Card from './components/Card'
import Wrapper from './components/Wrapper'
import imgMan from './assets/headshot-man.jpg'
import imgWoman from './assets/headshot-woman.jpg'
import Filters from './components/Filters'
import {useState} from "react"
import styles from "./components/header.module.css"
import cardStyles from "./components/card.module.css";
import {Toggle} from "./components/Toggle.jsx";



function App() {
  const [isDark, setIsDark] = useState(false);

  const profiles = [
    {
      name: "John Doe",
      title: "Software Engineer",
      email:"john.@email.org",
      img: imgMan
    },
    {
      name: "Jane Doe",
      title: "UX Designer",
      email:"jane.@email.org",
      img: imgWoman
    }
  ]
  const titles = [...new Set(profiles.map(profile => profile.title))]
  const[title, setTitle] = useState("")
  const handleChange = (event) => {
    setTitle(event.target.value)
    console.log(title)
  }

  const [search, setSearch] = useState("")
  const handleSearch = (event) => {
    setSearch(event.target.value)
  }


  const filteredProfiles = profiles.filter(profile =>
    (!title || profile.title  == title) && (profile.name.toLowerCase().includes(search.toLowerCase()))
  )

  const handleClick = () => {
    setTitle("")
    setSearch("")
  }

  // const [clicked, setClicked] = useState(false)
  // const handleClick = () => {
  //   setClicked(prev => !prev)
  // };
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
          <div className={cardStyles["flex-container"]}>
            {
              filteredProfiles.map((profile)=>(
                <Card
                  key={profile.email}
                  name={profile.name}
                  title={profile.title}
                  email={profile.email}
                  img={profile.img}>
                </Card>
              ))
            }
          </div>
        </Wrapper>

      </main>

    </div>
      
    </>
  )
}

export default App;

