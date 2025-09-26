import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Wrapper from '../components/Wrapper';

const ProfileDetailsPage = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const fetchProfileDetails = async () => {
      setLoading(true);
      setError('');

      try {
        const url = `https://web.ics.purdue.edu/~zong6/profile-app/fetch-data-with-id.php?id=${id}`;
        console.log("Fetching profile details from:", url);

        const response = await fetch(url, { signal: controller.signal });
        const text = await response.text();
        console.log("Raw profile details API response:", text);

        let data;
        try {
          data = JSON.parse(text);
        } catch (err) {
          console.error("Failed to parse profile details JSON:", err);
          setProfile(null);
          return;
        }

        if (data && data.profile) {
          setProfile(data.profile);
          console.log("Profile details set successfully:", data.profile);
        } else {
          console.warn("Profile not found or invalid data structure.");
          setProfile(null);
        }

      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Error fetching profile details:", err);
          setError("Failed to fetch profile details");
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProfileDetails();
    }

    return () => controller.abort();
  }, [id]);

  if (loading) {
    return (
      <Wrapper id="profile-details">
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>Loading profile details...</p>
        </div>
      </Wrapper>
    );
  }

  if (error) {
    return (
      <Wrapper id="profile-details">
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p style={{ color: 'red' }}>{error}</p>
          <Link to="/fetched-profiles" style={{ 
            display: 'inline-block', 
            padding: '0.5rem 1rem', 
            backgroundColor: '#007bff', 
            color: 'white', 
            textDecoration: 'none',
            borderRadius: '4px',
            marginTop: '1rem'
          }}>
            Back to Profiles
          </Link>
        </div>
      </Wrapper>
    );
  }

  if (!profile) {
    return (
      <Wrapper id="profile-details">
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <h2>Profile Not Found</h2>
          <p>The profile you're looking for doesn't exist.</p>
          <Link to="/fetched-profiles" style={{ 
            display: 'inline-block', 
            padding: '0.5rem 1rem', 
            backgroundColor: '#007bff', 
            color: 'white', 
            textDecoration: 'none',
            borderRadius: '4px',
            marginTop: '1rem'
          }}>
            Back to Profiles
          </Link>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper id="profile-details">
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
        <Link to="/fetched-profiles" style={{ 
          display: 'inline-block', 
          padding: '0.5rem 1rem', 
          backgroundColor: '#6c757d', 
          color: 'white', 
          textDecoration: 'none',
          borderRadius: '4px',
          marginBottom: '2rem'
        }}>
          ← Back to Profiles
        </Link>
        
        <div style={{ 
          border: '1px solid #ddd', 
          borderRadius: '8px', 
          padding: '2rem',
          backgroundColor: '#f8f9fa'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <img
              src={profile.image_url}
              alt={profile.name}
              style={{ 
                width: '150px', 
                height: '150px', 
                borderRadius: '50%',
                objectFit: 'cover',
                border: '3px solid #007bff'
              }}
            />
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ marginBottom: '0.5rem', color: '#333' }}>{profile.name}</h1>
            <h2 style={{ marginBottom: '1rem', color: '#666' }}>{profile.title}</h2>
            
            <div style={{ marginBottom: '1rem' }}>
              <strong>Email:</strong> 
              <a href={`mailto:${profile.email}`} style={{ 
                color: '#007bff', 
                textDecoration: 'none',
                marginLeft: '0.5rem'
              }}>
                {profile.email}
              </a>
            </div>
            
            {profile.bio && (
              <div style={{ marginTop: '1rem' }}>
                <strong>Bio:</strong>
                <p style={{ marginTop: '0.5rem', lineHeight: '1.6' }}>{profile.bio}</p>
              </div>
            )}
            
            {profile.department && (
              <div style={{ marginTop: '1rem' }}>
                <strong>Department:</strong> {profile.department}
              </div>
            )}
            
            {profile.phone && (
              <div style={{ marginTop: '1rem' }}>
                <strong>Phone:</strong> 
                <a href={`tel:${profile.phone}`} style={{ 
                  color: '#007bff', 
                  textDecoration: 'none',
                  marginLeft: '0.5rem'
                }}>
                  {profile.phone}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default ProfileDetailsPage;
