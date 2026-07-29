const Modal = ({title, onClose, error, info, children}) => {


    return (
        <div className="flex justify-center fixed items-center w-full h-full z-50 bg-slate-900/60 p-3 backdrop-blur-sm scrollbar-none overflow-hidden overflow-y-auto">
            <div className="flex flex-col shadow-2xl rounded-sm p-6 h-1/2 max-w-lg w-full bg-white">
                <div className="flex">
                    <h3 className="w-full justify-center items-center text-lg font-bold text-slate-900">{title}</h3>
                    <button onClick={onClose}>close</button>
                </div>
                {error && <div className="text-red-500 mt-5">❌ Error: {error}</div>}
                {info && <div className="text-blue-500 mt-5">ℹ️ Info: {info}</div>}
                <div className="flex flex-col flex-1 p-5">
                    {children}
                </div>
            </div>
        </div>
    )

}

export default Modal