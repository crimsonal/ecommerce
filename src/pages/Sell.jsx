import SaleItem from "../components/SaleItem"
import Modal from "../components/Modal.jsx"
import { useState } from "react"
const Sell = () => {
    const [creatingProduct, setCreatingProduct] = useState(false)
    
    const products = [
        {product_name: "Pencil", product_description: "write", product_image: null}
    ]


    return (
        <div className="flex flex-col w-full h-full overfow-hidden flex-1 scrollbar-none overflow-hidden">
            <nav className="bg-slate-400 h-10 p-1">
                <button className="rounded-full w-36 font-bold h-full bg-slate-500"
                onClick={() => {setCreatingProduct(true)}}>
                    Create product
                </button>
            </nav>
            <div className="flex justify-center items-center h-full">
                <div className="p-5 w-full h-full">
                    <label className="block text-sm font-medium text-bg-500">Items on sale</label>
                    <div className="flex rounded-lg shadow-lg w-full h-[50vh] bg-slate-100 p-5">
                        {products.map((product) => (
                            <SaleItem icon={product.product_image} name={product.product_name} desc={product.product_description}/>
                        ))}
                    </div>
                </div>
            </div>
            {creatingProduct && <Modal title="Create product"/>}
        </div>
    )

}

export default Sell