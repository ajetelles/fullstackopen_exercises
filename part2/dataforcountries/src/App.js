import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Country from './components/Country'

const App = (props) => {
  const [countries, setCountries] = useState([])
  const [newFilter, setFilter] = useState('')
  const [showCountry, setShowCountry] = useState(false)

  const hook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }
  useEffect(hook, [])
  console.log(countries.length, 'countries in server')

  const countriesToShow = showCountry
    ? countries.filter(country => country.name.common.toLowerCase().includes(newFilter.toLowerCase()))
    : []
  // if countriesToShow.length === 0, show nothing
  // if countriesToShow.length <= 10 but not 0, show matches
  // if countriesToShow.length > 10, say there are too many matches
  // if countriesToShow.length === 1, show all info

  const handleFilter = (event) => {
    setFilter(event.target.value)
    console.log(newFilter)
    setShowCountry(newFilter !== '')
    console.log(showCountry)
  }

  console.log('countries to show',countriesToShow)

  return(
    <div>
      <Filter 
        value={newFilter}
        onChange={handleFilter}
      />
      <Country
        countries={countriesToShow}
        numbercountry={countriesToShow.length}
      />
      {console.log("test")}
    </div>
  )
  
}

export default App

// stopped 20221212 17:29, exercise 2.12
// fix console logs to understand why countriesToShow become 250 countries