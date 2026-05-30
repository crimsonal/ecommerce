import { useState } from "react"
import api from "../api/client.js"
import ItemCard from "../components/ItemCard"
import { useEffect } from "react"
const Shop = () => {
    const [searchText, setSearchText] = useState("")
    const [shops, setShops] = useState([])
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    // const items = [
    //     {name: "Pencil", price: 1.99, description:"Writing utensil"},

    // ]
    const handleSearchText = (event) => {
        setSearchText(event.target.value)
    }

    useEffect(() => {
        async function loadShop() {
            const shop_data = await api.get("/shop")
            setShops(shop_data.data.shop)
            for (const shop of shop_data.data.shop) {
                const product = await api.get(`/products/${shop.product_id}`)
                const newProducts = [...products, product.data]
                setProducts(newProducts)
            }
            setLoading(false)
        }
        loadShop()
    }, [])

    const getProduct = (id) => {
        for (const product of products) {
            if (product.id === id) {
                return product
            }
        }
        return null
    }

    const getProductName = (id) => {
        const product = getProduct(id)
        if (product !== null) {
            return product.product_name
        }
        return "n/a"
    }

    const getProductDescription = (id) => {
        const product = getProduct(id)
        if (product !== null) {
            return product.product_description
        }
        return "n/a"
    }


    return (
        <div className="flex flex-col w-full h-full overflow-hidden flex-1">
            
            <h1 className="flex text-2xl bg-clip-text bg-gradient-to-r from-blue-500 to-blue-500 text-transparent justify-center font-[inter] mt-10 font-semibold">What are you shopping for today?</h1>
            <div className="flex justify-center items-center search-block w-full h-40 -mt-10"> 
                <input type="text" placeholder="Search for an item.." onChange={handleSearchText} className=" text-sm search-bar w-2/3 h-15 rounded-md shadow p-2" />
            </div>

            <div className="flex items-block w-full flex-grow p-10 border-solid border-gray-400">
                {shops.map((product) => (
                    
                    <ItemCard key= {product.shop_id }name={getProductName(product.product_id)} price={product.price} description={getProductDescription(product.product_id)}/>
                ))}
            </div>
        </div>

    )

}

export default Shop