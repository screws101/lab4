import Wrapper from "../components/Wrapper"
import About from "../components/About"

const AboutPage = () =>{
    return(
        <>
        <div id="header-title">
          <h1>Profile App</h1>
        </div>
        <Wrapper id="about">
          <About/>
        </Wrapper>
        </>
    )
}

export default AboutPage