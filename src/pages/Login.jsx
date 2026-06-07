import Card from "../components/Card"
import { useCallback, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/client.js"
import { setToken } from "../api/auth.js"
const Login = ({onLoggedIn, setInitial}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const handleClear = useCallback( () => {
        setEmail("")
        setPassword("")
        setError(null)
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)

        const trimmedEmail = email.trim().toLowerCase();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        

        if (!trimmedEmail || !password) {
            setError("Email and password are required.")
            return;
        }

        if (!emailRegex.test(trimmedEmail)) {
            setError("Please enter a valid email address.")
        }

        setLoading(true)

        try {
            const loginRes = await api.post("/auth/login/", {
                email: trimmedEmail,
                password: password
            })
            if (!loginRes.data.token) {
                throw new Error ("No token available for user")
            }
            setToken(loginRes.data.token)
            const me = await api.get("/user/me/")
            const user = {
                id: me.data.id,
                email: me.data.email,
                username: me.data.username
            }
            onLoggedIn(user)

            setInitial( user.username ? user.username.substring(0, 1).toUpperCase() : "👤")

            navigate("/shop")
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }


    }
    return (
        <div className="flex flex-col w-full h-full overflow-hidden p-5">
                <Card title="Login">
                    <div></div>
                    <form>
                        {error && <div className="text-red-500 mb-3 -mt-2">❌ Error: {error}</div>}
                        <label className="block text-sm font-medium text-bg-500">Email</label>
                        <div>
                            <input type="email"
                                    value={email}
                                    onInput={(e) => setEmail(e.target.value)}
                                    placeholder="user@domain.com"
                                    className="w-full bg-transparent px-3 py-3 text-sm outline-none">

                            </input>
                        </div>


                        <label className="block text-sm font-medium text-bg-500">Password</label>
                        <div>
                            <input type="password"
                                    value={password}
                                    onInput={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                    className="w-full bg-transparent px-3 py-3 text-sm outline-none"
                                    autoComplete="current-password">
                            </input>
                        </div>

                        <div className="flex items-center gap-3 pt-2">
                            <button
                            type="submit"
                            onClick={handleSubmit}>{loading ? "Signing in..." : "Login"}</button>
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

export default Login