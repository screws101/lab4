import styles from "./header.module.css"

const Header = () => {
    return (
    <div className="header">
      <nav className="nav">
        <ul className={styles['nav-list']}>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#profiles">Profiles</a></li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;