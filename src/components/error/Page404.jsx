import React from 'react'
import image from "../../assets/images/8.svg"
import { Link } from 'react-router-dom'

const Page404 = () => {
    return (
        <>

<div className="bg-indigo-900 relative overflow-hidden h-screen">
    <img src={image} alt='' className="absolute h-full w-full object-cover"/>
    <div className="inset-0 bg-black opacity-25 absolute">
    </div>
    <div className="container mx-auto px-6 md:px-12 relative z-10 flex items-center py-32 xl:py-40">
        <div className="w-full font-mono flex flex-col items-center relative z-10">
            <h1 className="font-extrabold text-5xl text-center text-white leading-tight mt-4">
                You&#x27;re alone here
            </h1>
            <p className="font-extrabold text-8xl my-24 text-white animate-bounce">
                404
            </p>

            <Link to="/" className="inline-flex items-center border-0 py-1 px-4 mr-4 bg-green-500 hover:bg-green-700 focus:ring-green-500
                focus:ring-offset-green-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md
                focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-full text-base mt-4 md:mt-0">
               <i className="fas fa-sign-in-alt pr-1"></i>
                    Go Home
            </Link>
        </div>
    </div>
</div>
        
        </>
    )
}

export default Page404
