import {  useEffect, useState } from 'react';
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { fireStore } from '../../firebase/firebase';
import { ProductContext } from './ProductContext';


export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const fetchAllProducts = async () => {
    const productsCollection = collection(fireStore, 'products');
    const snapshot = await getDocs(productsCollection);
    setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const fetchUserProducts = async (userId) => {
    const q = query(collection(fireStore, 'products'), where('userId', '==', userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  };

  const deleteProduct = async (productId) => {
    await deleteDoc(doc(fireStore, 'products', productId));
    fetchAllProducts();
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, fetchAllProducts, fetchUserProducts, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

