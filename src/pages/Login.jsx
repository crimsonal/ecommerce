import Card from "../components/Card"
import { useCallback, useState } from "react"
const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)

    const handleClear = useCallback( () => {
        setEmail("")
        setPassword("")
    })
    return (
        <div className="flex flex-col w-full h-full overflow-hidden p-5">
                <Card title="Login">
                    <div>
                        Error
                    </div>
                    <form>
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
                            type="submit">Login</button>
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