import React, { useState } from 'react'
import loginlogo from '../../assets/Loginlogo.svg'
import loginphoto from '../../assets/Loginphoto.png'
import facebooklogo from '../../assets/facebook.svg'
import googlelogo from '../../assets/google.svg'
import { Link, useNavigate } from 'react-router-dom';
import { useLogged } from '../../Context/IsLogged'
import { set } from 'react-hook-form'

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const {logged,setLogged,setUser}=useLogged()
    const navigate = useNavigate();




    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email address';

        if (!password) newErrors.password = 'Password is required';
        else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';

        // Only check localStorage if basic validation passed
        if (Object.keys(newErrors).length === 0) {
            const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

            const foundUser = existingUsers.find(user => user.email === email);


            if (!foundUser) {
                newErrors.email = 'Email is not registered if you dont have an email go to Register';
            } else if (foundUser.password !== password) {
                newErrors.password = 'Incorrect password';
            } else {
                // Successful login
                localStorage.setItem('loggedUser', JSON.stringify(foundUser));  // optional
                setLogged(true);
                setUser(foundUser);
                navigate('/');
                return;  // Exit early on success
            }
        }

        setErrors(newErrors);
    };

    return (
        <div className="min-h-screen flex">
            <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-8 py-12">
      
                <div className="mb-6">
                   <Link to={'/'}> <img src={loginlogo} alt="" /></Link>  
                </div>
                <h2 className="text-2xl font-semibold mb-6">LOGIN</h2>

         
                <form className="w-full max-w-sm space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='email' className="block mb-1 text-sm font-medium">Email</label>
                        <input
                            type="email"
                            placeholder="yourmail@gmail.com"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            name='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                     {errors.email && <small className="text-red-700">{errors.email}</small> }
                    <div>
                        <label htmlFor='password' className="block mb-1 text-sm font-medium">Password</label>
                        <input
                            type="password"
                            placeholder="**********"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            name='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                     {errors.password && <small className="text-red-700">{errors.password}</small> }
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700"
                    >
                        LOGIN
                    </button>
                </form>

               
                <p className="mt-4 text-sm">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-blue-600 font-medium hover:underline">Register</Link>
                    
                </p>

                {/* Divider */}
                <div className="my-6 w-full max-w-sm border-t border-gray-300" />

               
                <div className="w-full max-w-sm space-y-3">
                    <p className="text-center text-sm font-semibold">Login with Others</p>
                    <button className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 hover:bg-gray-100">
                       <img src={googlelogo} alt="Google" />
                        Login with Google
                    </button>
                    <button className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 hover:bg-gray-100">
                       <img src={facebooklogo} alt="Facebook" />
                        Login with Facebook
                    </button>
                </div>
            </div>

            {/* Image*/}
            <div className="hidden md:flex justify-center items-center w-1/2 bg-blue-500 relative">
               
                <div className="w-[90%] h-[90%] rounded-3xl bg-white/10 backdrop-blur-lg flex items-center justify-center">

                    <img src={loginphoto} alt="Airplane" className="max-h-[80%]" />
                </div>
            </div>
        </div>
    )
}
