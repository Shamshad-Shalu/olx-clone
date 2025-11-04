import React ,{useState} from 'react'
import { Link } from 'react-router-dom'
import Favorite from '../../assets/favorite.svg';
import { UseAuth } from '../../context/AuthContext/UseAuth';
import { UseProduct } from '../../context/ProductContext/UseProduct';
import { Pencil, Trash2 } from "lucide-react";
import { Modal } from "flowbite-react";

 
const Card = ({items, title ,onEdit }) => {

    const {user} = UseAuth();
    const { deleteProduct } = UseProduct();
    const [showConfirm, setShowConfirm] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    const handleDelete = () => {
        if (itemToDelete) {
        deleteProduct(itemToDelete.id);
        setShowConfirm(false);
        }
    };
    return (
        <div className='p-10 px-5 sm:px-15 md:px-30 lg:px-40 min-h-screen'>
            <h1 style={{ color: '#002f34' }} className="text-2xl">{title}</h1>
            <div  className='grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-5'>
                {
                    items.map((item) => (
                        <div key={item.id}
                            style={{borderWidth: '1px', borderColor: 'lightgray'}} 
                            className='relative w-full h-72 rounded-md border-solid bg-gray-50 overflow-hidden cursor-pointer'
                        >
                            < Link to={"/details"} state={{item}} className='block h-full' >
                                <div className="w-full flex-justify-center p-2 overflow-hidden ">
                                    <img className='h-36 object-contain w-full'
                                    src={item.imageUrl || "https://via.placeholder.com/150"} alt={item.title} 
                                    />
                                </div>
                                <div className="details p-1 pl-4 pr-4">
                                    <h1 style={{ color: '#002f34' }} className="font-bold text-xl">₹ {item.price}</h1>
                                    <p className="text-sm pt-2">{item.category}</p>
                                    <p className="pt-2">{item.title}</p>
                                </div>
                            </Link>

                            {/* fav-icon 
                            <div className='absolute flex justify-center items-center p-2 bg-white rounded-full top-3 right-3 cursor-pointer'>
                                <img className='w-5' src={Favorite} alt="" />
                            </div> */}
                            {/* edit or delte section  */}
                            { user?.uid === item.userId && (
                                <div className="absolute top-2 flex gap-2">
                                    <button onClick={() => onEdit(item)} className="bg-white p-1 rounded shadow hover:bg-gray-100">
                                        <Pencil size={16} className="text-gray-700" />
                                    </button>
                                    <button className="bg-white p-1 rounded shadow hover:bg-gray-100"
                                        onClick ={() => {
                                            setItemToDelete(item);
                                            setShowConfirm(true);
                                        }}
                                    >
                                        <Trash2 size={16} className="text-red-600" />
                                    </button>
                                </div>
                            )}
                        </div>
                    ))
                }
            </div>

            {/* Delete Confirm Modal */}
           <Modal show={showConfirm} onClose={() => setShowConfirm(false)} size="md" popup>
                <div className="p-6 text-center">
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        Are you sure you want to delete this item?
                    </h3>
                    <div className="flex justify-center gap-4">
                        <button
                            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                            onClick={() => setShowConfirm(false)} >Cancel
                        </button>
                        <button
                            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                            onClick={handleDelete}>Yes, Delete
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default Card
