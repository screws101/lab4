import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import AddProfilePage from '../pages/AddProfilePage';
import FetchedProfilesPage from '../pages/FetchedProfilesPage';
import ProfileDetailsPage from '../pages/ProfileDetailsPage';
import NotFoundPage from '../pages/NotFoundPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage/>} />
      <Route path="/addprofile" element={<AddProfilePage/>} />
      <Route path="/fetched-profiles" element={<FetchedProfilesPage />}>
        <Route path="profile/:id" element={<ProfileDetailsPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage/>} />
    </Routes>
  );
};

export default AppRoutes;
