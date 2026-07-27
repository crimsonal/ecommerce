const Searchbar = ({handleSearchText}) => {
    
    return (
        <div className="flex justify-center py-8">
            <div className="relative w-full max-w-2xl">

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>

                <input
                    type="text"
                    placeholder="Search for products..."
                    onChange={(e) => handleSearchText(e)}
                    className="
                        w-full
                        rounded-xl
                        border
                        border-gray-300
                        bg-white
                        py-3
                        pl-12
                        pr-4
                        shadow-sm
                        transition
                        focus:border-blue-500
                        focus:outline-none
                        focus:ring-2
                        focus:ring-blue-300
                    "
                />

            </div>
        </div>
    )
}

export default Searchbar