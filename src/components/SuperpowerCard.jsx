import { Link } from "react-router-dom"
import { useContext } from "react"
import { SuperpowerContext } from "../context/SuperpowerContext"

function SuperpowerCard({ power }) {
  const { deleteSuperpower } = useContext(SuperpowerContext)

  return (
    <div className="power-card" data-testid="power-card">
      <div className="power-card-header">
        <h3>{power.name}</h3>
        <span className={`badge ${power.inStock ? "in-stock" : "out-stock"}`}>
          {power.inStock ? "In Stock" : "Out of Stock"}
        </span>
      </div>
      <p className="power-desc">{power.description}</p>
      <p className="power-origin">🌍 Origin: {power.origin}</p>
      <p className="power-price">💰 ${power.price}</p>
      <div className="power-actions">
        <Link to={`/superpowers/${power.id}`} className="btn btn-primary">
          ⚡ View Power
        </Link>
        <button
          className="btn btn-danger"
          onClick={() => deleteSuperpower(power.id)}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default SuperpowerCard