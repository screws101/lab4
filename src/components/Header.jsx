import styles from "./header.module.css"
import {Link} from "react-router-dom"

const Header = () => {
    return (
    <div className="header">
      <nav className="nav">
        <ul className={styles['nav-list']}>
          <li>
            {/* <a href="#home">Home</a> */}
            <Link to="/">Home</Link>
          </li>
          <li>
            {/* <a href="#about">About</a> */}
            <Link to="/about">About</Link>
          </li>
          <li>
            {/* <a href="#profiles">Profiles</a> */}
            <Link to="/addprofile">Add Profile</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;