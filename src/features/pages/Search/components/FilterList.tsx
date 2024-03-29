import React, { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../../../state/hooks'

import log from '../../../../utils/logger'

import { toggleListFilter } from '../../../../state/slices/filters.slice'

import {
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Checkbox,
  Box
} from '@mui/material'

type Props = {
  name: string
  displayName: string
  items: string[]
}

const FilterList = React.memo(function FilterList({ name, displayName, items }: Props) {
  const list = useAppSelector((state) => state.features.filters.products[name])
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
  
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant='subtitle2'>
        {displayName}
      </Typography>
      <List>
        {items.map((filter) => {
          const checked = list.indexOf(filter) !== -1
          return (
            <ListItem disablePadding key={filter}>
              <ListItemButton sx={{ p: 0 }} onClick={() => handleToggle(filter)} dense>
                <ListItemIcon sx={{ justifyContent: 'center' }}>
                  <Checkbox
                    sx={{ p: 0.75 }}
                    edge="start"
                    checked={checked}
                    tabIndex={-1}
                    disableRipple
                  />
                </ListItemIcon>
                <Typography
                  textTransform='capitalize'
                  color={checked ? 'white' : 'text.secondary'}
                  fontSize='0.8em'
                >
                  {filter === 'dlc' ? 'DLC' : filter}
                </Typography>
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
    </Box>
  )
})

export default FilterList