import React, { useEffect } from 'react'
import useModal from '../hooks/useModal'
import { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Login from '../components/Modal/Login';
import Card from '../components/Card/Card';
import Sell from '../components/Modal/Sell';
import { UseProduct } from '../context/ProductContext/UseProduct';
import { UseAuth } from '../context/AuthContext/UseAuth';

function MyList() {

    const loginModal = useModal();
    const sellModal = useModal();
    const [editItem, setEditItem] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    const [myAds ,setMyAds ] = useState([]);
    const {products} = UseProduct();
    const {user } = UseAuth();

    useEffect(() => {
        if(!user?.uid) return;
        const myItems = products.filter(item => item.userId ===user.uid) 
        setMyAds(myItems); 
    },[products,user])

    return (
        <>
            <Navbar toggleModal={loginModal.toggle} toggleModalSell={sellModal.toggle} />
            <Login toggleModal={loginModal.toggle} status={loginModal.isOpen} />
            <Sell  toggleModalSell={sellModal.toggle} status={sellModal.isOpen}
                editItem={editItem} isEditMode={isEditMode} 
            />
            < Card items={myAds} title={'My Ads'}  
               onEdit={(item)=> {
                  setEditItem(item);
                  setIsEditMode(true);
                  sellModal.toggle();
               }}
            />
        </>
    )
}

export default MyList