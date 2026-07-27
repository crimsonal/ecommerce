import SaleItem from "../components/SaleItem"
import Modal from "../components/Modal.jsx"
import ModalTextInput from "../components/ModalTextInput.jsx";
import ModalFileInput from "../components/ModalFileInput.jsx";
import ModalCheckboxInput from "../components/ModalCheckboxInput.jsx";
import api from "../api/client.js"
import axios from "axios";
import { getToken } from "../api/auth.js";
import { useState, useEffect } from "react"
const Sell = ({userId}) => {
    const [creatingProduct, setCreatingProduct] = useState(false)
    const [creatingDescription, setCreatingDescription] = useState("")
    const [creatingName, setCreatingName] = useState("")
    const [selectedFile, setSelectedFile] = useState(null)

    const [editingProduct, setEditingProduct] = useState(false)
    const [productEditingId, setProductEditingId] = useState(0)
    const [editingName, setEditingName] = useState("")
    const [editingDescription, setEditingDescription] = useState("")
    const [editingOnSale, setEditingOnSale] = useState(false)
    const [editingPrice, setEditingPrice] = useState(0)
    const [editingPending, setEditingPending] = useState(false)
    
    
    const [uploadStatus, setUploadStatus] = useState(false)
    const [previewUrl, setPreviewUrl] = useState('')

    const [products, setProducts] = useState([])
    const [productsMap, setProductsMap] = useState(new Map(null))
    
    
    useEffect(() => {
        const initProducts = async () => {
            try {
                const res = await api.get("/user/products")
                const productsArray = res.data.products
                setProducts(productsArray)
                setProductsMap(new Map(productsArray.map(product => [product.id, product])))
            } catch (err) {
                console.error("Failed to load products: ", err)
            } 
        }
        initProducts()
        
    }, [])

    const handleCreateProductModalClose = () => {
        // defaults
        setCreatingProduct(false)
        setCreatingName("")
        setCreatingDescription("")
        setSelectedFile(null)
    } 

    const handleEditProductModalClose = () => {
        setEditingProduct(false)
        setProductEditingId(0)
    }

    const handleCreateProductButton = async () => {
        // add check to see if creatingProduct is not true
        if (!uploadStatus) {
            setUploadStatus(true)
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
            setUploadStatus(false)
        }
    }

    const handleEditProductButton = async () => {
        // TODO: Ensure productPrice is within limits (i.e., >0)
        if (editingProduct && !editingPending) {
            if (editingOnSale && editingPrice === 0) {
                console.log("price must be higher")
                return
            }
            setEditingPending(true)
            const res = await api.post("/shop/update", {
                onSale: editingOnSale,
                productId: productEditingId,
                productName: editingName,
                productDescription: editingDescription,
                productPrice: editingPrice
            })
            setEditingPending(false)
        }

    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]

        if (file) {
            setSelectedFile(file)
        }
    }   

    const handleProductSaleToggle = (value) => {
        setEditingOnSale(value)
    }

    const handleEdit = (id)  => {
        if (!editingProduct && !creatingProduct) {
            if (productsMap.has(id)) {
                const product = productsMap.get(id)
                setEditingProduct(true)
                setProductEditingId(id)
                setEditingName(product.product_name)
                setEditingDescription(product.product_description)
                setEditingOnSale(product.onSale)
                setEditingPrice(product.price !== null ? product.price : 0)

                
            }
        }
    }

    const handleBlur = () => {
        const num = parseFloat(editingPrice)
        if (!isNaN(num)) {
            setEditingPrice(num.toFixed(2))
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
                            <SaleItem key={product.id} id={product.id} icon={product.product_image} name={product.product_name} desc={product.product_description} onSale={product.onSale} handleEdit={handleEdit}/>
                        ))}
                    </div>
                </div>
            </div>

            {creatingProduct && 
            <Modal title="Create product" onClose={handleCreateProductModalClose}> 
                <div>
                    <ModalTextInput label="Product name" val={creatingName} input={setCreatingName}/>
                    <ModalTextInput label="Product description" val={creatingDescription} input={setCreatingDescription}/>
                    <ModalFileInput label="Product image" input={handleFileChange}/>
                </div>
                <button 
                className="mt-auto rounded bg-blue-500 p-2 font-light"
                onClick={handleCreateProductButton}

                >
                    Create product
                </button>
                
                
            </Modal>}

            {editingProduct && 
            <Modal title="Edit product" onClose={handleEditProductModalClose}>
                <div>
                    <ModalTextInput label="Product name" val={editingName} input={setEditingName}/>
                    <ModalTextInput label="Product description" val={editingDescription} input={setEditingDescription}/>
                    <div>
                        <ModalCheckboxInput label="On sale" val={editingOnSale} input={handleProductSaleToggle} />
                        <div className="flex flex-col">
                            <label>Product price</label>
                            <div className="flex items-center">
                                <span className="font-medium">$</span>
                                <input
                                type="number"
                                min="0.00"
                                step="0.01"
                                inputMode="decimal"
                                placeholder="0.00"
                                className="w-full p-3"
                                value={editingPrice}
                                onInput={(e) => setEditingPrice(e.target.value)}
                                onBlur={handleBlur}
                                required
                                >
                                </input>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <button 
                className="mt-auto rounded bg-blue-500 p-2 font-light"
                onClick={handleEditProductButton}

                >
                    Update product
                </button>
            </Modal>}
        </div>
    )

}

export default Sell