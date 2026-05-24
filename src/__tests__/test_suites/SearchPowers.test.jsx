import { render, screen, waitFor, fireEvent } from "@testing-library/react"
import { describe, test, expect, beforeEach } from "vitest"
import App from "../../App"

const mockPowers = [
  { id: 1, name: "Super Speed", description: "Run faster than light", origin: "Cosmic Ray", price: 999.99, inStock: true },
  { id: 2, name: "Invisibility", description: "Become invisible at will", origin: "Genetic Mutation", price: 1499.99, inStock: true },
  { id: 3, name: "Telepathy", description: "Read and control minds", origin: "Ancient Artifact", price: 2999.99, inStock: false },
]

describe("Search Superpowers", () => {
  beforeEach(() => {
    global.fetch = vi.fn((url) => {
      if (url.includes("/store_info")) {
        return Promise.resolve({ ok: true, json: () => Promise.resolve({ id: 1, name: "Superpower Shop", description: "The best shop" }) })
      }
      if (url.includes("/superpowers")) {
        return Promise.resolve({ ok: true, json: () => Promise.resolve(mockPowers) })
      }
    })
    window.history.pushState({}, "", "/superpowers")
  })

  test("filters superpowers by search input", async () => {
    render(<App />)

    await waitFor(() => {
      expect(screen.getByText("Super Speed")).toBeInTheDocument()
    })

    fireEvent.change(screen.getByPlaceholderText("Search superpowers..."), {
      target: { value: "speed" }
    })

    await waitFor(() => {
      expect(screen.getByText("Super Speed")).toBeInTheDocument()
      expect(screen.queryByText("Invisibility")).not.toBeInTheDocument()
      expect(screen.queryByText("Telepathy")).not.toBeInTheDocument()
    })
  })

  test("search is case insensitive", async () => {
    render(<App />)

    await waitFor(() => {
      expect(screen.getByText("Super Speed")).toBeInTheDocument()
    })

    fireEvent.change(screen.getByPlaceholderText("Search superpowers..."), {
      target: { value: "INVISIBILITY" }
    })

    await waitFor(() => {
      expect(screen.getByText("Invisibility")).toBeInTheDocument()
      expect(screen.queryByText("Super Speed")).not.toBeInTheDocument()
    })
  })

  test("shows all superpowers when search is cleared", async () => {
    render(<App />)

    await waitFor(() => {
      expect(screen.getByText("Super Speed")).toBeInTheDocument()
    })

    const searchInput = screen.getByPlaceholderText("Search superpowers...")
    fireEvent.change(searchInput, { target: { value: "speed" } })
    fireEvent.change(searchInput, { target: { value: "" } })

    await waitFor(() => {
      expect(screen.getByText("Super Speed")).toBeInTheDocument()
      expect(screen.getByText("Invisibility")).toBeInTheDocument()
      expect(screen.getByText("Telepathy")).toBeInTheDocument()
    })
  })

  test("shows no results when search matches nothing", async () => {
    render(<App />)

    await waitFor(() => {
      expect(screen.getByText("Super Speed")).toBeInTheDocument()
    })

    fireEvent.change(screen.getByPlaceholderText("Search superpowers..."), {
      target: { value: "zzznomatch" }
    })

    await waitFor(() => {
      expect(screen.queryByText("Super Speed")).not.toBeInTheDocument()
      expect(screen.queryByText("Invisibility")).not.toBeInTheDocument()
    })
  })
})