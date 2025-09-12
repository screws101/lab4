const Filters = ({title, onChange, searchName, clear, title, search}) => {
    return(
        <div className="filter-container">
            <div className="select-filter">
                <label htmlFor="seclect">Select a title:</label>
                <select id="select" value = {title} onChange={onChange}>
                    <option value="">All</option>
                    {
                        titles.map(title => <option key ={title} value = {title}>{title}</option>)
                    }
                </select>
            </div>
            <div classNmea="search-box-container">
                <label htmlFor="search">Search by name:</label>
                <input id="search" value = {search} type="text" placehoder="Enter name" onChange={searchName}/>
            </div>
            <button onClick={clear}>Clear</button>
        </div>
    )

}
export default Filters