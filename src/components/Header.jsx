import styles from "./header.module.css"
import {Link} from "react-router-dom"

const Header = () => {
    return (
    <div className="header">
      <nav className="nav">
        <ul className={styles['nav-list']}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/fetched-profiles">All Profiles</Link>
          </li>
          <li>
            <Link to="/addprofile">Add Profile</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;