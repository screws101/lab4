const Filters = ({titles, onChange, searchName, clear, title, search}) => {
    return(
        <div className="filter-container">
            <div className="select-filter">
                <label htmlFor="seclect">Select a title:</label>
                <select id="select" value = {title} onChange={onChange}>
                    <option value="">All</option>
                    {
                        titles.map(ti => <option key ={ti} value = {ti}>{ti}</option>)
                    }
                </select>
            </div>
            <div className="search-box-container">
                <label htmlFor="search">Search by name:</label>
                <input id="search" value = {search} type="text" placehoder="Enter name" onChange={searchName}/>
            </div>
            <button onClick={clear}>Clear</button>
        </div>
    )

}
export default Filters