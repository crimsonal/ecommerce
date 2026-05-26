import { useState } from "react"
import Card from "../components/Card"
import api from "../api/client.js"
const Signup = () => {
    const [email, setEmail] = useState("")
    const [password1, setPassword1] = useState("")
    const [password2, setPassword2] = useState("")
    const [error, setError] = useState(null)
    

    const handleClear = () => {
        setEmail("")
        setPassword1("")
        setPassword2("")
        setError(null)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setError(null)

    }
    return (
        <div className="flex flex-col w-full h-full p-5 overflow-hidden">
            <Card title="Signup">
                {error && <div className="text-red-500 mb-3 -mt-2">❌ Error: {error}</div>}
                <form>
                    <label className="block text-sm font-medium text-bg-500">Email</label>
                    <div>
                        <input type="email"
                                value={email}
                                onInput={(e) => setEmail(e.target.value)}
                                placeholder="user@domain.com"
                                className="w-full bg-transparent px-3 py-3 outline-none text-sm">
                        </input>
                    </div>
                    <label className="block text-sm font-medium text-bg-500">Password</label>
                    <div>
                        <input
                        type="password"
                        value={password1}
                        onInput={(e) => setPassword1(e.target.value)}
                        placeholder="Password"
                        className="w-full bg-transparent px-3 py-3 text-sm outline-none">
                        </input>
                    </div>
                    {/* Repeat password */}
                    <label className="block text-sm font-medium text-bg-500">Repeat password</label>
                    <div>
                        <input
                        type="password"
                        value={password2}
                        onInput={(e) => setPassword2(e.target.value)}
                        placeholder="Repeat password"
                        className="w-full bg-transparent px-3 py-3 text-sm outline-none">
                        </input>
                    </div>

                    <div className= "flex items-center gap-3 pt-2">
                        <button 
                        type="submit"
                        onClick={handleSubmit}>
                            Signup
                        </button>
                        <button
                        type="button"
                        onClick={handleClear}
                        >Clear</button>

                    </div>
                </form>
            </Card>

        </div>

    )

}

export default Signup