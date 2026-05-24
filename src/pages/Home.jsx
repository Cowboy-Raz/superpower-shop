import { Link } from "react-router-dom"
import { useContext } from "react"
import { SuperpowerContext } from "../context/SuperpowerContext"
import NavBar from "../components/NavBar"

function Home() {
  const { storeInfo } = useContext(SuperpowerContext)

  return (
    <>
      <NavBar />
      <main className="home-page">
        <div className="hero">
          <h1>⚡ {storeInfo?.name || "Superpower Shop"}</h1>
          <p className="hero-desc">
            {storeInfo?.description || "The world's only marketplace for real superpowers."}
          </p>
          <div className="hero-buttons">
            <Link to="/superpowers" className="btn btn-primary">Browse Powers</Link>
            <Link to="/superpowers/new" className="btn btn-secondary">Add a Power</Link>
          </div>
        </div>
        <div className="features">
          <div className="feature-card">
            <span>🦸</span>
            <h3>100+ Powers</h3>
            <p>Choose from our vast catalog of superpowers</p>
          </div>
          <div className="feature-card">
            <span>🔒</span>
            <h3>Secure Transfer</h3>
            <p>Safely transfer powers with our patented technology</p>
          </div>
          <div className="feature-card">
            <span>⚡</span>
            <h3>Instant Activation</h3>
            <p>Powers activate within 24 hours of purchase</p>
          </div>
        </div>
      </main>
    </>
  )
}

export default Home