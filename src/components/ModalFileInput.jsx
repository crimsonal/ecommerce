const ModalFileInput = ({label, input}) => {
    return (
        <div>
            <label>{label}</label>
            <input
            type="file"
            accept="image/*"
            onChange={input}>
            </input>
        </div>
      
    )
}

export default ModalFileInput