const SaleItem = ({name, desc, icon}) => {
    return (
        <div className="relative size-36 bg-slate-50 outline outline-solid outline-1 cursor-pointer">
            <img
            src={icon ? "" : "/assets/no-icon.png"}
            className="p-10 w-full h-auto -mt-5">
            </img>
            <div className="absolute bottom-0 left-0 right-0 flex flex-col p-2"> 
                <span className="font-medium">
                    {name}
                </span>
                <span>
                    {desc}
                </span>
            </div>
        </div>
    )
}

export default SaleItem