import './App.css';
import Card1 from './components/Card1';
import Card2 from './components/Card2';
import About from './components/About';
import Header from './components/Header';
import Card from './components/Card';
import Wrapper from './components/Wrapper';
import imgMan from './assets/headshot-man.jpg';
import imgWoman from './assets/headshot-woman.jpg';


function App() {
  const profiles = [
    {name: "John Doe", title: "Software Engineer", email:"john.@email.org", img: imgMan},
    {name: "Jane Doe", title: "UX Designer", email:"jane.@email.org", img: imgWoman}
  ]
  return (
    <>
      <header>
        <Header/>
      </header>
      <main>
        <div className="section">
          <div className="container">
            <div className="page-title">
            <h1>Profile App</h1>
          </div>
          </div>
        </div>

        <div className="section">
          <div className="about-container">
            <About/>
          </div>
        </div>

        <div className="section" id="profiles">
          <div className="container">
            <div className="flex-container">
              {
                profiles.map((profile,index) => (
                  <Card key={index} name={profile.name} title={profile.title} email={profile.email} img={profile.img} />
                ))
              }
            </div>
          </div>
        </div>
      </main>

    </>
  )
}

export default App;

