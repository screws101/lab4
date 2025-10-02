import { useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import Wrapper from '../components/Wrapper';
import Card from '../components/Card';
import cardStyles from '../components/card.module.css';
import { useProfiles } from '../context/ProfileContext';

const FetchedProfilesPage = () => {
  const { profiles, loading, error, fetchProfiles } = useProfiles();

  useEffect(() => {
    if (profiles.length === 0) {
      fetchProfiles();
    }
  }, [fetchProfiles, profiles.length]);

  return (
    <Wrapper id="fetched-profiles">
      <div>
        <h1>All Profiles</h1>
        <p>Click on a profile to view details</p>
        
        {error && <p style={{ color: "red" }}>{error}</p>}
        
        <div className={cardStyles["flex-container"]}>
          {profiles.length === 0 && !loading && <p>No profiles found.</p>}
          {profiles.map((profile) => (
            <Link 
              key={profile.id} 
              to={`/fetched-profiles/profile/${profile.id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Card
                name={profile.name}
                title={profile.title}
                email={profile.email}
                img={profile.image_url}
              />
            </Link>
          ))}
        </div>
      </div>
      
      <Outlet />
    </Wrapper>
  );
};

export default FetchedProfilesPage;
