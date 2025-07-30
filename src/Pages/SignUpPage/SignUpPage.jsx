import { set, useForm } from 'react-hook-form'
import React, { useState } from 'react'
import loginlogo from '../../assets/Loginlogo.svg'
import loginphoto from '../../assets/Loginphoto.png'
import facebooklogo from '../../assets/facebook.svg'
import googlelogo from '../../assets/google.svg'
import { Link, useNavigate } from 'react-router-dom';
import { useLogged } from '../../Context/IsLogged'


export default function SignUpPage() {
    const navigate=useNavigate();
    const {logged,setLogged,setUser}=useLogged()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isDirty },
    } = useForm();

    const onSubmit = (data) => {

        alert('Form submitted successfully!');


        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
        const existingUserEmail = existingUsers.find(user => user.email === data.email);
        const existingUserphone = existingUsers.find(user => user.phone === data.phone);

        if (existingUserEmail) {
            alert('This Email is already registered');
            return;
        }
        else if (existingUserphone) {
            alert('This Phone is already registered');
            return;
        }

        const newUser = {
            email: data.email,
            password: data.password,
            name: data.username,
            phone: data.phone,
            country: data.country,
        };

        existingUsers.push(newUser);

        localStorage.setItem('users', JSON.stringify(existingUsers));
        localStorage.setItem('loggedUser', JSON.stringify(newUser));

          setLogged(true);
          setUser(newUser);
        navigate('/');
    };
    const password = watch('password');
    return (
        <div className="min-h-screen flex">

            <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-8 py-12">

                <div className="mb-6">
                  <Link to={'/'}> <img src={loginlogo} alt="" /></Link>  
                </div>


                <h2 className="text-2xl font-semibold mb-6">SIGNUP</h2>

               
                <form className="w-full max-w-sm space-y-4" onSubmit={handleSubmit(onSubmit)}>
                 
                    <div>
                        <label className="block mb-1 text-sm font-medium">Name</label>
                        <input
                            type="text"
                            placeholder="Your full name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            {...register('username', {
                                required: 'User Name is required',
                                validate: (value) => !/\s/.test(value) || 'User Name must not contain spaces',
                            })}
                        />
                        {errors.username && <small className="text-red-700">{errors.username.message}</small>}
                    </div>

                 
                    <div>
                        <label className="block mb-1 text-sm font-medium">Email</label>
                        <input
                            type="email"
                            placeholder="yourmail@gmail.com"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^\S+@\S+\.\S+$/,
                                    message: 'Invalid email address',
                                },
                            })}
                        />
                        {errors.email && <small className="text-red-700">{errors.email.message}</small>}

                    </div>

                
                    <div>
                        <label className="block mb-1 text-sm font-medium">Password</label>
                        <input
                            type="password"
                            placeholder="**********"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            {...register('password', {
                                required: 'Password is required',
                                pattern: {
                                    value: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
                                    message: 'Must include 1 Uppercase, 1 Number, 1 Special character',
                                },
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters',
                                },
                            })}
                        />
                        {errors.password && <small className="text-red-700">{errors.password.message}</small>}
                    </div>

                   
                    <div>
                        <label className="block mb-1 text-sm font-medium">Confirm Password</label>
                        <input
                            type="password"
                            placeholder="**********"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            {...register('confirmPassword', {
                                required: 'Confirm Password is required',
                                validate: (value) => value === password || 'Passwords do not match',
                            })}
                        />
                        {errors.confirmPassword && <small className="text-red-700">{errors.confirmPassword.message}</small>}

                    </div>

             

                    <div>
                        <label className="block mb-1 text-sm font-medium">Country</label>
                        <input
                            type="text"
                            placeholder=""
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            {...register('country', {
                                required: 'Country is required',
                                minLength: {
                                    value: 3,
                                    message: 'Country must be at least 3 characters'
                                }
                            })}
                        />
                        {errors.country && <small className="text-red-700">{errors.country.message}</small>}
                    </div>
                    <div className="flex-1">
                        <label className="block mb-1 text-sm font-medium">Phone Number</label>
                        <input
                            type="tel"
                            placeholder="+20123456789"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            {...register('phone', {
                                required: 'Phone Number is required',
                                pattern: {
                                    value: /^\+\d{1,4}\s?\d{4,14}$/,
                                    message: "Phone number must start with country code, e.g. +1 1234567890"
                                }
                            })}
                        />
                        {errors.phone && <small className='text-red-700'>{errors.phone.message}</small>}
                    </div>


              
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700"
                    >
                        SIGNUP
                    </button>
                </form>

               
                <p className="mt-4 text-sm">
                    Already have an account?{' '}
                   <Link to="/login" className="text-blue-600 font-medium hover:underline">Login</Link>
                </p>

            
                <div className="my-6 w-full max-w-sm border-t border-gray-300" />

             
                <div className="w-full max-w-sm space-y-3">
                    <p className="text-center text-sm font-semibold">Signup with Others</p>
                    <button className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 hover:bg-gray-100" >
                        <img src={googlelogo} alt="Google" />
                        Signup with Google
                    </button>
                    <button className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 hover:bg-gray-100">
                        <img src={facebooklogo} alt="Facebook" />
                        Signup with Facebook
                    </button>
                </div>
            </div>

            <div className="hidden md:flex justify-center items-center w-1/2 bg-blue-500 relative">
                <div className="w-[90%] h-[90%] rounded-3xl bg-white/10 backdrop-blur-lg flex items-center justify-center">

                    <img src={loginphoto} alt="Airplane" className="max-h-[80%]" />
                </div>
            </div>
        </div>
    )
}
