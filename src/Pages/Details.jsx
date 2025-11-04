import React ,{ useState } from 'react';
import {useLocation} from "react-router-dom"
import useModal from '../hooks/useModal';
import Navbar from '../components/Navbar/Navbar';
import Login from '../components/Modal/Login';
import Sell from "../components/Modal/Sell";

function Details() {

    const loginModal = useModal();
    const sellModal = useModal();
    const [editItem, setEditItem] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    
    const location = useLocation();
    console.log("location",location);
    const {item} = location.state || {};


    if (!item) return <p className="text-center p-10">No item found.</p>;

    return (
        <div>
            <Navbar  toggleModal = {loginModal.toggle} toggleModalSell= {sellModal.toggle} />
            <Login  toggleModal={loginModal.toggle} status={loginModal.isOpen} />

            <div className="grid gap-0 sm:gap-5 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 p-10 px-5 sm:px-15 md:px-30 lg:px-40">
                <div className="border-2 w-full rounded-lg flex justify-center overflow-hidden h-96">
                  <img className="object-cover" src={item?.imageUrl} alt={item?.title} />
                </div>

                <div className="flex flex-col relative w-full">
                    <p className="p-1 pl-0 text-2xl font-bold">₹ {item?.price}</p>
                    <p className="p-1 pl-0 text-base">{item?.category}</p>
                    <p className="p-1 pl-0 text-xl font-bold">{item?.title}</p>
                    <p className="p-1 pl-0 sm:pb-0 break-words text-ellipsis overflow-hidden w-full">
                        {item?.description}
                    </p>
                    <div className="w-full relative sm:relative md:absolute bottom-0 flex justify-between">
                        <p className="p-1 pl-0 font-bold">Seller: {item?.userName}</p>
                        <p className="p-1 pl-0 text-sm font-bold">{item?.createdAt}</p>
                    </div>
                </div>
            </div>
            <Sell  toggleModalSell={sellModal.toggle} status={sellModal.isOpen}
                editItem={editItem} isEditMode={isEditMode} 
            />

        </div>
    )
}

export default Details