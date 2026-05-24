import { useParams, useNavigate, Link } from "react-router-dom"
import { useContext } from "react"
import { SuperpowerContext } from "../context/SuperpowerContext"
import NavBar from "../components/NavBar"

function SuperpowerDetail() {
  const { id } = useParams()
  const { superpowers, loading } = useContext(SuperpowerContext)
  const navigate = useNavigate()

  const power = superpowers.find(p => String(p.id) === String(id))

  if (loading) return <><NavBar /><h2 style={{padding:"2rem"}}>Loading...</h2></>
  if (!power) return <><NavBar /><h2 style={{padding:"2rem"}}>Superpower not found.</h2></>

  return (
    <>
      <NavBar />
      <main className="detail-page">
        <div className="detail-hero">
          <div className="detail-glow">⚡</div>
          <h1 className="detail-title">{power.name}</h1>
          <span className={`badge-large ${power.inStock ? "in-stock" : "out-stock"}`}>
            {power.inStock ? "✅ Available Now" : "❌ Out of Stock"}
          </span>
        </div>

        <div className="detail-body">
          <div className="detail-section">
            <h2>🔥 What You Get</h2>
            <p className="detail-description">{power.description}</p>
          </div>

          <div className="detail-section">
            <h2>🌍 Origin Story</h2>
            <p>This extraordinary power originates from <strong>{power.origin}</strong>.
            Only a handful of people in the world have ever acquired this ability —
            and now it could be yours.</p>
          </div>

          <div className="detail-section">
            <h2>💡 What You Can Do</h2>
            <ul className="power-perks">
              <li>🦸 Become unstoppable in any situation</li>
              <li>⚡ Activate your power instantly on demand</li>
              <li>🌟 Stand out as one of the most powerful beings alive</li>
              <li>🔐 Full ownership — no subscription required</li>
            </ul>
          </div>

          <div className="detail-price-box">
            <p className="detail-price-label">One-time acquisition price:</p>
            <p className="detail-price">${power.price}</p>
            {power.inStock && (
              <button className="btn btn-primary btn-large">
                🛒 Acquire This Power
              </button>
            )}
          </div>

          <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
            <Link to={`/superpowers/${power.id}/edit`} className="btn btn-secondary">
              ✏️ Admin Edit
            </Link>
            <button
              className="btn btn-secondary"
              onClick={() => navigate("/superpowers")}
            >
              ← Back to Shop
            </button>
          </div>
        </div>
      </main>
    </>
  )
}

export default SuperpowerDetail