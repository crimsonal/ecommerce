import { useState } from "react"
import ItemCard from "../components/ItemCard"
const Shop = () => {
    const [searchText, setSearchText] = useState("")
    const items = [
        {name: "Pencil", price: 1.99, description:"Writing utensil"},

    ]

    const handleSearchText = (event) => {
        setSearchText(event.target.value)
    }

    return (
        <div className="flex flex-col w-full h-full overflow-hidden flex-1">
            
            <div className="flex justify-center items-center search-block w-full h-40"> 
                <input type="text" placeholder="Search for an item.." onChange={handleSearchText} className="search-bar w-2/3 h-15 bg-gray-300 rounded-full shadow p-2" />
            </div>

            <div className="flex items-block w-full flex-grow p-10 border-solid border-t-2 border-gray-400">
                {items.map((card) => (
                    <ItemCard name={card.name} price={card.price} description={card.description}/>
                ))}
            </div>

        </div>

    )

}

export default Shop