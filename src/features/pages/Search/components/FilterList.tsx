import React, { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../../../state/hooks'
import { useLocation } from 'react-router-dom'

import log from '../../../../utils/logger'

import { toggleListFilter } from '../../../../state/slices/FilterSlice'

import {
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox
} from '@mui/material'

type Props = {
  name: string
  displayName: string
  items: string[]
}

const FilterList = React.memo(function FilterList({ name, displayName, items }: Props) {
  const subject = useLocation().pathname.substring(1)

  const list = useAppSelector((state) => state.features.filters[subject][name])
  const dispatch = useAppDispatch()
  
  // log mounts
  useEffect(() => {
    const data = { displayName }
    log('navy', 'Comp: FilterDrawer/FilterList Mounted', data)
    return () => log('darkred', 'Comp: FilterDrawer/FilterList Unmounted', data)
  })
  
  const handleToggle = (filter: string) => {
    dispatch(toggleListFilter({ name, filter }))
  }

  if (!Array.isArray(list)) return <p>Not a list</p>

  return <>
    <Typography variant='subtitle2'>
      {displayName}
    </Typography>
    <List>
      {items.map((filter) => (
        <ListItem disablePadding key={filter}>
          <ListItemButton onClick={() => handleToggle(filter)} dense>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={list.indexOf(filter) !== -1}
                tabIndex={-1}
                disableRipple
              />
            </ListItemIcon>
            <ListItemText sx={{ ml: -2 }} primary={filter.toUpperCase()} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </>
})

export default FilterList