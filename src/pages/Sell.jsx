import SaleItem from "../components/SaleItem"
import Modal from "../components/Modal.jsx"
import api from "../api/client.js"
import axios from "axios";
import { getToken } from "../api/auth.js";
import { useState, useEffect } from "react"
const Sell = ({userId}) => {
    const [creatingProduct, setCreatingProduct] = useState(false)
    const [creatingName, setCreatingName] = useState("")
    const [creatingDescription, setCreatingDescription] = useState("")
    const [selectedFile, setSelectedFile] = useState(null)
    const [uploadStatus, setUploadStatus] = useState("idle")
    const [previewUrl, setPreviewUrl] = useState('')
    const [products, setProducts] = useState([])
    
    useEffect(() => {
        const initProducts = async () => {
            try {
                const res = await api.get("/user/products")
                console.log(res.data.products)
                setProducts(res.data.products)
            } catch (err) {
                console.error("Failed to load products: ", err)
            }
            
            
        }
        initProducts()
        
    }, [])

    const handleModalClose = () => {
        // defaults
        setCreatingProduct(false)
        setCreatingName("")
        setCreatingDescription("")
        setSelectedFile(null)
    } 

    const handleCreateProductButton = async () => {
        // add check to see if creatingProduct is not true
        const getUploadUrl = await api.post('/products/upload-url', {
            file_name: selectedFile.name
        })
        const {url} = getUploadUrl.data
        await axios.put(url, selectedFile, {
            headers: {'Content-Type': selectedFile.type}
        })

        const Key = `user-uploads/${userId}/${selectedFile.name}`
        

        await api.post("/products", {
            product_name: creatingName, 
            product_description: creatingDescription,
            product_image: Key
        })
        

    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]

        if (file) {
            setSelectedFile(file)
        }
    }   

    

    
    return (
        <div className="flex flex-col w-full h-full overfow-hidden flex-1 scrollbar-none overflow-hidden">
            <nav className="bg-slate-200 h-10 p-1">
                <button className="w-36 font-light h-full"
                onClick={() => {setCreatingProduct(true)}}>
                    Create product
                </button>
            </nav>
            <div className="flex justify-center items-center h-full">
                <div className="p-5 w-full h-full">
                    <label className="block text-sm font-medium text-bg-500">Your products</label>
                    <div className="flex flex-wrap justify-center gap-6 rounded-lg w-full h-[50vh] p-5">
                        {products.map((product) => (
                            <SaleItem key={product.id} icon={product.product_image} name={product.product_name} desc={product.product_description} onSale={product.onSale}/>
                        ))}
                    </div>
                </div>
            </div>

            {creatingProduct && 
            <Modal title="Create product" onClose={handleModalClose}> 
                <div>
                    <div>
                        <label>Product name</label>
                        <input
                        type="text"
                        value={creatingName}
                        onInput={(e)=> setCreatingName(e.target.value)}
                        placeholder="Product name"
                        className="w-full p-3 text-sm">
                        </input>
                    </div>
                    <div>
                        <label>Product description</label>
                        <input
                        type="text"
                        value={creatingDescription}
                        onInput={(e) => setCreatingDescription(e.target.value)}
                        placeholder="Product description"
                        className="w-full p-3 text-sm"></input>
                    </div>
                    <div>
                        <label>Product image</label>
                        <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}>
                        </input>
                    </div>
                </div>
                <button 
                className="mt-auto rounded bg-blue-500 p-2 font-light"
                onClick={handleCreateProductButton}

                >
                    Create product
                </button>
                
                
            </Modal>}
        </div>
    )

}

export default Sell