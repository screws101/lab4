import Wrapper from "../components/Wrapper"
import Filters from "../components/Filters"
import {useState, useEffect} from "react"
import Card from '../components/Card'
import cardStyles from "../components/card.module.css";

const HomePage = ({
  titles,
  handleChange,
  handleSearch,
  handleClick,
  search,
  title,
  error,
  profiles,
  page,
  setPage
}) => {
    return(
        <>
        <Wrapper id="filters">
            <Filters
            className = "filters-line"
            titles={titles}
            onChange={handleChange}
            searchName={handleSearch}
            clear={handleClick}
            search = {search}
            title = {title}
            />
        </Wrapper>

        <Wrapper id="profiles">
          {error && <p style={{ color: "red" }}>{error}</p>}

          <div className={cardStyles["flex-container"]}>
            {profiles.length === 0 && <p>No profiles found.</p>}
            {
              profiles.map((profile)=>(
                <Card
                  key={profile.id}
                  name={profile.name}
                  title={profile.title}
                  email={profile.email}
                  img={profile.image_url}  
                />
              ))
            }
          </div>
          <div className={cardStyles["pagination"]}>
            <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
            <span>Page {page}</span>
            <button onClick={() => setPage(page + 1)}>Next</button>
          </div>
        </Wrapper>
        </>
    )
}

export default HomePage