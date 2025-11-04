import React ,{useEffect ,useState} from 'react'
import Navbar from '../components/Navbar/Navbar'
import Login from '../components/Modal/Login';
import useModal from '../hooks/useModal';
import { UseProduct } from '../context/ProductContext/UseProduct';
import Sell from '../components/Modal/Sell';
import Card from '../components/Card/Card';


function Home() {

    const loginModal = useModal();
    const sellModal = useModal();
    const [editItem, setEditItem] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const { products, fetchAllProducts } = UseProduct();

    useEffect(() => {
        fetchAllProducts();
    }, []);


  return (
    <>
        <Navbar toggleModal = {loginModal.toggle} toggleModalSell= {sellModal.toggle} />
        <Login toggleModal = {loginModal.toggle} status= {loginModal.isOpen}/>
        <Sell  toggleModalSell={sellModal.toggle} status={sellModal.isOpen}
          editItem={editItem} isEditMode={isEditMode} 
        />
        <Card 
            items={products || []} 
            title={'Fresh recommendations'} 
            onEdit={(item) => {
                setEditItem(item);
                setIsEditMode(true);
                sellModal.toggle();
            }}
        />
    </>
  )
}

export default Home