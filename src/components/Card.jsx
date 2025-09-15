import styles from "./card.module.css"

const Card = ({name, title, email, img}) => {
    return (
        <div className={styles["profile-card"]}>
            <div className={styles['profile-card_img']}>
                <img
                src = {img}
                alt= {name}
                style={{ width: "100px", height: "100px", borderRadius: "8px" }}
                />
            </div>
            <div className = {styles["profile-card_content"]}>
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