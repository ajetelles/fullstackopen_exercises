import Results from './Results'
import Info from './Info'

const Country = ({ countries, numbercountry, setFilter }) => {
    console.log("number coutnry", numbercountry)
    // console.log("countries", countries[0].capital)
    //convert languages from object to array
    if (numbercountry === 0) {
        return(
            <div></div>
        )
    } else if (numbercountry === 1) {
        console.log(countries[0].languages)
        // const languages = Object.values(countries[0].languages)
        return(
            <Info country={countries[0]} />
        )
    } else if (numbercountry <= 10) {
        // create an array listing the countries' common names
        const countrylist = countries.map(country => {
            return country.name.common
        })
        console.log(countrylist)
        return(
            <div>
                {countrylist.map(countryname => 
                    <Results item={countryname} setFilter={setFilter}/>
                    )} 
            </div>
        )
    } else {
        return (
            <div>
                <p>Too many matches, specify another filter</p>
            </div>
        )
    }
}

export default Country

