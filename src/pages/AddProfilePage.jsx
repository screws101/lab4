import Wrapper from "../components/Wrapper"
import AddProfile from "../components/AddProfile"

const AddProfilePage = () =>{
    return(
        <>
        <Wrapper id="add-profile">
          <AddProfile onAddProfile={handleAddProfile}/>
        </Wrapper>
        </>
    )
}

export default AddProfilePage