import styles from "./toggle.module.css"

export const Toggle =({handleChange, isChecked}) => {
    return (
        <div className={styles["toggle-container"]}>
            <input
                type="checkbox"
                id="check"
                className={styles.toggle}
                onChange={handleChange}
                checked={isChecked}
            />
            <label htmlFor="check">Dark Mode</label>
        </div>
    );
};

export default Toggle;