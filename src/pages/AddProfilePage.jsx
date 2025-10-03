import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import Wrapper from "../components/Wrapper"
import AddProfile from "../components/AddProfile"
import { ProfileContext } from '../context/ProfileContext';

const AddProfilePage = () =>{
    const navigate = useNavigate();
    const { addProfile } = useContext(ProfileContext);
    
    const handleAddProfile = (newProfile) => {
        addProfile(newProfile);
        alert('Profile added successfully! Redirecting to homepage...');
        navigate('/');
    };

    return(
        <>
        <Wrapper id="add-profile">
          <AddProfile onAddProfile={handleAddProfile}/>
        </Wrapper>
        </>
    )
}

export default AddProfilePage