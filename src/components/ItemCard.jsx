import { useState, useEffect } from "react";
import { getAndSetIcon } from "../api/helper";
const ItemCard = ({
    icon,
    name,
    price,
    description,
    seller
}) => {

    const [source, setSource] = useState(null)
    const usdFormatter = new Intl.NumberFormat("en-us", {
        style: "currency",
        currency: "USD"
    })

    useEffect(() => {
        getAndSetIcon(icon, setSource)
    }, [])

    return (
        <div className="flex flex-col w-full rounded-xl bg-white shadow-md hover:shadow-xl transition overflow-hidden m-3">

            <div className="h-48 bg-gray-200">
                <img
                    src={source}
                    alt={name}
                    className="h-full w-full object-cover"
                />
            </div>

            <div className="flex flex-col flex-1 p-4">

                <h3 className="font-semibold text-lg line-clamp-1">
                    {name}
                </h3>

                <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                    {description}
                </p>

                <p className="text-xs text-gray-400 mt-2">
                    Sold by {seller}
                </p>

                <div className="mt-auto">

                    <p className="text-xl font-bold mt-3">
                        {usdFormatter.format(price)}
                    </p>

                    <button className="mt-3 w-full rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700 transition">
                        Add to Cart
                    </button>

                </div>

            </div>

        </div>
    );
};

export default ItemCard;