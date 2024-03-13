import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

export function Navbar() {
    const { isAuthenticated, logout, user } = useAuth();

    return (
        <nav className='flex items-center justify-between bg-zinc-800 p-4'>
        <div className="flex gap-x-2">
            <Link to='/' className='text-white px-4 py-2'>Home</Link>
            <Link to={
                isAuthenticated ? '/tasks' : '/'
            } className='text-white px-4 py-2'>Tasks</Link>
        </div>
            {
                isAuthenticated ? (
                    <div className='flex items-center'>
                        <p className='text-white px-4 py-2 md ml-4'>Hi {user.username}</p>
                        <Link to='/tasks/create' className="bg-blue-400 text-white px-4 py-2 rounded-md ml-4">Add Task</Link>
                        <button onClick={logout} className='bg-red-500 text-white px-4 py-2 rounded-md ml-4'>Logout</button>
                    </div>
                ) : (
                    <div className='flex items-center'>
                        <Link to='/login' className='bg-blue-400 text-white px-4 py-2 rounded-md ml-4'>Login</Link>
                        <Link to='/register' className='bg-blue-400 text-white px-4 py-2 rounded-md ml-4'>Register</Link>
                    </div>
                )
            }
        </nav>
    )
}

export default Navbar;
