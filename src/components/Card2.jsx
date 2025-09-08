import imgWoman from'../assets/headshot-woman.jpg'

const Card2 = () => {
    return (
        <div className="card">
        <img
            src ={imgWoman}
            alt="Headshot of a woman"
            style={{ width: "100px", height: "100px", borderRadius: "8px" }}
        />
        <h2>Jane Doe</h2>
        <p>UX Designer</p>
        </div>
    )
}

export default Card2;