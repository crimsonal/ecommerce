import { useState } from "react"
import api from "../api/client.js"
import ItemCard from "../components/ItemCard"
const Shop = () => {
    const [searchText, setSearchText] = useState("")
    const items = [
        {name: "Pencil", price: 1.99, description:"Writing utensil"},

    ]
    console.log(api.get("/shop"))
    const handleSearchText = (event) => {
        setSearchText(event.target.value)
    }

    return (
        <div className="flex flex-col w-full h-full overflow-hidden flex-1">
            
            <h1 className="flex text-2xl bg-clip-text bg-gradient-to-r from-blue-500 to-blue-500 text-transparent justify-center font-[inter] mt-10 font-semibold">What are you shopping for today?</h1>
            <div className="flex justify-center items-center search-block w-full h-40 -mt-10"> 
                <input type="text" placeholder="Search for an item.." onChange={handleSearchText} className=" text-sm search-bar w-2/3 h-15 rounded-md shadow p-2" />
            </div>

            <div className="flex items-block w-full flex-grow p-10 border-solid border-gray-400">
                {items.map((card) => (
                    <ItemCard key= {card.toString() }name={card.name} price={card.price} description={card.description}/>
                ))}
            </div>

        </div>

    )

}

export default Shop