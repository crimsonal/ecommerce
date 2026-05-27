import {Link} from "react-router-dom"

const Navbar = ({cart, user, onLogout}) => {
  return (
    <nav className="top-0 left-0 z-50 flex h-10 w-full items-center justify-between bg-blue-500 shadow-md">
      <div className="navbar-left mx-3 font-bold">
        <Link to="/">
          Nova Market
        </Link>
      </div>
      <div className="menu flex items-center font-bold">
        <ul className="group flex gap-4 hover:*:bg-black/10 hover:*:rounded-lg *:font-light" >
          <li>
            <Link className="" to="/shop">Shop</Link>  
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-left mx-4 flex items-center font-bold">
        <ul className="flex gap-4">
          <li>
            <Link to="/cart">
              <div className="relative w-max hover:-translate-y-1 transition-transform duration-300 ease-in-out">
                <img src="/assets/shopping-bag.png" className="block w-8"></img>
                <div className="absolute inset-0 flex -ml-1.5 -mb-1.5 items-center justify-center">
                  <h2 className="text-white font-light">0</h2>
                </div>
              </div>
            </Link>
          </li>
          <li className="flex items-center justify-center hover:*:rounded-lg hover:*:bg-black/10">
            <Link className="text-center font-light" to="/login">Login</Link>
          </li>
          <li className="flex items-center justify-center hover:*:rounded-lg hover:*:bg-black/10">
            <Link className="text-center font-light" to="/signup">Signup</Link>
          </li>
        </ul>
      </div>
    </nav>
  )

}

export default Navbar
