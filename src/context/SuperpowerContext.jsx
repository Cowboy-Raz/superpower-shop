import { createContext, useState, useEffect } from "react"

export const SuperpowerContext = createContext()

export function SuperpowerProvider({ children }) {
  const [superpowers, setSuperpowers] = useState([])
  const [storeInfo, setStoreInfo] = useState(null)
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:6001/superpowers").then(r => r.json()),
      fetch("http://localhost:6001/store_info/1").then(r => r.json())
    ]).then(([powers, store]) => {
      setSuperpowers(powers)
      setStoreInfo(store)
      setLoading(false)
    })
  }, [])

  function addSuperpower(newPower) {
    fetch("http://localhost:6001/superpowers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPower)
    })
      .then(r => r.json())
      .then(saved => setSuperpowers(prev => [...prev, saved]))
  }

  function updateSuperpower(id, updates) {
    fetch(`http://localhost:6001/superpowers/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates)
    })
      .then(r => r.json())
      .then(updated =>
        setSuperpowers(prev => prev.map(p => p.id === updated.id ? updated : p))
      )
  }

  function deleteSuperpower(id) {
    fetch(`http://localhost:6001/superpowers/${id}`, {
      method: "DELETE"
    }).then(() => setSuperpowers(prev => prev.filter(p => p.id !== id)))
  }

  const filteredSuperpowers = superpowers.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <SuperpowerContext.Provider value={{
      superpowers,
      filteredSuperpowers,
      storeInfo,
      search,
      setSearch,
      loading,
      addSuperpower,
      updateSuperpower,
      deleteSuperpower
    }}>
      {children}
    </SuperpowerContext.Provider>
  )
}