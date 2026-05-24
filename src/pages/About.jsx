import NavBar from "../components/NavBar"
import { useContext } from "react"
import { SuperpowerContext } from "../context/SuperpowerContext"

function About() {
  const { storeInfo } = useContext(SuperpowerContext)

  return (
    <>
      <NavBar />
      <main className="about-page">
        <h1>About {storeInfo?.name}</h1>
        <p>{storeInfo?.description}</p>
        <div className="contact-info">
          <h2>Contact Us</h2>
          <p>📞 {storeInfo?.phone}</p>
          <p>📧 {storeInfo?.email}</p>
        </div>
      </main>
    </>
  )
}

export default About