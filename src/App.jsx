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


function App() {
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
      <header>
        <Header/>
      </header>
      <main>
        <Wrapper id="header">
          <h1>Profile App</h1>
          {/* <button onClick={handleClick}>
            {clicked ? "Click me" : "Clicked"}
          </button> */}
        </Wrapper>
        <Wrapper id="about">
          <About/>
        </Wrapper>
        <Wrapper id="profiles">
          <Filters titles={titles} onChange={handleChange} searchName={handleSearch} clear={handleClick} search = {search} title = {title}/>
          <div className="flex-container">
            {
              filteredProfiles.map((profile)=>(
                <Card
                  key={profile.email}
                  name={profile.name}
                  title={profile.title}
                  email={profile.email}>

                </Card>
              ))
            }
          </div>
        </Wrapper>

      </main>

    </>
  )
}

export default App;

