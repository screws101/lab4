import { useNavigate } from 'react-router-dom';
import Wrapper from "../components/Wrapper"
import AddProfile from "../components/AddProfile"
import { useProfiles } from '../context/ProfileContext';

const AddProfilePage = () =>{
    const navigate = useNavigate();
    const { addProfile } = useProfiles();
    
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