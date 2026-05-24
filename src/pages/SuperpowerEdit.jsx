import { useParams, useNavigate } from "react-router-dom"
import { useContext, useState, useEffect } from "react"
import { SuperpowerContext } from "../context/SuperpowerContext"
import NavBar from "../components/NavBar"

function SuperpowerEdit() {
  const { id } = useParams()
  const { superpowers, updateSuperpower, loading } = useContext(SuperpowerContext)
  const navigate = useNavigate()

  const power = superpowers.find(p => String(p.id) === String(id))

  const [price, setPrice] = useState("")
  const [inStock, setInStock] = useState(true)

  useEffect(() => {
    if (power) {
      setPrice(power.price)
      setInStock(power.inStock)
    }
  }, [power])

  if (loading) return <><NavBar /><h2 style={{padding:"2rem"}}>Loading...</h2></>
  if (!power) return <><NavBar /><h2 style={{padding:"2rem"}}>Superpower not found.</h2></>

  function handleUpdate(e) {
    e.preventDefault()
    updateSuperpower(power.id, { price: parseFloat(price), inStock })
    navigate(`/superpowers/${power.id}`)
  }

  return (
    <>
      <NavBar />
      <main className="add-page">
        <h1>✏️ Edit — {power.name}</h1>
        <p style={{ color: "#a8b2d8", marginBottom: "1rem" }}>
          Admin panel — update price and availability for this superpower.
        </p>

        <form onSubmit={handleUpdate} className="add-form">
          <label>
            Name (read-only):
            <input type="text" value={power.name} disabled style={{ opacity: 0.5 }} />
          </label>
          <label>
            Origin (read-only):
            <input type="text" value={power.origin} disabled style={{ opacity: 0.5 }} />
          </label>
          <label>
            Price ($):
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={e => setPrice(e.target.value)}
              required
            />
          </label>
          <label style={{ flexDirection: "row", alignItems: "center", gap: "0.75rem" }}>
            In Stock:
            <input
              type="checkbox"
              checked={inStock}
              onChange={e => setInStock(e.target.checked)}
              style={{ width: "20px", height: "20px" }}
            />
          </label>
          <div style={{ display: "flex", gap: "1rem" }}>
            <button type="submit" className="btn btn-primary">
              💾 Save Changes
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate(`/superpowers/${power.id}`)}
            >
              Cancel
            </button>
          </div>
        </form>
      </main>
    </>
  )
}

export default SuperpowerEdit