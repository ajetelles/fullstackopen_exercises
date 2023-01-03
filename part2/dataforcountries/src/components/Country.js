const Country = ({ countries, numbercountry }) => {
    console.log("number coutnry", numbercountry)
    console.log("countries", countries[0].name.capital)
    if (numbercountry === 1) {
        return(
            <div>
            <h1>{countries[0].name.common}</h1>
            <p>capital {countries[0].capital}</p>
            </div>
        )
    } 
}

export default Country

