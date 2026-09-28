import CartCard from "../components/CartCard"
const Cart = ({cart, setCart}) => {
    
    return (

        <div className="flex flex-col w-full h-full p-5 overflow-hidden">
            <h1 className="text-xl text-center font-bold mt-5">Your Shopping Cart</h1>
            <div className="flex flex-col overflow-auto">
                {cart.map((item) => (
                    <CartCard key={item.productId} item={item}/>
                ))}
            </div>
            
        </div>
    
    
    )

}

export default Cart