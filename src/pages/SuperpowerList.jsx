import { useContext, useRef } from "react"
import { SuperpowerContext } from "../context/SuperpowerContext"
import NavBar from "../components/NavBar"
import SuperpowerCard from "../components/SuperpowerCard"

function SuperpowerList() {
  const { filteredSuperpowers, setSearch } = useContext(SuperpowerContext)
  const searchRef = useRef("")

  function handleSearch(e) {
    searchRef.current = e.target.value
    setSearch(e.target.value)
  }

  return (
    <>
      <NavBar />
      <main className="shop-page">
        <h1>⚡ Available Superpowers</h1>
        <input
          className="search-input"
          type="text"
          placeholder="Search superpowers..."
          onChange={handleSearch}
        />
        <div className="power-grid">
          {filteredSuperpowers.map(power => (
            <SuperpowerCard key={power.id} power={power} />
          ))}
        </div>
      </main>
    </>
  )
}

export default SuperpowerList