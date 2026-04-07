import { useNavigate } from "react-router-dom"

const Home = () => {
    const tagLine = "Find what you need without the hassle. We bring together great products and better value. Enjoy shopping the way it should be."
    const navigate = useNavigate()
    return (
        <div className="w-full h-full overflow-hidden">
            <div className="mx-20 my-40 w-96">
                <p className="text-3xl">
                    {tagLine}
                </p>
                <button onClick={() => navigate('/shop')} className="mx-10 my-4 w-60 h-8 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:outline-none focus:ring-blue-300 text-white rounded-md text-lg box-border border border-transparent focus:ring-4 shadow-xs rounded-base">
                    Start shopping
                </button>
            </div>
            
        </div>
    )

}
{/* <button type="button" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5">Blue</button> */}
export default Home