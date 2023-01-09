import React from "react"

const Result = ({item, setFilter}) => {
    return (
        <React.Fragment>
            {item} 
            <button onClick={() => setFilter(item)}>
                show
            </button>
            <br/>
        </React.Fragment>
    )
}

export default Result