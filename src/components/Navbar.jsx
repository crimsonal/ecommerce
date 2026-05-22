import {Link} from "react-router-dom"

const Navbar = ({cart}) => {
  return (
    <nav className="top-0 left-0 z-50 flex h-16 w-full items-center justify-between bg-blue-500 shadow-md">
      <div className="navbar-left mx-3">
        <Link to="/">
          Nova Market
        </Link>
      </div>
      <div className="menu flex items-center font-bold">
        <ul className="group flex gap-4 hover:*:bg-black/10 hover:*:rounded-lg" >
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
      <div className="navbar-left mx-3 flex items-center font-bold">
        <ul className="flex gap-4">
          <li>
            Cart: 0
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  )

}

export default Navbar
