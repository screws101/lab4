import { useState, useRef } from "react";
import styles from './addProfile.module.css';


const stripTags = (s) => String(s ?? "").replace(/<\/?[^>]+>/g, "");
const trimCollapse = (s) => String(s ?? "").trim().replace(/\s+/g, " ");

const AddProfile = ({onAddProfile}) => {
    const [values, setValues] = useState({
        name: "",
        title: "",
        email: "",
        bio: "",
        img: null
    })

    const {name, title, email, bio, img} = values;
    const [errors, setErrors] = useState("");
    const [success, setSuccess] = useState("");

    const fileInputRef = useRef(null);
    const onChange = (event) => {
    const { name, value, files } = event.target;

    if (name === "img") {
        const file = files[0];

        if (file && file.size > 1024 * 1024) {
            setErrors("File size is too big");
            setValues((prev) => ({ ...prev, img: null }));

            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        } else {
            setErrors("");
            setValues((prev) => ({ ...prev, img: file }));
        }
    } else {
        setValues((prev) => ({ ...prev, [name]: value }));
    }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (errors) {
            alert(errors);
            return;
        }

        if (!img) {
            setErrors("Upload a smaller image");
            return;
        }

        onAddProfile(values);

        setValues({
            name: "",
            title: "",
            email: "",
            bio: "",
            img: null
        })

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }

        setErrors("");
        setSuccess("Profile added successfully");

    }

    return (
        <div className={styles.container}>
            <h2>Add Profile</h2>

                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" id="name" required value={name} onChange={onChange}/>
                
                    <label htmlFor="title">Title:</label>
                    <input type="text" name="title" id="title" required value={title} onChange={onChange}/>
                    
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" id="email" required value={email} onChange={onChange}/>
                    
                    <label htmlFor="bio">Bio:</label>
                    <textarea name="bio" id="bio" placeholder="Add Bio..." required value={bio} onChange={onChange}></textarea>
                    
                    <label htmlFor="img">Image:</label>
                    <input ref={fileInputRef} type="file" name="img" id="img" required accept="image/png, image/jpeg, image/jpg, image/gif" onChange={onChange}/>
                    
                    {errors && <p className={styles.error}>{errors}</p>}
                    <button type="submit">Add Profile</button>
                    {success && <p className={styles.success}>{success}</p>}
                </form>

        </div>
    );
};

export default AddProfile;