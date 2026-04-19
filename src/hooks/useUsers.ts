import { useState, useEffect } from "react"

export interface User { id: number; name: string; email: string }

export function useUsers(apiBase = "/api/v1") {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetch(`${apiBase}/users`)
      .then(r => r.json())
      .then(setUsers)
      .finally(() => setLoading(false))
  }, [apiBase])
  const deleteUser = (id: number) => {
    fetch(`${apiBase}/users/${id}`, { method: "DELETE" }).then(() =>
      setUsers(u => u.filter(x => x.id !== id)))
  }
  return { users, loading, deleteUser }
}
