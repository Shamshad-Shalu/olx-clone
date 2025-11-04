import { Carousel, Modal, ModalBody } from 'flowbite-react'
import React from 'react'
import mobile from "../../assets/mobile.svg"
import guitar from "../../assets/guita.png"
import love from "../../assets/love.png"
import avatar from "../../assets/avatar.png"
import close from "../../assets/close.svg"
import google from "../../assets/google.png"
import Slider from './Slider';
import { UseAuth } from '../../context/AuthContext/UseAuth'

const Login = ({toggleModal, status}) => {

    const { signUpWithGoogle } = UseAuth();

    const handleClick = async () => {
        try {
            await signUpWithGoogle ();
            toggleModal()
        } catch (error) {
             console.log("Login Error:", err);
        }
    }
    return (
    <div>
        <Modal 
            theme={{
                "content": {
                    "base": "relative w-full max-w-md p-0 md:h-auto",
                    "inner": "relative flex max-h-[90dvh] flex-col rounded-lg bg-white shadow dark:bg-gray-700"
                },
                "body": {
                    "base": "p-0 flex-1 overflow-auto",
                    "popup": "p-0"
                }
            }} 
            onClick={toggleModal} className="bg-black bg-opacity-50" 
            position={'center'} show={status} size="md" popup={true}
        >
            {/* Header closing.*/}
            <div className="relative bg-white">
                <button onClick={toggleModal}
                    className="absolute top-4 right-4 z-20 p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <img src={close} alt="Close"  className="w-5 h-5" />
                </button>
            </div>

            {/* Carousel Section */}
            <div onClick={(event)=> event.stopPropagation()} className="bg-white px-6 pt-6 pb-4">
                <Carousel 
                    slide={true} 
                    theme={{
                        "root": {
                            "base": "relative h-full w-full"
                        },
                        "indicators": {
                            "active": {
                                "off": "bg-gray-300 hover:bg-gray-400",
                                "on": "bg-teal-400"
                            },
                            "base": "h-2 w-2 rounded-full",
                            "wrapper": "absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-3"
                        },
                        "item": {
                            "base": "absolute top-1/2 left-1/2 block w-full -translate-x-1/2 -translate-y-1/2",
                            "wrapper": {
                                "off": "w-full flex-shrink-0 transform cursor-default snap-center",
                                "on": "w-full flex-shrink-0 transform cursor-grab snap-center"
                            }
                        },
                        "control": {
                            "base": "inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/80 hover:bg-white group-focus:outline-none group-focus:ring-2 group-focus:ring-teal-300 shadow-md",
                            "icon": "h-4 w-4 text-gray-800"
                        },
                        "scrollContainer": {
                            "base": "flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth rounded-none",
                            "snap": "snap-x"
                        }
                    }}
                    className="h-64 w-full"
                    leftControl={
                        <svg className="h-4 w-4 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    }
                    rightControl={
                        <svg className="h-4 w-4 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    }
                >

                <Slider image={guitar} text={" Help us become one of the safest place to buy and sell."}/>
                <Slider image={love} text={"Close deals from the comfort of your home."}/>
                <Slider image={avatar} text={"Keep all your favorites in one place."}/>

                </Carousel>
            </div>

            {/* Login Options Section */}
            <div className="bg-white px-6 pb-6" onClick={(event)=> {event.stopPropagation()}}>
                {/* Phone Login Button */}
                <button className="w-full flex items-center justify-start rounded-md border-2 border-black px-4 py-3 mb-4 hover:bg-gray-50 transition-colors">
                    <img className="w-5 h-5 mr-3" src={mobile} alt="Mobile" />
                    <span className="text-sm font-bold text-black">Continue with phone</span>
                </button>

                <button 
                    className="w-full flex items-center justify-center rounded-md border-2 border-gray-300 px-4 py-3 mb-6 hover:bg-gray-50 active:bg-teal-50 transition-colors relative" 
                    onClick={handleClick}>
                    <img className="w-5 h-5 absolute left-4" src={google} alt="Google" />
                    <span className="text-sm text-gray-600" >Continue with Google</span>
                </button>

                <div className="flex flex-col items-center justify-center mb-6">
                    <p className="font-semibold text-sm text-gray-600 mb-3">OR</p>
                    <button className="font-bold text-sm text-blue-600 hover:text-blue-800 underline underline-offset-4 transition-colors">
                        Login with Email
                    </button>
                </div>

                {/* Footer Text */}
                <div className="text-center space-y-3">
                    <p className="text-xs text-gray-600">
                        All your personal details are safe with us.
                    </p>
                    <p className="text-xs text-gray-600 leading-relaxed">
                        If you continue, you are accepting{' '}
                        <span className="text-blue-600 hover:text-blue-800 cursor-pointer transition-colors">
                            OLX Terms and Conditions and Privacy Policy
                        </span>
                    </p>
                </div>
            </div>
        </Modal>
    </div>
  )
}

export default Login