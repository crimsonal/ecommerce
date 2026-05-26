const Card = ({title, children}) => {
    return (
        <section className="border border-blue-500">
            <div className="px-5 pt-6">
               {title ? <h2 className="text-base font-semibold text-slate-900">{title}</h2> : null}
            </div>
            <div className="px-6 pb-6 pt-5">{children}</div>
        </section>
    )
}

export default Card