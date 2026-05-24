import { render, screen, waitFor, fireEvent } from "@testing-library/react"
import { describe, test, expect, beforeEach } from "vitest"
import App from "../../App"

const mockPowers = [
  { id: 1, name: "Super Speed", description: "Run faster than light", origin: "Cosmic Ray", price: 999.99, inStock: true },
  { id: 2, name: "Invisibility", description: "Become invisible at will", origin: "Genetic Mutation", price: 1499.99, inStock: true },
]

const newPower = {
  id: 3,
  name: "Time Travel",
  description: "Travel through time",
  origin: "Quantum Device",
  price: 4999.99,
  inStock: true
}

describe("CRUD Superpowers", () => {
  beforeEach(() => {
    global.fetch = vi.fn((url, options) => {
      if (options?.method === "POST") {
        return Promise.resolve({ ok: true, json: () => Promise.resolve(newPower) })
      }
      if (options?.method === "PATCH") {
        const body = JSON.parse(options.body)
        return Promise.resolve({ ok: true, json: () => Promise.resolve({ ...mockPowers[0], ...body }) })
      }
      if (options?.method === "DELETE") {
        return Promise.resolve({ ok: true, json: () => Promise.resolve({}) })
      }
      if (url.includes("/store_info")) {
        return Promise.resolve({ ok: true, json: () => Promise.resolve({ id: 1, name: "Superpower Shop", description: "The best shop" }) })
      }
      if (url.includes("/superpowers")) {
        return Promise.resolve({ ok: true, json: () => Promise.resolve(mockPowers) })
      }
    })
  })

  test("adds a new superpower via form submission", async () => {
    window.history.pushState({}, "", "/superpowers/new")
    render(<App />)

    await waitFor(() => {
      expect(screen.getByText("⚡ Add New Superpower")).toBeInTheDocument()
    })

    fireEvent.change(screen.getByPlaceholderText("Superpower name"), {
      target: { value: "Time Travel" }
    })
    fireEvent.change(screen.getByPlaceholderText("Describe the superpower..."), {
      target: { value: "Travel through time" }
    })
    fireEvent.change(screen.getByPlaceholderText("How is it acquired?"), {
      target: { value: "Quantum Device" }
    })
    fireEvent.change(screen.getByPlaceholderText("Price"), {
      target: { value: "4999.99" }
    })

    fireEvent.click(screen.getByText("Add Superpower"))

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:6001/superpowers",
        expect.objectContaining({ method: "POST" })
      )
    })
  })

  test("makes a POST request with correct data", async () => {
    window.history.pushState({}, "", "/superpowers/new")
    render(<App />)

    await waitFor(() => {
      expect(screen.getByPlaceholderText("Superpower name")).toBeInTheDocument()
    })

    fireEvent.change(screen.getByPlaceholderText("Superpower name"), {
      target: { value: "Time Travel" }
    })
    fireEvent.change(screen.getByPlaceholderText("Describe the superpower..."), {
      target: { value: "Travel through time" }
    })
    fireEvent.change(screen.getByPlaceholderText("How is it acquired?"), {
      target: { value: "Quantum Device" }
    })
    fireEvent.change(screen.getByPlaceholderText("Price"), {
      target: { value: "4999.99" }
    })

    fireEvent.click(screen.getByText("Add Superpower"))

    await waitFor(() => {
      const calls = global.fetch.mock.calls
      const postCall = calls.find(c => c[1]?.method === "POST")
      expect(postCall).toBeTruthy()
      const body = JSON.parse(postCall[1].body)
      expect(body.name).toBe("Time Travel")
    })
  })

  test("deletes a superpower when delete button is clicked", async () => {
    window.history.pushState({}, "", "/superpowers")
    render(<App />)

    await waitFor(() => {
      expect(screen.getByText("Super Speed")).toBeInTheDocument()
    })

    const deleteButtons = screen.getAllByText("Delete")
    fireEvent.click(deleteButtons[0])

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:6001/superpowers/1",
        expect.objectContaining({ method: "DELETE" })
      )
    })
  })

  test("makes a PATCH request when editing a superpower", async () => {
    window.history.pushState({}, "", "/superpowers/1/edit")
    render(<App />)

    await waitFor(() => {
      expect(screen.getByText("✏️ Edit — Super Speed")).toBeInTheDocument()
    })

    // price input has no placeholder — use display value
    await waitFor(() => {
      expect(screen.getByDisplayValue("999.99")).toBeInTheDocument()
    })

    const priceInput = screen.getByDisplayValue("999.99")
    fireEvent.change(priceInput, { target: { value: "1299.99" } })
    fireEvent.click(screen.getByText("💾 Save Changes"))

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:6001/superpowers/1",
        expect.objectContaining({ method: "PATCH" })
      )
    })
  })
})