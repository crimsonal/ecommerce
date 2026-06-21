const Modal = ({title}) => {


    return (
        <div className="flex justify-center items-center absolute  w-full h-full z-50 bg-slate-900/60 p-3 backdrop-blur-sm scrollbar-none overflow-hidden overflow-y-auto">
            <div class="shadow-2xl rounded-sm p-6 h-60 max-w-lg w-full bg-white">
                <h3 class="w-full justify-center items-center text-lg font-bold text-slate-900">{title}</h3>
            </div>
        </div>
    )

}

export default Modal