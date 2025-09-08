import imgMan from'../assets/headshot-man.jpg'

const Card = ({name, title, email, img}) => {
    return (
        <div className="profile-card">
            <div Classname='profile-card_img'>
                <img
                src = {img}
                alt= {name}
                style={{ width: "100px", height: "100px", borderRadius: "8px" }}
                />
            </div>
            <div className = "profile-card_content">
                <h2>{name}</h2>
                <p>{title}</p>
                <p>
                    <a href={`mailto:${email}`}>{email}</a>
                </p>
            </div>
        </div>
    )
}

export default Card;