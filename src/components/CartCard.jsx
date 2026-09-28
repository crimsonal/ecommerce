import { useEffect, useState } from "react"
import { getAndSetIcon } from "../api/helper"

const CartCard = ({ item }) => {

    const [source, setSource] = useState(null)

    useEffect(() => {
        console.log(item)
        getAndSetIcon(item.product_image, setSource)
    }, [])
    return (
        <div className="flex flex-row w-full rounded-xl bg-white shadow-md hover:shadow-xl transition mb-5">
            <div className="w-48 h-48">
                <img
                    src={source}
                    className="object-cover w-full h-full p-5"
                >

                </img>
            </div>
            <div className="flex flex-row w-full">
                <div className="">
                    <p className="font-bold">{item.product_name}</p>
                    <p>Product #{item.productId}</p>
                    
                    <div className="flex">
                        <p className="mr-2">Qty: </p> <input type="number" value={item.qty} max="99" step="1" />
                    </div>
                </div>
                
                <p className="ml-auto">Price: ${item.price.toFixed(2)}</p>
            </div>


        </div>
    )
}

export default CartCard