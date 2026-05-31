import { useState } from "react"
import Card from "../components/Card"
import api from "../api/client.js"
const Signup = () => {
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    

    const handleClear = () => {
        setEmail("")
        setPassword("")
        setUsername("")
        setConfirm("")
        setError(null)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        setSuccess(null)
        
        const trimmedEmail = email.trim().toLowerCase()
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const usernameRegex = /^[a-zA-Z0-9]+$/;

        if (!trimmedEmail || !password || !confirm || !username) {
            setError("Email, username, password, and confirm passwod are required.")
            return;
        }



        if (!emailRegex.test(trimmedEmail)) {
            setError("Please enter a valid email address.")
            return;
        }

        if (!usernameRegex.test(username)) {
            setError("Only alphanumeric characters are allowed in username.")
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters.")
            return;
        }

        if (username.length < 6) {
            setError("Username must be at least 6 characters.")
            return;
        }

        if (password !== confirm) {
            setError("Passwords do not match.")
            return;
        }

        setLoading(true)
        try{
            await api.post("/auth/register/", {
                email: trimmedEmail,
                username: username,
                password: password
            })
            setSuccess("Account created. You can log in now.")
            setPassword("")
            setConfirm("")
        } catch(e) {
            setError(`${e}`)
        } finally {
            setLoading(false)
        }
        setLoading(false)
        
    }
    return (
        <div className="flex flex-col w-full h-full p-5 overflow-hidden">
            <Card title="Signup">
                {error && <div className="text-red-500 mb-3 -mt-2">❌ Error: {error}</div>}
                {success && <div className="text-green-700 mb-3 -mt-2">✅ Success: {success}</div>}
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
                    <label className="block text-sm font-medium text-bg-500">Username</label>
                    <div>
                        <input
                        type="text"
                        value={username}
                        onInput={(e)=> setUsername(e.target.value)}
                        placeholder="Username"
                        className="w-full bg-transparent px-3 py-3 outline-none text-sm">
                        </input>
                    </div>
                    <label className="block text-sm font-medium text-bg-500">Password</label>
                    <div>
                        <input
                        type="password"
                        value={password}
                        onInput={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full bg-transparent px-3 py-3 text-sm outline-none">
                        </input>
                    </div>
                    {/* Repeat password */}
                    <label className="block text-sm font-medium text-bg-500">Repeat password</label>
                    <div>
                        <input
                        type="password"
                        value={confirm}
                        onInput={(e) => setConfirm(e.target.value)}
                        placeholder="Repeat password"
                        className="w-full bg-transparent px-3 py-3 text-sm outline-none">
                        </input>
                    </div>

                    <div className= "flex items-center gap-3 pt-2">
                        <button 
                        type="submit"
                        onClick={handleSubmit}>
                            { !loading ? "Signup" : "Creating.."}
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