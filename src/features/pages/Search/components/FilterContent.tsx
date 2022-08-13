import { Divider } from "@mui/material"
import FilterList from "./FilterList"

export default function FilterContent() {
  return <>
    <FilterList name={'tags'} displayName={'Product Type'} items={[
      'base',
      'dlc',
      'prepaid',
      'software'
    ]}/>
    <Divider />
    <FilterList name={'platform'} displayName={'Platform'} items={[
      'Steam',
      'PlayStation 5',
      'PlayStation 4',
      'XBOX Series X|S',
      'XBOX ONE',
      'Nintendo'
    ]}/>
    <Divider />
    <FilterList name={'genre'} displayName={'Genre'} items={[
      'Action',
      'Adventure',
      'Anime',
      'Casual',
      'Co-op',
      'Dating Simulator',
      'Fighting',
      'FPS',
      'Hack and Slash',
      'Hidden Object',
      'Horror',
      'Indie',
      'Life Simulation',
      'MMO',
      'Music / Soundtrack',
      'Online Courses',
      'Open World',
      'Platformer',
      'Point & click',
      'Puzzle',
      'Racing',
      'RPG',
      'Simulation',
      'Software',
      'Sport',
      'Story rich',
      'Strategy',
      'Subscription',
      'Survival',
      'Third-Person Shooter',
      'Visual Novel',
      'VR Games'
    ]}/>
  </>
}