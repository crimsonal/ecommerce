const ModalTextInput = ({label, val, input}) => {
    return (
        <div>
            <label>{label}</label>
            <input
            type="text"
            value={val}
            onInput={(e)=> input(e.target.value)}
            placeholder={label}
            className="w-full p-3 text-sm">
            </input>  
        </div>
      
    )
}

export default ModalTextInput