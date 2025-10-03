import { Link } from 'react-router-dom';
import Wrapper from '../components/Wrapper';

const NotFoundPage = () => {
  return (
    <Wrapper id="not-found">
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h1>404 - Page Not Found</h1>
        <p>This page doesn't exist.</p>
        <Link to="/" style={{ 
          display: 'inline-block', 
          padding: '0.5rem 1rem', 
          backgroundColor: '#007bff', 
          color: 'white', 
          textDecoration: 'none',
          borderRadius: '4px',
          marginTop: '1rem'
        }}>
          Go Home
        </Link>
      </div>
    </Wrapper>
  );
};

export default NotFoundPage;
