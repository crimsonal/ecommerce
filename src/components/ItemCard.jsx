const ItemCard = ({name, price, description}) => {
    return (
        <div className="flex flex-col p-2 h-60 w-40 bg-gray-300 rounded-md shadow m-2">
            <h3>{name}</h3>
            <h4>${price}</h4>
            <p>{description}</p>
            <button className="mt-auto bg-gray-200 rounded-sm">Add to cart</button>
        </div>

    )

}

export default ItemCard;