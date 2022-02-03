import { useLocation } from "react-router-dom"

import { Divider } from "@mui/material"
import FilterList from "./FilterList"

export default function FilterContent() {
  const subject = useLocation().pathname.substring(1)

  switch (subject) {
    case 'products':
      return <>
        <FilterList name={'tags'} displayName={'Product Type'} items={[
          'base', 'dlc', 'prepaid'
        ]}/>
        <Divider sx={{ mb: 2, mt: 1 }} />
        <FilterList name={'platform'} displayName={'Platform'} items={[
          'Steam', 'PlayStation 5', 'PlayStation 4', 'XBOX Series X|S', 'XBOX ONE', 'Nintendo'
        ]}/>
        <Divider sx={{ mb: 2, mt: 1 }} />
        <FilterList name={'genre'} displayName={'Genre'} items={[
          'Action', 'RPG', 'Indie', 'Adventure', 'Horror'
        ]}/>
      </>
    default:
      return <></>
  }
}