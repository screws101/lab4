import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ProfileContext = createContext();

export const useProfiles = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfiles must be used within a ProfileProvider');
  }
  return context;
};

export const ProfileProvider = ({ children }) => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchProfiles = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const url = `https://web.ics.purdue.edu/~zong6/profile-app/fetch-data-with-filter.php?title=&name=&page=1&limit=100`;
      console.log("Fetching all profiles from:", url);

      const response = await fetch(url);
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
      console.error("Error fetching profiles:", err);
      setError("Failed to fetch profiles");
    } finally {
      setLoading(false);
    }
  }, []);

  const addProfile = (newProfile) => {
    const id = Date.now().toString();
    const profileWithId = {
      ...newProfile,
      id: id,
      image_url: newProfile.img ? URL.createObjectURL(newProfile.img) : '/default-avatar.png'
    };
    
    setProfiles(prevProfiles => [...prevProfiles, profileWithId]);
    console.log('Profile added locally:', profileWithId);
  };

  const value = {
    profiles,
    loading,
    error,
    fetchProfiles,
    addProfile
  };

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
};
