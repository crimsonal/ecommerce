import SaleItem from "../components/SaleItem"
import Modal from "../components/Modal.jsx"
import api from "../api/client.js"
import axios from "axios";
import { getToken } from "../api/auth.js";
import { useState } from "react"
const Sell = ({userId}) => {
    const [creatingProduct, setCreatingProduct] = useState(false)
    const [creatingName, setCreatingName] = useState("")
    const [creatingDescription, setCreatingDescription] = useState("")
    const [selectedFile, setSelectedFile] = useState(null)
    const [uploadStatus, setUploadStatus] = useState("idle")
    const [previewUrl, setPreviewUrl] = useState('')
    
    
    const products = [
        {id: 0, product_name: "Pencil", product_description: "write", product_image: null}
    ]

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
        
        //product_name, product_description, product_image

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
                    <div className="flex rounded-lg shadow-lg w-full h-[50vh] bg-slate-100 p-5">
                        {products.map((product) => (
                            <SaleItem key={product.id} icon={product.product_image} name={product.product_name} desc={product.product_description}/>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex justify-center items-center h-full">
                <div className="p-5 w-full h-full">
                    <label className="block text-sm font-medium text-bg-500">Items on sale</label>
                    <div className="flex rounded-lg shadow-lg w-full h-[25vh] bg-slate-100 p-5">
                        {products.map((product) => (
                            <SaleItem key={product.id} icon={product.product_image} name={product.product_name} desc={product.product_description}/>
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