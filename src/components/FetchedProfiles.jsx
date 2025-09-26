import { useState, useEffect } from 'react';
import Card from './Card';
import cardStyles from './card.module.css';

const FetchedProfiles = ({ 
  title, 
  search, 
  page, 
  setPage, 
  onError, 
  onLoadingChange 
}) => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const LIMIT = 10;

  useEffect(() => {
    const controller = new AbortController();

    const fetchProfiles = async () => {
      setLoading(true);
      setError('');
      onLoadingChange?.(true);

      try {
        const url = `https://web.ics.purdue.edu/~zong6/profile-app/fetch-data-with-filter.php?title=${title}&name=${search}&page=${page}&limit=${LIMIT}`;
        console.log("Fetching profiles from:", url);

        const response = await fetch(url, { signal: controller.signal });
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
        if (err.name !== "AbortError") {
          console.error("Error fetching profiles:", err);
          setError("Failed to fetch profiles");
          onError?.("Failed to fetch profiles");
        }
      } finally {
        setLoading(false);
        onLoadingChange?.(false);
      }
    };

    fetchProfiles();

    return () => controller.abort();
  }, [title, search, page, onError, onLoadingChange]);

  return (
    <div className={cardStyles["flex-container"]}>
      {loading && <p>Loading profiles...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && profiles.length === 0 && <p>No profiles found.</p>}
      {!loading && profiles.map((profile) => (
        <Card
          key={profile.id}
          name={profile.name}
          title={profile.title}
          email={profile.email}
          img={profile.image_url}
        />
      ))}
    </div>
  );
};

export default FetchedProfiles;
