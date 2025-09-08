import imgMan from'../assets/headshot-man.jpg'

const Card1 = () => {
    return (
        <div className="card">
        <img
            src ={imgMan}
            alt="Headshot of a man"
            style={{ width: "100px", height: "100px", borderRadius: "8px" }}
        />
        <h2>John Doe</h2>
        <p>Web Developer</p>
        </div>
    )
}

export default Card1;