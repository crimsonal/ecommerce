const Navbar = () => {
    return (
        <nav className="flex bg-blue-500 shadow-md fixed w-full top-0">
            <div className="navbar-left mx-3">
                <img className= "w-12" src="src/assets/shop.png" />
            </div>
            <div className="flex font-bold items-center menu">
                <ul className="flex gap-4 my-4">
                    <li>Shop</li>
                    <li>About</li>
                    <li>Contact</li>
                </ul>
            </div>
            <div className="navbar-left flex font-bold items-center right-0">
                <ul className="flex gap-4">
                    <li>Login</li>
                    <li>Signup</li>
                </ul>
            </div>
        </nav>

    )

}

export default Navbar