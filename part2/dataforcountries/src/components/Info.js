import List from './List'

const Info = ({country}) => {
    //convert languages from object to array
    const languages = Object.values(country.languages)
    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>
                capital {country.capital} <br/>
                area {country.area}
            </p>
            <b>languages:</b>
            <ul>
                {languages.map(language => 
                    <List item={language}/>
                )}
            </ul>
            <img src={country.flags.png} alt="flag"></img>
        </div>
    )
}

export default Info