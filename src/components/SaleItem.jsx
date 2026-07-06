import { useState, useEffect } from "react"
import axios from "axios"
import api from "../api/client"
import { checkImageExists } from "../api/helper"
import { Pencil } from "lucide-react"

const SaleItem = ({name, desc, icon, onSale, handleEdit}) => {
    const [source, setSource] = useState("")

    useEffect(() => {
        const getIcon = async () => {
            try {
                const res = await api.get(`/products/url?key=${icon}`)
                const imageUrl = res.data.url 
                
                if (!checkImageExists(imageUrl)) { // checking for bad url
                    setSource("")
                    console.log(imageUrl)
                } else {
                    setSource(imageUrl)
                    console.log(imageUrl)
                }
            } catch (err) {
                console.error("Failed to retreive presigned image: ", err)
            }
        }
        getIcon()
    }, [])
    return (
        <div className="flex flex-col w-72 bg-slate-50 outline-solid outline-1 cursor-pointer overflow-hidden hover:shadow-lg shadow-md rounded-xl transition duration-200 ease-in-out">
            <div className="relative">
                <img
                src={source !== "" ? source : "/assets/no-icon.png"}
                className="p-2 w-full h-48 object-cover rounded-md"
                alt={desc}>
                    
                </img>
                {onSale===1 && 
                (<span className="absolute left-3 top-3 rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white">
                    On Sale
                </span>)}
                <button
                onClick={handleEdit}
                className="absolute right-3 top-3 rounded-full bg-white p-2 text-gray-700 shadow hover:bg-gray-100"
                aria-label="Edit item"
                >
                    <Pencil size={16} />
                
                </button>
            </div>
           
            
            
            <div className="flex flex-col p-2"> 
                <span className="font-medium">
                    {name}
                </span>
                <span>
                    {desc}
                </span>
            </div>
        </div>
    )
}

export default SaleItem