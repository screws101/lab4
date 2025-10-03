import { createContext, useState, useCallback } from 'react';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProfiles = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch(`https://web.ics.purdue.edu/~zong6/profile-app/fetch-data-with-filter.php?title=&name=&page=1&limit=100`);
      const data = await response.json();
      
      if (data?.profiles) {
        setProfiles(data.profiles);
      }
    } catch {
      setProfiles([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const addProfile = (newProfile) => {
    if (!newProfile.name || !newProfile.title || !newProfile.email || !newProfile.img) {
      return;
    }
    
    const profileWithId = {
      ...newProfile,
      id: Date.now().toString(),
      image_url: URL.createObjectURL(newProfile.img)
    };
    
    setProfiles(prevProfiles => [...prevProfiles, profileWithId]);
  };

  const value = {
    profiles,
    loading,
    fetchProfiles,
    addProfile
  };

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
};
