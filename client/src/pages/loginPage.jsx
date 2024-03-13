import {useForm} from 'react-hook-form'
import { useAuth } from '../context/authContext';
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function LoginPage() {
    const {register, handleSubmit, formState: {errors} } = useForm();
    const {signin, isAuthenticated, errors: loginError} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) navigate("/tasks");
    }, [isAuthenticated, navigate]);

    const onSubmit = handleSubmit(async (values) => {
       await signin(values);
    });

    return (
      <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
        <div className='bg-zinc-800 max-w-md p-10 rounded-md'>
            <h1 className='text-3xl text-white mb-4'>Login</h1>
            {
                loginError.map((error, index) => (
                    <div className='bg-red-500 p-2 text-white my-2' key={index}>{error}</div>
                ))
            }
            <form onSubmit={onSubmit}>
                <input type="email" placeholder="Email" {
                    ...register("email", {required: true})
                } className='w-full bg-white text-black px-4 py-2 rounded-md my-2' />
                {errors.email && (
                    <span className='text-red-500'>Email is required</span>
                )}
                <input type="password" placeholder="Password" {
                    ...register("password", {required: true})
                } className='w-full bg-white text-black px-4 py-2 rounded-md my-2' />
                {errors.password && (
                    <span className='text-red-500'>Password is required</span>
                )}
                <button className='w-full bg-slate-500 text-white px-4 py-2 rounded-md my-2' type="submit">Login</button>
            </form>
            <p className='flex gap-x-2 justify-between text-white'>
                Do not have an account? <Link to="/register" className='text-sky-500'>Register</Link>
            </p>
        </div>
      </div>
  )
}

export default LoginPage