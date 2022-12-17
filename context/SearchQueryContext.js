import { createContext, useState, useContext } from 'react'

export const SearchQueryContext = createContext()

export function SearchQueryProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState('')

  const value = {
    searchQuery,
    setSearchQuery,
  }

  return (
    <SearchQueryContext.Provider value={value}>
      {children}
    </SearchQueryContext.Provider>
  )
}
