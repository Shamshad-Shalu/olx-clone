import React from 'react'
import "./Navbar.css";
import logo from "../../assets/logo.png";
import search_icon from "../../assets/search-icon.jpeg"
import arrow_icon from "../../assets/arrow-icon.jpeg";
import arrow from "../../assets/arrow-down.svg";
import addBtn from "../../assets/addButton.png";
import {Link} from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";
import {ChevronDown , User , LogOut, Flag} from "lucide-react"
import { auth } from '../../firebase/firebase';
import { useRef ,useState ,useEffect } from 'react';
import { UseAuth } from '../../context/AuthContext/UseAuth'; 


function Navbar({toggleModal,toggleModalSell}) {

    const [user] = useAuthState(auth);
    const { logout } = UseAuth()
    const [userMenuOpen , setUserMenuOpen ] = useState(false);
    const userMenuRef = useRef(null);

    useEffect(()=> {

        const handleClickOutside = (e) => {
            if(userMenuRef.current && !userMenuRef.current.contains(e.target)) {
                setUserMenuOpen(false);
            }
        };

        document.addEventListener("mousedown",handleClickOutside);
        return ()=> {
            document.removeEventListener("mousedown",handleClickOutside);
        }
    },[]);

    const toggleUserMenu = ()=> {
        setUserMenuOpen(!userMenuOpen)
    }
  


  return (
    <div>
        <nav className='fixed z-40 w-full p-2 pl-3 shadow-md bg-slate-100 border-b-4 border-solid border-b-white' >
            <Link className='w-12' to={"/"} > <img src={logo}  alt="" /> </Link>
            <div className='relative location-search ml-5' >
                <img src={search_icon} className='absolute  top-4 left-2 w-5' alt="" />
                <input type="text" placeholder='Search city,area  or locality...' 
                 className='w-[50px] sm:w-[150px] md:w-[250px] lg:w-[270px] p-3 pl-8 pr-8 border-black border-solid border-2 rounded-md placeholder:text-ellipsis focus:outline-none focus:border-teal-300'/>
                <img src={arrow_icon} alt="" className='absolute top-4 right-3 w-5 cursor-pointer' />
            </div>
            <div className='ml-5 mr-2 relative w-full main-search' >
                <input type="text" placeholder='Find cars, Mobile Phones and More...' 
                  className='w-full p-3 border-black border-solid border-2 rounded-md placeholder:text-ellipsis focus:outline-none focus:border-teal-300' 
                />
                <div style={{ backgroundColor: "#002f34" }}
                    className="flex justify-center items-center absolute top-0 right-0 h-full rounded-e-md w-12"
                    >
                    <img className="w-5 filter invert" src={search_icon} alt="Search Icon" />
                </div>
            </div>
            <div className="mx-1 sm:ml-5 sm:mr-5 relative lang ">
                <p className="font-bold mr-3 ">English</p>
                <img src={arrow_icon}  className='w-5 cursor-pointer ' alt="" />
            </div>

            <div className="relative" ref={userMenuRef}>
                {!user ? (
                    <p onClick={toggleModal} className='font-bold underline ml-5 cursor-pointer' style={{color: '#002f34'}}>Login</p>
                ) : (
                    <>
                        <button type='button' onClick={toggleUserMenu} 
                            className="flex items-center px-3 py-2 text-sm font-medium text-olx-blue rounded-md hover:bg-olx-light-grey focus:outline-none"
                        >
                            <User className='h-5 w-5 mr-1'/>
                            <span className='hidden lg:inline'>
                                { user.displayName?.split(" ")[0] }
                            </span>
                            <ChevronDown className='ml-1 h-6 w-6' />
                        </button>
                        {
                            userMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 animate-fadeIn menu-dropdown z-50">
                                    <div className="py-1">
                                        <Link to={"/my-ads"} 
                                            className="block px-4 py-2 text-sm text-olx-blue hover:bg-olx-light-grey"
                                        >
                                            My Ads
                                        </Link>
                                        <button 
                                            onClick={ ()=> logout()}
                                            className="block w-full text-left px-4 py-2 text-sm text-olx-blue hover:bg-olx-light-grey"
                                        >
                                            <div className="flex items-center">
                                                <LogOut className='h-4 w-4 mr-2'/>
                                                    Logout
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            )
                        }
                    </>
                )}
            </div>

            <img src={addBtn} alt="" 
               onClick={ user ? toggleModalSell : toggleModal}
              className='w-24 mx-1 sm:ml-5 sm:mr-5 shadow-xl rounded-full cursor-pointer' 
            />
        </nav>

        <div className='w-full relative flex shadow-md p-2 pt-20 pl-10 pr-10 sm:pl-44 md:pr-44 sub-lists' >
            <ul className='list-none flex items-center justify-between w-full'>
                <div  className='flex flex-shrink-0'>
                    <p  className='font-semibold uppercase all-cats'> All categories</p>
                    <img className='w-4 ml-2' src={arrow} alt="" />
                </div>

                <li>Cars</li>
                <li>Motorcycles</li>
                <li>Mobile Phones</li>
                <li>For sale : Houses & Apartments</li>
                <li>Scooter</li>
                <li>Commercial & Other Vehicles</li>
                <li>For rent : Houses & Apartments</li>

            </ul>
        </div>

    </div>
  )
}

export default Navbar