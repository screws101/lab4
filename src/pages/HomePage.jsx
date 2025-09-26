import Wrapper from "../components/Wrapper"

const HomePage = () => {
    return(
        <Wrapper id="home">
          <div style={{ 
            textAlign: 'center', 
            padding: '2rem',
            color: '#333',
            fontSize: '2rem',
            fontWeight: 'bold',
            backgroundColor: 'white',
            minHeight: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <h1 style={{ margin: 0, color: '#333' }}>Welcome to the Profile App!</h1>
          </div>
        </Wrapper>
    )
}

export default HomePage