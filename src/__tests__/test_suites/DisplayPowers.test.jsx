import { render, screen, waitFor } from "@testing-library/react"
import { describe, test, expect, beforeEach } from "vitest"
import App from "../../App"

const mockPowers = [
  { id: 1, name: "Super Speed", description: "Run faster than light", origin: "Cosmic Ray", price: 999.99, inStock: true },
  { id: 2, name: "Invisibility", description: "Become invisible at will", origin: "Genetic Mutation", price: 1499.99, inStock: true },
  { id: 3, name: "Telepathy", description: "Read and control minds", origin: "Ancient Artifact", price: 2999.99, inStock: false },
]

describe("Display Superpowers", () => {
  beforeEach(() => {
    global.fetch = vi.fn((url) => {
      if (url.includes("/store_info")) {
        return Promise.resolve({ ok: true, json: () => Promise.resolve({ id: 1, name: "Superpower Shop", description: "The best shop", phone: "555-POWER", email: "powers@shop.com" }) })
      }
      if (url.includes("/superpowers")) {
        return Promise.resolve({ ok: true, json: () => Promise.resolve(mockPowers) })
      }
    })
    window.history.pushState({}, "", "/superpowers")
  })

  test("displays all superpowers on the shop page", async () => {
    render(<App />)
    await waitFor(() => {
      expect(screen.getByText("Super Speed")).toBeInTheDocument()
      expect(screen.getByText("Invisibility")).toBeInTheDocument()
      expect(screen.getByText("Telepathy")).toBeInTheDocument()
    })
  })

  test("displays superpower details correctly", async () => {
    render(<App />)
    await waitFor(() => {
      expect(screen.getByText("Run faster than light")).toBeInTheDocument()
      // use getAllByText since 2999.99 also contains 999.99
      expect(screen.getAllByText(/999\.99/)[0]).toBeInTheDocument()
    })
  })

  test("displays in stock badge correctly", async () => {
    render(<App />)
    await waitFor(() => {
      expect(screen.getAllByText("In Stock").length).toBeGreaterThan(0)
      expect(screen.getByText("Out of Stock")).toBeInTheDocument()
    })
  })

  test("displays empty shop when no superpowers exist", async () => {
    global.fetch = vi.fn((url) => {
      if (url.includes("/store_info")) {
        return Promise.resolve({ ok: true, json: () => Promise.resolve({ id: 1, name: "Superpower Shop", description: "The best shop" }) })
      }
      if (url.includes("/superpowers")) {
        return Promise.resolve({ ok: true, json: () => Promise.resolve([]) })
      }
    })
    render(<App />)
    await waitFor(() => {
      expect(screen.queryByText("Super Speed")).not.toBeInTheDocument()
    })
  })
})