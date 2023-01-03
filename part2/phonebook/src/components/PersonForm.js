const InputBox = ({text, value, onChange}) => {
    return (
        <div>
            {text}:
            <input 
                value={value}
                onChange={onChange}
            />
        </div>
    )
}

const PersonForm =(props) => {
    const { onSubmit, nameValue, onNameChange, numberValue, onNumberChange } = props
    
    return (
        <form onSubmit={onSubmit}>
            <h2>add a new</h2>
            <InputBox
                text="name"
                value={nameValue}
                onChange={onNameChange}
            />
            <InputBox 
                text="number"
                value={numberValue}
                onChange={onNumberChange}
            />
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm