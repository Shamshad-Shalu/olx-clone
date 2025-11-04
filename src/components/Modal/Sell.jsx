import React,{ useState } from 'react';
import fileUpload from "../../assets/fileUpload.svg";
import close from "../../assets/close.svg";
import  loading from '../../assets/loading.gif';
import { uploadToCloudinary } from '../../services/cloudinary';
import {Modal,ModalBody} from "flowbite-react"
import Input from '../Input/Input';
import { addDoc, collection ,doc ,updateDoc} from "firebase/firestore";
import { toast } from "react-toastify";
import {fireStore} from "../../firebase/firebase";
import { UseAuth } from '../../context/AuthContext/UseAuth';
import { UseProduct } from '../../context/ProductContext/UseProduct';
import { useEffect } from 'react';


function Sell({toggleModalSell ,status , editItem = null, isEditMode = false }) {

    const [title,setTitle] = useState("");
    const [category,setCategory] = useState("");
    const [price,setPrice] = useState("");
    const [description,setDescription] = useState("");
    const [image , setImage ] = useState(null);
    const [submiting , setSubmiting ] = useState(false);

    const { user } = UseAuth();
    const { fetchAllProducts } = UseProduct(); 


    useEffect(()=> {
        if(isEditMode && editItem ){
            setTitle(editItem.title || "");
            setCategory(editItem.category || "");
            setPrice(editItem.price || "");
            setDescription(editItem.description || "");
            setImage(null);
        }else {
            setTitle("");
            setCategory("");
            setPrice("");
            setDescription("");
            setImage(null);
        }
    },[isEditMode,editItem,status])

    const handleImageUpload = (event)=> {
        if(event.target.files) setImage(event.target.files[0])
    }

    const handleSubmit =async (event)=> {
        event.preventDefault();
        event.stopPropagation();

        if(!user) {
            toast.error("Please Login to continue.");
            return;
        } 

        const trimmedTitle = title.trim();
        const trimmedCategory = category.trim();
        const trimmedPrice = price.trim();
        const trimmedDescription = description.trim();

        if(!trimmedTitle || !trimmedCategory || !trimmedPrice || !trimmedDescription ) {
            toast.error("All fields are required");
            return;
        }

        const numericPrice = Number(price);
        if (isNaN(numericPrice) || numericPrice < 1) {
            toast.error("Enter a valid price");
            return;
        }
        setSubmiting(true);

        try {
            if(isEditMode && editItem ) {
                const productRef = doc(fireStore, "products", editItem.id);
                const updatedData = {
                    title,
                    category,
                    price,
                    description,
                };

                if(image ) {
                    try {
                        const uploadedUrl = await uploadToCloudinary(image);
                        updatedData.imageUrl = uploadedUrl;
                    } catch (error) {
                        console.log(error);
                        toast.error("Image upload failed.");
                        setSubmiting(false);
                        return; 
                    }
                }
                await updateDoc(productRef , updatedData);
                toast.success("Item updated successfully");
            }else {
                let imageUrl = "";
                if (image) {
                    try {
                        imageUrl = await uploadToCloudinary(image);
                    } catch (error) {
                        console.log(error);
                        toast.error("Image upload failed.");
                        setSubmiting(false);
                        return;
                    }
                }else {
                    toast.error("Pls upload Image");
                    setSubmiting(false);
                    return;
                }

                await addDoc(collection(fireStore,"products"),{
                    title,
                    category,
                    price,
                    description,
                    imageUrl,
                    userId : user.uid,
                    userName:user.displayName || "Anonymous",
                    createdAt:new Date().toDateString()
                });
    
                toast.success("Item listed successfully");
            }
            await fetchAllProducts();
            toggleModalSell();
            
        } catch (error) {
            console.log("Firestore error:", error);
            toast.error("Failed to add item"); 
        }finally {
            setSubmiting(false);
        }
    }  
  return (
    <div>
        <Modal theme={{
            "content": {
                "base": "relative w-full p-4 md:h-auto",
                "inner": "relative flex max-h-[90dvh] flex-col rounded-lg bg-white shadow dark:bg-gray-700"
            }
        }}  onClick={toggleModalSell} show={status} position={'center'} size='md' popup={true} >

            <ModalBody className='bg-white h-96 p-0 rounded-md' onClick={(event) => event.stopPropagation()} >

                <img src={close} 
                    onClick={()=> {
                    toggleModalSell();
                    setImage(null);
                    }}
                    className='w-6 absolute z-10 top-6 right-8 cursor-pointer' 
                />
                <div className='p-6 pl-8 pr-8 pb-8'>
                    <p className='font-bold text-lg mb-3' >Sell Item</p>

                    <form onSubmit={handleSubmit}>
                        <Input value={title} setInput={setTitle} placeholder="Title" />
                        <Input value={category} setInput={setCategory} placeholder="Category" />
                        <Input value={price} setInput={setPrice} placeholder="Price" />
                        <Input value={description} setInput={setDescription} placeholder="Description" />

                        <div  className="pt-2 w-full relative">
                            { image ? (
                                <div className='relative h-40 sm:h-60 w-full flex justify-center border-2 border-black border-solid rounded-md overflow-hidden'>
                                    <img  className="object-contain" src={URL.createObjectURL(image)} alt="" />
                                </div>
                            ) : editItem?.imageUrl ? (
                                <div className='relative h-40 sm:h-60 w-full flex justify-center border-2 border-black border-solid rounded-md overflow-hidden'>
                                    <img className="object-contain" src={editItem.imageUrl} alt="" />
                                </div>
                            ) : (
                                <div className="relative h-40 sm:h-60 w-full border-2 border-black border-solid rounded-md" >
                                    <input type="file" accept='image/*' onChange={handleImageUpload}
                                        className="absolute inset-10 h-full w-full opacity-0 cursor-pointer z-30" 
                                    />
                                    <div  className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col items-center">
                                        <img  className="w-12" src={fileUpload} alt="" />
                                        <p  className="text-center text-sm pt-2">Click to upload images</p>
                                        <p  className="text-center text-sm pt-2">SVG, PNG, JPG</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        { submiting ? (
                                <div  className="w-full flex h-14 justify-center pt-4 pb-2">
                                    <img className="w-32 object-cover" src={loading} alt="" />
                                </div>
                            ): (
                                <div  className="w-full pt-2">
                                    <button  className="w-full p-3 rounded-lg text-white"
                                        style={{ backgroundColor: '#002f34' }}
                                    > Sell Item </button>
                                </div>
                            )
                        }  

                    </form>
                </div>
            </ModalBody>
        </Modal>

    </div>
  )
}

export default Sell

