import { useEffect, useState } from "react"
import { useAppDispatch } from "../../../state/hooks"

import log from "../../../utils/logger"

import { setFilterName } from "../../../state/slices/filters.slice"

import { SearchBase, SearchInput, SearchSubmit } from "./Search.style"
import SearchIcon from '@mui/icons-material/Search'

export default function SearchBar() {
  const [input, setInput] = useState('')

  const dispatch = useAppDispatch()

  const handleSearch = (key?: string) => {
    if (key && key !== 'Enter') return
    dispatch(setFilterName(input))
  }

  // log mounts
  useEffect(() => {
    log('navy', 'Navigation: Search Mounted')
    return () => log('darkred', 'Navigation: Search Unmounted')
  })

  return (
    <SearchBase>
      <SearchInput
        placeholder='Search'
        onKeyDown={(e) => handleSearch(e.key)}
        onChange={(e) => setInput(e.target.value)}
        value={input}
      />
      <SearchSubmit
        disableRipple
        onClick={() => handleSearch()}
      >
        <SearchIcon />
      </SearchSubmit>
    </SearchBase>
  )
}