import { useState, useId, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { SuperpowerContext } from "../context/SuperpowerContext"
import NavBar from "../components/NavBar"

function AddSuperpower() {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [origin, setOrigin] = useState("")
  const [price, setPrice] = useState("")
  const [inStock, setInStock] = useState(true)
  const { addSuperpower } = useContext(SuperpowerContext)
  const navigate = useNavigate()
  const nameId = useId()
  const descId = useId()
  const originId = useId()
  const priceId = useId()

  function handleSubmit(e) {
    e.preventDefault()
    addSuperpower({ name, description, origin, price: parseFloat(price), inStock })
    navigate("/superpowers")
  }

  return (
    <>
      <NavBar />
      <main className="add-page">
        <h1>⚡ Add New Superpower</h1>
        <form onSubmit={handleSubmit} className="add-form">
          <label htmlFor={nameId}>Name:</label>
          <input
            id={nameId}
            type="text"
            placeholder="Superpower name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <label htmlFor={descId}>Description:</label>
          <textarea
            id={descId}
            placeholder="Describe the superpower..."
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
          />
          <label htmlFor={originId}>Origin:</label>
          <input
            id={originId}
            type="text"
            placeholder="How is it acquired?"
            value={origin}
            onChange={e => setOrigin(e.target.value)}
            required
          />
          <label htmlFor={priceId}>Price ($):</label>
          <input
            id={priceId}
            type="number"
            step="0.01"
            placeholder="Price"
            value={price}
            onChange={e => setPrice(e.target.value)}
            required
          />
          <label>
            In Stock:
            <input
              type="checkbox"
              checked={inStock}
              onChange={e => setInStock(e.target.checked)}
            />
          </label>
          <button type="submit" className="btn btn-primary">Add Superpower</button>
        </form>
      </main>
    </>
  )
}

export default AddSuperpower