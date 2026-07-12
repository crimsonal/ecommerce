const ModalCheckboxInput = ({label, val, input}) => {
    return (
        <div>
            <label>{label}</label>
            <input
            type="checkbox"
            checked={val}
            onChange={(e) => input(e.target.checked)}
            className="ml-3"
            >
            </input>
        </div>
    )
}

export default ModalCheckboxInput