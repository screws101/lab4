import styles from "./filters.module.css"

const Filters = ({titles, onChange, searchName, clear, title, search}) => {
    return(
        <div className={styles["filter-container"]}>
            <div className={styles["select-filter"]}>
                <label htmlFor="select">Select a title:</label>
                <select id="select" value = {title} onChange={onChange}>
                    <option value="">All</option>
                    {
                        titles.map(ti => <option key ={ti} value = {ti}>{ti}</option>)
                    }
                </select>
            </div>
            <div className={styles["search-box-container"]}>
                <label htmlFor="search">Search by name:</label>
                <input id="search" value = {search} type="text" placeholder="Enter name" onChange={searchName}/>
            </div>
            <button onClick={clear}>Clear</button>
        </div>
    )

}
export default Filters